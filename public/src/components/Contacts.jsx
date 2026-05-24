import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ThemeToggle from "./ThemeToggle";
import Logout from "./Logout";

export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentUserId, setCurrentUserId] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      const data = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );
      setCurrentUserName(data.username);
      setCurrentUserImage(data.avatarImage);
      setCurrentUserId(data._id);
    };
    loadUser();
  }, []);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  const filteredContacts = contacts
    .filter((c) => c._id !== currentUserId)
    .filter((c) => c.username.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <>
      {currentUserImage && currentUserImage && (
        <Container>
          {/* Brand Header */}
          <div className="brand">
            <LogoMark>
              <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="sbGrad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#3b82f6" />
                    <stop offset="1" stopColor="#06b6d4" />
                  </linearGradient>
                  <linearGradient id="sbBg" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#1e3a8a" />
                    <stop offset="1" stopColor="#0e7490" />
                  </linearGradient>
                </defs>
                <rect width="32" height="32" rx="8" fill="url(#sbBg)" />
                <polygon points="16,5 27,10 16,15 5,10" fill="url(#sbGrad)" />
                <path d="M8 11.5 L8 18 C8 21 11.5 23 16 23 C20.5 23 24 21 24 18 L24 11.5"
                  stroke="url(#sbGrad)" strokeWidth="2" strokeLinecap="round" fill="none" />
                <line x1="16" y1="15" x2="16" y2="19" stroke="url(#sbGrad)" strokeWidth="1.8" strokeLinecap="round" />
                <circle cx="16" cy="20" r="1.5" fill="#22d3ee" />
                <circle cx="12" cy="27.5" r="1.4" fill="#60a5fa" />
                <circle cx="16" cy="27.5" r="1.4" fill="#22d3ee" />
                <circle cx="20" cy="27.5" r="1.4" fill="#60a5fa" />
              </svg>
            </LogoMark>
            <BrandText>CampusConnect</BrandText>
            <ThemeToggle />
          </div>

          {/* Search */}
          <div className="search-wrapper">
            <SearchIcon>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </SearchIcon>
            <SearchInput
              type="text"
              placeholder="Search peers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Contacts List */}
          <div className="contacts">
            <SectionLabel>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              Peers ({filteredContacts.length})
            </SectionLabel>
            {filteredContacts.map((contact, index) => {
              const originalIndex = contacts.indexOf(contact);
              return (
                <div
                  key={contact._id}
                  className={`contact ${originalIndex === currentSelected ? "selected" : ""}`}
                  onClick={() => changeCurrentChat(originalIndex, contact)}
                >
                  <div className="avatar">
                    <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt={contact.username} />
                    <OnlineDot />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                    <p>Active now</p>
                  </div>
                </div>
              );
            })}
            {filteredContacts.length === 0 && (
              <EmptyState>No peers found</EmptyState>
            )}
          </div>

          {/* Current User Footer */}
          <div className="current-user">
            <div className="avatar-wrap">
              <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="avatar" />
              <span className="status-dot" />
            </div>
            <div className="user-info">
              <h2 className="username">{currentUserName}</h2>
              <span className="status-label">Online</span>
            </div>
            <div className="logout-btn">
              <Logout />
            </div>
          </div>
        </Container>
      )}
    </>
  );
}

const OnlineDot = styled.div`
  position: absolute;
  bottom: 1px;
  right: 1px;
  width: 8px;
  height: 8px;
  background: #4ade80;
  border-radius: 50%;
  border: 1.5px solid var(--bg-sidebar-footer);
  box-shadow: 0 0 0 1px rgba(74, 222, 128, 0.2);
`;

const LogoMark = styled.div`
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  svg {
    width: 100%;
    height: 100%;
    filter: drop-shadow(0 0 6px rgba(6, 182, 212, 0.5));
  }
`;

const BrandText = styled.span`
  font-size: 1rem;
  font-weight: 800;
  background: linear-gradient(135deg, #60a5fa, #22d3ee);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.3px;
  flex: 1;
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 1.25rem;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-placeholder);
  pointer-events: none;
  z-index: 1;

  svg {
    display: block;
    width: 14px;
    height: 14px;
    flex-shrink: 0;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  background: var(--bg-search-input);
  border: 1px solid var(--border-input);
  border-radius: 10px;
  /* left-pad = icon-left(1.25rem) + icon-width(1rem) + gap(0.25rem) */
  padding: 0 0.875rem 0 2.75rem;
  color: var(--text-primary);
  font-size: 0.875rem;
  line-height: 1;
  font-family: "Inter", sans-serif;
  height: 40px;
  display: flex;
  align-items: center;

  &::placeholder {
    color: var(--text-placeholder);
    line-height: 1;
  }

  &:focus {
    outline: none;
    border-color: var(--border-input-focus);
    background: var(--bg-search-input-focus);
    box-shadow: var(--shadow-ring);
  }
`;

const SectionLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--text-section);
  text-transform: uppercase;
  letter-spacing: 0.8px;
  padding: 0 0.5rem;
  margin-bottom: 0.25rem;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  text-align: center;
  color: var(--text-empty);
  font-size: 0.85rem;
  padding: 3rem 1.5rem;
  border: 1px dashed var(--border-empty);
  border-radius: 12px;
  margin: 0.5rem;

  &::before {
    content: "";
    display: block;
    width: 36px;
    height: 36px;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23334155' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='11' cy='11' r='8'/%3E%3Cline x1='21' y1='21' x2='16.65' y2='16.65'/%3E%3C/svg%3E") center/contain no-repeat;
    opacity: 0.5;
    margin-bottom: 0.25rem;
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-rows: auto auto 1fr auto;
  overflow: hidden;
  background: var(--bg-sidebar);
  border-right: 1px solid var(--border-sidebar);

  .brand {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1.125rem 1.25rem;
    border-bottom: 1px solid var(--border-brand);
  }

  .search-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    padding: 0.75rem 1.25rem;
    border-bottom: 1px solid var(--border-search);
    background: var(--bg-search-wrapper);
    /* wrapper height is driven purely by the input's fixed height + padding */
  }

  .contacts {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    overflow-y: auto;
    padding: 0.875rem 1.25rem;

    &::-webkit-scrollbar { width: 3px; }
    &::-webkit-scrollbar-thumb {
      background: var(--scrollbar-thumb);
      border-radius: 3px;
    }

    .contact {
      background: var(--bg-contact);
      min-height: 60px;
      cursor: pointer;
      border-radius: 10px;
      padding: 0.625rem 0.875rem;
      display: flex;
      gap: 0.875rem;
      align-items: center;
      transition: all 0.2s ease;
      border: 1px solid transparent;

      &:hover {
        background: var(--bg-contact-hover);
        border-color: var(--border-contact-hover);
        transform: translateX(2px);
      }

      .avatar {
        position: relative;
        flex-shrink: 0;
        img {
          height: 40px;
          width: 40px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid var(--border-avatar);
        }
      }

      .username {
        h3 {
          color: var(--text-contact);
          font-size: 0.9rem;
          font-weight: 600;
        }
        p {
          color: var(--text-contact-sub);
          font-size: 0.72rem;
          margin-top: 2px;
        }
      }
    }

    .selected {
      background: var(--bg-contact-selected) !important;
      border-color: var(--border-contact-sel) !important;
      .username h3 { color: var(--text-selected-contact) !important; }
    }
  }

  .current-user {
    background: var(--bg-sidebar-footer);
    border-top: 1px solid var(--border-footer);
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.875rem 1.125rem;
    transition: background 0.2s ease;
    cursor: default;

    &:hover { background: var(--bg-sidebar-footer-hover); }

    .avatar-wrap {
      position: relative;
      flex-shrink: 0;
      img {
        display: block;
        height: 36px;
        width: 36px;
        border-radius: 50%;
        object-fit: cover;
        border: 1.5px solid var(--border-avatar-hero);
      }
      .status-dot {
        position: absolute;
        bottom: 1px;
        right: 1px;
        width: 8px;
        height: 8px;
        background: #4ade80;
        border-radius: 50%;
        border: 1.5px solid var(--bg-sidebar-footer);
        box-shadow: 0 0 0 1px rgba(74, 222, 128, 0.25);
      }
    }

    .user-info {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 0.15rem;
    }

    .username {
      color: var(--text-user-name);
      font-size: 0.875rem;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      letter-spacing: -0.1px;
    }

    .status-label {
      font-size: 0.7rem;
      color: var(--text-user-status);
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 0.3rem;

      &::before {
        content: "";
        display: inline-block;
        width: 5px;
        height: 5px;
        background: #4ade80;
        border-radius: 50%;
        box-shadow: 0 0 4px rgba(74, 222, 128, 0.5);
        animation: blink 2.5s ease-in-out infinite;
      }

      @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.45; }
      }
    }

    @media screen and (min-width: 720px) and (max-width: 1080px) {
      padding: 0.75rem 0.875rem;
      .username { font-size: 0.8rem; }
    }

    .logout-btn {
      margin-left: auto;
      flex-shrink: 0;
    }
  }
`;
