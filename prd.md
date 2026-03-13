# TeachDesk – Product Requirements Document (PRD)

## 1. Product Overview

TeachDesk is a lightweight SaaS platform designed for independent tutors and small coaching businesses to manage their teaching operations.

Most tutors currently manage students, lessons, and payments through fragmented tools such as WhatsApp, spreadsheets, and personal calendars. TeachDesk consolidates these workflows into a single mobile-friendly dashboard.

The goal of the MVP is to provide tutors with a simple tool to:

- manage students
- schedule lessons
- track payments
- view upcoming sessions
- record lesson notes

The product should prioritize simplicity and fast interaction over complex functionality.

---

# 2. Target Users

## Primary User

Independent tutors and coaches.

Examples:

- language tutors
- math tutors
- coding instructors
- music teachers
- fitness coaches
- exam preparation tutors

Typical characteristics:

- operate solo
- manage 5–50 students
- communicate primarily via WhatsApp
- track payments manually

Regions:

- Asia
- Africa
- Middle East
- Eastern Europe

---

# 3. MVP Goals

The MVP should allow a tutor to:

1. Add and manage students
2. Schedule lessons
3. Mark lessons as completed
4. Track payments
5. View upcoming lessons
6. Record lesson notes

The product should be usable within minutes with minimal onboarding.

---

# 4. Core Features

## 4.1 Dashboard

Purpose:
Provide a quick overview of teaching operations.

Components:

Upcoming Lessons

- student name
- date
- time
- subject
- lesson status

Payment Summary

- total revenue this month
- outstanding payments

Quick Actions

- Add Student
- Schedule Lesson
- Record Payment

---

## 4.2 Student Management

Tutors must be able to create and manage student records.

Student Fields

- id
- name
- phone_number
- email (optional)
- subject
- hourly_rate
- notes
- created_at

Student List View

Columns:

- Name
- Subject
- Hourly Rate
- Total Lessons
- Outstanding Balance

Student Profile Page

Sections:

Student Details
Lesson History
Payment History
Notes

Actions

- edit student
- schedule lesson
- record payment

---

## 4.3 Lesson Scheduling

Tutors must be able to schedule lessons with students.

Lesson Fields

- id
- student_id
- date
- start_time
- duration
- subject
- status
- notes

Status Values

- scheduled
- completed
- cancelled

Lesson List View

Columns:

- Student
- Date
- Time
- Status
- Payment Status

Actions

- mark lesson complete
- cancel lesson
- add notes

---

## 4.4 Payment Tracking

Tutors must be able to record payments.

Payment Fields

- id
- student_id
- lesson_id (optional)
- amount
- payment_method
- payment_date

Payment Methods

- cash
- bank_transfer
- mobile_payment

Payment Summary

Display:

- total earnings
- outstanding balances per student

---

## 4.5 Lesson Notes

After a lesson, tutors can write short notes.

Example:

"Covered fractions and assigned homework page 21."

These notes should be stored with the lesson.

Optional AI Enhancement:

Generate a polished lesson summary from tutor notes.

---

# 5. User Flows

## Core Flow

Tutor signs in
→ views dashboard
→ adds student
→ schedules lesson
→ completes lesson
→ records payment

---

## Student Management Flow

Dashboard
→ Students page
→ Add student
→ View student profile
→ Schedule lesson

---

## Lesson Flow

Schedule lesson
→ Lesson appears on dashboard
→ Tutor completes lesson
→ Add lesson notes
→ Record payment

---

# 6. Screens Required

The MVP should include the following pages.

1. Login Page
2. Dashboard
3. Students List
4. Add/Edit Student
5. Student Profile
6. Lessons List
7. Schedule Lesson
8. Payments Page

---

# 7. Data Models

## Student

```

Student {
id: string
name: string
phone_number: string
email?: string
subject: string
hourly_rate: number
notes?: string
created_at: datetime
}

```

## Lesson

```

Lesson {
id: string
student_id: string
date: date
start_time: time
duration: number
subject: string
status: string
notes?: string
}

```

## Payment

```

Payment {
id: string
student_id: string
lesson_id?: string
amount: number
payment_method: string
payment_date: date
}

```

---

# 8. Suggested Tech Stack

This stack should be optimized for rapid MVP development.

Frontend

- Next.js
- React
- TailwindCSS

Backend

- Next.js API routes OR Express

Database

- PostgreSQL

ORM

- Prisma

Authentication

- simple email/password auth

Deployment

- Vercel or similar

---

# 9. UX Guidelines

The interface should be:

- clean
- minimal
- mobile-friendly
- fast to navigate

Design principles:

- minimal clicks
- clear dashboards
- simple tables
- strong visual hierarchy

---

# 10. Non-Goals

The MVP should NOT include:

- WhatsApp API integration
- online payment gateways
- multi-tutor accounts
- student portals
- complex accounting features

These are future improvements.

---

# 11. Future Features

Potential product expansions:

Recurring lessons

WhatsApp reminders

Automated payment reminders

Online payment integration

Student self-service portal

Multi-tutor support

AI scheduling assistant

---

# 12. Success Criteria

The MVP is successful if a tutor can:

- add students
- schedule lessons
- track payments
- see upcoming sessions
- record lesson notes

All from a single dashboard.

The system should feel like a lightweight operating system for a tutor’s micro-business.

---

# 13. Development Guidelines for AI Agent

The AI agent generating the MVP should:

1. Create a modular project structure
2. Implement CRUD APIs for students, lessons, and payments
3. Build responsive UI components
4. Implement basic authentication
5. Use clean and maintainable code
6. Follow a simple REST API design
7. Avoid over-engineering
8. Focus on MVP speed and clarity
