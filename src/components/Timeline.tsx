"use client";

import { useEffect, useRef } from "react";
import { Building2 } from "lucide-react";

type TimelineItem = {
  id: string;
  date: string;
  role: string;
  company: string;
  description: string;
  tags: string[];
};

const timelineData: TimelineItem[] = [
  {
    id: "cifar10",
    date: "2025 (Self-Directed)",
    role: "ML Engineer",
    company: "CIFAR-10 Image Classifier",
    description: "Built and trained a convolutional neural network from scratch in PyTorch. Executed structured model evaluation on Kaggle P100 and Colab T4 GPU environments.",
    tags: ["[PyTorch]", "[CNNs]", "[Deep Learning]"],
  },
  {
    id: "resumepro",
    date: "2026 – Present",
    role: "Full-Stack Architect",
    company: "ResumePro Platform",
    description: "Integrated the Google Gemini API to deliver AI-driven CV scoring and formatting suggestions within a job-tracking pipeline. Designed a robust data layer leveraging PostgreSQL and Prisma.",
    tags: ["[Next.js 15]", "[Gemini API]", "[BullMQ]"],
  },
  {
    id: "praix",
    date: "Aug 2025 – Present",
    role: "Full-Stack Developer",
    company: "Praix Development LTD",
    description: "Spearheaded development of scalable, data-intensive web applications using modern routing and server-side rendering. Engineered resilient RESTful APIs and managed complex relational and document data schemas.",
    tags: ["[Next.js 15 / Node.js]", "[PostgreSQL / MongoDB]", "[Docker / CI/CD]"],
  },
  {
    id: "novapay",
    date: "2023 – 2024",
    role: "Backend Systems Engineer",
    company: "NovaPay Fintech Wallet",
    description: "Designed a distributed microservices fintech wallet featuring a strict double-entry ledger architecture. Orchestrated complex distributed transactions using sagas over high-throughput event streams.",
    tags: ["[Kafka / RabbitMQ]", "[Microservices]", "[Node.js / PostgreSQL]"],
  },
  {
    id: "connectivo",
    date: "Feb 2025 – Aug 2025",
    role: "Full-Stack Developer",
    company: "Connectivo AB",
    description: "Architected high-performance web applications with a focus on seamless frontend-to-backend data flow. Led targeted UI/UX redesigns across core product surfaces to significantly enhance user retention.",
    tags: ["[React / Vue.js]", "[28% Perf. Boost]", "[UI/UX Redesign]"],
  },
  {
    id: "haven",
    date: "2020 – 2021",
    role: "Full-Stack Developer",
    company: "Haven & Hearth Real Estate",
    description: "Developed a comprehensive real estate platform with advanced property filtering and interactive map integrations. Built reliable backend services for managing saved search alerts and real-time data updates.",
    tags: ["[React.js]", "[Node.js]", "[MongoDB]"],
  },
  {
    id: "lstm",
    date: "2021",
    role: "Undergraduate ML Researcher",
    company: "LSTM Stock Price Prediction",
    description: "Built and evaluated a Long Short-Term Memory network for time-series stock price forecasting as part of a final-year project. Focused on rigorous model evaluation and data preprocessing.",
    tags: ["[LSTMs]", "[Machine Learning]", "[Time-Series]"],
  },
  {
    id: "sky",
    date: "Dec 2022 – Feb 2025",
    role: "Full-Stack Developer",
    company: "Sky Enterprise",
    description: "Built robust web applications that drastically reduced manual business workloads and optimized efficiency. Deployed highly-available containerised microservices to streamline the deployment lifecycle.",
    tags: ["[MERN Stack]", "[Docker]", "[40% Faster Queries]"],
  },
  {
    id: "manaknight",
    date: "Jan 2021 – Dec 2022",
    role: "Node.js Developer",
    company: "Manaknight Inc.",
    description: "Built scalable backend systems in Node.js and PostgreSQL for mobile applications serving thousands of active users. Designed highly normalized database schemas that optimized data retrieval throughput.",
    tags: ["[Node.js]", "[PostgreSQL]", "[API Integration]"],
  },
];

function TimelineNode({ item, index }: { item: TimelineItem; index: number }) {
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (nodeRef.current) {
      observer.observe(nodeRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const isEven = index % 2 === 0;

  return (
    <div
      ref={nodeRef}
      className={`relative flex flex-col md:flex-row w-full animate-fade-up ${
        isEven ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Timeline Center Dot (Desktop) / Left Dot (Mobile) */}
      <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-[var(--background)] border-2 border-[var(--accent)] transform -translate-x-[7px] md:-translate-x-1/2 mt-6 md:mt-1.5 z-10 shadow-sm" />

      {/* Spacer for empty side on desktop */}
      <div className="hidden md:block md:w-1/2" />

      {/* Content Card */}
      <div className={`w-full pl-8 md:pl-0 md:w-1/2 ${isEven ? "md:pr-12" : "md:pl-12"} pt-4 md:pt-0`}>
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <div className="sticky top-20 z-20 w-fit inline-block mb-2">
                <span className="font-mono text-sm font-semibold text-[var(--accent)] bg-[var(--card)] py-1">
                  {item.date}
                </span>
              </div>
              <h3 className="text-xl font-bold text-[var(--foreground)] tracking-tight">
                {item.role}
              </h3>
              <div className="flex items-center gap-2 text-[var(--muted-foreground)] mt-1 font-medium">
                <div className="w-6 h-6 rounded bg-[var(--muted)] border border-[var(--border)] flex items-center justify-center shrink-0">
                  <Building2 className="w-3.5 h-3.5 text-[var(--muted-foreground)]" />
                </div>
                <span>{item.company}</span>
              </div>
            </div>
          </div>
          
          <p className="text-[var(--muted-foreground)] leading-relaxed mb-6">
            {item.description}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag, i) => (
              <span
                key={i}
                className="font-mono text-xs font-semibold px-2.5 py-1 rounded bg-[var(--muted)] text-[var(--foreground)] border border-[var(--border)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Timeline() {
  return (
    <div className="relative w-full max-w-5xl mx-auto py-8">
      {/* Vertical Line */}
      <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[2px] bg-[var(--border)] transform translate-x-1.5 md:-translate-x-1/2" />
      
      <div className="space-y-12 md:space-y-24">
        {timelineData.map((item, index) => (
          <TimelineNode key={item.id} item={item} index={index} />
        ))}
      </div>
    </div>
  );
}
