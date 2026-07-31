import { Metadata } from "next";
import { Server, Database, Code, Cpu } from "lucide-react";

export const metadata: Metadata = {
  title: "About | Derek David",
  description: "Background, education, and core competencies of Derek David.",
};

export default function AboutPage() {
  const skills = [
    {
      category: "Machine Learning",
      icon: <Cpu className="w-5 h-5 text-[var(--accent)]" />,
      items: ["PyTorch", "CNNs", "LSTMs", "Deep Learning", "LLM APIs (Gemini)"],
    },
    {
      category: "Languages",
      icon: <Code className="w-5 h-5 text-[var(--accent)]" />,
      items: ["Python", "TypeScript", "JavaScript (ES6+)"],
    },
    {
      category: "Data & Backend",
      icon: <Database className="w-5 h-5 text-[var(--accent)]" />,
      items: ["Node.js", "Express.js", "PostgreSQL", "MongoDB", "Redis", "Prisma", "REST", "GraphQL"],
    },
    {
      category: "Messaging & Pipelines",
      icon: <Cpu className="w-5 h-5 text-[var(--accent)]" />,
      items: ["Kafka", "RabbitMQ", "BullMQ"],
    },
    {
      category: "DevOps & Infrastructure",
      icon: <Server className="w-5 h-5 text-[var(--accent)]" />,
      items: ["Docker", "Kubernetes", "AWS", "Azure", "CI/CD", "GitHub Actions"],
    },
    {
      category: "Frontend",
      icon: <Code className="w-5 h-5 text-[var(--accent)]" />,
      items: ["React.js", "Next.js 15", "Vue.js", "Redux", "Tailwind CSS"],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-16 animate-fade-up in-view">
      {/* Background & Bio */}
      <section className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">About Me</h1>
        <div className="prose prose-zinc dark:prose-invert max-w-none text-lg text-[var(--muted-foreground)] leading-relaxed space-y-4">
          <p>
            I am a Machine Learning Engineer with a strong full-stack foundation. With 4+ years of production experience designing scalable web systems, I am leveraging my expertise in distributed architectures and data pipelines to productionize deep learning models and AI-driven applications.
          </p>
          <p>
            Having completed the Deep Learning Specialization (DeepLearning.AI) and the Deep Learning Nanodegree (Udacity), and currently pursuing an MSc in Computer Science, I continuously seek to deepen my theoretical foundation in AI while maintaining my practical engineering skills.
          </p>
        </div>
      </section>

      {/* Core Competencies */}
      <section className="space-y-8">
        <h2 className="text-2xl font-semibold tracking-tight border-b border-[var(--border)] pb-2">Core Competencies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((skill) => (
            <div key={skill.category} className="p-6 border border-[var(--border)] rounded-lg bg-[var(--card)] shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                {skill.icon}
                <h3 className="font-semibold text-lg">{skill.category}</h3>
              </div>
              <ul className="flex flex-wrap gap-2">
                {skill.items.map((item) => (
                  <li 
                    key={item} 
                    className="px-3 py-1 bg-[var(--muted)] text-[var(--foreground)] text-sm font-mono rounded-md border border-[var(--border)]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight border-b border-[var(--border)] pb-2">Education</h2>
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-baseline justify-between border-l-2 border-[var(--border)] pl-4">
            <div>
              <h3 className="font-semibold text-lg">MSc Computer Science</h3>
              <p className="text-[var(--muted-foreground)]">Gombe State University</p>
            </div>
            <span className="text-sm font-mono text-[var(--muted-foreground)] mt-1 md:mt-0">2026 – Present</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-baseline justify-between border-l-2 border-[var(--border)] pl-4">
            <div>
              <h3 className="font-semibold text-lg">Deep Learning Specialization</h3>
              <p className="text-[var(--muted-foreground)]">DeepLearning.AI (Coursera)</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-baseline justify-between border-l-2 border-[var(--border)] pl-4">
            <div>
              <h3 className="font-semibold text-lg">Deep Learning Nanodegree</h3>
              <p className="text-[var(--muted-foreground)]">Udacity</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-baseline justify-between border-l-2 border-[var(--border)] pl-4">
            <div>
              <h3 className="font-semibold text-lg">BSc Computer Science</h3>
              <p className="text-[var(--muted-foreground)]">Gombe State University</p>
            </div>
            <span className="text-sm font-mono text-[var(--muted-foreground)] mt-1 md:mt-0">Aug 2017 – Aug 2021</span>
          </div>
        </div>
      </section>
    </div>
  );
}
