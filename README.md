# Optiwise Infrastructure — Website

A full website for Optiwise Infrastructure (Indore) with a public site and an
admin panel to manage projects, client testimonials, and enquiries.

- **Backend:** Node.js, Express, MongoDB (Mongoose), JWT auth, image uploads
- **Frontend:** React (Vite), React Router, Framer Motion, Axios

```
optiwise-infrastructure/
├── backend/     Express API + MongoDB
└── frontend/    React (Vite) site + admin panel
```

## 1. Prerequisites

- [Node.js](https://nodejs.org) v18 or newer
- A MongoDB database — either:
  - Local MongoDB installed on your machine, **or**
  - A free cluster on [MongoDB Atlas](https://www.mongodb.com/atlas) (recommended if you don't want to install MongoDB)

## 2. Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

Open `.env` and fill in:

```
MONGO_URI=mongodb://127.0.0.1:27017/optiwise      # or your Atlas connection string
PORT=5000
JWT_SECRET=some_long_random_string_here
CLIENT_ORIGIN=http://localhost:5173
ADMIN_USERNAME=admin
ADMIN_PASSWORD=choose_a_strong_password
```

Create your first admin account (run this once):

```bash
npm run seed:admin
```

Start the API server:

```bash
npm run dev
```

The API runs at `http://localhost:5000`. Visit `http://localhost:5000/api/health`
to confirm it's working — you should see `{"status":"ok"}`.

## 3. Frontend setup

Open a **second terminal**:

```bash
cd frontend
npm install
cp .env.example .env
```

The default `.env` values already point at the local backend and your
WhatsApp/Instagram details, so you usually don't need to change anything.
Then start the site:

```bash
npm run dev
```

Visit `http://localhost:5173` to see the live site.

## 4. Using the admin panel

1. Go to `http://localhost:5173/admin/login`
2. Log in with the `ADMIN_USERNAME` / `ADMIN_PASSWORD` you set in
   `backend/.env` (the same ones used by `npm run seed:admin`)
3. From the dashboard you can:
   - **Projects** — add/edit/delete projects, upload a cover image and a
     gallery of photos, mark a project "Featured" to show it on the homepage
   - **Clients & Testimonials** — add client reviews with a star rating and
     an optional photo
   - **Enquiries** — see every message submitted through the Contact form,
     mark as read, or delete

There's also a link to the admin login in the site footer, and a
"← View live site" link inside the admin panel to jump back out.

## 5. Editing your business details

- **Phone numbers / WhatsApp / address:** these appear in
  `frontend/src/components/Footer.jsx` and
  `frontend/src/components/ContactSection.jsx`. The WhatsApp number and
  Instagram link are also set as environment variables in
  `frontend/.env` (`VITE_WHATSAPP_NUMBER`, `VITE_INSTAGRAM_URL`) so you can
  change them without touching code.
- **Indicative construction costs / comparison content:** this is in
  `frontend/src/components/WhyUs.jsx` — edit the `ROWS` array and the cost
  cards directly, or ask a developer to wire this section up to the admin
  panel the same way Projects and Clients are.

## 6. Deploying (when you're ready to go live)

- **Backend:** deploy to any Node host (Railway, Render, a VPS, etc.) and
  use MongoDB Atlas for the database. Set the same environment variables
  from `.env.example` in your host's dashboard. Make sure `CLIENT_ORIGIN`
  matches your real website domain.
- **Frontend:** run `npm run build` inside `frontend/` — this produces a
  static `dist/` folder you can deploy to Vercel, Netlify, or any static
  host. Set `VITE_API_URL` and `VITE_UPLOADS_URL` to your live backend's URL
  before building.
- Uploaded images are stored on the backend server's disk
  (`backend/uploads/`) — if you deploy the backend somewhere with an
  ephemeral filesystem (like some free hosting tiers), switch to a cloud
  storage service (e.g. Cloudinary or AWS S3) for uploads so images aren't
  lost on redeploy.

## 7. Troubleshooting

- **"MongoDB connection failed"** — check `MONGO_URI` in `backend/.env` and
  make sure MongoDB is running (if local) or that your Atlas IP allowlist
  includes your current IP.
- **Login fails / "Invalid username or password"** — re-run
  `npm run seed:admin` after fixing `ADMIN_USERNAME`/`ADMIN_PASSWORD` in
  `.env` (it won't overwrite an existing admin — delete the `admins`
  collection in MongoDB first if you need to reset it).
- **Images don't show after upload** — confirm `VITE_UPLOADS_URL` in
  `frontend/.env` points at your backend's base URL (no `/api` suffix).
