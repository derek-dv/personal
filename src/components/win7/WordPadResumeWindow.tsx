"use client";

import React, { useState } from "react";
import { PROFILE, SKILLS, EDUCATION, TIMELINE_ITEMS } from "@/data/portfolioData";
import { Win7NotepadIcon, Win7PdfIcon } from "./Win7Icons";
import {
  Download,
  Printer,
  ZoomIn,
  ZoomOut,
  FileText,
  Eye,
  AlignLeft,
  Bold,
  Italic,
  Underline,
} from "lucide-react";
import { playWin7Sound } from "@/utils/win7Sounds";

interface WordPadResumeWindowProps {
  onOpenBrowser?: (site: "github" | "linkedin") => void;
}

export default function WordPadResumeWindow({
  onOpenBrowser,
}: WordPadResumeWindowProps) {
  const [viewMode, setViewMode] = useState<"wordpad" | "pdf">("wordpad");
  const [zoom, setZoom] = useState<number>(100);

  const handleZoomIn = () => setZoom((z) => Math.min(130, z + 10));
  const handleZoomOut = () => setZoom((z) => Math.max(80, z - 10));

  const experienceRoles = TIMELINE_ITEMS.filter((i) => i.type === "Experience");
  const keyProjects = TIMELINE_ITEMS.filter((i) => i.type !== "Experience");

  return (
    <div className="flex flex-col h-full w-full bg-[#DFE9F5] text-[12px] font-sans overflow-hidden select-text">
      {/* 1. Windows 7 WordPad Ribbon Tabs Strip */}
      <div className="flex items-center justify-between px-2 pt-1 bg-gradient-to-b from-[#EEF5FC] to-[#DCE8F7] border-b border-[#B6C8DC] select-none shrink-0">
        <div className="flex items-center gap-1">
          {/* Blue WordPad Application Menu Button */}
          <a
            href={PROFILE.resumeUrl}
            download="Derek_David_Resume.pdf"
            onClick={() => playWin7Sound("nav", 0.5)}
            title="Download Resume.pdf"
            className="px-3 py-1 rounded-t-[3px] bg-gradient-to-b from-[#3B8CE2] via-[#1E69DE] to-[#134DA8] text-white font-semibold text-[11.5px] border border-[#10408E] shadow-xs flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Save PDF</span>
          </a>

          <button
            type="button"
            onClick={() => {
              playWin7Sound("nav", 0.45);
              setViewMode("wordpad");
            }}
            className={`px-3.5 py-1 rounded-t-[3px] text-[11.5px] font-medium border border-b-0 transition-colors ${
              viewMode === "wordpad"
                ? "bg-[#F5F9FD] border-[#AABCCF] text-[#143558]"
                : "bg-transparent border-transparent text-[#3B5570] hover:bg-white/50"
            }`}
          >
            Home (WordPad Document)
          </button>

          <button
            type="button"
            onClick={() => {
              playWin7Sound("nav", 0.45);
              setViewMode("pdf");
            }}
            className={`px-3.5 py-1 rounded-t-[3px] text-[11.5px] font-medium border border-b-0 transition-colors flex items-center gap-1.5 ${
              viewMode === "pdf"
                ? "bg-[#F5F9FD] border-[#AABCCF] text-[#143558]"
                : "bg-transparent border-transparent text-[#3B5570] hover:bg-white/50"
            }`}
          >
            <Eye className="w-3.5 h-3.5 text-[#D93829]" />
            <span>Original PDF Embed</span>
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-2 pr-2 pb-1 text-[11px] text-[#3F5973]">
          <Win7NotepadIcon className="w-4 h-4" />
          <span>Resume.pdf — WordPad</span>
        </div>
      </div>

      {/* 2. WordPad Scenic Ribbon Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-1.5 bg-gradient-to-b from-[#F7FAFE] via-[#EBF3FC] to-[#DCE9F7] border-b border-[#AFC3D8] select-none shrink-0">
        {/* Left Ribbon Groups: Font & Paragraph */}
        <div className="flex items-center gap-3 overflow-x-auto">
          {/* Font Group */}
          <div className="flex items-center gap-1.5 pr-3 border-r border-[#C5D6E8]">
            <div className="px-2 py-0.5 bg-white border border-[#9BB4CE] rounded-[2px] text-[11px] text-[#1E395B] font-serif">
              Cambria / Georgia
            </div>
            <div className="px-2 py-0.5 bg-white border border-[#9BB4CE] rounded-[2px] text-[11px] text-[#1E395B] font-mono">
              11 pt
            </div>
            <div className="hidden md:flex items-center gap-0.5 ml-1">
              <span className="p-1 rounded-[2px] bg-[#DCEBFC] border border-[#84B4E2] text-[#183B61]">
                <Bold className="w-3 h-3" />
              </span>
              <span className="p-1 rounded-[2px] hover:bg-white/70 text-[#3B5570]">
                <Italic className="w-3 h-3" />
              </span>
              <span className="p-1 rounded-[2px] hover:bg-white/70 text-[#3B5570]">
                <Underline className="w-3 h-3" />
              </span>
              <span className="p-1 rounded-[2px] bg-[#DCEBFC] border border-[#84B4E2] text-[#183B61]">
                <AlignLeft className="w-3 h-3" />
              </span>
            </div>
          </div>

          {/* View Mode Toggle Group */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setViewMode("wordpad")}
              className={`win7-cmd-btn px-2.5 py-1 rounded-[2px] text-[11px] flex items-center gap-1 ${
                viewMode === "wordpad" ? "bg-[#D9ECFF] border-[#7DA2CE] font-semibold" : ""
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-[#1B5E9E]" />
              <span>Print Layout</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("pdf")}
              className={`win7-cmd-btn px-2.5 py-1 rounded-[2px] text-[11px] flex items-center gap-1 ${
                viewMode === "pdf" ? "bg-[#D9ECFF] border-[#7DA2CE] font-semibold" : ""
              }`}
            >
              <Win7PdfIcon className="w-3.5 h-3.5" />
              <span>Raw PDF View</span>
            </button>
          </div>
        </div>

        {/* Right Ribbon Actions: Zoom, Print, Download */}
        <div className="flex items-center gap-1.5">
          {viewMode === "wordpad" && (
            <div className="hidden sm:flex items-center gap-1 mr-1">
              <button
                type="button"
                onClick={handleZoomOut}
                title="Zoom Out"
                className="win7-cmd-btn p-1 rounded-[2px] text-[#1E395B]"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[11px] font-mono text-[#1E395B] w-11 text-center">
                {zoom}%
              </span>
              <button
                type="button"
                onClick={handleZoomIn}
                title="Zoom In"
                className="win7-cmd-btn p-1 rounded-[2px] text-[#1E395B]"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={() => window.print()}
            title="Print Resume"
            className="win7-btn px-2.5 py-1 rounded-[2px] text-[11px] font-medium text-[#153961] flex items-center gap-1"
          >
            <Printer className="w-3.5 h-3.5 text-[#1B5E9E]" />
            <span className="hidden sm:inline">Print</span>
          </button>

          <a
            href={PROFILE.resumeUrl}
            download="Derek_David_Resume.pdf"
            className="win7-btn px-2.5 py-1 rounded-[2px] text-[11px] font-semibold text-[#153961] flex items-center gap-1"
          >
            <Download className="w-3.5 h-3.5 text-[#1B5E9E]" />
            <span>Download</span>
          </a>
        </div>
      </div>

      {/* 3. WordPad Horizontal Ruler Bar */}
      {viewMode === "wordpad" && (
        <div className="h-[22px] bg-[#ECF3FB] border-b border-[#B6C7DA] flex items-center justify-center px-4 select-none shrink-0 overflow-hidden">
          <div className="w-full max-w-[780px] h-[14px] bg-white border border-[#9BB0C7] rounded-[1px] flex items-center justify-between px-3 text-[9px] font-mono text-[#5B7085]">
            <span>1</span>
            <span>|</span>
            <span>2</span>
            <span>|</span>
            <span>3</span>
            <span>|</span>
            <span>4</span>
            <span>|</span>
            <span>5</span>
            <span>|</span>
            <span>6</span>
            <span>|</span>
            <span>7</span>
          </div>
        </div>
      )}

      {/* 4. Main Document Workspace (Gray/Blue Canvas with Centered A4 Pages OR Embedded PDF) */}
      {viewMode === "pdf" ? (
        <div className="flex-1 w-full h-full bg-[#525659] flex flex-col">
          <iframe
            src={`${PROFILE.resumeUrl}#toolbar=1&navpanes=0`}
            title="Derek David Resume PDF"
            className="w-full flex-1 border-0"
          />
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-3 sm:p-6 bg-[#CBD9EA] flex flex-col items-center gap-6">
          {/* A4 Paper Sheet */}
          <div
            style={{
              transform: `scale(${zoom / 100})`,
              transformOrigin: "top center",
            }}
            className="w-full max-w-[790px] bg-white border border-[#8E9FB2] shadow-[0_6px_20px_rgba(0,0,0,0.22)] px-5 sm:px-11 py-7 sm:py-10 text-[#111111] font-serif leading-snug transition-transform"
          >
            {/* Resume Header */}
            <header className="text-center border-b border-[#CCCCCC] pb-3 mb-4">
              <h1 className="text-2xl sm:text-[28px] font-normal tracking-wide uppercase text-[#000000]">
                {PROFILE.name}
              </h1>
              <div className="text-[13.5px] sm:text-[15px] font-bold text-[#111111] mt-0.5">
                {PROFILE.role}
              </div>
              <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[11px] sm:text-[11.5px] text-[#222222] mt-1.5 font-sans">
                <span>{PROFILE.phone}</span>
                <span>|</span>
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="underline hover:text-[#1B5E9E]"
                >
                  {PROFILE.email}
                </a>
                <span>|</span>
                <a
                  href={PROFILE.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-[#1B5E9E]"
                >
                  derekcodes.online
                </a>
                <span>|</span>
                <button
                  type="button"
                  onClick={() => onOpenBrowser?.("linkedin")}
                  className="underline hover:text-[#1B5E9E]"
                >
                  linkedin.com/in/derek-dv
                </button>
                <span>|</span>
                <button
                  type="button"
                  onClick={() => onOpenBrowser?.("github")}
                  className="underline hover:text-[#1B5E9E]"
                >
                  github.com/derek-dv
                </button>
              </div>
            </header>

            {/* Professional Summary */}
            <section className="mb-4">
              <h2 className="text-[12.5px] font-bold uppercase tracking-wider border-b border-[#222222] pb-0.5 mb-1.5 text-[#000000]">
                Professional Summary
              </h2>
              <p className="text-[11.5px] sm:text-[12px] text-[#1A1A1A] leading-relaxed">
                {PROFILE.summary}
              </p>
            </section>

            {/* Technical Skills */}
            <section className="mb-4">
              <h2 className="text-[12.5px] font-bold uppercase tracking-wider border-b border-[#222222] pb-0.5 mb-1.5 text-[#000000]">
                Technical Skills
              </h2>
              <div className="space-y-1 text-[11.5px] sm:text-[12px] text-[#1A1A1A]">
                {SKILLS.map((cat) => (
                  <div key={cat.id} className="leading-snug">
                    <span className="font-bold text-[#000000]">
                      {cat.category.replace(" & Mobile", "").replace(" & Distributed Systems", "").replace(" Systems", "").replace(" Infrastructure", "")}:{" "}
                    </span>
                    <span>{cat.items.join(", ")}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Experience */}
            <section className="mb-4">
              <h2 className="text-[12.5px] font-bold uppercase tracking-wider border-b border-[#222222] pb-0.5 mb-2 text-[#000000]">
                Experience
              </h2>
              <div className="space-y-3">
                {experienceRoles.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex items-baseline justify-between gap-2 text-[12px] font-bold text-[#000000]">
                      <span>{exp.role}</span>
                      <span className="shrink-0">{exp.date}</span>
                    </div>
                    <div className="flex items-baseline justify-between gap-2 text-[11.5px] italic text-[#222222] mb-1">
                      <span>{exp.company}</span>
                      <span>{exp.location}</span>
                    </div>
                    <ul className="list-disc pl-4 space-y-1 text-[11.5px] text-[#1A1A1A] leading-snug">
                      {exp.highlights.map((bullet, idx) => (
                        <li key={idx}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Key Projects */}
            <section className="mb-4">
              <h2 className="text-[12.5px] font-bold uppercase tracking-wider border-b border-[#222222] pb-0.5 mb-2 text-[#000000]">
                Key Projects
              </h2>
              <div className="space-y-3">
                {keyProjects.map((proj) => (
                  <div key={proj.id}>
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-[11.5px]">
                      <div>
                        <span className="font-bold text-[#000000]">
                          {proj.company}
                        </span>{" "}
                        <span className="text-[#444444]">|</span>{" "}
                        <span className="italic text-[#222222]">
                          {proj.tags.join(", ")}
                        </span>
                      </div>
                      {proj.date !== "Key Project" && (
                        <span className="font-bold text-[#000000] shrink-0">
                          {proj.date}
                        </span>
                      )}
                    </div>
                    <ul className="list-disc pl-4 space-y-1 text-[11.5px] text-[#1A1A1A] leading-snug mt-1">
                      {proj.highlights.map((bullet, idx) => (
                        <li key={idx}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Education */}
            <section>
              <h2 className="text-[12.5px] font-bold uppercase tracking-wider border-b border-[#222222] pb-0.5 mb-2 text-[#000000]">
                Education
              </h2>
              <div className="space-y-2">
                {EDUCATION.map((ed) => (
                  <div key={ed.id} className="text-[11.5px]">
                    <div className="flex items-baseline justify-between font-bold text-[#000000]">
                      <span>{ed.institution}</span>
                      <span>{ed.location}</span>
                    </div>
                    <div className="flex items-baseline justify-between italic text-[#222222]">
                      <span>{ed.degree}</span>
                      <span>{ed.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      )}

      {/* 5. WordPad Status Bar */}
      <div className="flex items-center justify-between px-3 py-1 bg-gradient-to-b from-[#F1F6FB] to-[#E1ECF7] border-t border-[#B8C9DC] text-[11px] text-[#354E68] select-none shrink-0">
        <div className="flex items-center gap-3">
          <span>Page 1 of 2</span>
          <span>•</span>
          <span>Document: Resume.pdf (Read-Only Print Layout)</span>
        </div>
        <div className="hidden sm:flex items-center gap-2 font-mono">
          <span>100% Authentic Resume Content</span>
        </div>
      </div>
    </div>
  );
}
