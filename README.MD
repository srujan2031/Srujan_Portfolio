# Srujan – Developer Portfolio

A modern, performant portfolio built with **React + Vite + TypeScript**, featuring a projects gallery, experience timeline, and an integrated AI chatbot powered by Google’s Gemini API via a secure serverless function.

**Live:** https://srujan-chinta-portfolio-bv2twxys3-srujan-chintas-projects.vercel.app

---

## ✨ Features

- ⚡️ Fast Vite + React + TypeScript app
- 🧭 Smooth section navigation (Hero, Skills, Projects, Experience, About, Contact)
- 🧩 Project details modal & hover interactions
- 🤖 Chatbot that talks to Google Gemini **through a secure API route** (`/api/gemini`) — your API key never reaches the browser
- 🧱 Clean component structure with reusable hooks

---

## 🗂️ Project Structure (key files)

```
.
├── api/
│   └── gemini.ts                # Serverless API route (Vercel) – calls Google Gemini using server-side API key
├── components/                  # About, Header, Hero, Projects, ProjectModal, etc.
├── hooks/
│   └── useIntersectionObserver.ts
├── services/
│   └── geminiService.ts         # Frontend helper that POSTs to /api/gemini
├── index.html                   # App mount + any global scripts (e.g., Tailwind CDN if used)
├── index.tsx                    # React entry
├── App.tsx                      # Main app
├── types.ts                     # Shared TS types
├── constants.ts                 # Portfolio data
├── vite.config.ts
├── tsconfig.json
└── .gitignore
```

> Note: This project intentionally **does not** read `import.meta.env` on the client for the API key. The key is only used **inside the serverless function**.

---

## 🔐 Environment Variables

- **Local (for `vercel dev`)**: create a file named `.env.local` in the project root:

```
API_KEY=your_google_gemini_api_key_here
```

- **Vercel (Production/Preview)**: set the same variable in the Vercel dashboard:  
  **Project → Settings → Environment Variables**  
  - Name: `API_KEY`  
  - Value: your Gemini key  
  - Environments: Select “Production”, “Preview”, and/or “Development” as desired

> No `VITE_` prefix is used. The API key stays in server-side code only.

---

## 🚀 Local Development

### Option A – Run frontend only (no API)
```bash
npm install
npm run dev
# App on http://localhost:5173 (the chatbot will not work without the API route)
```

### Option B – Run with Vercel’s dev server (frontend + API)
```bash
npm install
npm i -g vercel
vercel dev
# App + /api/gemini on http://localhost:3000
```

---

## 🧪 Test the API route

With the dev server running (via `vercel dev`), call your endpoint:

```bash
curl -X POST http://localhost:3000/api/gemini \
  -H "Content-Type: application/json" \
  -d '{ "prompt": "Say hello to Srujan!" }'
```

Expected response:
```json
{ "text": "Hello, Srujan! ..." }
```

---

## 🛠️ Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

---

## 🧩 API Route (Vercel Function)

**`api/gemini.ts`** (Node runtime). It accepts a `POST` JSON body:

```ts
// Request body
{
  "prompt": "string",
  "systemInstruction": "string (optional)"
}

// Response
{
  "text": "string"
}
```

The function creates a `GoogleGenAI` client using the **server-side** `API_KEY` and returns the model’s text. Because this runs on the server, your key is never exposed.

---

## 🧭 Deploying to Vercel

1. **Push your repo to GitHub.**
2. In Vercel, **Import Project** and select this repository.
3. Add the **Environment Variable** `API_KEY` in Project Settings.
4. Click **Deploy**.

Vercel will automatically detect Vite and build the site. The serverless function in `/api/gemini.ts` deploys with it.

---

## 🤝 Contributing

Issues and PRs are welcome! If you spot a bug or want to improve the design/content, feel free to open an issue or submit a PR.

---

## 📄 License

MIT © Srujan
