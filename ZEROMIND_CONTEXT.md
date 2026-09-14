# ZeroMind — Project Context for VS Code AI Agent

## 1. Project Overview

**Project name:** ZeroMind  
**Company/brand:** Zero Dice  
**Project status:** Ongoing development

ZeroMind is a realistic personal AI creation platform. Users can create and personalize their own AI by choosing its name, purpose, personality, and behavior. They can then chat with it and manage its memory/settings.

The project is being built as a practical full-stack portfolio/college demonstration project. Keep the implementation realistic and understandable for a fresher developer. Do NOT add unnecessary sci-fi features or make claims about features that have not actually been implemented.

Main tagline:
> Create Your Own AI

Supporting line:
> Build, teach and personalize an AI that is truly yours.

---

## 2. Technology Stack

Planned stack:

### Frontend
- React
- Vite
- Tailwind CSS
- HTML/CSS/JavaScript
- Bootstrap where actually useful

### Backend
- Node.js
- Express.js

### Databases
- MongoDB
- MySQL

Use technologies only when they are actually needed/implemented. Do not create fake functionality just to show a technology.

---

## 3. Current Frontend Setup

The frontend is a Vite React project.

Typical structure:

```text
ZeroMind/
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── App.css
│   │   └── index.css
│   ├── package.json
│   └── ...
├── backend/
└── database/
```

The project has already been initialized with React/Vite.

React version seen during setup:
- React 19.x

---

## 4. Important Development Rule

The developer is a beginner/intermediate fresher and wants to understand the code.

Therefore:

- Prefer clean, simple React code.
- Explain important code when necessary.
- Do not generate unnecessarily complex architecture.
- Do not introduce libraries without a reason.
- Do not replace working code just for stylistic reasons.
- Make changes incrementally.
- After each major UI section, make sure the page still works.
- Preserve working CSS/layout unless a change is specifically requested.
- Avoid huge batches of unrelated changes.
- If something is already working, build on top of it.
- Keep code readable enough that the developer can explain it in an interview.

---

## 5. Design Direction

ZeroMind should have a modern SaaS-style interface.

Design goals:
- Clean
- Professional
- Minimal
- White/black based visual language
- Good spacing
- Modern typography
- Rounded cards/buttons where appropriate
- Responsive on desktop, tablet and mobile
- No unnecessary visual clutter

The landing page should look like a real modern SaaS product, not a college-template website.

Important:
- CSS responsiveness must be tested.
- Do not blindly add CSS to index.css/App.css if it causes conflicts.
- Keep component-specific styles organized.
- Tailwind should be used where appropriate, but do not force Tailwind into every tiny piece if normal CSS is clearer.

---

## 6. Landing/Home Page

The landing page includes:

### Navbar
- ZeroMind / Zero Dice branding
- Home
- Features
- How It Works
- Login
- Sign Up

### Hero
Main heading:
> Create Your Own AI

Subtitle:
> Build, teach and personalize an AI that is truly yours.

Primary CTA:
> Create Your AI

Secondary CTA:
> Learn More

The landing page has already gone through CSS/layout fixes. The main container alignment and responsive layout were corrected and should NOT be unnecessarily rewritten.

---

## 7. Planned Pages

ZeroMind is planned around approximately 7 main pages/areas.

Likely pages/features:

1. Home / Landing
2. Features
3. How It Works
4. Login
5. Sign Up
6. Create Your AI / AI Dashboard
7. AI Chat / AI Management

The exact routing/component structure can be finalized as development progresses.

Do not build all pages at once. Build and test one page/feature at a time.

---

## 8. Core Product Flow

The intended user flow is:

1. User visits ZeroMind.
2. User clicks Create Your AI.
3. User signs up/logs in.
4. User creates an AI.
5. User gives the AI:
   - Name
   - Purpose
   - Personality
   - Behavior/instructions
6. User enters the AI dashboard/chat.
7. User chats with the AI.
8. User can manage basic AI settings/memory.

The first version should focus on a working, believable product flow rather than advanced AI infrastructure.

---

## 9. Backend Plan

Backend will use:

- Node.js
- Express.js
- REST APIs
- MongoDB/Mongoose where appropriate

Potential backend areas:
- Authentication
- User data
- AI profile/configuration
- Chat/history
- Memory/settings

Do not implement backend functionality before the corresponding frontend requirement is clear.

Use environment variables for secrets and database credentials.

Never hard-code passwords, API keys, database credentials, or tokens.

---

## 10. Database Plan

MongoDB is the primary planned database for application data.

Possible collections:
- users
- ai_profiles
- conversations
- memories/settings

MySQL may be used for appropriate relational/database practice or specific project requirements, but do not duplicate the same data in both databases without a clear reason.

---

## 11. React Learning Context

The developer is currently learning React.

They understand/began learning:
- Components
- JSX
- Props
- Dynamic props
- useState
- useEffect basics
- main.jsx → App.jsx flow
- export default
- npm run dev

When introducing new React concepts, explain them simply and show where the code belongs.

For example:
- Explain why a state variable is needed.
- Explain what a prop is.
- Explain why an event handler is used.
- Explain imports/exports when they are relevant.

---

## 12. Current Development Method

Work in small steps.

Preferred workflow:

```text
1. Decide one UI/feature
2. Inspect existing files
3. Modify only required files
4. Run the project
5. Check browser
6. Fix issues
7. Move to next feature
```

Do not make large architectural changes without first explaining why.

---

## 13. Code Quality Rules

- Use meaningful component names.
- Keep components reasonably small.
- Avoid duplicated code.
- Use semantic HTML.
- Make buttons and links accessible.
- Keep responsive behavior in mind.
- Avoid unnecessary dependencies.
- Do not use placeholder functionality as if it were real.
- Do not claim an API/backend/database feature is complete if it is not.
- Keep frontend and backend responsibilities separate.

---

## 14. Portfolio/Resume Accuracy

ZeroMind will eventually be used as a portfolio/resume project.

Therefore, every implemented feature should be something the developer can honestly explain in an interview.

Do NOT:
- Invent AI capabilities.
- Invent database functionality.
- Invent authentication functionality.
- Add technologies only for resume keywords.
- Claim production-level AI infrastructure unless actually implemented.

It is better to have a smaller working feature than a large fake feature.

---

## 15. Immediate Development Priority

Continue from the existing working landing page.

Do not restart the project.

Next steps should generally follow:

1. Finish/refine Home page
2. Features section/page
3. How It Works section/page
4. Authentication UI
5. Create Your AI form
6. AI dashboard
7. Chat interface
8. Backend APIs
9. Database integration
10. Connect frontend to backend
11. Testing and responsive fixes
12. Final polish/demo preparation

The order can change if the existing codebase suggests a better sequence.

---

## 16. AI Agent Instructions

When modifying ZeroMind:

> First inspect the existing project files before making changes.

> Preserve existing working functionality.

> Make the smallest clean change needed for the requested feature.

> If there is a CSS/layout problem, inspect the existing CSS and component structure before creating another global CSS rule.

> Do not overwrite the whole project unless explicitly requested.

> Do not create fake backend/API functionality.

> Keep the implementation understandable to a fresher.

> After changes, tell the developer exactly which files were changed and what was added/fixed.

> If a command is needed, provide the exact command.

> If an error occurs, diagnose the actual error instead of randomly rewriting files.

---

## 17. Project Goal

The final ZeroMind project should feel like a genuine small SaaS application:

**Landing → Authentication → Create AI → Dashboard → Chat → Settings/Memory**

It should be visually professional, technically understandable, responsive, and demonstrable.

The priority is:

**Working project > clean UI > understandable code > advanced features.**
