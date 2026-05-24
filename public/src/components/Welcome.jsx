import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";

export default function Welcome() {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const load = async () => {
      const data = await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
      setUserName(data.username);
    };
    load();
  }, []);

  return (
    <Container>
      <GlowRing />
      <IllustrationWrapper>
        <img src={Robot} alt="CampusConnect mascot" />
      </IllustrationWrapper>
      <TextContent>
        <WelcomeTitle>
          Welcome to <GradientSpan>CampusConnect</GradientSpan>
        </WelcomeTitle>
        <UserGreeting>
          Hi there, <UserName>{userName}!</UserName>
        </UserGreeting>
        <Subtitle>Connect, communicate, and collaborate in real time.</Subtitle>
        <HintText>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          Select a contact from the sidebar to start a conversation
        </HintText>
      </TextContent>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  gap: 1.5rem;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  background: var(--bg-chat);
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at center, var(--orb1-color) 0%, transparent 70%);
    pointer-events: none;
  }
`;

const GlowRing = styled.div`
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  border: 1px solid var(--border-input);
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  animation: pulse-ring 4s ease-in-out infinite;
  &::after {
    content: "";
    position: absolute;
    inset: 30px;
    border-radius: 50%;
    border: 1px solid var(--border-brand);
  }
  @keyframes pulse-ring {
    0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
    50%       { transform: translate(-50%, -50%) scale(1.05); opacity: 1; }
  }
`;

const IllustrationWrapper = styled.div`
  position: relative;
  z-index: 1;
  img {
    height: 14rem;
    filter: drop-shadow(0 10px 30px rgba(6, 182, 212, 0.2));
    animation: float 4s ease-in-out infinite;
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-12px); }
  }
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  text-align: center;
  position: relative;
  z-index: 1;
`;

const WelcomeTitle = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  color: var(--text-primary);
  letter-spacing: -0.5px;
  line-height: 1.2;
`;

const GradientSpan = styled.span`
  background: linear-gradient(135deg, #60a5fa, #22d3ee);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const UserGreeting = styled.h2`
  font-size: 1.15rem;
  font-weight: 500;
  color: var(--text-secondary);
`;

const UserName = styled.span`
  color: #22d3ee;
  font-weight: 700;
`;

const Subtitle = styled.p`
  font-size: 0.95rem;
  color: var(--text-muted);
  max-width: 320px;
  line-height: 1.6;
`;

const HintText = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-top: 0.5rem;
  padding: 0.625rem 1.25rem;
  border: 1px solid var(--border-input);
  border-radius: 100px;
  background: var(--bg-contact);
  svg { flex-shrink: 0; color: #2563eb; }
`;
