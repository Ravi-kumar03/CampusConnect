import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { setAvatarRoute } from "../utils/APIRoutes";
import multiavatar from "@multiavatar/multiavatar/esm";

export default function SetAvatar() {
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const toastOptions = { position: "bottom-right", autoClose: 8000, pauseOnHover: true, draggable: true, theme: "dark" };

  useEffect(() => {
    const user = localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY);
    if (!user) navigate("/login");
  }, [navigate]);

  useEffect(() => {
    const generateAvatars = () => {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const randomName = Math.random().toString(36).substring(2, 10);
        const svgCode = multiavatar(randomName);
        const encoded = btoa(unescape(encodeURIComponent(svgCode)));
        data.push(encoded);
      }
      setAvatars(data);
      setIsLoading(false);
    };
    generateAvatars();
  }, []);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) { toast.error("Please select an avatar", toastOptions); return; }
    const user = await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
    const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, { image: avatars[selectedAvatar] });
    if (data.isSet) {
      user.isAvatarImageSet = true;
      user.avatarImage = data.image;
      localStorage.setItem(process.env.REACT_APP_LOCALHOST_KEY, JSON.stringify(user));
      navigate("/");
    } else {
      toast.error("Error setting avatar. Please try again.", toastOptions);
    }
  };

  return (
    <>
      {isLoading ? (
        <Container>
          <LoaderWrapper>
            <img src={loader} alt="Loading avatars..." className="loader" />
            <p>Generating your avatars...</p>
          </LoaderWrapper>
        </Container>
      ) : (
        <Container>
          <BackgroundOrbs />
          <Card>
            <BrandHeader>
              <LogoIcon>
                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="lg3" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#3b82f6" /><stop offset="1" stopColor="#06b6d4" />
                    </linearGradient>
                    <linearGradient id="lgbg3" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#1e3a8a" /><stop offset="1" stopColor="#0e7490" />
                    </linearGradient>
                  </defs>
                  <rect width="40" height="40" rx="10" fill="url(#lgbg3)" />
                  <polygon points="20,7 33,12.5 20,18 7,12.5" fill="url(#lg3)" />
                  <path d="M10 14 L10 22 C10 26.5 14.5 29 20 29 C25.5 29 30 26.5 30 22 L30 14"
                    stroke="url(#lg3)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  <line x1="20" y1="18" x2="20" y2="24" stroke="url(#lg3)" strokeWidth="2.2" strokeLinecap="round" />
                  <circle cx="20" cy="25.5" r="1.8" fill="#22d3ee" />
                  <circle cx="15" cy="34.5" r="1.7" fill="#60a5fa" />
                  <circle cx="20" cy="34.5" r="1.7" fill="#22d3ee" />
                  <circle cx="25" cy="34.5" r="1.7" fill="#60a5fa" />
                </svg>
              </LogoIcon>
              <BrandName>CampusConnect</BrandName>
            </BrandHeader>

            <div className="title-container">
              <h1>Choose Your Avatar</h1>
              <p>Pick an avatar that represents you on CampusConnect</p>
            </div>

            <div className="avatars">
              {avatars.map((avatar, index) => (
                <div
                  key={index}
                  className={`avatar ${selectedAvatar === index ? "selected" : ""}`}
                  onClick={() => setSelectedAvatar(index)}
                >
                  <img src={`data:image/svg+xml;base64,${avatar}`} alt={`avatar-${index}`} />
                  {selectedAvatar === index && (
                    <CheckMark>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </CheckMark>
                  )}
                </div>
              ))}
            </div>

            <button onClick={setProfilePicture} className="submit-btn">
              <span>Set as Profile Picture</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </button>
          </Card>
          <ToastContainer />
        </Container>
      )}
    </>
  );
}

const CheckMark = styled.div`
  position: absolute; bottom: -4px; right: -4px;
  width: 22px; height: 22px;
  background: linear-gradient(135deg, #2563eb, #06b6d4);
  border-radius: 50%; display: flex; align-items: center; justify-content: center;
  border: 2px solid var(--bg-card);
`;

const BackgroundOrbs = styled.div`
  position: absolute; inset: 0; pointer-events: none;
  &::before {
    content: ""; position: absolute;
    top: -20%; left: -10%; width: 500px; height: 500px;
    background: radial-gradient(circle, var(--orb1-color) 0%, transparent 70%);
    border-radius: 50%;
  }
  &::after {
    content: ""; position: absolute;
    bottom: -20%; right: -10%; width: 400px; height: 400px;
    background: radial-gradient(circle, var(--orb2-color) 0%, transparent 70%);
    border-radius: 50%;
  }
`;

const LoaderWrapper = styled.div`
  display: flex; flex-direction: column; align-items: center; gap: 1rem;
  .loader { width: 80px; height: 80px; object-fit: contain; }
  p { color: var(--text-muted); font-size: 0.875rem; }
`;

const Card = styled.div`
  background: var(--bg-card);
  backdrop-filter: blur(20px);
  border: 1px solid var(--border-card);
  border-radius: 24px; padding: 2.5rem 3rem;
  width: 100%; max-width: 520px;
  position: relative; z-index: 1;
  box-shadow: var(--shadow-card);

  .title-container {
    margin: 1.5rem 0 2rem; text-align: center;
    h1 { color: var(--text-primary); font-size: 1.5rem; font-weight: 800; margin-bottom: 0.375rem; }
    p { color: var(--text-muted); font-size: 0.875rem; }
  }

  .avatars {
    display: flex; gap: 1.25rem; justify-content: center; flex-wrap: wrap; margin-bottom: 2rem;
    .avatar {
      position: relative;
      border: 2.5px solid var(--border-input);
      padding: 0.5rem; border-radius: 16px;
      display: flex; justify-content: center; align-items: center;
      transition: all 0.25s ease; cursor: pointer;
      background: var(--bg-form-input);
      img { height: 80px; width: 80px; border-radius: 10px; transition: transform 0.25s ease; }
      &:hover {
        border-color: var(--border-input-focus);
        background: var(--bg-contact-hover);
        transform: translateY(-3px);
        box-shadow: var(--shadow-ring);
        img { transform: scale(1.05); }
      }
    }
    .selected {
      border-color: #2563eb !important;
      background: var(--bg-contact-selected) !important;
      box-shadow: 0 0 0 3px rgba(6,182,212,0.15), 0 8px 20px rgba(37,99,235,0.25) !important;
      transform: translateY(-3px) !important;
    }
  }

  .submit-btn {
    display: flex; align-items: center; justify-content: center; gap: 0.625rem;
    width: 100%;
    background: linear-gradient(135deg, #2563eb, #06b6d4);
    color: white; padding: 0.9rem 1.5rem; border: none;
    font-weight: 700; font-family: "Inter", sans-serif;
    cursor: pointer; border-radius: 10px; font-size: 1rem;
    box-shadow: 0 4px 15px rgba(37,99,235,0.35);
    svg { transition: transform 0.3s ease; }
    &:hover {
      background: linear-gradient(135deg, #1d4ed8, #0891b2);
      box-shadow: 0 6px 20px rgba(37,99,235,0.5);
      transform: translateY(-1px);
      svg { transform: scale(1.1); }
    }
    &:active { transform: translateY(0); }
  }
`;

const BrandHeader = styled.div`
  display: flex; align-items: center; gap: 0.75rem;
`;

const LogoIcon = styled.div`
  width: 44px; height: 44px; flex-shrink: 0;
  svg { width: 100%; height: 100%; filter: drop-shadow(0 0 8px rgba(6,182,212,0.4)); }
`;

const BrandName = styled.h2`
  font-size: 1.4rem; font-weight: 800;
  background: linear-gradient(135deg, #60a5fa, #22d3ee);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  letter-spacing: -0.3px;
`;

const Container = styled.div`
  display: flex; justify-content: center; align-items: center; flex-direction: column;
  background: var(--bg-app);
  height: 100vh; width: 100vw;
  position: relative; overflow: hidden;
`;
