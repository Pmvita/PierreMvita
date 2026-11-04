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
  "Associate DevOps Engineer",
  "PierreMvita-AssocDevOps.pdf",
)

const doc = new PDFDocument({
  size: "LETTER",
  margins: { top: 22, bottom: 22, left: 40, right: 40 },
  bufferPages: true,
})

fs.mkdirSync(path.dirname(out), { recursive: true })
const stream = fs.createWriteStream(out)
doc.pipe(stream)

const navy = "#1F3864"
const ink = "#1a1a1a"
const muted = "#333333"

function heading(text) {
  doc.moveDown(0.14)
  doc.font("Helvetica-Bold").fontSize(9.5).fillColor(ink).text(text.toUpperCase())
  doc
    .moveTo(doc.page.margins.left, doc.y + 1)
    .lineTo(doc.page.width - doc.page.margins.right, doc.y + 1)
    .strokeColor("#444444")
    .lineWidth(0.5)
    .stroke()
  doc.moveDown(0.14)
}

function bullets(items) {
  doc.font("Helvetica").fontSize(8.75).fillColor(ink)
  for (const item of items) {
    doc.text(`•  ${item}`, { indent: 8, paragraphGap: 0.3, lineGap: 0.3 })
  }
}

function job(title, date, subtitle, items) {
  doc.font("Helvetica-Bold").fontSize(10).fillColor(ink).text(title, { continued: true })
  doc.font("Helvetica").fontSize(9).text(`  ${date}`, { align: "right" })
  doc.font("Helvetica-Oblique").fontSize(8.5).fillColor(muted).text(subtitle)
  if (items.length) bullets(items)
}

doc.font("Helvetica-Bold").fontSize(16).fillColor(navy).text("PIERRE MVITA")
doc.font("Helvetica-Bold").fontSize(10).fillColor(ink).text("Associate DevOps Engineer")
doc
  .font("Helvetica")
  .fontSize(8.75)
  .fillColor(ink)
  .text(
    "Toronto, Ontario, Canada  |  +1 437 575 8178  |  PierreMvita@yahoo.ca  |  linkedin.com/in/pierre-mvita  |  github.com/pmvita  |  pierremvita.dev",
  )

heading("Certifications")
doc
  .font("Helvetica")
  .fontSize(8.75)
  .fillColor(ink)
  .text(
    "AWS Certified Solutions Architect – Associate (SAA-C03)  |  CompTIA Security+  |  Docker Foundations Professional Certificate  |  Google IT Support Professional Certificate",
    { paragraphGap: 0 },
  )

heading("Technical Skills")
const skills = [
  [
    "Cloud platforms",
    "AWS (Lambda, API Gateway, Step Functions, S3, DynamoDB, SQS, SNS, CloudWatch, IAM, VPC, SSM); familiarity with multi-cloud concepts",
  ],
  [
    "IaC & automation",
    "Terraform, AWS SAM, CloudFormation, Docker, GitHub Actions; scripts and tooling for repeatable platform management",
  ],
  [
    "Pipelines & containers",
    "Serverless and containerized deploy patterns, OCI/Docker image builds, CI-oriented repo workflows with GitHub",
  ],
  [
    "Monitoring & reliability",
    "CloudWatch logs, metrics, and alarms; DLQs and retries; infrastructure troubleshooting and runbook-driven response",
  ],
  [
    "Cloud security",
    "CSPM-style posture checks, least-privilege IAM, secrets in SSM, TLS/HTTPS, OAuth2-style auth patterns",
  ],
  ["Languages", "Python, Bash, TypeScript, JavaScript, Node.js, SQL, PostgreSQL"],
  [
    "Ways of working",
    "Collaboration with technical and business stakeholders, documentation, Agile delivery",
  ],
]
for (const [label, value] of skills) {
  doc.font("Helvetica-Bold").fontSize(8.75).fillColor(ink).text(`${label}: `, { continued: true })
  doc.font("Helvetica").text(value, { lineGap: 0.2 })
}

heading("Projects")
job(
  "NimbusFlow — End-to-End Serverless Data Pipeline on AWS",
  "2026",
  "AWS SAM, Lambda, API Gateway, Step Functions, DynamoDB, SQS, SNS, CloudWatch, IAM, TypeScript",
  [
    "Built a reliable event pipeline — API Gateway to Lambda to SQS to Step Functions to DynamoDB to SNS — with stack, IAM, and alarms defined as code in one AWS SAM template.",
    "Hardened reliability with SQS/DLQ between ingest and processing, retries and catch on every Step Functions state, and CloudWatch alarms on errors and DLQ depth.",
    "Scoped each Lambda to its own IAM role with real resource ARNs; validated payloads at the edge so bad requests fail fast instead of clogging the pipeline.",
  ],
)
job(
  "AWS CSPM — Cloud Security Posture Checks as Code",
  "2026",
  "Terraform, Lambda, EventBridge, SNS, CloudWatch, IAM",
  [
    "Implemented scheduled CSPM-style checks (public S3, missing encryption, aged IAM keys, SSH/RDP open to the world) and emailed findings over SNS.",
    "Defined the scan role and schedule in Terraform so posture automation stays versioned, rebuildable, and low-cost when idle.",
  ],
)

heading("Experience")
job(
  "Technical Consultant",
  "Sep 2025 — Present",
  "Independent (NDA client engagements) · Contract Full-time, Toronto, ON · Hybrid",
  [
    "Improved platform efficiency by cutting a client's monthly cloud spend about 25% through right-sizing and S3 lifecycle tiers.",
    "Migrated 10TB+ into S3 with lifecycle rules and a documented recovery process; nothing lost.",
    "Segmented VPCs, scoped IAM, and wrote runbooks so clients could operate securely without leftover standing access.",
  ],
)
job(
  "AWS Cloud Associate",
  "Nov 2024 — Aug 2025",
  "Amazon Web Services (AWS) · Contract Full-time, Toronto, ON · Remote",
  [
    "Operated TypeScript/Node.js/React applications on AWS with the IAM, networking, and monitoring needed for reliable releases.",
    "Defined environments in SAM, CloudFormation, or Terraform so infrastructure could be rebuilt from the repo (IaC-first).",
    "Wired CloudWatch logs, metrics, and budget alarms so outages and spend spikes were visible for prompt troubleshooting.",
  ],
)
job(
  "Full Stack Engineer",
  "Jan 2023 — May 2024",
  "Contractor · Contract Part-time, Toronto, ON · Hybrid",
  [
    "Built and shipped TypeScript, Node.js, React, and PostgreSQL applications with authentication and production fixes.",
    "Collaborated with stakeholders to deliver integrated application releases and clear technical communication.",
  ],
)

heading("Education")
job("B.S. Software Engineering", "In Progress", "Western Governors University", [])
job("M.S. Business Administration", "In Progress", "Western Governors University", [])

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
