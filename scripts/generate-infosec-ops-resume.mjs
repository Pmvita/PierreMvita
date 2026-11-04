import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import PDFDocument from "pdfkit"

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..")
const out = path.join(
  root,
  "..",
  "Resume's",
  "Security Analyst Resume",
  "Information Security Operations Analyst",
  "PierreMvita-InfoSecOps.pdf",
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
doc.font("Helvetica-Bold").fontSize(10).fillColor(ink).text("Information Security Operations Analyst")
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
    "CompTIA Security+  |  AWS Certified Solutions Architect – Associate (SAA-C03)  |  Google IT Support Professional Certificate  |  NPower Junior IT Analyst (JITA)",
    { paragraphGap: 0 },
  )

heading("Technical Skills")
const skills = [
  [
    "Incident triage & response",
    "Alert triage from cloud, endpoint, and network signals; investigation notes with timelines and IOCs; runbook-driven handling",
  ],
  [
    "Cloud investigations (AWS)",
    "CloudTrail analysis, GuardDuty, Security Hub, CloudWatch logs and alarms, IAM forensic review, security group exposure, MFA gaps",
  ],
  [
    "Analytics & SIEM-style",
    "Detection rule design, analytic trigger tuning for alert efficacy, multi-source log correlation, anomaly identification",
  ],
  [
    "Endpoint & perimeter",
    "Windows Security Event Log review, packet capture and protocol analysis, TCP/IP, DNS, DHCP, VPC and perimeter controls",
  ],
  [
    "Cloud security ops",
    "AWS IAM least privilege, secrets hygiene, encryption at rest, S3 public-access controls, network segmentation",
  ],
  ["Languages & tools", "Python, Bash, SQL, TypeScript, Terraform, Git, GitHub, Microsoft 365"],
  [
    "Ways of working",
    "Incident documentation, process improvement, stakeholder communication (technical and non-technical), collaboration, Agile",
  ],
]
for (const [label, value] of skills) {
  doc.font("Helvetica-Bold").fontSize(8.75).fillColor(ink).text(`${label}: `, { continued: true })
  doc.font("Helvetica").text(value, { lineGap: 0.2 })
}

heading("Highlighting Projects")
job(
  "Logwatch — Cloud and Endpoint Alert Triage",
  "2026",
  "Technologies: TypeScript, Node.js, CloudTrail, Windows Event Logs, Vitest",
  [
    "Built analytic triggers over CloudTrail and Windows Security events so high-risk behaviors (console login without MFA, security group opened to the world, failed-logon bursts) surface as actionable alerts.",
    "Tuned detections to improve alert efficacy, then turned hits into investigation notes with timeline and IOCs for structured incident documentation.",
    "Practiced cloud and endpoint investigation workflows transferable to SOC alert queues fed by cloud security, EDR-style signals, and perimeter tooling.",
  ],
)
job(
  "Packly — Network and Perimeter Anomaly Review",
  "2026",
  "Technologies: libpcap, TCP/IP, PostgreSQL, Next.js, Docker",
  [
    "Built a packet inspector that captures frames and decodes protocol stacks so perimeter and network investigations use captured traffic, not application-error guesses.",
    "Persisted flows and reviewed them live to support proactive anomaly spotting across network telemetry.",
    "Wrote diagnostic reports documenting findings suitable for handoff within a multi-functional SecOps team.",
  ],
)

heading("Experience")
job(
  "Technical Consultant",
  "Sep 2025 — Present",
  "Independent (NDA client engagements) · Contract Full-time, Toronto, ON · Hybrid",
  [
    "Hardened AWS environments with VPC segmentation and least-privilege IAM so sensitive client assets stayed isolated under NDA constraints.",
    "Owned a complex 10TB+ data migration into S3 with lifecycle controls and a documented recovery process; nothing lost.",
    "Authored runbooks so clients could operate securely without leftover standing access, supporting readiness and repeatable handling.",
  ],
)
job(
  "AWS Cloud Associate",
  "Nov 2024 — Aug 2025",
  "Amazon Web Services (AWS) · Contract Full-time, Toronto, ON · Remote",
  [
    "Operated production workloads with AWS security controls (IAM, networking, logging) required for cloud infrastructure investigations and secure operations.",
    "Enforced least-privilege IAM (one role per app, explicit resource ARNs, no long-lived access keys) and reviewed access patterns when issues arose.",
    "Wired CloudWatch logs, metrics, and alarms so security and ops signals surfaced for triage instead of silent failure.",
  ],
)
job(
  "Full Stack Engineer",
  "Jan 2023 — May 2024",
  "Contractor · Contract Part-time, Toronto, ON · Hybrid",
  [
    "Built and shipped TypeScript, Node.js, React, and PostgreSQL applications; implemented authentication and production troubleshooting.",
    "Communicated technical concepts clearly across stakeholders while debugging under delivery pressure; used Python and Bash for automation tasks.",
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
