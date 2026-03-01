# SocialNU

A web app for Northwestern students to discover classmates who share their courses. Built with React and Vite as part of [DISC](https://www.disclub.org/) (Develop and Innovate for Social Change).

Students log in with Supabase Auth, browse profile cards in a filterable grid, see how many classes they share with each person, and save profiles for later.

## Features

- **Supabase Authentication** - Email/password login and session management using Supabase Auth
- **Student Profile Cards** - 3-column grid showing each student's name, major, shared class count, and course tags
- **Filtering Sidebar** - Search by major, course, residence hall, or clubs
- **Save Profiles** - Bookmark students you want to connect with
- **Dynamic Data** - All student data fetched from the [SocialNU API](https://github.com/starJin2003/socialnu-api) backend, joined with profile info (major, bio, shared classes, course tags)

## Tech Stack

- React 19 + Vite 7
- Supabase JS client (authentication)
- CSS (custom, no framework)
- Environment variables via Vite's `import.meta.env`

## How It Works

The app initializes a Supabase client for authentication. On login, it checks the session and fetches student data from the backend API. The API returns users joined with their `user_profiles` (major, bio, shared_classes, tags), which get rendered as profile cards.

```
Login (Supabase Auth)  -->  Fetch /users/profiles (Express API)  -->  Render card grid
```

Each card displays the student's initials as an avatar, their major, number of shared classes, and a list of course tags (e.g., "CS 211", "MATH 228-1", "DISC").

## Getting Started

### Prerequisites

- Node.js 18+
- The [SocialNU API](https://github.com/starJin2003/socialnu-api) backend running locally on port 5001
- A Supabase project with Auth enabled

### Installation

```bash
git clone https://github.com/starJin2003/DISC-socialNU.git
cd DISC-socialNU
npm install
```

Create a `.env` file:

```
VITE_API_URL=http://localhost:5001/users/profiles
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Running

```bash
npm run dev
```

Opens at `http://localhost:5173`.

## Project Structure

```
├── public/
├── src/
│   ├── App.jsx              # Main app - auth flow, card grid, filters
│   ├── App.css              # All styling (Northwestern purple theme)
│   ├── supabaseClient.js    # Supabase client initialization
│   ├── main.jsx             # React entry point
│   └── index.css            # Base Vite styles
├── index.html
├── vite.config.js
├── eslint.config.js
└── package.json
```

## Related

- [socialnu-api](https://github.com/starJin2003/socialnu-api) - Express backend that serves student data from Supabase PostgreSQL
