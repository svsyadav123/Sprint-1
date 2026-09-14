# ZeroMind — Complete Project Data & Development Context

> **Purpose of this file:** This document is the single source of truth for the ZeroMind project.  
> Codex working in VS Code should read this file before making project changes.

---

## 1. Project Identity

**Project Name:** ZeroMind  
**Brand / Organization:** Zero Dice  
**Product Title:** ZeroMind — Create Your Own AI

### Main tagline

> Create Your Own AI

### Supporting tagline

> Build, teach and personalize an AI that is truly yours.

### Product concept

ZeroMind is a practical full-stack web application where users can create and personalize their own AI assistants.

A user defines:

- AI name
- AI purpose
- AI personality
- AI behavior

The user can then save, view, manage, edit, delete and chat with the created AI.

ZeroMind is intended to be:

- a college project
- a portfolio project
- a practical full-stack demonstration
- easy to explain during a college presentation
- useful for demonstrating frontend/backend/database skills

It should look like a realistic SaaS product, not a science-fiction or futuristic AGI product.

---

# 2. Main Project Objective

Build a working MVP first.

The project should demonstrate:

- React
- JavaScript
- Tailwind CSS
- Node.js
- Express.js
- MongoDB
- MySQL
- REST APIs
- Authentication
- CRUD operations
- Frontend/backend integration
- Responsive design

### Priority order

1. Working functionality
2. Clean professional UI
3. Responsive design
4. Frontend/backend connection
5. Database functionality
6. Easy-to-understand code
7. Good project structure
8. Extra features only after the core system works

A smaller working project is better than a large broken project.

---

# 3. Important Product Philosophy

ZeroMind should feel like a real small SaaS product.

Do NOT make it look like:

- futuristic AI laboratory
- sci-fi interface
- AGI research platform
- neon cyberpunk website
- overly animated AI dashboard

The concept should remain realistic:

> A platform where users can create and personalize AI assistants based on their own requirements.

Do not claim advanced AI functionality unless it is actually implemented.

---

# 4. Technology Stack

## Frontend

- React
- JavaScript
- Tailwind CSS
- React Router
- Vite

## Backend

- Node.js
- Express.js

## Databases

- MongoDB
- MySQL

## Possible supporting packages

Use packages only when actually needed:

- axios
- mongoose
- bcryptjs
- jsonwebtoken
- cors
- dotenv
- mysql2

Do not install unnecessary dependencies.

---

# 5. Current Project Structure

Current root structure:

```text
ZeroMind/
│
├── ZeroMind_data.md
│
├── frontend/
│   └── src/
│       ├── pages/
│       │   ├── Home.jsx
│       │   ├── Dashboard.jsx
│       │   ├── Login.jsx
│       │   ├── Signup.jsx
│       │   └── Setting.jsx
│       │
│       ├── App.jsx
│       ├── main.jsx
│       └── index.css
│
└── Backend/
```

The backend will eventually become something similar to:

```text
Backend/
├── server.js
├── config/
├── models/
├── routes/
├── controllers/
├── middleware/
├── package.json
└── .env
```

Do not create the complete backend structure until the corresponding functionality is being implemented.

---

# 6. Development Strategy

Build incrementally.

Do NOT generate the entire project at once.

Preferred process:

```text
Inspect existing code
        ↓
Understand current state
        ↓
Plan one small change
        ↓
Implement
        ↓
Run/test
        ↓
Fix errors
        ↓
Confirm result
        ↓
Move to next feature
```

When changing an existing file:

1. Read the current file first.
2. Preserve working code.
3. Make the smallest necessary change.
4. Do not randomly rewrite unrelated code.

---

# 7. Current Development Status

## Completed

- React/Vite setup
- Tailwind CSS setup
- Global CSS fixed
- Home page started
- Navbar completed
- Hero section completed
- Responsive spacing fixed

## Current Home Page Status

```text
Navbar        ✅ COMPLETE
Hero          ✅ COMPLETE
Features      ⏳ NEXT
How It Works  ⏳
CTA           ⏳
Footer        ⏳
```

## Future application work

```text
Home
↓
React Router
↓
Login
↓
Signup
↓
Backend
↓
MongoDB
↓
Authentication
↓
Dashboard
↓
Create AI
↓
AI CRUD
↓
Chat
↓
Profile
↓
Settings
↓
MySQL integration
↓
Testing
```

---

# 8. SPA Architecture

ZeroMind should be a Single Page Application.

Use React Router.

Expected routes:

```text
/                  → Home
/login             → Login
/signup            → Signup
/dashboard         → Dashboard
/create-ai         → Create AI
/ai/:id            → AI Details / Manage AI
/chat/:id          → Chat
/profile           → Profile
/settings          → Settings
```

React Router should handle navigation without unnecessary full-page reloads.

---

# 9. Home Page Structure

Home page:

```text
Home
│
├── Navbar
├── Hero
├── Features
├── How It Works
├── CTA
└── Footer
```

Build one section at a time.

Do not replace the entire Home page with a huge generated component.

---

# 10. Home Page — Navbar

Navbar content:

```text
ZeroMind

Home
Features
How It Works

Login
Sign Up
```

Expected desktop layout:

```text
ZeroMind       Home   Features   How It Works       Login   Sign Up
```

Design:

- subtle bottom border
- centered max-width container
- proper horizontal padding
- clean spacing
- responsive
- simple professional appearance

Useful Tailwind classes:

```text
max-w-6xl
mx-auto
px-6
flex
items-center
justify-between
```

Primary Sign Up button:

```text
black background
white text
```

---

# 11. Home Page — Hero

Hero label:

```text
PERSONAL AI PLATFORM
```

Heading:

```text
Create Your Own AI
```

Description:

```text
Build, teach and personalize an AI that is truly yours.
Give it a name, purpose, personality and behavior.
```

Primary button:

```text
Create Your AI
```

Secondary button:

```text
Learn More
```

Design:

- centered
- clean
- white background
- controlled large heading
- good spacing
- responsive
- no unnecessary animation
- no excessive gradients

Desktop:

```text
PERSONAL AI PLATFORM

Create Your Own AI

Build, teach and personalize an AI that is truly yours.
Give it a name, purpose, personality and behavior.

[ Create Your AI ] [ Learn More ]
```

Mobile buttons should stack vertically.

---

# 12. Home Page — Features

This is the next section to implement.

Use four clean cards.

## Feature 1 — Create Your AI

Description:

> Create a personalized AI with your own name and purpose.

## Feature 2 — Personalize Behavior

Description:

> Define how your AI should behave and respond.

## Feature 3 — Chat With Your AI

Description:

> Interact with your personalized AI through a simple chat experience.

## Feature 4 — Manage Your AI

Description:

> View, edit and manage your created AI from one dashboard.

Card design:

- white background
- light border
- rounded corners
- good padding
- responsive grid
- simple icons if useful

Avoid oversized cards.

---

# 13. Home Page — How It Works

Four steps:

## 01 — Sign Up

> Create your ZeroMind account.

## 02 — Create Your AI

> Choose a name, purpose, personality and behavior.

## 03 — Personalize

> Define how your AI should behave.

## 04 — Chat

> Start interacting with your personalized AI.

Keep the section simple and visually understandable.

---

# 14. Home Page — CTA

Suggested heading:

```text
Build an AI that feels like yours.
```

Supporting text:

```text
Create your personalized AI and start exploring ZeroMind.
```

Button:

```text
Create Your AI
```

Keep it professional and simple.

---

# 15. Home Page — Footer

Suggested content:

```text
ZeroMind

Create and personalize your own AI.

Product
Features
How It Works

Account
Login
Sign Up

© 2026 ZeroMind
```

Do not overbuild the footer.

---

# 16. UI Design System

Overall style:

- minimal
- clean
- modern
- professional
- SaaS-style
- mostly white/black/neutral
- responsive
- consistent

## Colors

Background:

```text
#FFFFFF
```

Primary text:

```text
Gray 900 / near black
```

Secondary text:

```text
Gray 500 / Gray 600
```

Borders:

```text
Gray 200 / Gray 300
```

Primary button:

```text
Black background
White text
```

Secondary button:

```text
White background
Gray border
Black text
```

---

# 17. Typography

Use a clean system font / Inter-style appearance.

Use a clear hierarchy:

```text
text-sm
text-base
text-lg
text-xl
text-2xl
text-4xl
text-5xl
text-6xl
```

Do not make every heading huge.

---

# 18. Tailwind CSS Rules

Tailwind CSS is configured using the Tailwind v4 import style.

Current global CSS should remain minimal.

Expected `frontend/src/index.css`:

```css
@import "tailwindcss";

html {
  scroll-behavior: smooth;
}

body {
  font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  background-color: #ffffff;
  color: #111827;
  min-width: 320px;
}

button,
a {
  font-family: inherit;
}

a {
  text-decoration: none;
}

img {
  max-width: 100%;
  display: block;
}

#root {
  width: 100%;
  min-height: 100vh;
}
```

## IMPORTANT CSS HISTORY

A previous global CSS reset caused Tailwind spacing problems.

This must NOT be added back:

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

It caused utility classes such as:

```text
p-10
px-6
mx-auto
mt-6
```

to behave incorrectly.

The problem was fixed by removing the global reset.

Do not reintroduce a conflicting global reset.

---

# 19. Responsive Design

All important pages must work on:

- desktop
- tablet
- mobile

Use Tailwind responsive utilities:

```text
sm:
md:
lg:
xl:
```

Example:

```jsx
className="flex flex-col sm:flex-row"
```

Do not design only for desktop.

---

# 20. Button Design

Primary:

```text
bg-black
text-white
rounded-lg
font-medium / font-semibold
hover:bg-gray-800
```

Secondary:

```text
bg-white
border
border-gray-300
text-gray-900
rounded-lg
hover:bg-gray-50
```

Use appropriate:

```text
px
py
rounded
transition
```

---

# 21. Card Design

Default card style:

```text
bg-white
border
border-gray-200
rounded-xl
p-6
```

Use shadows carefully.

Do not heavily shadow every card.

---

# 22. Authentication

Flow:

```text
Signup
↓
Create User
↓
Login
↓
Authentication
↓
Dashboard
```

Signup fields:

```text
Name
Email
Password
```

Login fields:

```text
Email
Password
```

Passwords must never be stored in plain text.

Use bcrypt/bcryptjs to hash passwords.

JWT can be used for authentication.

JWT secret must be stored in `.env`.

---

# 23. User Model

Basic MongoDB user document:

```js
{
  name,
  email,
  password,
  createdAt,
  updatedAt
}
```

Rules:

- email should be unique
- password should be hashed
- never expose password unnecessarily in API responses

---

# 24. Dashboard

Dashboard should display:

```text
Welcome back, [User Name]

Your AIs

[ Create New AI ]
```

Each AI card can show:

```text
AI Name
Purpose
Personality
Created Date

Open / Manage
Chat
```

Empty state:

```text
You haven't created an AI yet.

Create your first AI
```

Keep the dashboard clean.

---

# 25. Create AI Page

Form fields:

```text
AI Name
Purpose
Personality
Behavior
```

Example:

```text
AI Name:
StudyMate

Purpose:
Help me understand programming concepts.

Personality:
Friendly, patient and encouraging.

Behavior:
Explain concepts in simple language and provide examples.
```

Button:

```text
Create AI
```

Expected flow:

```text
React Form
↓
POST API
↓
Express
↓
MongoDB
↓
AI Created
↓
Response
↓
Dashboard
```

---

# 26. AI Model

Possible MongoDB AI document:

```js
{
  userId,
  name,
  purpose,
  personality,
  behavior,
  createdAt,
  updatedAt
}
```

Each AI belongs to a user.

Users must only be able to access their own AI data.

---

# 27. AI Details / Manage AI

Route:

```text
/ai/:id
```

Display:

```text
AI Name
Purpose
Personality
Behavior
```

Actions:

```text
Chat
Edit
Delete
```

Edit:

```text
PUT /api/ais/:id
```

Delete:

```text
DELETE /api/ais/:id
```

---

# 28. Chat Page

Route:

```text
/chat/:id
```

Basic layout:

```text
--------------------------------
StudyMate
--------------------------------

User:
Explain React useState.

AI:
useState is a React Hook used
to manage state in functional
components.

--------------------------------
Type a message...       Send
--------------------------------
```

For the initial MVP, chat should be realistic.

Do NOT claim that an external AI model is connected unless it is actually connected.

If a real AI API is added later:

```text
React
↓
Express
↓
AI Provider API
↓
Express
↓
React
```

API keys must stay on the backend.

---

# 29. Profile

Profile page:

```text
Name
Email
Account information
```

Basic editing can be added.

Keep it simple.

---

# 30. Settings

Settings can initially contain:

```text
Profile Settings
Account Settings
Password Settings
Logout
```

Do not overcomplicate.

---

# 31. MongoDB

MongoDB is the primary application database.

Possible collections:

```text
users
ais
conversations
messages
```

Mongoose can be used.

Keep schemas simple.

---

# 32. MySQL

MySQL must be part of the project because it is required by the project stack.

Use MySQL for simple relational/supporting data.

Possible table:

```text
user_activity
```

Fields:

```text
id
user_id
action
created_at
```

Possible actions:

```text
LOGIN
CREATE_AI
UPDATE_AI
DELETE_AI
CHAT
```

MySQL functionality must be real.

Do not create fake code only to claim MySQL is being used.

If MySQL is not implemented yet, clearly mark it as pending.

---

# 33. Backend

Backend technology:

```text
Node.js
Express.js
```

Expected server:

```text
Backend/server.js
```

Responsibilities:

- start Express server
- configure middleware
- connect MongoDB
- connect MySQL
- configure routes
- handle API requests

Potential middleware:

```text
cors
express.json()
dotenv
```

---

# 34. API Structure

Authentication:

```text
POST /api/auth/signup
POST /api/auth/login
```

AI:

```text
GET    /api/ais
POST   /api/ais
GET    /api/ais/:id
PUT    /api/ais/:id
DELETE /api/ais/:id
```

Profile:

```text
GET /api/profile
PUT /api/profile
```

Chat:

```text
POST /api/chat/:id
GET  /api/chat/:id
```

The exact API structure may be adjusted during implementation.

---

# 35. API Response Style

Keep responses simple.

Success:

```js
{
  success: true,
  message: "AI created successfully",
  ai: {}
}
```

Error:

```js
{
  success: false,
  message: "Something went wrong"
}
```

Do not create unnecessarily complicated response structures.

---

# 36. Environment Variables

Backend `.env` may contain:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=zeromind

JWT_SECRET=your_secret
```

Never commit real secrets.

Never put backend secrets inside React frontend code.

---

# 37. Security Basics

Implement basic security:

- hash passwords
- validate input
- authenticate protected routes
- authorize user-owned AI data
- use environment variables
- do not expose secrets
- do not return password hashes unnecessarily

Do not claim advanced security unless implemented.

---

# 38. Frontend / Backend Communication

Expected architecture:

```text
React
↓
Axios / Fetch
↓
Express API
↓
MongoDB / MySQL
↓
Express Response
↓
React UI
```

Keep API configuration organized.

Do not scatter unnecessary API URLs throughout the project.

---

# 39. React Rules

Use functional components.

Use hooks where appropriate:

```text
useState
useEffect
useContext
```

Do not use Redux unless genuinely required.

Do not create unnecessary custom hooks.

---

# 40. JavaScript Rules

Prefer simple modern JavaScript:

```text
const
let
async
await
map
filter
find
```

Use clear names.

Example:

```js
const aiName = "StudyMate";
```

Avoid unnecessary advanced patterns.

---

# 41. Component Rules

Components should have clear responsibilities.

Possible components:

```text
Navbar
Hero
FeatureCard
Footer
```

Do not put the entire application into one giant component.

Also do not create dozens of components unnecessarily.

Create reusable components when they improve clarity.

---

# 42. Code Quality Rules

Code should be:

- readable
- beginner-friendly
- maintainable
- simple
- logically organized

The developer must be able to explain the implementation during a college demonstration.

Prefer understandable code over clever code.

---

# 43. Error Handling

When an error occurs:

1. Read the actual error.
2. Identify the cause.
3. Explain it simply.
4. Fix only what is necessary.
5. Re-test.

Do not randomly rewrite the project.

Do not delete working code to fix unrelated problems.

---

# 44. Package Installation Rules

Before installing a package:

1. Check whether it already exists.
2. Install only if required.
3. Do not install duplicate packages.

Possible packages:

```text
react-router-dom
axios
express
mongoose
bcryptjs
jsonwebtoken
mysql2
cors
dotenv
```

---

# 45. Development Commands

Frontend:

```bash
cd frontend
npm run dev
```

Typical frontend URL:

```text
http://localhost:5173
```

Backend may use:

```bash
cd Backend
npm run dev
```

or:

```bash
node server.js
```

Expected backend port:

```text
5000
```

Use the actual package scripts present in the project instead of assuming them.

---

# 46. Git / GitHub

Do not commit:

```text
node_modules/
.env
API keys
passwords
secrets
```

Use `.gitignore`.

Expected repository structure:

```text
ZeroMind/
├── ZeroMind_data.md
├── README.md
├── frontend/
└── Backend/
```

---

# 47. README

A final README should eventually contain:

```text
Project Name
Project Description
Features
Tech Stack
Project Structure
Installation
Environment Variables
Running Frontend
Running Backend
Database Setup
API Overview
Screenshots
Future Improvements
```

Create/update it when the core project is ready.

---

# 48. Project Demonstration Flow

Suggested college demonstration:

```text
1. Open ZeroMind
2. Explain the product idea
3. Show Home page
4. Show Features
5. Show How It Works
6. Sign Up
7. Login
8. Open Dashboard
9. Create AI
10. Enter AI details
11. Save AI
12. Show AI in Dashboard
13. Open AI
14. Edit AI
15. Chat with AI
16. Show Profile
17. Show Settings
18. Explain React frontend
19. Explain Express backend
20. Explain MongoDB
21. Explain MySQL
22. Explain REST APIs
23. Explain authentication
```

---

# 49. Simple Project Explanation

Use this explanation during demonstration:

> ZeroMind is a full-stack web application that allows users to create and personalize their own AI assistants. Users can define the AI's name, purpose, personality and behavior, save the AI to the database, manage it and interact with it through a chat interface.

Technology explanation:

```text
React
→ Builds the frontend user interface.

Tailwind CSS
→ Provides responsive styling.

Node.js
→ Provides the backend JavaScript runtime.

Express.js
→ Creates REST APIs and handles backend requests.

MongoDB
→ Stores users and AI application data.

MySQL
→ Stores supporting relational/activity data.

JWT
→ Handles authentication.

bcrypt
→ Hashes passwords.
```

Only explain technologies as implemented. If something is still pending, say so.

---

# 50. Interview Concepts to Understand

The developer should eventually understand:

## React

- Components
- Props
- State
- useState
- useEffect
- Event handling
- Conditional rendering
- Lists
- React Router

## JavaScript

- Variables
- Functions
- Arrays
- Objects
- map
- async/await
- promises
- fetch/Axios

## Node.js

- npm
- modules
- asynchronous programming
- server

## Express.js

- routes
- middleware
- request
- response
- REST API

## MongoDB

- database
- collection
- document
- Mongoose
- CRUD

## MySQL

- database
- tables
- rows
- columns
- primary key
- foreign key
- SQL queries

## Authentication

- password hashing
- JWT
- protected routes

---

# 51. Realistic AI Functionality

The MVP can treat an AI as a personalized configuration:

```text
Name
Purpose
Personality
Behavior
```

A real AI model integration is optional.

If implemented later, keep the API key on the backend.

Do not expose the provider API key in React.

---

# 52. Future Improvements

Only after the MVP works:

```text
Real AI API integration
Conversation history
AI memory
AI avatars
Theme settings
Better profile management
AI templates
AI sharing
Search
Notifications
Usage statistics
Activity history
```

These are optional.

Do not implement them before the core project works.

---

# 53. Product Language

Preferred terms:

```text
Create Your AI
Personalize
Manage
Chat
Your AIs
Purpose
Personality
Behavior
```

Avoid exaggerated terminology such as:

```text
Neural cognition engine
AGI framework
Quantum intelligence
Autonomous intelligence architecture
```

The product should remain realistic.

---

# 54. UI Copy Tone

Use:

- simple language
- friendly language
- professional language
- clear labels

Example:

```text
Create your first AI.
Give it a purpose, personality and behavior.
```

Avoid exaggerated marketing:

```text
Build the world's most powerful AI.
```

---

# 55. Core Data Relationships

Expected conceptual relationship:

```text
User
 │
 ├── AI
 │    ├── name
 │    ├── purpose
 │    ├── personality
 │    └── behavior
 │
 └── Activity
```

One user can create multiple AIs.

An AI belongs to one user.

---

# 56. CRUD Requirements

AI CRUD:

```text
CREATE
POST /api/ais

READ
GET /api/ais
GET /api/ais/:id

UPDATE
PUT /api/ais/:id

DELETE
DELETE /api/ais/:id
```

The dashboard should read the user's AIs from the backend.

Create AI should save to MongoDB.

Edit should update MongoDB.

Delete should remove the AI.

---

# 57. Authentication Protection

Protected pages eventually include:

```text
/dashboard
/create-ai
/ai/:id
/chat/:id
/profile
/settings
```

Unauthenticated users should not be allowed to access protected user data.

---

# 58. Empty / Loading / Error States

Where appropriate, provide:

### Loading

```text
Loading...
```

### Empty

```text
You haven't created an AI yet.
```

### Error

```text
Something went wrong. Please try again.
```

Do not leave the user with a completely blank screen.

---

# 59. Form Validation

Forms should perform basic validation.

Examples:

```text
Name is required
Email is required
Password is required
AI name is required
Purpose is required
```

Do not overcomplicate validation for the MVP.

---

# 60. Accessibility Basics

Use:

- semantic HTML
- labels for form fields
- buttons for actions
- readable contrast
- meaningful link text
- keyboard-friendly controls where practical

Do not sacrifice usability for visual effects.

---

# 61. Performance Basics

Avoid:

- unnecessary dependencies
- huge images
- unnecessary animations
- unnecessary API requests
- unnecessary rerenders

Keep the MVP lightweight.

---

# 62. Codex Instructions

Codex is being used inside VS Code to help implement ZeroMind.

Before changing anything:

```text
1. Read ZeroMind_data.md
2. Inspect the relevant existing files
3. Understand the current implementation
4. Preserve working code
5. Make the requested change
6. Test it
7. Fix errors
```

Do not assume the project is empty.

---

# 63. Codex Must Work Incrementally

Never implement the entire project in one large operation.

Example:

```text
Step 1
Build Features section

Step 2
Test Home page

Step 3
Build How It Works

Step 4
Test Home page

Step 5
Build CTA

Step 6
Build Footer

Step 7
Add React Router
```

Continue this pattern throughout the project.

---

# 64. Codex Change Rules

When asked to modify something:

- inspect the existing file first
- modify only what is necessary
- preserve existing working sections
- avoid unnecessary refactoring
- avoid unrelated package changes
- avoid deleting functionality
- explain important changes

If a working feature exists, do not rebuild it from scratch without a reason.

---

# 65. Codex Error-Fixing Rules

When the developer reports an error:

```text
Read error
↓
Locate source
↓
Explain cause
↓
Apply smallest fix
↓
Run/test again
```

Do not respond to errors with random rewrites.

---

# 66. Codex Coding Style

Use beginner-friendly code.

Prefer:

```js
const
let
async/await
simple functions
clear variable names
```

Avoid:

- unnecessary abstractions
- advanced design patterns
- unnecessary state management libraries
- unnecessary custom hooks
- over-engineered architecture

---

# 67. Codex Response Format

For significant implementation steps, explain:

### What we are doing

Short explanation.

### File

Example:

```text
frontend/src/pages/Home.jsx
```

### Change

Explain what is being added or modified.

### Test

Explain how to run and check it.

Example:

```bash
npm run dev
```

Then open:

```text
http://localhost:5173
```

---

# 68. Current Immediate Task

The current task is:

```text
ADD THE FEATURES SECTION TO THE HOME PAGE
```

Current Home page:

```text
Navbar       ✅
Hero         ✅
Features     ← CURRENT TASK
How It Works
CTA
Footer
```

The Features section should be added below the Hero.

Do not skip ahead to backend work unless explicitly requested.

---

# 69. Target MVP Architecture

```text
                         ZEROMIND
                            │
             ┌──────────────┴──────────────┐
             │                             │
         FRONTEND                       BACKEND
             │                             │
           React                         Node.js
             │                             │
       Tailwind CSS                    Express.js
             │                             │
       React Router              ┌────────┴────────┐
             │                   │                 │
             │               MongoDB            MySQL
             │                   │                 │
             └────────── REST API ─────────────────┘
```

---

# 70. Target User Flow

```text
HOME
 │
 ├── LOGIN
 │
 └── SIGNUP
       │
       ↓
   DASHBOARD
       │
       ↓
   CREATE AI
       │
       ├── Name
       ├── Purpose
       ├── Personality
       └── Behavior
       │
       ↓
      SAVE
       │
       ↓
    MONGODB
       │
       ↓
   DASHBOARD
       │
       ↓
   AI DETAILS
       │
       ├── CHAT
       ├── EDIT
       └── DELETE
```

---

# 71. Target Final Project Structure

Eventually:

```text
ZeroMind/
│
├── ZeroMind_data.md
├── README.md
├── .gitignore
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── CreateAI.jsx
│   │   │   ├── AIDetails.jsx
│   │   │   ├── Chat.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── Setting.jsx
│   │   │
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   └── package.json
│
└── Backend/
    ├── server.js
    ├── config/
    ├── models/
    ├── routes/
    ├── controllers/
    ├── middleware/
    ├── package.json
    └── .env
```

This is a target structure, not a requirement to create everything immediately.

---

# 72. Final Golden Rule

## BUILD SMALL → TEST → FIX → CONTINUE

The project should always prioritize:

```text
Working
>
Understandable
>
Clean
>
Responsive
>
Extra features
```

The final ZeroMind MVP should be:

- functional
- professional
- responsive
- realistic
- full-stack
- beginner-friendly
- easy to demonstrate
- easy to explain

---

# END OF ZEROMIND PROJECT DATA
