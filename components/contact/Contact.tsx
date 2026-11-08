"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import { MessageSquare, Send, CheckCircle, Loader2 } from "lucide-react";
import { site } from "@/content/site";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type FormErrors = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
};

export function Contact() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "sent">("idle");

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    if (!form.name.trim()) next.name = "Name is required";
    if (!form.email.trim()) {
      next.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Enter a valid email address";
    }
    if (!form.subject.trim()) next.subject = "Subject is required";
    if (!form.message.trim()) next.message = "Message is required";
    else if (form.message.trim().length < 10) next.message = "Message must be at least 10 characters";
    return next;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, subject: form.subject, message: form.message }),
      });
      if (!res.ok) throw new Error("Failed to send");
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("idle");
      setErrors({ message: "Could not send your message. Please try again." });
    }
  };

  return (
    <section id="contact" className="scroll-mt-24 px-5 py-20 md:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-[11px] tracking-[0.32em] text-accent uppercase">
          Contact
        </p>
        <h2 className="mt-4 max-w-3xl font-display text-4xl text-ink sm:text-5xl">
          Send a short note — I{"'"}ll reply within a day.
        </h2>
        <p className="mt-3 max-w-xl text-lg leading-relaxed text-muted">
          Tell me about your project, a role you{"'"}re considering, or anything
          you{"'"}d like to work on together. I read every message.
        </p>

        <div className="mt-12 max-w-xl">
          {status === "sent" ? (
            <div
              role="status"
              className="rounded-md border border-line bg-elevated p-6 text-center"
            >
              <CheckCircle className="mx-auto size-6 text-accent" />
              <p className="mt-3 font-mono text-[11px] tracking-[0.18em] text-accent uppercase">
                Sent
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink">
                Thanks for reaching out. I{"'"}ll reply to{" "}
                <span className="font-mono text-sm text-accent">{form.email}</span>
                {" within 24 hours."}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="flex flex-col gap-5">
                <div>
                  <label
                    htmlFor="name"
                    className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-md border border-line bg-elevated px-4 py-3 font-mono text-sm text-ink placeholder:text-muted/60 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500" role="alert">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-md border border-line bg-elevated px-4 py-3 font-mono text-sm text-ink placeholder:text-muted/60 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={form.subject}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-md border border-line bg-elevated px-4 py-3 font-mono text-sm text-ink placeholder:text-muted/60 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                    placeholder="Project, role, or question"
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-500" role="alert">
                      {errors.subject}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={form.message}
                    onChange={handleChange}
                    className="mt-2 w-full resize-y rounded-md border border-line bg-elevated px-4 py-3 font-mono text-sm text-ink placeholder:text-muted/60 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                    placeholder="What would you like to work on?"
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500" role="alert">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-accent px-6 py-3 font-mono text-[11px] tracking-[0.18em] text-ink uppercase transition hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Sending
                    </>
                  ) : (
                    <>
                      <Send className="size-4" />
                      Send message
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="mt-12 border-t border-line pt-12">
          <p className="font-mono text-[11px] tracking-[0.28em] text-muted">
            Or reach out on social
          </p>
          <div className="mt-4 flex flex-wrap gap-4">
            {[
              { label: "github.com/Pmvista", href: site.contact.github },
              { label: "linkedin.com/in/pierre-mvita", href: site.contact.linkedin },
              { label: site.contact.email, href: `mailto:${site.contact.email}` },
            ].map(({ label, href }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 font-mono text-sm text-ink hover:text-accent"
              >
                <MessageSquare className="size-3.5" />
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
