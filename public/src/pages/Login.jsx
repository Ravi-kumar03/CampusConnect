import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", password: "" });
  const toastOptions = { position: "bottom-right", autoClose: 8000, pauseOnHover: true, draggable: true, theme: "dark" };

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) navigate("/");
  }, []);

  const handleChange = (event) => setValues({ ...values, [event.target.name]: event.target.value });

  const validateForm = () => {
    const { username, password } = values;
    if (!username) { toast.error("Username and Password is required.", toastOptions); return false; }
    if (!password) { toast.error("Username and Password is required.", toastOptions); return false; }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, { username, password });
      if (data.status === false) toast.error(data.msg, toastOptions);
      if (data.status === true) {
        localStorage.setItem(process.env.REACT_APP_LOCALHOST_KEY, JSON.stringify(data.user));
        navigate("/");
      }
    }
  };

  return (
    <>
      <PageWrapper>
        <BackgroundOrbs />
        <Card>
          <BrandHeader>
            <LogoIcon>
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="lg1" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#3b82f6" /><stop offset="1" stopColor="#06b6d4" />
                  </linearGradient>
                  <linearGradient id="lgbg1" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#1e3a8a" /><stop offset="1" stopColor="#0e7490" />
                  </linearGradient>
                </defs>
                <rect width="40" height="40" rx="10" fill="url(#lgbg1)" />
                <polygon points="20,7 33,12.5 20,18 7,12.5" fill="url(#lg1)" />
                <path d="M10 14 L10 22 C10 26.5 14.5 29 20 29 C25.5 29 30 26.5 30 22 L30 14"
                  stroke="url(#lg1)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <line x1="20" y1="18" x2="20" y2="24" stroke="url(#lg1)" strokeWidth="2.2" strokeLinecap="round" />
                <circle cx="20" cy="25.5" r="1.8" fill="#22d3ee" />
                <circle cx="15" cy="34.5" r="1.7" fill="#60a5fa" />
                <circle cx="20" cy="34.5" r="1.7" fill="#22d3ee" />
                <circle cx="25" cy="34.5" r="1.7" fill="#60a5fa" />
              </svg>
            </LogoIcon>
            <BrandName>CampusConnect</BrandName>
          </BrandHeader>

          <Tagline>Welcome back! Sign in to your account.</Tagline>

          <form onSubmit={handleSubmit}>
            <InputGroup>
              <InputLabel>Username</InputLabel>
              <StyledInput type="text" placeholder="Enter your username" name="username" onChange={handleChange} />
            </InputGroup>
            <InputGroup>
              <InputLabel>Password</InputLabel>
              <StyledInput type="password" placeholder="Enter your password" name="password" onChange={handleChange} />
            </InputGroup>
            <SubmitButton type="submit">
              <span>Sign In</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </SubmitButton>
            <FooterText>Don't have an account? <Link to="/register">Create one</Link></FooterText>
          </form>
        </Card>
      </PageWrapper>
      <ToastContainer />
    </>
  );
}

const PageWrapper = styled.div`
  height: 100vh; width: 100vw;
  display: flex; justify-content: center; align-items: center;
  background: var(--bg-app);
  position: relative; overflow: hidden;
`;

const BackgroundOrbs = styled.div`
  position: absolute; inset: 0; pointer-events: none;
  &::before {
    content: ""; position: absolute;
    top: -20%; left: -10%; width: 600px; height: 600px;
    background: radial-gradient(circle, var(--orb1-color) 0%, transparent 70%);
    border-radius: 50%; animation: float1 8s ease-in-out infinite;
  }
  &::after {
    content: ""; position: absolute;
    bottom: -20%; right: -10%; width: 500px; height: 500px;
    background: radial-gradient(circle, var(--orb2-color) 0%, transparent 70%);
    border-radius: 50%; animation: float2 10s ease-in-out infinite;
  }
  @keyframes float1 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(30px,-20px) scale(1.05); } }
  @keyframes float2 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-20px,30px) scale(1.08); } }
`;

const Card = styled.div`
  background: var(--bg-card);
  backdrop-filter: blur(20px);
  border: 1px solid var(--border-card);
  border-radius: 24px;
  padding: 3rem 3.5rem;
  width: 100%; max-width: 440px;
  box-shadow: var(--shadow-card);
  position: relative; z-index: 1;
  form { display: flex; flex-direction: column; gap: 1.5rem; margin-top: 2rem; }
  @media (max-width: 480px) { padding: 2rem 1.5rem; margin: 1rem; }
`;

const BrandHeader = styled.div`
  display: flex; align-items: center; gap: 0.875rem; margin-bottom: 0.5rem;
`;

const LogoIcon = styled.div`
  width: 44px; height: 44px; flex-shrink: 0;
  svg { width: 100%; height: 100%; filter: drop-shadow(0 0 8px rgba(6,182,212,0.4)); }
`;

const BrandName = styled.h1`
  font-size: 1.75rem; font-weight: 800;
  background: linear-gradient(135deg, #60a5fa, #22d3ee);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  letter-spacing: -0.5px;
`;

const Tagline = styled.p`
  color: var(--text-tagline); font-size: 0.9rem; margin-top: 0.25rem;
`;

const InputGroup = styled.div`
  display: flex; flex-direction: column; gap: 0.5rem;
`;

const InputLabel = styled.label`
  font-size: 0.8rem; font-weight: 600; color: var(--text-label);
  text-transform: uppercase; letter-spacing: 0.5px;
`;

const StyledInput = styled.input`
  background: var(--bg-form-input);
  border: 1.5px solid var(--border-input);
  border-radius: 10px; padding: 0.875rem 1.125rem;
  color: var(--text-primary); font-size: 0.95rem; font-family: "Inter", sans-serif;
  width: 100%;
  &::placeholder { color: var(--text-placeholder); }
  &:focus {
    outline: none;
    border-color: var(--border-input-focus);
    background: var(--bg-form-input-focus);
    box-shadow: var(--shadow-ring);
  }
`;

const SubmitButton = styled.button`
  display: flex; align-items: center; justify-content: center; gap: 0.625rem;
  background: linear-gradient(135deg, #2563eb, #06b6d4);
  color: white; border: none; border-radius: 10px;
  padding: 0.9rem 1.5rem; font-size: 1rem; font-weight: 700;
  font-family: "Inter", sans-serif; cursor: pointer;
  margin-top: 0.5rem; box-shadow: 0 4px 15px rgba(37,99,235,0.35);
  svg { transition: transform 0.3s ease; }
  &:hover {
    background: linear-gradient(135deg, #1d4ed8, #0891b2);
    box-shadow: 0 6px 20px rgba(37,99,235,0.5);
    transform: translateY(-1px);
    svg { transform: translateX(3px); }
  }
  &:active { transform: translateY(0); }
`;

const FooterText = styled.span`
  text-align: center; color: var(--text-footer-span); font-size: 0.875rem;
  a { color: var(--text-link); text-decoration: none; font-weight: 600;
    &:hover { text-decoration: underline; } }
`;
