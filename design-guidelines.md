You are a senior product designer and frontend engineer.

Design and implement the landing homepage and design guidelines for the SaaS product described below.

Product Name: TutorFlow

TutorFlow is a lightweight SaaS platform that helps independent tutors manage students, schedule lessons, and track payments.

The product replaces messy workflows currently handled through WhatsApp, spreadsheets, and manual tracking.

Target users:
Independent tutors who manage 5–50 students and want a very simple way to run their teaching business.

The design must be:

- extremely simple
- mobile-first
- modern SaaS style
- very clear for non-technical users
- conversion focused

Avoid enterprise complexity.

The UI should feel similar to modern simple SaaS tools like Notion, Linear, or Stripe Dashboard.

Use:

- Next.js
- React
- TailwindCSS
- clean component architecture

---

HOMEPAGE GOALS

The homepage should immediately communicate:

1. what the product does
2. who it is for
3. why it is useful
4. a clear call to action

Visitors should understand the product in under 5 seconds.

Primary CTA:
"Start Free"

Secondary CTA:
"See How It Works"

---

HOMEPAGE STRUCTURE

Create the following sections.

1. Hero Section

Purpose:
Explain the product instantly.

Content:

Headline:
"Run Your Tutoring Business Without the Chaos"

Subheadline:
"Manage students, schedule lessons, and track payments in one simple dashboard."

Primary CTA:
Start Free

Secondary CTA:
View Demo

Visual:
Show a simple dashboard mockup.

2. Problem Section

Explain the pain tutors face today.

Title:
"Tutors shouldn’t need five tools to run their business."

Show 3 problems:

❌ Managing students in spreadsheets
❌ Scheduling lessons through chat
❌ Tracking payments manually

3. Solution Section

Title:
"Everything you need in one simple place."

Show 3 core features with icons:

Student Management
Keep all student information organized.

Lesson Scheduling
Schedule and track upcoming lessons.

Payment Tracking
See who has paid and who hasn't.

4. Product Preview

Show a simple dashboard preview layout.

Highlight:

Upcoming lessons
Students list
Payment summary

5. How It Works

Step 1
Add your students

Step 2
Schedule lessons

Step 3
Track payments and notes

6. CTA Section

Headline:
"Start running your tutoring business the easy way."

Button:
Start Free

7. Footer

Include:

Product
Features
Pricing (placeholder)
Contact

---

VISUAL DESIGN STYLE

Use a modern SaaS style.

Design traits:

clean white background
soft gray UI surfaces
rounded cards
large readable typography

Typography scale:

Hero Title: very large
Section titles: bold
Body text: readable and minimal

Use generous spacing.

Color palette suggestion:

Primary:
Indigo / Blue

Secondary:
Soft gray

Accent:
Light green for success states

Buttons should be rounded and clear.

---

LOGIN + SIGNUP PAGE DESIGN

Create a very simple authentication layout.

Layout:

Centered authentication card.

Left side (optional on desktop):
Product illustration or short tagline.

Right side:
Login or Sign up form.

Login fields:

Email
Password

Buttons:

Login
Continue with Google (optional)

Signup fields:

Name
Email
Password

Include link:

Already have an account? Login

Design should feel similar to:

Linear
Stripe
Notion

---

INTERNAL APP DESIGN GUIDELINES

The internal app UI should prioritize speed and simplicity.

Use a dashboard layout.

Structure:

Sidebar Navigation
Top Header
Main Content Area

Sidebar Navigation Items

Dashboard
Students
Lessons
Payments

Dashboard Page Layout

Sections:

Upcoming Lessons
Student Summary
Payment Summary

Tables should be simple and readable.

Use card UI components for summaries.

Buttons should always be visible for primary actions:

Add Student
Schedule Lesson
Record Payment

---

UX PRINCIPLES

Design for non-technical users.

Minimize cognitive load.

Users should always understand:

what they are looking at
what action they can take next

Avoid complex menus or hidden actions.

---

COMPONENTS TO CREATE

Button
Card
Table
Form Input
Sidebar
Navbar
Modal
Stat Card

---

OUTPUT REQUIREMENTS

Generate:

1. Landing homepage
2. Login page
3. Signup page
4. Dashboard layout
5. Reusable UI components
6. Tailwind styling

Code must be clean, modular, and production quality.

Use React components and Tailwind classes.
