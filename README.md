# CampusConnect

> **A real-time peer communication platform for students within the same institution.**

CampusConnect is a full-stack MERN application that enables students to discover and chat with peers from their own institution in real time. Registration with an institutional email automatically scopes peer discovery — users only see colleagues from the same domain (e.g. `@iiits.in`).

---

## ✨ Features

- 🔐 **Secure Registration & Login** — bcrypt-hashed passwords, JWT-ready architecture
- 🏫 **Institution-Scoped Peer Discovery** — peers filtered by email domain automatically
- 💬 **Real-Time Chat** — bidirectional messaging powered by Socket.io
- 🎭 **Avatar Selection** — generated via Multiavatar on account setup
- 🌗 **Dark / Light Mode** — persisted to localStorage, system-native feel
- 🔍 **Peer Search** — live filter within sidebar contacts list
- 🚪 **Logout** — clean session termination with server-side socket cleanup
- 📱 **Responsive Layout** — works on desktop and tablet

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 17, styled-components, Socket.io-client |
| Backend | Node.js, Express 4, Socket.io |
| Database | MongoDB (Mongoose ODM) |
| Auth | bcrypt password hashing |
| Avatars | @multiavatar/multiavatar |
| Notifications | react-toastify |
| Routing | react-router-dom v6 |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js ≥ 16](https://nodejs.org/en/download)
- [MongoDB](https://www.mongodb.com/docs/manual/administration/install-community/) (local) **or** a [MongoDB Atlas](https://cloud.mongodb.com) connection string

### 1 — Clone the repository

```bash
git clone https://github.com/<your-username>/CampusConnect
cd CampusConnect
```

### 2 — Configure environment files

```bash
# Backend
cp server/.env.example server/.env
# Edit server/.env and fill in your real MONGO_URL

# Frontend (default value is fine for local dev)
cp public/.env.example public/.env
```

### 3 — Install dependencies

```bash
# Backend
cd server && npm install && cd ..

# Frontend
cd public && npm install && cd ..
```

### 4 — Start development servers

Open **two terminals**:

```bash
# Terminal 1 — Backend (http://localhost:5000)
cd server
npm start

# Terminal 2 — Frontend (http://localhost:3000)
cd public
npm start
```

### 5 — Open the app

Navigate to **http://localhost:3000** in your browser.

---

## 🐳 Docker (Optional)

```bash
# Build and start both services
docker compose build --no-cache
docker compose up
```

Then open **http://localhost:3000**.

---

## 🔒 Environment Variables

### `server/.env`

| Variable | Description | Example |
|---|---|---|
| `PORT` | Port the Express server listens on | `5000` |
| `MONGO_URL` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/` |

### `public/.env`

| Variable | Description | Default |
|---|---|---|
| `REACT_APP_LOCALHOST_KEY` | localStorage key for current user session | `chat-app-current-user` |

> ⚠️ **Never commit `.env` files.** Use the `.env.example` templates above.

---

## 🗺 Project Structure

```
CampusConnect/
├── public/                  # React frontend
│   ├── src/
│   │   ├── components/      # ChatContainer, Contacts, ChatInput, Welcome, Logout, ThemeToggle, SetAvatar
│   │   ├── pages/           # Chat, Login, Register
│   │   ├── utils/           # API route constants
│   │   ├── assets/          # logo.svg, robot.gif, loader.gif
│   │   ├── ThemeContext.jsx  # Dark/light mode provider
│   │   ├── App.js
│   │   └── index.css        # CSS custom properties (theme tokens)
│   └── public/              # Static files: index.html, manifest.json, favicons
├── server/                  # Express + Socket.io backend
│   ├── controllers/         # userController.js, messageController.js
│   ├── models/              # userModel.js, messageModel.js
│   ├── routes/              # auth.js, messages.js
│   └── index.js             # Entry point
├── images/                  # README screenshots
├── .gitignore
└── README.md
```

---

## 🔮 Future Improvements

- [ ] Group chats / study rooms
- [ ] File and image sharing in chat
- [ ] Read receipts and typing indicators
- [ ] Push notifications (PWA)
- [ ] Email verification on registration
- [ ] Rate limiting and brute-force protection
- [ ] Admin dashboard for institution management
- [ ] Mobile app (React Native)

---

## ☁️ Deployment

### Frontend — Vercel / Netlify

```bash
cd public
npm run build
# Upload the build/ folder to Vercel or Netlify
```

Set environment variable `REACT_APP_LOCALHOST_KEY=chat-app-current-user` in the hosting dashboard.

### Backend — Railway / Render / Heroku

Deploy the `server/` directory. Set `PORT` and `MONGO_URL` as environment variables in the hosting platform.

Make sure the frontend's API base URL points to the deployed backend (update `public/src/utils/APIRoutes.js`).

---

## 📄 License

This project is built for academic demonstration purposes.

---

## 🙏 Acknowledgements

CampusConnect was inspired by real-time chat application tutorials and open-source learning resources created by [Koolkishan](https://github.com/koolkishan) and the broader developer community. The foundational MERN stack architecture and Socket.io integration patterns were informed by community-driven examples, which were subsequently extended and transformed into this institution-scoped collaboration platform.

---

*Built with ❤️ using the MERN stack.*