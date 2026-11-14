# বুঝি AI – Frontend

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · Axios

## Run
```bash
npm install
cp .env.example .env.local   # set NEXT_PUBLIC_API_URL
npm run dev                  # http://localhost:3000
```

`NEXT_PUBLIC_API_URL` **must include `/api/v1`**, e.g. `https://bujhi-ai-1.onrender.com/api/v1`.
Your backend mounts routes at `/api/v1/auth`, `/api/v1/ai` and `/api/v1/academic`, so `lib/api.ts` maps:

| Feature | Endpoint used |
|---|---|
| Login / Logout / Me | `GET /auth/google`, `POST /auth/logout`, `GET /auth/me` |
| Classes / Subjects / Topics | `GET /academic/classes`, `/academic/classes/:id/subjects`, `/academic/subjects/:id/topics` |
| Chat | `POST /ai/ask` |
| Flashcards | `POST /ai/admin/generate-flashcards`, `POST /ai/admin/save-flashcards`, `GET /ai/topics/:id/flashcards` |

## Structure
```
app/            page routes (/, /chat, /dashboard, /dashboard/flashcards)
components/     Sidebar, ChatInput, ChatMessage, FlashcardDeck, FlashcardView,
                FlashcardGenerator, AcademicBrowser, TopicPicker, AuthButton, ui
hooks/          useAuth, useAsync
lib/            api.ts (axios + endpoints), types.ts
```

## Backend settings to check
1. **CORS:** set `CLIENT_URL` on the backend to this app's exact origin (no trailing slash).
2. **Login redirect:** `googleAuthCallback` returns JSON. To land on the app after login, use
   `res.redirect(`${process.env.CLIENT_URL}/dashboard`)`.
3. **Cross-site cookies:** with the frontend and backend on different domains, the session cookie needs
   `sameSite: 'none'` + `secure: true`, and `app.set('trust proxy', 1)` behind Render's proxy.
4. **Topic field:** the Topic model uses `title`, but `createTopic` reads `name`, so creating topics
   fails validation. The frontend reads `title`.
5. **Model name:** `admin.ai.controller.ts` uses `gemini-4-hydrogen`. If flashcard generation returns 500, check this name.
