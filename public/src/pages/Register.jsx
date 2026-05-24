import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";

export default function Register() {
  const navigate = useNavigate();
  const toastOptions = { position: "bottom-right", autoClose: 8000, pauseOnHover: true, draggable: true, theme: "dark" };
  const [values, setValues] = useState({ username: "", email: "", password: "", confirmPassword: "" });

  // Derive institution from email domain live
  const institution = values.email.includes("@")
    ? values.email.split("@")[1].toLowerCase().trim()
    : "";

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) navigate("/");
  }, []);

  const handleChange = (event) => setValues({ ...values, [event.target.name]: event.target.value });

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) { toast.error("Password and confirm password should be same.", toastOptions); return false; }
    if (username.length < 3) { toast.error("Username should be greater than 3 characters.", toastOptions); return false; }
    if (password.length < 8) { toast.error("Password should be equal or greater than 8 characters.", toastOptions); return false; }
    if (email === "") { toast.error("Email is required.", toastOptions); return false; }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { email, username, password } = values;
      const { data } = await axios.post(registerRoute, { username, email, password });
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
                  <linearGradient id="lg2" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#3b82f6" /><stop offset="1" stopColor="#06b6d4" />
                  </linearGradient>
                  <linearGradient id="lgbg2" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#1e3a8a" /><stop offset="1" stopColor="#0e7490" />
                  </linearGradient>
                </defs>
                <rect width="40" height="40" rx="10" fill="url(#lgbg2)" />
                <polygon points="20,7 33,12.5 20,18 7,12.5" fill="url(#lg2)" />
                <path d="M10 14 L10 22 C10 26.5 14.5 29 20 29 C25.5 29 30 26.5 30 22 L30 14"
                  stroke="url(#lg2)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <line x1="20" y1="18" x2="20" y2="24" stroke="url(#lg2)" strokeWidth="2.2" strokeLinecap="round" />
                <circle cx="20" cy="25.5" r="1.8" fill="#22d3ee" />
                <circle cx="15" cy="34.5" r="1.7" fill="#60a5fa" />
                <circle cx="20" cy="34.5" r="1.7" fill="#22d3ee" />
                <circle cx="25" cy="34.5" r="1.7" fill="#60a5fa" />
              </svg>
            </LogoIcon>
            <BrandName>CampusConnect</BrandName>
          </BrandHeader>

          <Tagline>Join the campus community. Create your account.</Tagline>

          <form onSubmit={handleSubmit}>
            <TwoColumn>
              <InputGroup>
                <InputLabel>Username</InputLabel>
                <StyledInput type="text" placeholder="Choose a username" name="username" onChange={handleChange} />
              </InputGroup>
              <InputGroup>
                <InputLabel>Email</InputLabel>
                <StyledInput type="email" placeholder="Your email address" name="email" onChange={handleChange} />
              </InputGroup>
            </TwoColumn>
            {institution && (
              <InstitutionBadge>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                Institution: <strong>{institution}</strong>
              </InstitutionBadge>
            )}
            <InputGroup>
              <InputLabel>Password</InputLabel>
              <StyledInput type="password" placeholder="Create a strong password" name="password" onChange={handleChange} />
            </InputGroup>
            <InputGroup>
              <InputLabel>Confirm Password</InputLabel>
              <StyledInput type="password" placeholder="Re-enter your password" name="confirmPassword" onChange={handleChange} />
            </InputGroup>
            <SubmitButton type="submit">
              <span>Create Account</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" /><line x1="19" y1="8" x2="19" y2="14" /><line x1="22" y1="11" x2="16" y2="11" />
              </svg>
            </SubmitButton>
            <FooterText>Already have an account? <Link to="/login">Sign in</Link></FooterText>
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
    top: -20%; right: -10%; width: 600px; height: 600px;
    background: radial-gradient(circle, var(--orb1-color) 0%, transparent 70%);
    border-radius: 50%; animation: float1 8s ease-in-out infinite;
  }
  &::after {
    content: ""; position: absolute;
    bottom: -20%; left: -10%; width: 500px; height: 500px;
    background: radial-gradient(circle, var(--orb2-color) 0%, transparent 70%);
    border-radius: 50%; animation: float2 10s ease-in-out infinite;
  }
  @keyframes float1 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-30px,20px) scale(1.05); } }
  @keyframes float2 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(20px,-30px) scale(1.08); } }
`;

const Card = styled.div`
  background: var(--bg-card);
  backdrop-filter: blur(20px);
  border: 1px solid var(--border-card);
  border-radius: 24px; padding: 2.5rem 3rem;
  width: 100%; max-width: 500px;
  box-shadow: var(--shadow-card);
  position: relative; z-index: 1;
  form { display: flex; flex-direction: column; gap: 1.25rem; margin-top: 1.75rem; }
  @media (max-width: 540px) { padding: 2rem 1.5rem; margin: 1rem; }
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

const TwoColumn = styled.div`
  display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;
  @media (max-width: 480px) { grid-template-columns: 1fr; }
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
  color: var(--text-primary); font-size: 0.95rem; font-family: "Inter", sans-serif; width: 100%;
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
    svg { transform: scale(1.1); }
  }
  &:active { transform: translateY(0); }
`;

const FooterText = styled.span`
  text-align: center; color: var(--text-footer-span); font-size: 0.875rem;
  a { color: var(--text-link); text-decoration: none; font-weight: 600;
    &:hover { text-decoration: underline; } }
`;

const InstitutionBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.78rem;
  color: var(--text-secondary);
  background: var(--bg-contact-hover);
  border: 1px solid var(--border-input);
  border-radius: 8px;
  padding: 0.5rem 0.875rem;
  animation: fadeIn 0.2s ease;

  svg { flex-shrink: 0; color: #22d3ee; }

  strong {
    color: #22d3ee;
    font-weight: 700;
    letter-spacing: 0.2px;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-4px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;

