export type Experience = {
  title: string
  company: string
  period: string
  location: string
  summary: string
  bullets: string[]
  skills: string[]
}

export const experience: Experience[] = [
  {
    title: "Cloud Engineering Projects",
    company: "Independent",
    period: "2024 — Present",
    location: "Toronto, ON",
    summary:
      "AWS workloads defined in SAM, CloudFormation, or Terraform so the environment can be rebuilt from the repo.",
    bullets: [
      "Build AWS workloads end to end and define them in SAM, CloudFormation, or Terraform instead of the console.",
      "Scope IAM tightly by default: one role per component, real resource ARNs, and no long-lived access keys in application environments.",
      "Plan the failure path alongside the happy path — dead-letter queues, retries with backoff, health-checked deploys, and a written rollback.",
      "Wire CloudWatch logs, metrics, and alarms so problems arrive as email rather than as a surprise later.",
      "Watch the bill with budget alarms, right-sized resources, on-demand billing, and tearing down anything left idle.",
      "Run linting, type checks, and unit tests through CI on every push.",
    ],
    skills: ["AWS", "IAM", "SAM", "Terraform", "CloudWatch", "CI"],
  },
  {
    title: "Technical Consultant",
    company: "Sub-contracts",
    period: "Sep 2024 — Apr 2025",
    location: "Toronto, ON",
    summary:
      "Cloud migrations, spend cuts, and isolated environments for clients under NDA.",
    bullets: [
      "Cut monthly cloud spend for a client by about 25% by right-sizing resources and moving cold data to cheaper storage tiers.",
      "Moved over 10TB of business data into S3 with nothing lost, using lifecycle rules and a documented recovery process.",
      "Set up VPC segmentation and scoped IAM policies to keep sensitive client data isolated, all under NDA.",
      "Configured cloud workspaces and wrote the runbooks and user guides so clients could take it from there.",
    ],
    skills: ["S3", "Cost optimization", "VPC", "IAM", "Runbooks"],
  },
  {
    title: "Full-Stack Developer / Technical Product Manager",
    company: "Self-employed",
    period: "2023 — Present",
    location: "Toronto, ON",
    summary:
      "Shipped TypeScript applications, then hosted and operated them on cloud infrastructure.",
    bullets: [
      "Built and shipped applications in TypeScript, Node.js, React, and PostgreSQL, then hosted and ran them on cloud infrastructure.",
      "Designed REST APIs and both relational and NoSQL schemas, and fixed things when they broke in production.",
      "Turned business requirements into specs, weighing scalability, security, and cost along the way.",
    ],
    skills: ["TypeScript", "Node.js", "React", "PostgreSQL", "Product"],
  },
]
