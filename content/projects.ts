export type Project = {
  slug: string
  index: string
  title: string
  kicker: string
  year: string
  outcome: string
  stack: string[]
  architecture: string[]
  github: string
  live?: string
  featured?: boolean
  added?: string
  caseStudy?: {
    title: string
    bullets: string[]
    reflection: string
    lead: string
  }
}

// The strongest current stack, with live links. Legacy entries (NimbusFlow,
// AWS CSPM, Packly, Logwatch, SecureNet, SwissOne, OneLock) are retained as
// "other work" for the full portfolio picture.
export const projects: Project[] = [
  {
    slug: "taskflow",
    index: "01",
    title: "TaskFlow",
    kicker: "SaaS task management",
    year: "2026",
    added: "Jun 2026",
    outcome:
      "A full-featured productivity SaaS for teams: boards, cards, labels, search and real-time updates, with Stripe billing. Built as a mono-app so the same codebase ships web + mobile.",
    stack: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Socket.IO",
      "Stripe",
      "Shadcn",
      "Tailwind",
    ],
    architecture: [
      "Next.js (App Router)",
      "Prisma + PostgreSQL",
      "Socket.IO",
      "Stripe billing",
      "Web dashboard",
    ],
    github: "https://github.com/Pmvista/TaskFlow",
    live: "https://taskflow-app.vercel.app",
    featured: true,
    caseStudy: {
      title: "How I built TaskFlow",
      lead: "TaskFlow is a team task-management SaaS with boards, cards, labels and real-time updates. The split was simple: Next.js on the front, Prisma + Postgres on the back, Stripe for billing.",
      bullets: [
        "Scoped the data model to real user roles: a team has members; a board has lists; a list has cards. No generic CRUD.",
        "Same-origin API routes only / no client-side fetch, so the whole app is server-rendered first.",
        "Real-time via Socket.IO combined with full-page reloads, never both, so the UX never flickers.",
        "Stripe checkout on a dedicated route, webhook-only subscriptions, and a refund window for chargebacks.",
        "E2E regression tests on the three core flows: create card, move list, subscribe.",
      ],
      reflection: "Now I would add slack-style optimistic UI for card moves and split the Stripe subscription per-plan instead of a single price.",
    },
  },
  {
    slug: "cloudledger",
    index: "02",
    title: "CloudLedger",
    kicker: "Finance ledger for SMBs",
    year: "2026",
    added: "Jul 2026",
    outcome:
      "A double-entry finance ledger for small businesses: bank feeds, reconciled accounts, and invoice tracking, with a real-time dashboard and Stripe subscriptions.",
    stack: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Socket.IO",
      "Stripe",
      "Tailwind",
    ],
    architecture: [
      "Next.js + API routes",
      "Prisma + PostgreSQL",
      "Socket.IO (reconciliation)",
      "Stripe subscriptions",
      "Real-time dashboard",
    ],
    github: "https://github.com/Pmvista/CloudLedger",
    live: "https://cloudledger.app",
    featured: true,
    caseStudy: {
      title: "How I built CloudLedger",
      lead: "CloudLedger is a finance ledger for small businesses that want clean books without an accountant. The hardest part was making double-entry feel like a spreadsheet.",
      bullets: [
        "Double-entry behind a single entry modal: debit + credit committed together, or the transaction is rolled back.",
        "Bank-feed rules matched by merchant + amount fuzzy-match, with a human-in-the-loop review step before posting.",
        "Reconciliation pipeline marks matched/unmatched rows and flags variances over a threshold for review.",
        "Stripe Subscription on the billing page with a dunning email fallback.",
        "Responsive dashboard: charts from charts.js, but the ledger is a keyboard-first table (Tab/R/W/escape).",
      ],
      reflection: "I'd move the matching engine to the database as a CTE instead of in-memory. It gets slower past 50k transactions, which is where a SMB usually sits by year two.",
    },
  },
  {
    slug: "permitpilot",
    index: "03",
    title: "PermitPilot",
    kicker: "Construction permit tracker",
    year: "2026",
    added: "Aug 2026",
    outcome:
      "A permit-management platform for contractors: applications, fees, and municipal status tracking, with SMS notifications and Stripe integration.",
    stack: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "AWS",
      "Stripe",
      "Resend",
    ],
    architecture: [
      "Next.js + AWS",
      "Prisma + PostgreSQL",
      "Resend email + SMS",
      "Stripe",
      "Permit status tracker",
    ],
    github: "https://github.com/Pmvista/PermitPilot",
    live: "https://permitpilot.dev",
    featured: true,
    caseStudy: {
      title: "How I built PermitPilot",
      lead: "PermitPilot replaces a contractor's paper trail. Every application needs a fee, a status, and a recipient, and it has to survive a municipality's review cycle.",
      bullets: [
        "Multi-step application form with progress state persisted server-side before submission.",
        "Fee calculation is a pure function of square footage + zone, unit-tested before any change.",
        "Resend email + SMS notifications fire on status changes, because a contractor cannot afford to miss a notice.",
        "Municipal status endpoint surfaced in the dashboard, so the user always knows what the city is doing.",
        "Rate-limited API routes protect the public status endpoint from scrapers.",
      ],
      reflection: "I'd add a PDF export of every application as a deliverable - contractors get asked for PDFs by every municipal office.",
    },
  },
  {
    slug: "taxify",
    index: "04",
    title: "taxify",
    kicker: "Tax calculator for freelancers",
    year: "2026",
    added: "Sep 2026",
    outcome:
      "A tax calculator that turns a freelancer's Q1-Q3 income into a Q4 estimate, with a Stripe pricing table and a clear breakdown of deductions.",
    stack: [
      "Next.js",
      "TypeScript",
      "Stripe",
      "Tailwind",
      "Prisma",
    ],
    architecture: [
      "Next.js + API routes",
      "Stripe pricing",
      "Deduction engine",
      "Tax breakdown",
    ],
    github: "https://github.com/Pmvista/taxify",
    live: "https://taxify.app",
    featured: true,
    caseStudy: {
      title: "How I built taxify",
      lead: "taxify turns a freelancer's messy income across Q1-Q3 into a clean Q4 estimate. It only holds the numbers the user types in, and nothing else.",
      bullets: [
        "Income parser with unit tests for every locale/currency edge case, because freelancers import from anywhere.",
        "Deduction engine modeled as a pure function: gross minus eligible receipts equals taxable.",
        "Stripe pricing table on the landing page, with the calculator behind a gated preview.",
        "A clean, print-ready report the user can send to their accountant.",
        "No server state - everything is client-side, so there is no data to leak.",
      ],
      reflection: "I'd add a comparison view (federal vs state) so users see the difference instead of just the total. That is the question almost everyone asks first.",
    },
  },
  {
    slug: "mvitahq",
    index: "05",
    title: "Mvita-HQ",
    kicker: "Family-office platform",
    year: "2026",
    added: "Oct 2026",
    outcome:
      "A family-office platform for a private-equity family group: portfolio tracking, deal flow and reporting across web + mobile from a single TypeScript codebase.",
    stack: [
      "Next.js",
      "React Native",
      "Expo",
      "Supabase",
      "PostgreSQL",
      "TypeScript",
      "Tailwind",
    ],
    architecture: [
      "Next.js (web)",
      "React Native (Expo)",
      "Supabase (Postgres)",
      "Shared TypeScript",
    ],
    github: "https://github.com/Pmvista/Mvita-HQ",
    live: "https://mvita-hq.app",
    featured: true,
    caseStudy: {
      title: "How I built Mvita-HQ",
      lead: "Mvita-HQ is a family-office platform where the same product serves a family office and a mobile client. The shared layer is the TypeScript type contract, not the UI.",
      bullets: [
        "Shared types + validation contract across web and mobile so a schema change updates both.",
        "Supabase auth plus Postgres for the family ledger, with row-level security scoped to the family unit.",
        "Expo for iOS and Android from the same codebase, with a web build sharing the same components.",
        "Report builder that compiles quarterly statements into one PDF for the family office.",
      ],
      reflection: "Now I would add end-to-end encryption for the private ledger and a shared mockData layer between web and mobile.",
    },
  },
  // legacy / other work (non-featured)
  {
    slug: "nimbusflow",
    index: "06",
    title: "NimbusFlow",
    kicker: "Serverless event-driven pipeline",
    year: "2026",
    added: "May 2026",
    outcome: "API Gateway into Lambda, onto SQS, through Step Functions, into DynamoDB, out to SNS - the whole stack, IAM, and alarms in one AWS SAM template.",
    stack: ["AWS SAM", "Lambda", "API Gateway", "Step Functions", "DynamoDB", "SQS", "SNS", "TypeScript"],
    architecture: ["API Gateway", "Lambda", "SQS", "Step Functions", "DynamoDB", "SNS"],
    github: "https://github.com/Pmvista/NimbusFlow",
    live: "https://nimbusflow.dev",
  },
  {
    slug: "aws-cspm",
    index: "07",
    title: "AWS CSPM",
    kicker: "Cloud security posture as code",
    year: "2025",
    added: "Mar 2025",
    outcome: "Terraform for Cloud Security Posture Management: Lambda, CloudWatch, GuardDuty, and SecurityHub watching the account so findings surface as alerts.",
    stack: ["Terraform", "AWS", "Lambda", "CloudWatch", "GuardDuty", "SecurityHub"],
    architecture: ["GuardDuty", "SecurityHub", "Lambda", "CloudWatch", "SNS"],
    github: "https://github.com/Pmvista/aws-cspm",
  },
  {
    slug: "packly",
    index: "08",
    title: "Packly",
    kicker: "Full-stack packet inspector",
    year: "2026",
    added: "Jan 2026",
    outcome: "Capture frames with libpcap, decode protocol stacks, persist flows in PostgreSQL, and watch them live on a Next.js dashboard.",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Socket.IO", "Docker", "Prometheus", "GitHub Actions"],
    architecture: ["libpcap", "Capture manager", "PostgreSQL", "Socket.IO", "Next.js dashboard"],
    github: "https://github.com/Pmvista/Packly",
  },
  {
    slug: "logwatch",
    index: "09",
    title: "Logwatch",
    kicker: "Local log triage",
    year: "2026",
    added: "Feb 2026",
    outcome: "Sample CloudTrail and Windows Security events. Three detections fire and the hits become a markdown incident note with a timeline and IOCs.",
    stack: ["TypeScript", "Node.js", "CloudTrail", "Windows Event Logs", "Vitest"],
    architecture: ["Sample JSON", "Normalize", "Detections", "Incident note"],
    github: "https://github.com/Pmvista/LogWatch",
  },
  {
    slug: "securenet",
    index: "10",
    title: "SecureNet",
    kicker: "AI-powered network defence",
    year: "2025",
    added: "Dec 2025",
    outcome: "A cybersecurity SaaS for threat detection, risk scoring, and security operations.",
    stack: ["Python", "React", "TypeScript", "Docker", "Vercel"],
    architecture: ["Ingest", "Detection", "Risk scoring", "Ops dashboard"],
    github: "https://github.com/Pmvista/SecureNet",
  },
  {
    slug: "swissone",
    index: "11",
    title: "SwissOne",
    kicker: "Full-stack private banking",
    year: "2026",
    added: "Jun 2026",
    outcome: "A Swiss private-banking product across web and mobile, in one TypeScript monorepo.",
    stack: ["Next.js", "React Native", "Expo", "TypeScript", "Supabase", "PostgreSQL", "Tailwind CSS"],
    architecture: ["Next.js web", "Expo mobile", "Supabase Auth", "PostgreSQL"],
    github: "https://github.com/Pmvista/SwissOne",
    live: "https://swissone.vercel.app",
  },
  {
    slug: "onelock",
    index: "12",
    title: "OneLock",
    kicker: "Mobile credential vault",
    year: "2025",
    added: "Nov 2025",
    outcome: "A password and credential manager in React Native: local secure storage, biometric unlock, and TypeScript throughout.",
    stack: ["React Native", "Expo", "TypeScript", "SecureStore", "Biometrics"],
    architecture: ["Expo", "Biometric gate", "SecureStore", "Vault UI"],
    github: "https://github.com/Pmvista/OneLock",
  },
]
