export interface ProjectOrRole {
  id: string;
  title: string;
  role: string;
  company: string;
  location?: string;
  date: string;
  type: "Experience" | "AI & Voice Project" | "Fintech & Full-Stack";
  size: string;
  extension: string;
  description: string;
  highlights: string[];
  tags: string[];
}

export interface SkillCategory {
  id: string;
  category: string;
  items: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  date: string;
  type: "Degree" | "Certification";
}

export const PROFILE = {
  name: "Derek David",
  username: "Derek David",
  role: "Senior Full-Stack & AI Systems Engineer",
  email: "derekmiracledavid@gmail.com",
  phone: "+234 708 602 0081",
  website: "https://derekcodes.online",
  location: "Nigeria / Remote Worldwide",
  github: "https://github.com/derek-dv",
  linkedin: "https://linkedin.com/in/derek-dv",
  resumeUrl: "/resume.pdf",
  experienceYears: "5+ years",
  summary:
    "Senior Full-Stack & AI Systems Engineer with 5+ years of experience architecting high-concurrency web, mobile, fintech, and voice AI platforms. Specialized in the TypeScript, React, Next.js, React Native, and Node.js ecosystem, with deep production expertise in atomic financial ledgers, real-time WebSocket audio streaming, LLM function calling, and distributed BullMQ/Redis workflows.",
  aboutParagraphs: [
    "I am a Senior Full-Stack & AI Systems Engineer with 5+ years of experience architecting high-concurrency web, mobile, fintech, and voice AI platforms. I specialize in the TypeScript, React (React 19), Next.js (App Router), React Native (Expo SDK 54), and Node.js (Express 5) ecosystem.",
    "My production work spans multi-tenant Voice AI & Telephony SaaS (ElevenLabs Conversational AI, OpenAI Realtime API, Twilio/Plivo/SIP over bidirectional WebSockets), fault-tolerant fintech & digital banking systems (Kobo-normalized double-entry ledgers, SHA-256 idempotency, Rubies BaaS, 5-gateway billing engines), and agentic LLM workflows powered by Google Gemini function calling and BullMQ/Redis.",
  ],
};

export const SKILLS: SkillCategory[] = [
  {
    id: "frontend",
    category: "Frontend & Mobile",
    items: [
      "JavaScript (ES6+)",
      "TypeScript",
      "React.js (React 19)",
      "Next.js (App Router)",
      "React Native (Expo SDK 54)",
      "Kotlin (Android IME)",
      "Flutter",
      "Redux Toolkit",
      "TanStack Query",
      "ReactFlow",
      "Vue.js",
      "Tailwind CSS",
      "Shadcn UI / Radix UI",
    ],
  },
  {
    id: "backend",
    category: "Backend & Distributed Systems",
    items: [
      "Node.js",
      "Express.js (v5)",
      "RESTful APIs",
      "GraphQL",
      "WebSockets (Socket.io / ws)",
      "BullMQ",
      "Microservices",
      "Idempotency & Atomic Ledgers",
      "HMAC Cryptographic Webhooks",
      "Twilio / Plivo / SIP Trunking",
    ],
  },
  {
    id: "ai-fintech",
    category: "AI & Fintech Systems",
    items: [
      "Google Gemini API (Function Calling)",
      "OpenAI Realtime & Agents SDK",
      "ElevenLabs Conversational AI",
      "RAG & Vector Chunking",
      "Kobo-Normalized Double-Entry Ledgers",
      "BaaS Integration (Rubies API)",
      "Multi-Gateway Billing (Stripe, Paystack, PayPal, Razorpay, MercadoPago)",
    ],
  },
  {
    id: "databases-cloud",
    category: "Databases & Cloud Infrastructure",
    items: [
      "PostgreSQL (Prisma & Drizzle ORM)",
      "Redis",
      "MongoDB",
      "MySQL",
      "AWS",
      "Azure",
      "Docker",
      "Kubernetes",
      "Nginx",
      "CI/CD",
    ],
  },
];

export const EDUCATION: EducationItem[] = [
  {
    id: "msc",
    degree: "Master of Science in Computer Science",
    institution: "Gombe State University",
    location: "Nigeria",
    date: "Apr 2026 – 2027",
    type: "Degree",
  },
  {
    id: "bsc",
    degree: "Bachelor of Science in Computer Science",
    institution: "Gombe State University",
    location: "Nigeria",
    date: "Aug 2017 – Aug 2021",
    type: "Degree",
  },
];

export const TIMELINE_ITEMS: ProjectOrRole[] = [
  {
    id: "praix",
    title: "Praix_Development_LTD.exe",
    role: "Full-Stack & AI Systems Engineer",
    company: "Praix Development LTD",
    location: "Remote",
    date: "Aug 2025 – Present",
    type: "Experience",
    size: "24,850 KB",
    extension: "Production Role",
    description:
      "Architecting PraixAI (AgentLabs Core) multi-tenant Voice AI & Bulk Calling SaaS and spearheading the Dora 5-project AI Fintech & Digital Banking monorepo.",
    highlights: [
      "Architected PraixAI (AgentLabs Core), a multi-tenant Voice AI & Bulk Calling SaaS integrating ElevenLabs Conversational AI and OpenAI Realtime APIs with Twilio, Plivo, and SIP trunks over bidirectional WebSocket audio streams.",
      "Engineered a ReactFlow drag-and-drop conversation builder and backend state-machine compiler that translates visual node graphs into deterministic LLM instructions and live mid-call webhook tools (RAG lookup, appointment booking, CRM capture).",
      "Spearheaded the Dora Fintech ecosystem across a 5-project monorepo (Node.js/Express 5, React Native/Expo, Next.js 16, and a native Kotlin Android IME keyboard), enabling in-keyboard P2P and bank transfers via Rubies BaaS.",
      "Designed a fault-tolerant financial pipeline featuring Kobo-normalized integer ledgers, SHA-256 request-hashing idempotency middleware, 4-tier KYC limit enforcement, and 5-minute BullMQ reconciliation sweep workers.",
      "Built a multi-turn agentic banking assistant powered by Google Gemini 3.1 Flash Lite with 6 function-calling tools and bcrypt PIN validation, alongside a 5-gateway billing engine (Stripe, Paystack, PayPal, Razorpay, MercadoPago) using PostgreSQL advisory locks.",
    ],
    tags: [
      "TypeScript",
      "Next.js 16",
      "Node.js / Express 5",
      "ElevenLabs AI",
      "OpenAI Realtime",
      "Gemini 3.1 Flash Lite",
      "React Native (Expo 54)",
      "Kotlin IME",
      "PostgreSQL (Prisma & Drizzle)",
      "Redis / BullMQ",
    ],
  },
  {
    id: "dora",
    title: "Dora_AI_Fintech_Ecosystem.sln",
    role: "Lead Systems & AI Architect",
    company: "Dora – Multi-Channel AI Fintech & Digital Banking Ecosystem",
    location: "Monorepo (5 Projects)",
    date: "Jan 2026 – Oct 2026",
    type: "Fintech & Full-Stack",
    size: "19,420 KB",
    extension: "Fintech Monorepo",
    description:
      "Multi-channel AI fintech & digital banking ecosystem spanning Node.js (Express 5), React Native (Expo SDK 54), Next.js 16 (React 19), native Kotlin Android IME keyboard, and Google Gemini AI.",
    highlights: [
      "Engineered a fault-tolerant Node.js/Express 5 and PostgreSQL (Prisma) banking ledger using Kobo-normalized integer math, deduct-first balance patterns, and atomic database transactions ($transaction) for P2P and inter-bank settlements via Rubies BaaS.",
      "Implemented a SHA-256 request-hashing idempotency engine (IdempotencyKey), 4-tier KYC limit enforcement (NIN/BVN), HMAC-SHA512 webhook verification, and a 5-minute BullMQ reconciliation sweep worker to eliminate double-spending and auto-refund failed transfers.",
      "Built Dora AI, a conversational banking agent powered by Gemini 3.1 Flash Lite with a 5-turn function-calling loop (execute_transfer, purchase_vas, resolve_account) secured by bcrypt 6-digit PIN verification.",
      "Developed a native Android Input Method Service (IME) keyboard in Kotlin packaged as a Flutter plugin, managing a 15-state UI machine that allows users to send bank/P2P transfers and buy airtime directly inside third-party messaging apps.",
      "Constructed MFA-protected Admin and Customer Support web portals using Next.js 16 (React 19, Tailwind v4), featuring PII-masked KYC reviews, double-entry atomic refunds, immutable audit logs, and real-time Socket.io ticket chat.",
    ],
    tags: [
      "Node.js (Express 5)",
      "TypeScript",
      "React Native (Expo SDK 54)",
      "Next.js 16 (React 19)",
      "PostgreSQL (Prisma)",
      "Redis & BullMQ",
      "Kotlin (Android IME)",
      "Google Gemini AI",
      "Socket.io",
      "Rubies BaaS",
    ],
  },
  {
    id: "praixai",
    title: "PraixAI_AgentLabs_Core.sln",
    role: "Voice AI & Telephony Architect",
    company: "PraixAI (AgentLabs Core) – Multi-Tenant Voice AI & Telephony SaaS",
    location: "SaaS Platform",
    date: "Aug 2025 – Oct 2026",
    type: "AI & Voice Project",
    size: "18,110 KB",
    extension: "Voice AI Platform",
    description:
      "Multi-tenant Voice AI & Telephony SaaS bridging Twilio, Plivo, and native SIP trunks with ElevenLabs Conversational AI and OpenAI Realtime APIs over low-latency bidirectional WebSockets.",
    highlights: [
      "Architected multi-engine telephony and voice pipelines bridging Twilio, Plivo, and native SIP trunks with ElevenLabs Conversational AI and OpenAI Realtime APIs over low-latency bidirectional WebSockets.",
      "Built a ReactFlow visual agent builder and state-machine compiler supporting live mid-call webhook tool execution for RAG knowledge retrieval, real-time appointment scheduling, and automated post-call CRM lead scoring.",
      "Engineered a 79-table PostgreSQL schema (Drizzle ORM + Zod) with advisory-locked credit wallets, a 5-gateway payment engine (Stripe, Paystack, PayPal, Razorpay, MercadoPago), and a crash-recoverable bulk campaign job scheduler.",
    ],
    tags: [
      "TypeScript",
      "Node.js",
      "React 18",
      "PostgreSQL (Drizzle ORM)",
      "ElevenLabs AI",
      "OpenAI Realtime API",
      "Twilio & Plivo",
      "WebSockets",
      "ReactFlow",
    ],
  },
  {
    id: "connectivo",
    title: "Connectivo_AB.exe",
    role: "Full-Stack Developer",
    company: "Connectivo AB",
    location: "Göteborg, Sweden",
    date: "Feb 2025 – Aug 2025",
    type: "Experience",
    size: "9,840 KB",
    extension: "Production Role",
    description:
      "Architected high-performance web applications in React and Vue.js, streamlining frontend-to-backend data flows and leading targeted UI/UX redesigns.",
    highlights: [
      "Architected web applications using React and Vue.js that boosted user engagement by 30%.",
      "Streamlined data flow between frontend and backend, resulting in 28% faster application performance.",
      "Enhanced user experience through intuitive UI/UX redesigns, increasing retention by 22%.",
    ],
    tags: [
      "React.js",
      "Vue.js",
      "TypeScript",
      "+30% Engagement",
      "+28% Faster Perf",
      "+22% Retention",
    ],
  },
  {
    id: "sky",
    title: "Sky_Enterprise.exe",
    role: "Full-Stack Developer",
    company: "Sky Enterprise",
    location: "Yola, Nigeria",
    date: "Dec 2022 – Aug 2025",
    type: "Experience",
    size: "15,300 KB",
    extension: "Production Role",
    description:
      "Engineered scalable MERN-stack web applications, hybrid SQL/NoSQL database architectures, and Dockerized microservices with 99.9% uptime.",
    highlights: [
      "Engineered scalable web applications using the MERN stack (MongoDB, Express, React, Node), reducing manual business workload by 35%.",
      "Constructed RESTful APIs that improved data integrity by 25% and reduced response times by 30%.",
      "Implemented hybrid SQL/NoSQL architecture improving query performance by 40%.",
      "Deployed microservices using Docker, reducing deployment time by 50% with 99.9% uptime.",
    ],
    tags: [
      "MERN Stack",
      "MongoDB",
      "Express.js",
      "React.js",
      "Node.js",
      "PostgreSQL",
      "Docker",
      "99.9% Uptime",
    ],
  },
  {
    id: "manaknight",
    title: "Manaknight_Inc.exe",
    role: "Node.js Developer",
    company: "Manaknight Inc.",
    location: "Toronto, Canada",
    date: "Jan 2021 – Dec 2022",
    type: "Experience",
    size: "8,420 KB",
    extension: "Production Role",
    description:
      "Developed scalable Node.js and PostgreSQL backend systems for mobile applications serving 15,000+ users, alongside feature-rich sports management platforms.",
    highlights: [
      "Developed backend systems for mobile applications using Node.js and PostgreSQL, acquiring 15,000+ users.",
      "Built a feature-rich golf game management application that increased user engagement by 45%.",
      "Designed normalized database schemas that improved data retrieval speeds by 35%.",
      "Integrated third-party APIs that expanded application functionality while reducing development time by 20%.",
    ],
    tags: [
      "Node.js",
      "PostgreSQL",
      "RESTful APIs",
      "15,000+ Users",
      "+45% Engagement",
    ],
  },
  {
    id: "resumepro",
    title: "Resume_Pro_AI.sln",
    role: "AI & Full-Stack Architect",
    company: "Resume Pro",
    location: "AI SaaS Project",
    date: "Key Project",
    type: "AI & Voice Project",
    size: "6,480 KB",
    extension: "AI Platform",
    description:
      "AI-powered resume optimization platform using Next.js, PostgreSQL (Prisma), BullMQ, and the Google Gemini API for asynchronous CV parsing, real-time ATS scoring, and automated formatting.",
    highlights: [
      "Architected an AI-powered resume optimization platform using Next.js, PostgreSQL (Prisma), BullMQ, and the Google Gemini API.",
      "Built asynchronous CV parsing and job-matching pipelines with Redis and BullMQ workers.",
      "Delivered real-time ATS scoring and automated formatting recommendations.",
    ],
    tags: [
      "Next.js",
      "TypeScript",
      "PostgreSQL (Prisma)",
      "Redis & BullMQ",
      "Google Gemini API",
    ],
  },
  {
    id: "haven",
    title: "Haven_And_Hearth.sln",
    role: "Full-Stack Architect",
    company: "Haven & Hearth",
    location: "Real Estate Platform",
    date: "Key Project",
    type: "Fintech & Full-Stack",
    size: "5,920 KB",
    extension: "Web Application",
    description:
      "Full-stack real estate platform architected with Node.js, TypeScript, PostgreSQL (Prisma), and React, featuring advanced geospatial property filtering and interactive map integrations.",
    highlights: [
      "Architected a full-stack real estate platform with Node.js, TypeScript, PostgreSQL (Prisma), and React.",
      "Engineered advanced geospatial property filtering and interactive map integrations.",
    ],
    tags: ["React", "Node.js", "TypeScript", "PostgreSQL", "Prisma"],
  },
  {
    id: "derekcodes",
    title: "derekcodes_online.conf",
    role: "Infrastructure & Web Engineer",
    company: "derekcodes.online",
    location: "Web Infrastructure",
    date: "Key Project",
    type: "Fintech & Full-Stack",
    size: "1,840 KB",
    extension: "Infrastructure Config",
    description:
      "Deployed and maintained personal portfolio infrastructure with custom DNS routing, Nginx reverse proxy, SSL configurations, and optimized asset delivery.",
    highlights: [
      "Deployed and maintained personal portfolio infrastructure with custom DNS routing and SSL configurations.",
      "Configured Nginx reverse proxy and optimized static/dynamic asset delivery.",
    ],
    tags: ["DNS", "SSL", "Nginx", "Web Infrastructure", "Next.js 16"],
  },
];
