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
  "SOC Analyst Level 2",
  "PierreMvita-SOC-L2.pdf",
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
  bullets(items)
}

doc.font("Helvetica-Bold").fontSize(16).fillColor(navy).text("PIERRE MVITA")
doc.font("Helvetica-Bold").fontSize(10).fillColor(ink).text("Security Operations Analyst")
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
    "Detection & response",
    "Log triage, detection rules, anomaly review, IOC extraction, incident notes and runbooks, escalation-style risk assessment",
  ],
  [
    "Frameworks & analysis",
    "MITRE ATT&CK-aligned technique mapping, TTP-oriented investigation write-ups, multi-source log correlation",
  ],
  [
    "Monitoring & SIEM-style",
    "CloudTrail analytics, Windows Event Log review, GuardDuty, Security Hub, CloudWatch logs and alarms; detection engineering transferable to SIEM/SOAR workflows",
  ],
  [
    "Endpoint & network",
    "Packet capture and protocol analysis, TCP/IP, DNS, DHCP, VPC and security groups, traffic anomaly reporting",
  ],
  [
    "Cloud security ops",
    "AWS IAM least privilege, secrets hygiene, encryption at rest, S3 public-access controls, CloudTrail auditing, CSPM-adjacent posture review",
  ],
  ["Languages & tools", "Python, Bash, SQL, TypeScript, Terraform, Git, GitHub, Microsoft 365"],
  [
    "Ways of working",
    "Playbook and runbook authoring, ticket-style troubleshooting, process improvement, stakeholder reporting, Agile",
  ],
]
for (const [label, value] of skills) {
  doc.font("Helvetica-Bold").fontSize(8.75).fillColor(ink).text(`${label}: `, { continued: true })
  doc.font("Helvetica").text(value, { lineGap: 0.2 })
}

heading("Highlighting Projects")
job(
  "Logwatch — Multi-Source Log Triage and Incident Notes",
  "2026",
  "Technologies: TypeScript, Node.js, CloudTrail, Windows Event Logs, Vitest",
  [
    "Designed detections over CloudTrail and Windows Security events so high-risk behaviors (console login without MFA, security group opened to the world, failed-logon bursts) surface as actionable findings for escalation-style review.",
    "Turned hits into markdown incident notes with timeline and IOCs so investigations start from structured write-ups, not raw log dumps.",
    "Iterated on rules and filters to improve signal quality for repeatable triage, mirroring detection-tuning work done with SIEM engineering teams.",
  ],
)
job(
  "Packly — Network Packet Inspection and Anomaly Review",
  "2026",
  "Technologies: libpcap, TCP/IP, PostgreSQL, Next.js, Docker",
  [
    "Built a packet inspector that captures frames with libpcap and decodes protocol stacks so traffic can be reviewed instead of guessed from application errors.",
    "Persisted flows in PostgreSQL and reviewed them live on a dashboard to support rapid anomaly identification across network telemetry.",
    "Documented unusual patterns in diagnostic reports suitable for handoff and escalation to higher-tier response.",
  ],
)

heading("Experience")
job(
  "Technical Consultant",
  "Sep 2025 — Present",
  "Independent (NDA client engagements) · Contract Full-time, Toronto, ON · Hybrid",
  [
    "Led cloud security architecture workstreams: segmented VPCs and scoped IAM so sensitive client data stayed isolated under NDA constraints.",
    "Executed a complex 10TB+ data migration into S3 with lifecycle controls and a documented recovery process; nothing lost.",
    "Authored runbooks and operational procedures so clients could operate securely without leftover standing access.",
  ],
)
job(
  "AWS Cloud Associate",
  "Nov 2024 — Aug 2025",
  "Amazon Web Services (AWS) · Contract Full-time, Toronto, ON · Remote",
  [
    "Operated production workloads with the IAM and networking controls required for secure cloud operations.",
    "Enforced least-privilege IAM (one role per app, explicit resource ARNs, no long-lived access keys) aligned to cloud control-framework thinking.",
    "Wired CloudWatch logs, metrics, and alarms so security and ops events surfaced for review instead of silent failure.",
  ],
)
job(
  "Full Stack Engineer",
  "Jan 2023 — May 2024",
  "Contractor · Contract Part-time, Toronto, ON · Hybrid",
  [
    "Built and shipped applications in TypeScript, Node.js, React, and PostgreSQL; implemented authentication and production troubleshooting.",
    "Designed REST APIs and data schemas; practiced structured debugging and clear stakeholder communication under delivery pressure.",
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
