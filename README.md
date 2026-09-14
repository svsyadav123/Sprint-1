# ZeroMind

ZeroMind is a full-stack web application for creating and chatting with personalized AI assistants. Users can define an AI profile, save it to MongoDB, and use authenticated conversations backed by OpenRouter's free model router.

## Features

- User signup, login, logout, and JWT-protected pages
- Create, edit, and delete personalized AI profiles
- Maximum of three AIs per user, enforced by the backend
- Authenticated chat with OpenRouter FREE
- AI profile context including name, type, purpose, personality, behavior, and learning topics
- MongoDB conversation and message history
- New Chat, recent conversations, history loading, and conversation deletion
- Text, voice-to-text input, and image upload wiring
- Low, Medium, and High response-detail preferences
- Light, Dark, and Samaze themes
- Responsive React and Tailwind interface

Learning topics are used as personalization context only. ZeroMind does not claim that an AI autonomously learns from the internet.

## Technology Stack

- Frontend: React, React Router, Vite, Tailwind CSS
- Backend: Node.js, Express
- Authentication and users: MySQL, bcryptjs, JSON Web Tokens
- AI profiles, conversations, and messages: MongoDB with Mongoose
- AI provider: OpenRouter FREE through its OpenAI-compatible API

## Architecture

```text
React Workspace
    |
    v
Node.js + Express API
    |              \
    v               v
MySQL auth     MongoDB application data
                     |
                     v
              OpenRouter FREE
```

The browser sends authenticated requests to the backend. The backend verifies the JWT and resource ownership, loads the selected AI profile and conversation history, calls OpenRouter, stores both messages in MongoDB, and returns the response to React.

## Project Structure

```text
ZeroMind/
├── backend/
│   ├── config/
│   ├── database/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── .env.example
│   ├── package.json
│   ├── server.js
│   └── .env                  # local only, ignored by Git
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── ThemeContext.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── .gitignore
├── README.md
├── ZEROMIND_CONTEXT.md
└── ZeroMind_data.md
```

## Prerequisites

- Node.js 18 or newer
- MySQL running locally or on an accessible server
- MongoDB running locally or on an accessible server
- An OpenRouter API key

## Backend Setup

From `backend/`:

```powershell
npm install
Copy-Item .env.example .env
```

Edit `.env` with your local MySQL credentials, MongoDB URI, a strong JWT secret, and OpenRouter key. Never commit `.env`.

## MySQL Setup

Before running `backend/database/setup.sql`, replace its `your_mysql_password` placeholders with a local password and use the same value for `MYSQL_PASSWORD` in `backend/.env`. Run the script as a MySQL administrator to create the database and application user. Then run `backend/database/schema.sql` against the `zeromind` database to create the `users` table.

The backend uses MySQL for user accounts and password hashes. It does not store chat messages in MySQL.

## MongoDB Setup

Start MongoDB and set `MONGO_URI` in `backend/.env`. Mongoose creates the AI, conversation, and message collections as they are used.

## Environment Variables

Use `backend/.env.example` as the template:

- `PORT`: backend port, normally `5000`
- `CLIENT_URL`: frontend origin, normally `http://localhost:5173`
- `MYSQL_HOST`, `MYSQL_PORT`, `MYSQL_USER`, `MYSQL_PASSWORD`, `MYSQL_DATABASE`: MySQL connection settings
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: strong private signing secret
- `JWT_EXPIRES_IN`: JWT lifetime, normally `7d`
- `OPENROUTER_API_KEY`: private OpenRouter key
- `OPENROUTER_MODEL`: configured provider model, currently `openrouter/free`

The OpenRouter key and JWT secret must remain server-side. Do not use `VITE_OPENROUTER_API_KEY` or place credentials in frontend files.

## Run Locally

Start the backend in one terminal:

```powershell
npm --prefix backend start
```

Start the frontend in another terminal:

```powershell
npm --prefix frontend run dev
```

Open `http://localhost:5173` in a browser.

For frontend API configuration, `VITE_API_URL` may be set to an API base URL. When omitted, the frontend uses `http://localhost:5000/api`.

## Main API Functionality

- `POST /api/auth/signup`: create a user
- `POST /api/auth/login`: issue a JWT
- `GET /api/auth/me`: load the authenticated user
- `GET /api/ais`: list the current user's AIs
- `POST /api/ais`: create an AI profile
- `PUT /api/ais/:id`: update an owned AI profile
- `DELETE /api/ais/:id`: delete an AI and its owned conversations/messages
- `POST /api/chat/:aiId/conversations`: create a conversation
- `GET /api/chat/:aiId`: list conversations or load one with `conversationId`
- `POST /api/chat/:aiId`: send a message and receive an AI response
- `DELETE /api/chat/:aiId/:conversationId`: delete an owned conversation

Protected endpoints require `Authorization: Bearer <token>`. The backend derives the user identity from the JWT and does not trust a frontend-supplied user ID.

## AI Provider

ZeroMind uses OpenRouter FREE with the OpenAI-compatible Chat Completions API. Low, Medium, and High are response-detail preferences only; they do not claim to select three separate AI models.

## Limitations

- OpenRouter FREE availability and rate limits can vary.
- Conversation history is persisted, but there is no separate long-term memory system.
- Voice input depends on browser speech-recognition support.
- Image support depends on the selected free-router model accepting image input.
- This project is an educational/demo application, not a production security or reliability claim.
- Billing, payments, streaming responses, and model training are not implemented.

## Future Improvements

- Add automated backend and frontend tests.
- Add streaming responses with cancellation and retry handling.
- Add configurable usage limits and provider fallback behavior.
- Add stronger production deployment configuration and observability.
- Add a dedicated long-term memory feature with clear user controls.
