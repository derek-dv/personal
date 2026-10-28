"use client";

import React, { useState } from "react";
import { PROFILE } from "@/data/portfolioData";
import { Win7MailIcon, GithubIcon, LinkedinIcon } from "./Win7Icons";
import { Send, MapPin, Mail, CheckCircle2 } from "lucide-react";
import { playWin7Sound } from "@/utils/win7Sounds";

interface ContactMailWindowProps {
  onOpenBrowser?: (site: "github" | "linkedin") => void;
}

export default function ContactMailWindow({ onOpenBrowser }: ContactMailWindowProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("Opportunity / Engineering Inquiry");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playWin7Sound("balloon", 0.65);
    const mailtoUrl = `mailto:${PROFILE.email}?subject=${encodeURIComponent(
      `${subject} (from ${name})`
    )}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    )}`;
    window.location.href = mailtoUrl;
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#FFFFFF] text-[12px] font-sans overflow-hidden">
      {/* Windows Live Mail Ribbon / Command Bar */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-gradient-to-b from-[#F5F9FD] via-[#E3EFFA] to-[#D5E5F5] border-b border-[#B0C4DA] shrink-0">
        <div className="flex items-center gap-2">
          <Win7MailIcon className="w-5 h-5" />
          <span className="font-semibold text-[#183B61]">
            Windows Live Mail — New Message to Derek David
          </span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-[#3E5C7A]">
          <button
            type="button"
            onClick={() => onOpenBrowser?.("github")}
            className="win7-cmd-btn px-2 py-0.5 rounded-[2px] flex items-center gap-1"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>GitHub (IE9)</span>
          </button>
          <button
            type="button"
            onClick={() => onOpenBrowser?.("linkedin")}
            className="win7-cmd-btn px-2 py-0.5 rounded-[2px] flex items-center gap-1"
          >
            <LinkedinIcon className="w-3.5 h-3.5" />
            <span>LinkedIn (IE9)</span>
          </button>
        </div>
      </div>

      {/* Main Split Body */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-12 min-h-0 overflow-y-auto">
        {/* Left Contact Card Info */}
        <div className="md:col-span-5 bg-[#F4F8FC] border-b md:border-b-0 md:border-r border-[#CFDDEC] p-4 space-y-4">
          <div>
            <h2 className="text-[15px] font-bold text-[#143558] mb-1">
              Get in Touch
            </h2>
            <p className="text-[#455B70] leading-relaxed text-[12px]">
              Senior Full-Stack &amp; AI Systems Engineer open to impactful roles in Voice AI, Fintech Systems, High-Concurrency Backend Architecture, and Full-Stack Web/Mobile Engineering.
            </p>
          </div>

          <div className="space-y-3 pt-2 border-t border-[#DAE6F2]">
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-[3px] bg-white border border-[#B8CDE2] flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4 text-[#1E5C9A]" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] text-[#5B7085] font-semibold">
                  Direct Email &amp; Phone
                </div>
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="text-[#154A82] font-medium hover:underline break-all block"
                >
                  {PROFILE.email}
                </a>
                <span className="text-[#3C556E] text-[11px] font-mono">
                  {PROFILE.phone} • derekcodes.online
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-[3px] bg-white border border-[#B8CDE2] flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-[#1E5C9A]" />
              </div>
              <div>
                <div className="text-[11px] text-[#5B7085] font-semibold">
                  Location &amp; Availability
                </div>
                <div className="text-[#1F3449] font-medium">
                  Available for Remote Work worldwide.
                  <br />
                  Based in Nigeria.
                </div>
              </div>
            </div>
          </div>

          {submitted && (
            <div className="p-3 rounded-[3px] bg-[#E8F7EE] border border-[#82C99B] text-[#1A5E35] flex items-center gap-2 text-[11.5px]">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>
                Your email client has been opened with your message addressed to{" "}
                <strong>{PROFILE.email}</strong>.
              </span>
            </div>
          )}
        </div>

        {/* Right Email Composer Form */}
        <form
          onSubmit={handleSubmit}
          className="md:col-span-7 p-4 flex flex-col gap-3 bg-white"
        >
          {/* To Field (Readonly) */}
          <div className="flex items-center gap-2 pb-2 border-b border-[#E5EEF7]">
            <span className="w-16 text-right text-[#556B82] font-semibold">
              To:
            </span>
            <span className="px-2 py-0.5 bg-[#E6F2FE] border border-[#9EC5EB] rounded-[2px] text-[#143C66] font-mono text-[11.5px]">
              Derek David &lt;{PROFILE.email}&gt;
            </span>
          </div>

          {/* Sender Name */}
          <div className="flex items-center gap-2">
            <label
              htmlFor="win7-name"
              className="w-16 text-right text-[#556B82] font-semibold"
            >
              From:
            </label>
            <input
              id="win7-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Full Name"
              className="flex-1 px-2.5 py-1.5 border border-[#8FA6BF] rounded-[2px] focus:outline-none focus:border-[#3C7FB1] shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]"
            />
          </div>

          {/* Sender Email */}
          <div className="flex items-center gap-2">
            <label
              htmlFor="win7-email"
              className="w-16 text-right text-[#556B82] font-semibold"
            >
              Reply-To:
            </label>
            <input
              id="win7-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              className="flex-1 px-2.5 py-1.5 border border-[#8FA6BF] rounded-[2px] focus:outline-none focus:border-[#3C7FB1] shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]"
            />
          </div>

          {/* Subject */}
          <div className="flex items-center gap-2">
            <label
              htmlFor="win7-subject"
              className="w-16 text-right text-[#556B82] font-semibold"
            >
              Subject:
            </label>
            <input
              id="win7-subject"
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="flex-1 px-2.5 py-1.5 border border-[#8FA6BF] rounded-[2px] focus:outline-none focus:border-[#3C7FB1] shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]"
            />
          </div>

          {/* Message Body */}
          <div className="flex-1 flex flex-col pt-1">
            <textarea
              id="win7-message"
              required
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message here..."
              className="w-full flex-1 p-2.5 border border-[#8FA6BF] rounded-[2px] focus:outline-none focus:border-[#3C7FB1] shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)] resize-y"
            />
          </div>

          {/* Submit Action Row */}
          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              type="submit"
              className="win7-btn px-5 py-1.5 rounded-[3px] font-semibold text-[#153961] flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5 text-[#1B5E9E]" />
              <span>Send Message</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
