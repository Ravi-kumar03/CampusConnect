import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import { allUsersRoute, host } from "../utils/APIRoutes";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";

export default function Chat() {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const init = async () => {
      if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
        navigate("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)));
      }
    };
    init();
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    const loadContacts = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(data.data);
        } else {
          navigate("/setAvatar");
        }
      }
    };
    loadContacts();
  }, [currentUser]);

  const handleChatChange = (chat) => setCurrentChat(chat);

  return (
    <>
      <Container>
        <div className="container">
          <Contacts contacts={contacts} changeChat={handleChatChange} />
          {currentChat === undefined ? <Welcome /> : <ChatContainer currentChat={currentChat} socket={socket} />}
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 100vh; width: 100vw;
  display: flex; flex-direction: column; justify-content: center; align-items: center;
  background: var(--bg-app);

  .container {
    height: 88vh; width: 90vw; max-width: 1400px;
    background: var(--bg-card);
    border: 1px solid var(--border-card);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    display: grid;
    grid-template-columns: 280px 1fr;
    overflow: hidden;
    box-shadow: var(--shadow-app);

    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 240px 1fr;
      width: 95vw; height: 92vh; border-radius: 14px;
    }
    @media screen and (max-width: 720px) {
      grid-template-columns: 1fr;
      grid-template-rows: 45% 55%;
      width: 100vw; height: 100vh;
      border-radius: 0; border: none;
    }
  }
`;
