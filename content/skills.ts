export type CapabilityLane = {
  id: string
  title: string
  lead: string
  items: string[]
  sample: string
}

export const capabilities: CapabilityLane[] = [
  {
    id: "cloud",
    title: "Cloud & IaC",
    lead: "Infrastructure in templates. Failure paths in the design. A known bill before it ships.",
    sample: "sam deploy --guided --capabilities CAPABILITY_NAMED_IAM",
    items: [
      "Lambda, API Gateway, Step Functions, SQS, SNS",
      "ECS Fargate, ECR, ALB, EC2",
      "S3, DynamoDB, RDS, SSM Parameter Store",
      "IAM, VPC, security groups, VPC endpoints",
      "CloudWatch logs, alarms, structured logging",
      "AWS SAM, CloudFormation, Terraform, Docker",
      "GitHub Actions, budget alarms, Well-Architected",
    ],
  },
  {
    id: "fullstack",
    title: "Full-stack",
    lead: "The code running on that infrastructure is familiar territory.",
    sample: "docker compose up -d",
    items: [
      "TypeScript, JavaScript, Node.js, Python",
      "Next.js, React, REST APIs",
      "PostgreSQL, DynamoDB, SQL",
      "Auth, JWT, least-privilege roles",
      "CI: lint, typecheck, unit tests",
      "Vercel, Docker, Bash",
    ],
  },
  {
    id: "mobile",
    title: "Mobile",
    lead: "Cross-platform product when the work needs a client in someone's hand.",
    sample: "npx expo start",
    items: [
      "React Native, Expo, EAS Build",
      "TypeScript, Zustand",
      "SecureStore, local key handling",
      "iOS, Android, and web from one codebase",
    ],
  },
]
