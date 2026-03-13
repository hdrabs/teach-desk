# TeachDesk

A lightweight SaaS platform for independent tutors to manage students, schedule lessons, and track payments — all from a single dashboard.

> Built with **Next.js 16**, **Prisma 7**, **PostgreSQL**, **Tailwind CSS v4**, and **TypeScript**.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Running the App](#running-the-app)
- [Pages & Routes](#pages--routes)
- [API Reference](#api-reference)
- [Theming](#theming)
- [Troubleshooting](#troubleshooting)

---

## Features

| Feature              | Description                                                          |
|----------------------|----------------------------------------------------------------------|
| **Student Management** | Add, edit, delete students. Track contacts, subjects, hourly rates. |
| **Lesson Scheduling**  | Schedule lessons, mark complete/cancelled, add notes.               |
| **Payment Tracking**   | Record payments (cash, bank transfer, mobile). Link to lessons.     |
| **Dashboard**          | Overview of upcoming lessons, monthly revenue, outstanding balance. |
| **Dark / Light Mode**  | System preference detection + manual toggle.                        |
| **Mobile-First**       | Fully responsive. Sidebar slides in on mobile.                      |
| **Landing Page**       | Modern SaaS homepage with product preview and CTAs.                 |
| **Auth**               | Email/password registration and login with bcrypt + JWT.            |

---

## Tech Stack

| Layer      | Technology                 |
|------------|----------------------------|
| Framework  | Next.js 16 (App Router)    |
| Language   | TypeScript (strict mode)   |
| Styling    | Tailwind CSS v4            |
| ORM        | Prisma 7                   |
| Database   | PostgreSQL 14+             |
| Auth       | NextAuth.js v5 (Auth.js)   |
| Validation | Zod v4                     |
| Icons      | react-icons                |
| Toasts     | react-toastify             |
| Pkg Manager| Bun                        |

---

## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** 20+ (or **Bun** 1.0+)
- **PostgreSQL** 14+ (running locally)
- **Git**

### Install PostgreSQL (macOS)

```bash
brew install postgresql@14
brew services start postgresql@14
```

### Install Bun

```bash
curl -fsSL https://bun.sh/install | bash
```

---

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd teach-desk
```

### 2. Install Dependencies

```bash
bun install
```

### 3. Set Up Environment Variables

The `.env` file should already exist in the project root. If not, create it:

```bash
cp .env.example .env
```

Edit `.env` with your PostgreSQL connection details:

```env
DATABASE_URL="postgresql://<YOUR_USERNAME>@localhost:5432/teachdesk"
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

> **Note:** On macOS with Homebrew PostgreSQL, the default username is usually your macOS username (no password needed for local development).

### 4. Create the Database

```bash
createdb teachdesk
```

### 5. Run Database Migrations

```bash
bunx --bun prisma generate
bunx --bun prisma migrate dev --name init
```

### 6. Start the Development Server

```bash
bun run dev
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## Project Structure

```
teach-desk/
├── prisma/
│   ├── schema.prisma          # Database schema (User, Student, Lesson, Payment)
│   └── migrations/            # Database migrations
├── prisma.config.ts           # Prisma v7 configuration
├── src/
│   ├── app/
│   │   ├── page.tsx           # Landing homepage (public)
│   │   ├── layout.tsx         # Root layout with providers
│   │   ├── login/             # Login page
│   │   ├── register/          # Registration page
│   │   ├── dashboard/         # Protected app pages
│   │   │   ├── layout.tsx     # Auth check + sidebar/topbar
│   │   │   ├── page.tsx       # Dashboard overview
│   │   │   ├── students/      # Student management (list, new, profile, edit)
│   │   │   ├── lessons/       # Lesson management (list, new)
│   │   │   └── payments/      # Payment management
│   │   └── api/               # REST API routes
│   │       ├── auth/          # NextAuth endpoint
│   │       ├── register/      # User registration
│   │       ├── students/      # Students CRUD
│   │       ├── lessons/       # Lessons CRUD
│   │       ├── payments/      # Payments CRUD
│   │       └── dashboard/     # Dashboard analytics
│   ├── components/
│   │   ├── landing/           # Homepage components (Navbar, Footer, HomePage)
│   │   ├── layout/            # App layout (Sidebar, TopBar, DashboardShell)
│   │   ├── providers/         # ThemeProvider, Providers
│   │   └── ui/                # Reusable UI (Button, Input, Card, Modal, etc.)
│   ├── lib/
│   │   ├── auth.ts            # NextAuth configuration
│   │   ├── prisma.ts          # Prisma client singleton
│   │   └── utils.ts           # Utility functions (cn, formatters)
│   ├── types/                 # TypeScript interfaces
│   └── validations/           # Zod schemas
├── .env                       # Environment variables (DO NOT commit)
├── package.json
├── tsconfig.json
└── tailwind / postcss config
```

---

## Environment Variables

| Variable          | Description                              | Example                                          |
|-------------------|------------------------------------------|--------------------------------------------------|
| `DATABASE_URL`    | PostgreSQL connection string             | `postgresql://user@localhost:5432/teachdesk`      |
| `NEXTAUTH_SECRET` | Secret key for JWT signing               | Any random string (use `openssl rand -base64 32`) |
| `NEXTAUTH_URL`    | Base URL of your application             | `http://localhost:3000`                           |

---

## Database Setup

### Schema Overview

| Model     | Key Fields                                                            |
|-----------|-----------------------------------------------------------------------|
| **User**    | id, name, email (unique), password (bcrypt), createdAt              |
| **Student** | id, name, phoneNumber, email?, subject, hourlyRate, notes, tutorId  |
| **Lesson**  | id, studentId, date, startTime, duration, subject, status, notes    |
| **Payment** | id, studentId, lessonId?, amount, paymentMethod, paymentDate        |

### Useful Prisma Commands

```bash
# View your database in a browser GUI
bunx --bun prisma studio

# Reset the database (drops all data)
bunx --bun prisma migrate reset

# Create a new migration after schema changes
bunx --bun prisma migrate dev --name <migration_name>

# Generate the Prisma client
bunx --bun prisma generate
```

---

## Running the App

```bash
# Development
bun run dev

# Production build
bun run build
bun run start

# Lint
bun run lint
```

The app runs on **http://localhost:3000** by default.

---

## Pages & Routes

### Public Pages

| Page      | URL         | Description                    |
|-----------|-------------|--------------------------------|
| Homepage  | `/`         | Landing page with product info |
| Login     | `/login`    | Email/password sign in         |
| Register  | `/register` | Create a new account           |

### Protected Pages (requires login)

| Page            | URL                              | Description                              |
|-----------------|----------------------------------|------------------------------------------|
| Dashboard       | `/dashboard`                     | Overview with stats and upcoming lessons |
| Students List   | `/dashboard/students`            | All students with search                 |
| Add Student     | `/dashboard/students/new`        | Create a new student                     |
| Student Profile | `/dashboard/students/[id]`       | Student details, lessons, payments       |
| Edit Student    | `/dashboard/students/[id]/edit`  | Update student information               |
| Lessons List    | `/dashboard/lessons`             | All lessons with status filter           |
| Schedule Lesson | `/dashboard/lessons/new`         | Create a new lesson                      |
| Payments        | `/dashboard/payments`            | Payment history and record new payments  |

---

## API Reference

All API routes are protected (require authentication) except `/api/register`.

| Method | Endpoint             | Description          |
|--------|----------------------|----------------------|
| POST   | `/api/register`      | Create a new account |
| GET    | `/api/students`      | List all students    |
| POST   | `/api/students`      | Create a student     |
| GET    | `/api/students/[id]` | Get student details  |
| PUT    | `/api/students/[id]` | Update a student     |
| DELETE | `/api/students/[id]` | Delete a student     |
| GET    | `/api/lessons`       | List all lessons     |
| POST   | `/api/lessons`       | Create a lesson      |
| GET    | `/api/lessons/[id]`  | Get lesson details   |
| PUT    | `/api/lessons/[id]`  | Update a lesson      |
| DELETE | `/api/lessons/[id]`  | Delete a lesson      |
| GET    | `/api/payments`      | List all payments    |
| POST   | `/api/payments`      | Record a payment     |
| GET    | `/api/dashboard`     | Dashboard analytics  |

---

## Theming

TeachDesk supports **dark mode** and **light mode**:

- **Automatic:** Follows your system preference on first visit
- **Manual:** Click the sun/moon icon in the top bar or navbar to toggle
- **Persisted:** Your preference is saved in `localStorage`

The design system uses CSS custom properties defined in `src/app/globals.css`, making it easy to customize the color palette.

---

## Troubleshooting

### "Module '@prisma/client' has no exported member 'PrismaClient'"

Run `bunx --bun prisma generate` to generate the Prisma client.

### "ECONNREFUSED" or database connection errors

Make sure PostgreSQL is running:
```bash
brew services start postgresql@14
```

And that the `teachdesk` database exists:
```bash
createdb teachdesk
```

### Hydration mismatch warnings

This is caused by browser extensions (password managers) injecting elements into form inputs. It's harmless — React auto-recovers. The app includes `suppressHydrationWarning` on input elements to minimize console noise.

### Port 3000 already in use

```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
bun run dev -- -p 3001
```

---

## Core User Flow

1. **Visit** → See the landing homepage
2. **Register** → Create an account (name, email, password)
3. **Login** → Sign in to access the dashboard
4. **Add Students** → Create student profiles with contact info and rates
5. **Schedule Lessons** → Book sessions with your students
6. **Complete Lessons** → Mark lessons as done, add notes
7. **Record Payments** → Track who paid and how
8. **Dashboard** → See everything at a glance

---

## License

Private — All rights reserved.
