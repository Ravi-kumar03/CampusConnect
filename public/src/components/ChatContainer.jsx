import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { sendMessageRoute, recieveMessageRoute } from "../utils/APIRoutes";

export default function ChatContainer({ currentChat, socket }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      const data = await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
      const response = await axios.post(recieveMessageRoute, { from: data._id, to: currentChat._id });
      setMessages(response.data);
    };
    fetchMessages();
  }, [currentChat]);

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))._id;
      }
    };
    getCurrentChat();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
    socket.current.emit("send-msg", { to: currentChat._id, from: data._id, msg });
    await axios.post(sendMessageRoute, { from: data._id, to: currentChat._id, message: msg });
    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  // socket.current is a ref — intentionally excluded from deps
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} alt="" />
            <OnlineDot />
          </div>
          <div className="user-info">
            <div className="username"><h3>{currentChat.username}</h3></div>
            <StatusText><span className="dot" />Active now</StatusText>
          </div>
        </div>
      </div>

      <div className="chat-messages">
        {messages.length === 0 && (
          <EmptyChat>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <p>Start your conversation with {currentChat.username}</p>
          </EmptyChat>
        )}
        {messages.map((message) => (
          <div ref={scrollRef} key={uuidv4()}>
            <div className={`message ${message.fromSelf ? "sended" : "recieved"}`}>
              <div className="content"><p>{message.message}</p></div>
            </div>
          </div>
        ))}
      </div>

      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  );
}

const OnlineDot = styled.div`
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 10px;
  height: 10px;
  background: #4ade80;
  border-radius: 50%;
  border: 2px solid var(--bg-chat-header);
`;

const StatusText = styled.div`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.72rem;
  color: #22d3ee;
  font-weight: 500;
  margin-top: 1px;
  .dot {
    width: 6px;
    height: 6px;
    background: #4ade80;
    border-radius: 50%;
    animation: blink 2s ease-in-out infinite;
  }
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }
`;

const EmptyChat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  height: 100%;
  color: var(--text-muted);
  p { font-size: 0.875rem; text-align: center; max-width: 220px; line-height: 1.5; }
`;

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  overflow: hidden;
  background: var(--bg-chat);

  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: auto 1fr auto;
  }

  .chat-header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 0.875rem;
    padding: 1rem 1.5rem;
    background: var(--bg-chat-header);
    border-bottom: 1px solid var(--border-chat-header);
    backdrop-filter: blur(10px);

    .user-details {
      display: flex;
      align-items: center;
      gap: 0.875rem;
      .avatar {
        position: relative;
        flex-shrink: 0;
        img { height: 42px; width: 42px; border-radius: 50%; border: 2px solid var(--border-avatar-hero); }
      }
      .user-info { display: flex; flex-direction: column; }
      .username h3 { color: var(--text-chat-name); font-size: 0.95rem; font-weight: 700; }
    }
  }

  .chat-messages {
    padding: 1.25rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.875rem;
    overflow-y: auto;

    &::-webkit-scrollbar { width: 3px; }
    &::-webkit-scrollbar-thumb { background: var(--scrollbar-thumb); border-radius: 3px; }

    .message {
      display: flex;
      align-items: flex-end;
      gap: 0.5rem;
      animation: msgIn 0.2s ease-out;
      @keyframes msgIn {
        from { opacity: 0; transform: translateY(8px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      .content {
        max-width: 55%;
        overflow-wrap: break-word;
        padding: 0.75rem 1.125rem;
        font-size: 0.9rem;
        border-radius: 16px;
        line-height: 1.5;
        @media screen and (min-width: 720px) and (max-width: 1080px) { max-width: 75%; }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background: var(--bg-msg-sent);
        border-bottom-right-radius: 4px;
        box-shadow: 0 2px 8px rgba(37, 99, 235, 0.25);
        color: var(--text-msg-sent);
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background: var(--bg-msg-received);
        border: 1px solid var(--border-input);
        border-bottom-left-radius: 4px;
        color: var(--text-msg-received);
      }
    }
  }
`;
