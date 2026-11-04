import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import PDFDocument from "pdfkit"

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..")
const out = path.join(
  root,
  "..",
  "Resume's",
  "Cloud Engineer Resume",
  "DevOps Engineer",
  "PierreMvita-DevOps.pdf",
)

const doc = new PDFDocument({
  size: "LETTER",
  margins: { top: 20, bottom: 20, left: 40, right: 40 },
  bufferPages: true,
})

fs.mkdirSync(path.dirname(out), { recursive: true })
const stream = fs.createWriteStream(out)
doc.pipe(stream)

const navy = "#1F3864"
const ink = "#1a1a1a"
const muted = "#333333"

function heading(text) {
  doc.moveDown(0.12)
  doc.font("Helvetica-Bold").fontSize(9.5).fillColor(ink).text(text.toUpperCase())
  doc
    .moveTo(doc.page.margins.left, doc.y + 1)
    .lineTo(doc.page.width - doc.page.margins.right, doc.y + 1)
    .strokeColor("#444444")
    .lineWidth(0.5)
    .stroke()
  doc.moveDown(0.12)
}

function bullets(items) {
  doc.font("Helvetica").fontSize(8.5).fillColor(ink)
  for (const item of items) {
    doc.text(`•  ${item}`, { indent: 8, paragraphGap: 0.25, lineGap: 0.25 })
  }
}

function job(title, date, subtitle, items) {
  const left = doc.page.margins.left
  const width = doc.page.width - doc.page.margins.left - doc.page.margins.right
  const y = doc.y
  doc.font("Helvetica-Bold").fontSize(10).fillColor(ink)
  doc.text(title, left, y, { width: width - 130, lineBreak: false })
  doc.font("Helvetica").fontSize(9).fillColor(ink)
  doc.text(date, left, y, { width, align: "right", lineBreak: false })
  doc.x = left
  doc.y = y + 13
  if (subtitle) {
    doc.font("Helvetica-Oblique").fontSize(8.25).fillColor(muted).text(subtitle, { width })
  }
  if (items.length) bullets(items)
  doc.moveDown(0.08)
}

doc.font("Helvetica-Bold").fontSize(16).fillColor(navy).text("PIERRE MVITA")
doc.font("Helvetica-Bold").fontSize(10).fillColor(ink).text("DevOps Engineer")
doc
  .font("Helvetica")
  .fontSize(8.5)
  .fillColor(ink)
  .text(
    "Toronto, Ontario, Canada  |  +1 437 575 8178  |  PierreMvita@yahoo.ca  |  linkedin.com/in/pierre-mvita  |  github.com/pmvita  |  pierremvita.dev",
  )

heading("Certifications")
doc
  .font("Helvetica")
  .fontSize(8.5)
  .fillColor(ink)
  .text(
    "Docker Foundations Professional Certificate  |  AWS Certified Solutions Architect – Associate (SAA-C03)  |  CompTIA Security+  |  Google IT Support Professional Certificate",
    { paragraphGap: 0 },
  )

heading("Technical Skills")
const skills = [
  [
    "Containers & orchestration",
    "Docker image builds and multi-service stacks; Kubernetes concepts (deployments, services, scaling); containerized deploys transferable to OpenShift/AKS",
  ],
  [
    "CI/CD & release",
    "GitHub Actions pipelines, Git branching and merging, code release workflows, SAM/CloudFormation/Terraform-defined environments",
  ],
  [
    "IaC & automation",
    "Terraform, AWS SAM, CloudFormation, Bash, Python, and Linux fundamentals for repeatable platform work",
  ],
  [
    "DevSecOps & cloud security",
    "CSPM-style posture checks as code, least-privilege IAM, secrets hygiene, Security+ fundamentals aligned to scan-and-fix workflows",
  ],
  [
    "Monitoring",
    "CloudWatch logs, metrics, and alarms; DLQs and retries; investigation-ready logging for faster incident triage",
  ],
  [
    "Apps & data",
    "TypeScript, Node.js, React, PostgreSQL, SQL; AWS Lambda, API Gateway, S3, DynamoDB, SQS, SNS",
  ],
  ["Ways of working", "Collaborative delivery, clear release documentation, stakeholder communication"],
]
for (const [label, value] of skills) {
  doc.font("Helvetica-Bold").fontSize(8.5).fillColor(ink).text(`${label}: `, { continued: true })
  doc.font("Helvetica").text(value, { lineGap: 0.15 })
}

heading("Projects")
job(
  "NimbusFlow — Pipeline-as-Code Data Application on AWS",
  "2026",
  "AWS SAM, Git-oriented IaC, Lambda, API Gateway, Step Functions, DynamoDB, SQS, SNS, CloudWatch, TypeScript",
  [
    "Defined an end-to-end application pipeline as code (SAM) so builds and environments stay versioned in Git and rebuildable for release.",
    "Wired SQS/DLQ, Step Functions retries, and CloudWatch alarms so failures surface for triage instead of silent drops.",
    "Scoped each Lambda IAM role to real ARNs and validated payloads at the API edge to keep the release path clean and secure.",
  ],
)
job(
  "AWS CSPM — DevSecOps Posture Automation",
  "2026",
  "Terraform, Lambda, EventBridge, SNS, CloudWatch, IAM",
  [
    "Built scheduled security checks (public S3, missing encryption, aged IAM keys, open SSH/RDP) and emailed findings over SNS.",
    "Codified scan role and schedule in Terraform so DevSecOps checks ship with the same IaC discipline as app infrastructure.",
  ],
)
job(
  "Packly — Containerized Multi-Service Stack",
  "2026",
  "Docker, Next.js, PostgreSQL, libpcap",
  [
    "Packaged a multi-service monitoring app with Docker so the UI, API, and database run as a reproducible containerized stack.",
    "Used PostgreSQL for persisted flows and documented the run path for handoff and release-style demos.",
  ],
)

heading("Experience")
job(
  "Technical Consultant",
  "Sep 2025 — Present",
  "Independent (NDA client engagements) · Contract Full-time, Toronto, ON · Hybrid",
  [
    "Owned cloud platform changes end-to-end: VPC segmentation, IAM scoping, and runbooks for safe day-2 operations.",
    "Migrated 10TB+ into S3 with lifecycle rules and a documented recovery/release process; nothing lost.",
    "Cut monthly cloud spend about 25% by right-sizing and storage tiering without breaking reliability.",
  ],
)
job(
  "AWS Cloud Associate",
  "Nov 2024 — Aug 2025",
  "Amazon Web Services (AWS) · Contract Full-time, Toronto, ON · Remote",
  [
    "Deployed and operated TypeScript/Node.js/React applications on AWS using Git-backed IaC (SAM, CloudFormation, Terraform).",
    "Established CloudWatch logging and alarms so release and runtime issues were visible for prompt troubleshooting.",
    "Enforced least-privilege IAM and no long-lived access keys as part of a secure release baseline.",
  ],
)
job(
  "Full Stack Engineer",
  "Jan 2023 — May 2024",
  "Contractor · Contract Part-time, Toronto, ON · Hybrid",
  [
    "Built and shipped web apps in TypeScript, Node.js, React, and PostgreSQL with Git-based branching and merge workflows.",
    "Implemented authentication and fixed production defects as part of iterative release cycles.",
  ],
)

doc.end()

await new Promise((resolve, reject) => {
  stream.on("finish", resolve)
  stream.on("error", reject)
})

const range = doc.bufferedPageRange()
if (range.count > 1) {
  console.warn(`WARNING: resume is ${range.count} pages; keep it to 1.`)
} else {
  console.log("Resume is 1 page.")
}

console.log(`Wrote ${out}`)
