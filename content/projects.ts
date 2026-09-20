export type Project = {
  slug: string
  index: string
  title: string
  kicker: string
  year: string
  outcome: string
  stack: string[]
  architecture: string[]
  github?: string
  live?: string
}

export const projects: Project[] = [
  {
    slug: "nimbusflow",
    index: "01",
    title: "NimbusFlow",
    kicker: "Serverless event-driven pipeline",
    year: "2026",
    outcome:
      "API Gateway into Lambda, onto SQS, through Step Functions, into DynamoDB, out to SNS — the whole stack, IAM, and alarms in one AWS SAM template. Idle cost is zero.",
    stack: ["AWS SAM", "Lambda", "API Gateway", "Step Functions", "DynamoDB", "SQS", "SNS", "TypeScript"],
    architecture: ["API Gateway", "Lambda", "SQS", "Step Functions", "DynamoDB", "SNS"],
    github: "https://github.com/Pmvita/NimbusFlow",
  },
  {
    slug: "aws-cspm",
    index: "02",
    title: "AWS CSPM",
    kicker: "Cloud security posture as code",
    year: "2025",
    outcome:
      "Terraform for Cloud Security Posture Management: Lambda, CloudWatch, GuardDuty, and SecurityHub watching the account so findings surface as alerts instead of surprises.",
    stack: ["Terraform", "AWS", "Lambda", "CloudWatch", "GuardDuty", "SecurityHub"],
    architecture: ["GuardDuty", "SecurityHub", "Lambda", "CloudWatch", "SNS"],
    github: "https://github.com/Pmvita/aws-CSPM",
  },
  {
    slug: "aws-secure-s3",
    index: "03",
    title: "aws-secure-s3",
    kicker: "Locked-down S3 from the CLI",
    year: "2025",
    outcome:
      "Automates a hardened S3 bucket with encryption, Block Public Access, HTTPS-only access, and CloudTrail logging — cloud security engineering without clicking through the console.",
    stack: ["AWS CLI", "S3", "KMS", "CloudTrail", "IAM", "Bash"],
    architecture: ["AWS CLI", "S3 + encryption", "Block Public Access", "HTTPS policy", "CloudTrail"],
    github: "https://github.com/Pmvita/aws-secure-s3",
  },
  {
    slug: "packly",
    index: "04",
    title: "Packly",
    kicker: "Full-stack packet inspector",
    year: "2026",
    outcome:
      "Capture frames with libpcap, decode protocol stacks, persist flows in PostgreSQL, and watch them live on a Next.js dashboard. Docker Compose, Prometheus metrics, and GitHub Actions on every push.",
    stack: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Socket.IO",
      "Docker",
      "Prometheus",
      "GitHub Actions",
    ],
    architecture: ["libpcap", "Capture manager", "PostgreSQL", "Socket.IO", "Next.js dashboard"],
    github: "https://github.com/Pmvita/Packly",
  },
  {
    slug: "logwatch",
    index: "05",
    title: "Logwatch",
    kicker: "Local log triage",
    year: "2026",
    outcome:
      "Sample CloudTrail and Windows Security events in. Three detections fire — console login without MFA, a security group opened to the world, a failed-logon burst — and the hits become a markdown incident note with a timeline and IOCs.",
    stack: ["TypeScript", "Node.js", "CloudTrail", "Windows Event Logs", "Vitest"],
    architecture: ["Sample JSON", "Normalize", "Detections", "Incident note"],
    github: "https://github.com/Pmvita/LogWatch",
    live: "https://www.pierre-mvita.dev",
  },
  {
    slug: "securenet",
    index: "06",
    title: "SecureNet",
    kicker: "AI-powered network defence",
    year: "2025",
    outcome:
      "A cybersecurity SaaS for threat detection, risk scoring, and security operations — Python backend, React frontend, and a live deployment for the product surface.",
    stack: ["Python", "React", "TypeScript", "Docker", "Vercel"],
    architecture: ["Ingest", "Detection", "Risk scoring", "Ops dashboard"],
    github: "https://github.com/Pmvita/SecureNet",
    live: "https://securenet-ai.vercel.app",
  },
  {
    slug: "swissone",
    index: "07",
    title: "SwissOne",
    kicker: "Full-stack private banking",
    year: "2026",
    outcome:
      "A Swiss private-banking product across web and mobile: Next.js 15, React Native/Expo, and Supabase for auth, storage, and PostgreSQL — one TypeScript monorepo.",
    stack: [
      "Next.js",
      "React Native",
      "Expo",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Tailwind CSS",
    ],
    architecture: ["Next.js web", "Expo mobile", "Supabase Auth", "PostgreSQL"],
    github: "https://github.com/Pmvita/SwissOne",
    live: "https://swissone.vercel.app",
  },
  {
    slug: "onelock",
    index: "08",
    title: "OneLock",
    kicker: "Mobile credential vault",
    year: "2025",
    outcome:
      "A password and credential manager in React Native: local secure storage, biometric unlock, and TypeScript throughout — the same security habits, on a device.",
    stack: ["React Native", "Expo", "TypeScript", "SecureStore", "Biometrics"],
    architecture: ["Expo", "Biometric gate", "SecureStore", "Vault UI"],
    github: "https://github.com/Pmvita/OneLock",
  },
]
