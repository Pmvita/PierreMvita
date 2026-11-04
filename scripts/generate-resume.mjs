import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import PDFDocument from "pdfkit"

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..")
const out = path.join(root, "public", "Pierre-Mvita-Cloud-Engineer.pdf")

const doc = new PDFDocument({
  size: "LETTER",
  margins: { top: 28, bottom: 28, left: 42, right: 42 },
  bufferPages: true,
})

const stream = fs.createWriteStream(out)
doc.pipe(stream)

const navy = "#1F3864"
const ink = "#1a1a1a"
const muted = "#333333"
const left = () => doc.page.margins.left
const right = () => doc.page.width - doc.page.margins.right
const contentWidth = () => right() - left()

function heading(text) {
  doc.moveDown(0.16)
  doc.font("Helvetica-Bold").fontSize(9.5).fillColor(ink).text(text.toUpperCase())
  doc
    .moveTo(left(), doc.y + 1)
    .lineTo(right(), doc.y + 1)
    .strokeColor("#444444")
    .lineWidth(0.5)
    .stroke()
  doc.moveDown(0.16)
}

function bullets(items) {
  doc.font("Helvetica").fontSize(9).fillColor(ink)
  for (const item of items) {
    doc.text(`•  ${item}`, left(), doc.y, {
      width: contentWidth(),
      indent: 8,
      paragraphGap: 0.35,
      lineGap: 0.35,
    })
  }
}

function titleDate(title, date) {
  const y = doc.y
  doc.font("Helvetica").fontSize(9)
  const dateWidth = Math.ceil(doc.widthOfString(date)) + 2
  const titleWidth = contentWidth() - dateWidth - 12
  doc.font("Helvetica-Bold").fontSize(10).fillColor(ink)
  const titleHeight = doc.heightOfString(title, { width: titleWidth })
  doc.text(title, left(), y, { width: titleWidth })
  doc.font("Helvetica").fontSize(9).fillColor(ink)
  doc.text(date, right() - dateWidth, y, {
    width: dateWidth,
    align: "right",
    lineBreak: false,
  })
  doc.x = left()
  doc.y = y + Math.max(titleHeight, 12) + 1
}

function job(title, date, subtitle, items) {
  titleDate(title, date)
  doc.x = left()
  doc.font("Helvetica-Oblique").fontSize(8.5).fillColor(muted)
  doc.text(subtitle, left(), doc.y, { width: contentWidth() })
  bullets(items)
}

doc.font("Helvetica-Bold").fontSize(16).fillColor(navy).text("PIERRE MVITA")
doc.font("Helvetica-Bold").fontSize(10).fillColor(ink).text("Junior Cloud Engineer")
doc.font("Helvetica").fontSize(9).fillColor(ink)
doc.text("Toronto, ON  |  PierreMvita@yahoo.ca  |  +1 437 575 8178")
doc.text("linkedin.com/in/pierre-mvita  |  github.com/Pmvita  |  pierre-mvita.vercel.app")

heading("Certifications")
doc
  .font("Helvetica")
  .fontSize(9)
  .fillColor(ink)
  .text(
    "AWS Certified Solutions Architect – Associate (SAA-C03)  |  CompTIA Security+  |  Docker Foundations Professional Certificate  |  Google IT Support Professional Certificate",
    { width: contentWidth(), paragraphGap: 0 },
  )

heading("Technical Skills")
const skills = [
  ["AWS", "Lambda, API Gateway, Step Functions, S3, DynamoDB, SQS, SNS, CloudWatch, IAM, VPC, SSM Parameter Store"],
  ["Infrastructure as code", "AWS SAM, CloudFormation, Terraform, Docker, GitHub Actions"],
  ["Security & networking", "Least-privilege IAM, VPC and subnet design, security groups, secrets in SSM, TCP/IP, DNS"],
  ["Reliability", "CloudWatch logs and alarms, dead-letter queues, retries with backoff, budget alarms"],
  ["Languages", "TypeScript, JavaScript, Node.js, Python, Bash, SQL, PostgreSQL"],
]
for (const [label, value] of skills) {
  doc.font("Helvetica-Bold").fontSize(9).fillColor(ink).text(`${label}: `, { continued: true })
  doc.font("Helvetica").text(value, { width: contentWidth(), lineGap: 0.25 })
}

heading("Experience")
job(
  "Technical Consultant",
  "Sep 2025 – Present",
  "Independent (NDA client engagements) · Contract Full-time, Toronto, ON · Hybrid",
  [
    "Cut a client’s monthly cloud spend by about 25% by right-sizing resources and moving cold data to cheaper S3 storage tiers.",
    "Moved 10TB+ of business data into S3 with lifecycle rules and a documented recovery process; nothing lost.",
    "Segmented VPCs and scoped IAM so sensitive client data stayed isolated (NDA).",
    "Stood up cloud workspaces and wrote runbooks so the client could operate the account without leftover standing access.",
  ],
)
job(
  "AWS Cloud Associate",
  "Nov 2024 – Aug 2025",
  "Amazon Web Services (AWS) · Contract Full-time, Toronto, ON · Remote",
  [
    "Hosted and operated TypeScript, Node.js, and React applications on AWS, including the IAM and networking needed to keep them running.",
    "Scoped IAM so each app had one role, real resource ARNs, and no long-lived access keys in the environment.",
    "Defined the stack in SAM, CloudFormation, or Terraform so the environment could be rebuilt from the repo.",
    "Wired CloudWatch logs, metrics, and budget alarms so outages and spend spikes showed up as email instead of a surprise.",
  ],
)
job(
  "Full Stack Engineer",
  "Jan 2023 – May 2024",
  "Contractor · Contract Part-time, Toronto, ON · Hybrid",
  [
    "Built and shipped applications in TypeScript, Node.js, React, and PostgreSQL.",
    "Designed REST APIs and relational/NoSQL schemas.",
    "Implemented authentication and fixed issues when they broke in production.",
  ],
)

heading("Projects")
job(
  "NimbusFlow — Serverless Event-Driven Data Pipeline on AWS",
  "2026",
  "AWS SAM, Lambda, API Gateway, Step Functions, DynamoDB, SQS, SNS, CloudWatch, IAM, TypeScript",
  [
    "Built a serverless event pipeline — API Gateway into Lambda, onto SQS, through Step Functions, into DynamoDB, out to SNS — with the stack, IAM, and alarms in one AWS SAM template.",
    "Wrote seven TypeScript Lambdas and validated payloads at the API edge so a malformed request returns 400 instead of clogging the queue.",
    "Put SQS and a dead-letter queue between ingest and processing, and gave every Step Functions state retries and a catch so failures are emailed instead of dropped.",
    "Gave each Lambda its own IAM role with real resource ARNs instead of wildcards, plus JSON logging and CloudWatch alarms on function errors and DLQ depth.",
  ],
)
job(
  "AWS CSPM — Account Posture Checks as Code",
  "2026",
  "Terraform, Lambda, EventBridge, SNS, CloudWatch, IAM",
  [
    "Built a scheduled Lambda that checks for public S3, missing encryption, IAM keys older than 90 days, and SSH/RDP open to the world, then emails findings over SNS.",
    "Scoped a single scan role, skipped AWS Config, and kept idle cost at effectively $0.",
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

const resumeCopy = path.join(
  root,
  "..",
  "Resume's",
  "Cloud Engineer Resume",
  "PierreMvita-JrCldE.pdf",
)
fs.copyFileSync(out, resumeCopy)
console.log(`Wrote ${out}`)
console.log(`Wrote ${resumeCopy}`)
