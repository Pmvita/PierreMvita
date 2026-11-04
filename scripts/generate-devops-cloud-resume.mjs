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
  "DevOps Cloud Engineer",
  "PierreMvita-DevOpsCloud.pdf",
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
  doc.font("Helvetica-Bold").fontSize(10).fillColor(ink).text(title, { continued: true })
  doc.font("Helvetica").fontSize(9).text(`  ${date}`, { align: "right" })
  doc.font("Helvetica-Oblique").fontSize(8.25).fillColor(muted).text(subtitle)
  if (items.length) bullets(items)
}

doc.font("Helvetica-Bold").fontSize(16).fillColor(navy).text("PIERRE MVITA")
doc.font("Helvetica-Bold").fontSize(10).fillColor(ink).text("DevOps Cloud Engineer")
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
    "AWS Certified Solutions Architect – Associate (SAA-C03)  |  Docker Foundations Professional Certificate  |  CompTIA Security+  |  Google IT Support Professional Certificate",
    { paragraphGap: 0 },
  )

heading("Technical Skills")
const skills = [
  [
    "AWS architecture",
    "Lambda, API Gateway, Step Functions, S3, DynamoDB, SQS, SNS, CloudWatch, IAM, VPC, SSM; design for scalable, reliable application delivery",
  ],
  [
    "IaC & provisioning",
    "Terraform, AWS SAM, CloudFormation; consistent configuration across environments; rebuildable stacks from Git",
  ],
  [
    "CI/CD & containers",
    "GitHub Actions and pipeline-as-code patterns; Docker multi-service stacks; automated deploy and release hygiene",
  ],
  [
    "Networking & resilience",
    "VPC/subnet design, security groups, least-privilege access; CloudWatch alarms, DLQs, retries; documented recovery processes",
  ],
  [
    "Serverless & languages",
    "Python, Bash, TypeScript, Node.js, SQL, PostgreSQL; event-driven serverless pipelines",
  ],
  [
    "Security & ops",
    "CSPM-style posture checks, secrets in SSM, encryption and public-access controls, operational runbooks",
  ],
  ["Ways of working", "Cross-functional collaboration, clear technical communication, process improvement"],
]
for (const [label, value] of skills) {
  doc.font("Helvetica-Bold").fontSize(8.5).fillColor(ink).text(`${label}: `, { continued: true })
  doc.font("Helvetica").text(value, { lineGap: 0.15 })
}

heading("Projects")
job(
  "NimbusFlow — Automated Serverless Pipeline on AWS",
  "2026",
  "AWS SAM, Lambda, API Gateway, Step Functions, DynamoDB, SQS, SNS, CloudWatch, IAM, TypeScript",
  [
    "Designed and automated cloud provisioning and application deploy for an event-driven pipeline (API Gateway, Lambda, SQS, Step Functions, DynamoDB, SNS).",
    "Defined the full stack as IaC (SAM) so environments stay consistent, scalable, and rebuildable from the repo.",
    "Added SQS/DLQ, Step Functions retries/catch, and CloudWatch alarms so reliability and failure visibility support business continuity.",
  ],
)
job(
  "AWS CSPM — Posture Automation as Code",
  "2026",
  "Terraform, Lambda, EventBridge, SNS, CloudWatch, IAM",
  [
    "Automated scheduled checks for public S3, missing encryption, aged IAM keys, and open SSH/RDP; emailed findings over SNS.",
    "Codified the scan role and schedule in Terraform for consistent, low-cost security automation across the account.",
  ],
)
job(
  "Packly — Containerized Cloud-Adjacent Stack",
  "2026",
  "Docker, Next.js, PostgreSQL",
  [
    "Containerized a multi-service app with Docker for repeatable local-to-demo delivery aligned with modern config management.",
  ],
)

heading("Experience")
job(
  "Technical Consultant",
  "Sep 2025 — Present",
  "Independent (NDA client engagements) · Contract Full-time, Toronto, ON · Hybrid",
  [
    "Architected secure AWS network segmentation (VPCs, IAM) so sensitive workloads stayed isolated under NDA.",
    "Automated and documented a 10TB+ S3 migration with lifecycle rules and a recovery process supporting continuity objectives.",
    "Cut monthly cloud spend about 25% via right-sizing and storage tiers while keeping operations reliable.",
  ],
)
job(
  "AWS Cloud Associate",
  "Nov 2024 — Aug 2025",
  "Amazon Web Services (AWS) · Contract Full-time, Toronto, ON · Remote",
  [
    "Provisioned and operated production TypeScript/Node.js/React apps on AWS with IaC (SAM, CloudFormation, Terraform).",
    "Built monitoring with CloudWatch logs, metrics, and alarms so engineering teams could deliver and operate with faster feedback.",
    "Collaborated across app and platform workstreams; enforced least-privilege IAM as a release baseline.",
  ],
)
job(
  "Full Stack Engineer",
  "Jan 2023 — May 2024",
  "Contractor · Contract Part-time, Toronto, ON · Hybrid",
  [
    "Shipped TypeScript, Node.js, React, and PostgreSQL applications; partnered with stakeholders on delivery quality.",
    "Implemented authentication and fixed production issues as part of continuous improvement of the release path.",
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
