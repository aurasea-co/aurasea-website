"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "./Button";

export function ContactForm() {
  const t = useTranslations("contact.form");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const body = encodeURIComponent(
      `From: ${name} <${email}>\n\n${message}`,
    );
    const subj = encodeURIComponent(subject || "Hello");
    window.location.href = `mailto:hello@aurasea.ai?subject=${subj}&body=${body}`;
  }

  const inputClasses =
    "w-full rounded-lg border border-black/10 bg-brand-white px-3 py-2.5 text-base text-brand-body focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/30";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor="cf-name"
            className="mb-1 block text-sm font-medium text-brand-navy"
          >
            {t("name")}
          </label>
          <input
            id="cf-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClasses}
          />
        </div>
        <div>
          <label
            htmlFor="cf-email"
            className="mb-1 block text-sm font-medium text-brand-navy"
          >
            {t("email")}
          </label>
          <input
            id="cf-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClasses}
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="cf-subject"
          className="mb-1 block text-sm font-medium text-brand-navy"
        >
          {t("subject")}
        </label>
        <input
          id="cf-subject"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className={inputClasses}
        />
      </div>
      <div>
        <label
          htmlFor="cf-message"
          className="mb-1 block text-sm font-medium text-brand-navy"
        >
          {t("message")}
        </label>
        <textarea
          id="cf-message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={inputClasses}
        />
      </div>
      <Button type="submit" size="lg">
        {t("submit")}
      </Button>
    </form>
  );
}
