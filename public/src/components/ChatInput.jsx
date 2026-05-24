import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
import Picker from "emoji-picker-react";

export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiPickerhideShow = () => setShowEmojiPicker(!showEmojiPicker);

  const handleEmojiClick = (event, emojiObject) => {
    setMsg((prev) => prev + emojiObject.emoji);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </div>
      </div>
      <form className="input-container" onSubmit={(event) => sendChat(event)}>
        <input
          type="text"
          placeholder="Message your classmate..."
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button type="submit" disabled={msg.length === 0}>
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1.5rem;
  background: var(--bg-chat-input-area);
  border-top: 1px solid var(--border-chat-input);

  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0.75rem 1rem;
    gap: 0.5rem;
  }

  .button-container {
    display: flex;
    align-items: center;
    flex-shrink: 0;

    .emoji {
      position: relative;
      svg {
        font-size: 1.4rem;
        color: var(--text-muted);
        cursor: pointer;
        transition: color 0.2s, transform 0.2s;
        &:hover { color: #22d3ee; transform: scale(1.1); }
      }
      .emoji-picker-react {
        position: absolute;
        bottom: 3rem;
        left: 0;
        background: var(--bg-card);
        box-shadow: var(--shadow-card);
        border: 1px solid var(--border-card);
        border-radius: 12px;
        overflow: hidden;
        .emoji-scroll-wrapper::-webkit-scrollbar { background: transparent; width: 4px; &-thumb { background: var(--scrollbar-thumb); } }
        .emoji-categories button { filter: contrast(0) brightness(0.6); }
        .emoji-search { background: var(--bg-form-input); border: 1px solid var(--border-input); border-radius: 6px; color: var(--text-primary); }
        .emoji-group:before { background: var(--bg-card); color: var(--text-section); font-size: 0.75rem; }
      }
    }
  }

  .input-container {
    flex: 1;
    display: flex;
    align-items: center;
    background: var(--bg-input-container);
    border: 1.5px solid var(--border-input-cont);
    border-radius: 12px;
    overflow: hidden;
    transition: border-color 0.2s, box-shadow 0.2s;

    &:focus-within {
      border-color: var(--border-input-cont-focus);
      box-shadow: var(--shadow-ring);
    }

    input {
      flex: 1;
      background: transparent;
      border: none;
      padding: 0.75rem 1rem;
      color: var(--text-primary);
      font-size: 0.9rem;
      font-family: "Inter", sans-serif;
      &::placeholder { color: var(--text-placeholder); }
      &:focus { outline: none; }
    }

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #2563eb, #06b6d4);
      border: none;
      padding: 0.625rem 1.125rem;
      cursor: pointer;
      transition: all 0.2s ease;
      align-self: stretch;
      svg { font-size: 1.2rem; color: white; }
      &:hover:not(:disabled) { background: linear-gradient(135deg, #1d4ed8, #0891b2); }
      &:disabled { opacity: 0.4; cursor: not-allowed; }
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.5rem 0.875rem;
        svg { font-size: 1rem; }
      }
    }
  }
`;
