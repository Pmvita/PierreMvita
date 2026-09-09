export const site = {
  name: "Pierre Mvita",
  monogram: "PM",
  role: "Cloud Engineer who ships full-stack and mobile",
  location: "Toronto, Ontario",
  availability: "Open to junior cloud engineer roles",
  summary:
    "Builds cloud infrastructure as code rather than clicking through consoles. Serverless pipelines on AWS — Lambda, Step Functions, SQS — and containerized services on ECS, with TypeScript and Node.js on the application side. Least-privilege IAM, a designed failure path, and a known cost before anything ships.",
  resumeHref: "/Pierre-Mvita-Cloud-Engineer.pdf",
  resumeLabel: "Download resume",
  githubMore: "https://github.com/Pmvita",
  nav: [
    { id: "home", label: "Home" },
    { id: "work", label: "Work" },
    { id: "capabilities", label: "Capabilities" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
  ],
  contact: {
    email: "PierreMvita@yahoo.ca",
    github: "https://github.com/Pmvita",
    linkedin: "https://www.linkedin.com/in/pierre-mvita",
  },
  certifications: [
    "AWS Certified Solutions Architect – Associate (SAA-C03)",
    "Docker Foundations Professional Certificate",
    "Google IT Support Professional Certificate",
  ],
} as const
