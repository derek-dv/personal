import Link from "next/link";
import TypingAnimation from "@/components/TypingAnimation";
import { ArrowRight, Download } from "lucide-react";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

export default function Home() {
  return (
    <div className="flex flex-col justify-center min-h-[calc(100vh-16rem)] max-w-3xl mx-auto space-y-8 animate-fade-up in-view">
      <div className="space-y-4">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-[var(--foreground)]">
          Engineering intelligent systems with <TypingAnimation />
        </h1>
        <p className="text-lg md:text-xl text-[var(--muted-foreground)] leading-relaxed max-w-2xl">
          I'm Derek David, a Machine Learning and Full-Stack Software Engineer. With 4+ years of production experience, I specialize in building highly resilient distributed systems, data pipelines, and integrating deep learning models into applications.
        </p>
      </div>

      <div className="flex flex-wrap gap-4 pt-4">
        <Link 
          href="/projects"
          className="inline-flex items-center gap-2 bg-[var(--foreground)] text-[var(--background)] px-6 py-3 rounded-md font-medium hover:bg-[var(--foreground)]/90 transition-colors"
        >
          View Projects
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link 
          href="/about"
          className="inline-flex items-center gap-2 bg-transparent text-[var(--foreground)] border border-[var(--border)] px-6 py-3 rounded-md font-medium hover:bg-[var(--muted)] transition-colors"
        >
          About Me
        </Link>
      </div>

      <div className="flex items-center gap-6 pt-12 border-t border-[var(--border)]">
        <a href="https://github.com/derek-dv" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
          <GithubIcon className="w-5 h-5" />
          GitHub
        </a>
        <a href="https://linkedin.com/in/derek-dv" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
          <LinkedinIcon className="w-5 h-5" />
          LinkedIn
        </a>
        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
          <Download className="w-5 h-5" />
          Resume
        </a>
      </div>
    </div>
  );
}
