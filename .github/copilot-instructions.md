# Copilot Instructions for AI Agents

## Project Overview
- **Type:** React single-page app (SPA) using Vite for build/dev, with Firebase integration and custom data in `/src/data`.
- **Entry Point:** `src/main.jsx` renders `App.jsx` into the DOM.
- **Routing:** Uses `react-router-dom` for client-side routing. Main routes: `/` (Hero), `/cv` (CV), `/projects` (ProjectsPage).
- **UI Structure:**
  - `Navbar` is present on all main pages.
  - Pages are in `src/pages/` (e.g., `home.jsx`, `cv.jsx`, `projects.jsx`).
  - Reusable components in `src/components/`.
- **Styling:** CSS modules and global styles in `src/` and `public/style/`.

## Data & State
- **Project Data:**
  - Demo project data is loaded from `/src/data/projects_demo.json` (fetched as `/data/projects_demo.json` at runtime).
  - Images referenced in data are in `src/assets/`.
- **Theme:**
  - Theme (light/dark) is managed in `App.jsx` and persisted in `localStorage`.
  - Theme toggling is handled via a button in the `Navbar`.

## Firebase Integration
- **Config:** See `src/firebase.js` for Firebase setup.
- **Helpers:** `src/components/firestoreHelpers.js` provides functions for storing project data in Firestore (not used in demo data flow).
- **Note:** Most data is local/demo; Firestore is set up but not required for basic workflows.

## Developer Workflows
- **Start Dev Server:** `npm run dev` (runs Vite with HMR)
- **Build for Production:** `npm run build`
- **Preview Production Build:** `npm run preview`
- **Lint:** `npm run lint` (uses ESLint, config in `eslint.config.js`)
- **No test scripts or test files are present.**

## Project Conventions & Patterns
- **Routing:** All navigation uses `react-router-dom`'s `<Routes>` and `<Route>`. Use `<Link>` for internal navigation.
- **Component Structure:**
  - Page components in `src/pages/`, shared UI in `src/components/`.
  - Data fetching for pages (e.g., projects) is done in the page component's `useEffect`.
- **Assets:** Images and static files are in `src/assets/` and referenced by relative path in data/json.
- **No TypeScript or PropTypes.**
- **No Redux or global state management beyond theme.**

## Integration Points
- **Firebase:** Only initialized, not required for local/demo use. If using Firestore, see `firestoreHelpers.js` for patterns.
- **External APIs:** Example project data references external APIs (e.g., OpenWeatherMap) in code snippets, but these are not part of the running app.

## Examples
- **Add a new page:** Create a new file in `src/pages/`, add a `<Route>` in `App.jsx`, and link from `Navbar`.
- **Add a new project:** Add an entry to `src/data/projects_demo.json` and place the image in `src/assets/`.

## Key Files
- `src/main.jsx`, `src/App.jsx`: App entry and routing
- `src/pages/`: Page components
- `src/components/`: Shared UI and helpers
- `src/data/projects_demo.json`: Demo project data
- `src/firebase.js`: Firebase config

---
For more, see `README.md` (minimal) and source files. Update this file if project structure or conventions change.
