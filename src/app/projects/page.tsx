import { Metadata } from "next";
import Timeline from "@/components/Timeline";

export const metadata: Metadata = {
  title: "Projects & Experience | Derek David",
  description: "Professional experience and projects timeline of Derek David.",
};

export default function ProjectsPage() {
  return (
    <div className="w-full space-y-12">
      <div className="max-w-2xl mx-auto text-center space-y-4 animate-fade-up in-view">
        <h1 className="text-3xl font-bold tracking-tight">Experience & Projects</h1>
        <p className="text-[var(--muted-foreground)] leading-relaxed">
          A timeline of my professional roles and key engineering projects, focusing on scalable backend architectures, robust data pipelines, and performant user interfaces.
        </p>
      </div>

      <div className="w-full pb-16">
        <Timeline />
      </div>
    </div>
  );
}
