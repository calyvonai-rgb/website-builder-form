# Website Project Onboarding Form

A Typeform-style, one-question-at-a-time onboarding form built with Next.js. Uploads files to Cloudinary and sends a formatted HTML email via Resend on submission.

## Stack

- **Next.js 14** (App Router)
- **Tailwind CSS** + **Framer Motion** for animations
- **Cloudinary** for file uploads
- **Resend** for email delivery

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env.local` and fill in your keys:

```bash
cp .env.example .env.local
```

| Variable | Where to get it |
|---|---|
| `CLOUDINARY_CLOUD_NAME` | [cloudinary.com/console](https://cloudinary.com/console) |
| `CLOUDINARY_API_KEY` | Cloudinary Dashboard → API Keys |
| `CLOUDINARY_API_SECRET` | Cloudinary Dashboard → API Keys |
| `RESEND_API_KEY` | [resend.com/api-keys](https://resend.com/api-keys) |
| `RECIPIENT_EMAIL` | The email address to receive submissions |
| `RESEND_FROM_EMAIL` | A verified sender address in Resend (use `onboarding@resend.dev` for local testing) |

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

1. Push to GitHub
2. Import the repo in [vercel.com/new](https://vercel.com/new)
3. Add all environment variables in the Vercel dashboard
4. Deploy

## Form Structure

| Step | Section | Questions |
|---|---|---|
| Welcome | — | Intro + Start button |
| 1–5 | Contact Information | Name, email, phone, business name, current URL |
| 6–11 | Business Details | Industry, description, goal, audience, services, timeline |
| 12–17 | Design Preferences | Visual style, brand personality, inspiration, colours, pages, social links |
| 18 | Logo | File upload |
| 19 | Brand Assets | File upload |
| 20 | Photos & Images | File upload |
| 21 | Final Notes | Special requests |
| Review | — | Summary of all answers + Submit |
| Success | — | Thank you screen |
