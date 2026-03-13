"use client";

import Link from "next/link";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import {
  HiOutlineUserGroup,
  HiOutlineCalendar,
  HiOutlineCreditCard,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineArrowRight,
  HiOutlineSparkles,
  HiOutlineClock,
} from "react-icons/hi";
import { cn } from "@/lib/utils";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* ===================== HERO ===================== */}
      <section className="relative overflow-hidden pt-28 pb-20 lg:pt-40 lg:pb-32">
        {/* Background effects */}
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 border border-primary/20">
              <HiOutlineSparkles className="h-4 w-4" />
              Simple. Fast. Built for Tutors.
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6">
              Run Your Tutoring <br className="hidden sm:block" />
              Business <span className="gradient-text">Without the Chaos</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Manage students, schedule lessons, and track payments in one simple dashboard. No spreadsheets. No chaos.
              Just clarity.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/register"
                className="inline-flex items-center justify-center h-12 px-8 text-base font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-xl shadow-primary/25 active:scale-[0.98] gap-2 w-full sm:w-auto"
              >
                Start Free
                <HiOutlineArrowRight className="h-5 w-5" />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center h-12 px-8 text-base font-semibold rounded-xl border-2 border-border bg-card hover:bg-secondary transition-all text-foreground w-full sm:w-auto"
              >
                See How It Works
              </a>
            </div>
          </div>

          {/* Dashboard Preview - Hero Visual */}
          <div className="mt-16 lg:mt-20 relative">
            <div className="absolute -inset-4 bg-linear-to-b from-primary/10 to-transparent rounded-3xl blur-2xl" />
            <div className="relative bg-card rounded-2xl border border-border shadow-2xl overflow-hidden">
              {/* Fake browser header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-secondary/50 border-b border-border">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                  <div className="w-3 h-3 rounded-full bg-green-400/80" />
                </div>
                <div className="flex-1 mx-8">
                  <div className="h-6 bg-muted rounded-lg max-w-xs mx-auto flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">app.teachdesk.io/dashboard</span>
                  </div>
                </div>
              </div>
              {/* Fake Dashboard */}
              <div className="p-4 sm:p-6 flex gap-4">
                {/* Sidebar mock */}
                <div className="hidden md:block w-48 shrink-0">
                  <div className="space-y-1">
                    {["Dashboard", "Students", "Lessons", "Payments"].map((item, i) => (
                      <div
                        key={item}
                        className={cn(
                          "h-9 rounded-lg px-3 flex items-center text-sm",
                          i === 0 ? "bg-primary text-white font-medium" : "text-muted-foreground",
                        )}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                {/* Main content mock */}
                <div className="flex-1 space-y-4">
                  {/* Stat cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    {[
                      { label: "Students", value: "24", color: "text-primary" },
                      { label: "This Week", value: "8", color: "text-green-500" },
                      { label: "Revenue", value: "$1,240", color: "text-purple-500" },
                      { label: "Outstanding", value: "$180", color: "text-amber-500" },
                    ].map(stat => (
                      <div key={stat.label} className="rounded-xl border border-border p-3 bg-background">
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                        <p className={cn("text-lg font-bold mt-1", stat.color)}>{stat.value}</p>
                      </div>
                    ))}
                  </div>
                  {/* Upcoming lessons mock */}
                  <div className="rounded-xl border border-border p-4 bg-background">
                    <p className="text-sm font-semibold text-foreground mb-3">Upcoming Lessons</p>
                    <div className="space-y-2">
                      {[
                        { name: "Sarah K.", subject: "Math", time: "2:00 PM", color: "bg-blue-500" },
                        { name: "James L.", subject: "Physics", time: "4:30 PM", color: "bg-green-500" },
                        { name: "Maria P.", subject: "English", time: "6:00 PM", color: "bg-purple-500" },
                      ].map(lesson => (
                        <div
                          key={lesson.name}
                          className="flex items-center justify-between py-2 px-3 rounded-lg bg-secondary/50"
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className={cn(
                                "w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-semibold",
                                lesson.color,
                              )}
                            >
                              {lesson.name.charAt(0)}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-foreground">{lesson.name}</p>
                              <p className="text-xs text-muted-foreground">{lesson.subject}</p>
                            </div>
                          </div>
                          <span className="text-xs text-muted-foreground">{lesson.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== PROBLEM ===================== */}
      <section className="py-20 lg:py-28 bg-secondary/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Tutors shouldn&apos;t need five tools to run their business.
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-12">
            You&apos;re great at teaching. But managing the business around it? That&apos;s where things get messy.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: HiOutlineXCircle,
                title: "Spreadsheet chaos",
                desc: "Managing students across messy spreadsheets and notes apps",
              },
              {
                icon: HiOutlineXCircle,
                title: "Chat-based scheduling",
                desc: "Coordinating lesson times through endless WhatsApp messages",
              },
              {
                icon: HiOutlineXCircle,
                title: "Manual payment tracking",
                desc: "Losing track of who paid and who still owes you money",
              },
            ].map(problem => (
              <div
                key={problem.title}
                className="relative bg-card rounded-2xl border border-border p-6 text-left transition-all hover:shadow-lg hover:border-destructive/20"
              >
                <problem.icon className="h-8 w-8 text-destructive/70 mb-4" />
                <h3 className="text-base font-semibold text-foreground mb-2">{problem.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{problem.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== SOLUTION / FEATURES ===================== */}
      <section id="features" className="py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-success/10 text-success text-sm font-medium mb-6 border border-success/20">
            <HiOutlineCheckCircle className="h-4 w-4" />
            Everything in one place
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Everything you need in one simple place.
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-14">
            Three core features. Zero complexity. Just what tutors actually need.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: HiOutlineUserGroup,
                title: "Student Management",
                desc: "Keep all student information organized — contacts, subjects, rates, and notes in one clean profile.",
                color: "bg-blue-500/10 text-blue-500",
                border: "hover:border-blue-500/30",
              },
              {
                icon: HiOutlineCalendar,
                title: "Lesson Scheduling",
                desc: "Schedule and track upcoming lessons. Mark them complete, add notes, and never double-book again.",
                color: "bg-green-500/10 text-green-500",
                border: "hover:border-green-500/30",
              },
              {
                icon: HiOutlineCreditCard,
                title: "Payment Tracking",
                desc: "See who has paid and who hasn't. Record payments instantly and know your outstanding balance.",
                color: "bg-purple-500/10 text-purple-500",
                border: "hover:border-purple-500/30",
              },
            ].map(feature => (
              <div
                key={feature.title}
                className={cn(
                  "relative bg-card rounded-2xl border border-border p-8 text-left",
                  "transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
                  feature.border,
                )}
              >
                <div className={cn("inline-flex p-3 rounded-xl mb-5", feature.color)}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== PRODUCT PREVIEW ===================== */}
      <section id="preview" className="py-20 lg:py-28 bg-secondary/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">A dashboard that makes sense.</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              See your entire teaching business at a glance — upcoming lessons, student info, and payments all in one
              view.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Upcoming lessons card */}
            <div className="bg-card rounded-2xl border border-border p-6 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <HiOutlineCalendar className="h-5 w-5 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">Upcoming Lessons</h3>
              </div>
              <div className="space-y-3">
                {[
                  { name: "Sarah", time: "Today, 2 PM", badge: "Math" },
                  { name: "James", time: "Today, 4 PM", badge: "Physics" },
                  { name: "Maria", time: "Tomorrow, 10 AM", badge: "English" },
                ].map(l => (
                  <div key={l.name} className="flex items-center justify-between py-2 px-3 bg-secondary/50 rounded-xl">
                    <div>
                      <p className="text-sm font-medium text-foreground">{l.name}</p>
                      <p className="text-xs text-muted-foreground">{l.time}</p>
                    </div>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                      {l.badge}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Students card */}
            <div className="bg-card rounded-2xl border border-border p-6 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <HiOutlineUserGroup className="h-5 w-5 text-blue-500" />
                <h3 className="text-sm font-semibold text-foreground">Students</h3>
              </div>
              <div className="space-y-3">
                {[
                  { name: "Sarah K.", subject: "Mathematics", rate: "$30/hr" },
                  { name: "James L.", subject: "Physics", rate: "$25/hr" },
                  { name: "Maria P.", subject: "English", rate: "$28/hr" },
                ].map(s => (
                  <div key={s.name} className="flex items-center justify-between py-2 px-3 bg-secondary/50 rounded-xl">
                    <div>
                      <p className="text-sm font-medium text-foreground">{s.name}</p>
                      <p className="text-xs text-muted-foreground">{s.subject}</p>
                    </div>
                    <span className="text-xs font-medium text-foreground">{s.rate}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment summary card */}
            <div className="bg-card rounded-2xl border border-border p-6 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <HiOutlineCreditCard className="h-5 w-5 text-green-500" />
                <h3 className="text-sm font-semibold text-foreground">Payments</h3>
              </div>
              <div className="space-y-4">
                <div className="text-center py-3 bg-success/10 rounded-xl">
                  <p className="text-xs text-muted-foreground">This Month</p>
                  <p className="text-2xl font-bold text-success">$1,240</p>
                </div>
                <div className="text-center py-3 bg-warning/10 rounded-xl">
                  <p className="text-xs text-muted-foreground">Outstanding</p>
                  <p className="text-2xl font-bold text-warning">$180</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== HOW IT WORKS ===================== */}
      <section id="how-it-works" className="py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Up and running in minutes.</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-14">
            Three steps. No onboarding. No training. Just start.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "1",
                icon: HiOutlineUserGroup,
                title: "Add your students",
                desc: "Create profiles with names, subjects, and rates. Takes seconds.",
                color: "from-blue-500 to-indigo-500",
              },
              {
                step: "2",
                icon: HiOutlineCalendar,
                title: "Schedule lessons",
                desc: "Pick a student, set a date and time, done. Your calendar, simplified.",
                color: "from-green-500 to-emerald-500",
              },
              {
                step: "3",
                icon: HiOutlineClock,
                title: "Track payments & notes",
                desc: "Record payments, add lesson notes, and always know where you stand.",
                color: "from-purple-500 to-pink-500",
              },
            ].map((item, i) => (
              <div key={item.step} className="relative">
                {/* Step number */}
                <div
                  className={cn(
                    "w-12 h-12 rounded-2xl bg-linear-to-br text-white font-bold text-lg",
                    "flex items-center justify-center mx-auto mb-6 shadow-lg",
                    item.color,
                  )}
                >
                  {item.step}
                </div>
                {/* Connector line */}
                {i < 2 && (
                  <div className="hidden md:block absolute top-6 left-[calc(50%+32px)] w-[calc(100%-64px)] h-0.5 bg-border" />
                )}
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== FINAL CTA ===================== */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Start running your tutoring business <span className="gradient-text">the easy way.</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Join tutors who have ditched the spreadsheets. Free to start, no credit card required.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center justify-center h-14 px-10 text-lg font-semibold rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-xl shadow-primary/30 active:scale-[0.98] gap-2"
          >
            Start Free
            <HiOutlineArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
