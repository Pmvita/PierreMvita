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
  "PierreMvita-JrSecA.pdf",
)

const doc = new PDFDocument({
  size: "LETTER",
  margins: { top: 24, bottom: 24, left: 40, right: 40 },
  bufferPages: true,
})

const stream = fs.createWriteStream(out)
doc.pipe(stream)

const navy = "#1F3864"
const ink = "#1a1a1a"
const muted = "#333333"

function heading(text) {
  doc.moveDown(0.18)
  doc.font("Helvetica-Bold").fontSize(9.5).fillColor(ink).text(text.toUpperCase())
  doc
    .moveTo(doc.page.margins.left, doc.y + 1)
    .lineTo(doc.page.width - doc.page.margins.right, doc.y + 1)
    .strokeColor("#444444")
    .lineWidth(0.5)
    .stroke()
  doc.moveDown(0.18)
}

function bullets(items) {
  doc.font("Helvetica").fontSize(9).fillColor(ink)
  for (const item of items) {
    doc.text(`•  ${item}`, { indent: 8, paragraphGap: 0.4, lineGap: 0.4 })
  }
}

function job(title, date, subtitle, items) {
  doc.font("Helvetica-Bold").fontSize(10).fillColor(ink).text(title, { continued: true })
  doc.font("Helvetica").fontSize(9).text(`  ${date}`, { align: "right" })
  doc.font("Helvetica-Oblique").fontSize(8.5).fillColor(muted).text(subtitle)
  bullets(items)
}

doc.font("Helvetica-Bold").fontSize(16).fillColor(navy).text("PIERRE MVITA")
doc.font("Helvetica-Bold").fontSize(10).fillColor(ink).text("Junior Security Analyst")
doc
  .font("Helvetica")
  .fontSize(9)
  .fillColor(ink)
  .text(
    "Toronto, Ontario, Canada  |  +1 437 575 8178  |  PierreMvita@yahoo.ca  |  linkedin.com/in/pierre-mvita  |  github.com/pmvita  |  pierremvita.dev",
  )

heading("Certifications")
doc
  .font("Helvetica")
  .fontSize(9)
  .fillColor(ink)
  .text(
    "CompTIA Security+  |  AWS Certified Solutions Architect – Associate (SAA-C03)  |  Google IT Support Professional Certificate  |  NPower Junior IT Analyst (JITA)",
    { paragraphGap: 0 },
  )

heading("Technical Skills")
const skills = [
  ["Security operations", "Least-privilege IAM, role separation, secrets management, access control, NDA handling, incident notes and runbooks"],
  ["Monitoring & detection", "GuardDuty, SecurityHub, CloudWatch logs and alarms, network packet analysis, anomaly identification"],
  ["Networking", "TCP/IP, DNS, DHCP, VPC and subnet design, security groups, VPC endpoints, network troubleshooting"],
  ["Cloud security", "AWS IAM, S3 Block Public Access, encryption at rest, HTTPS-only policies, CloudTrail, no long-lived access keys"],
  ["Languages & tools", "Python, Bash, SQL, TypeScript, Terraform, Git, GitHub, Microsoft 365"],
  ["Ways of working", "Technical documentation, ticket-style troubleshooting, change notes, Agile"],
]
for (const [label, value] of skills) {
  doc.font("Helvetica-Bold").fontSize(9).fillColor(ink).text(`${label}: `, { continued: true })
  doc.font("Helvetica").text(value, { lineGap: 0.3 })
}

heading("Highlighting Projects")
job(
  "Logwatch — Local Log Triage and Incident Notes",
  "2026",
  "Technologies: TypeScript, Node.js, CloudTrail, Windows Event Logs, Vitest",
  [
    "Wrote detections over CloudTrail and Windows Security events so a console login without MFA, a security group opened to the world, and a failed-logon burst surface as findings.",
    "Turned those hits into a markdown incident note with a timeline and IOCs so an investigation starts from a write-up, not a raw log dump.",
  ],
)
job(
  "Packly — Network Packet Inspection and Anomaly Review",
  "2026",
  "Technologies: libpcap, TCP/IP, PostgreSQL, Next.js, Docker",
  [
    "Built a packet inspector that captures frames with libpcap and decodes protocol stacks so traffic can be reviewed instead of guessed from application errors.",
    "Persisted flows in PostgreSQL and watched them live on a dashboard so an investigation starts from captured packets.",
    "Used protocol analysis to flag unusual patterns and wrote the findings up as a diagnostic report.",
  ],
)

heading("Experience")
job(
  "Technical Consultant",
  "Sep 2025 — Present",
  "Independent (NDA client engagements) · Contract Full-time, Toronto, ON · Hybrid",
  [
    "Segmented VPCs and scoped IAM so sensitive client data stayed isolated (NDA).",
    "Moved 10TB+ of business data into S3 with lifecycle rules and a documented recovery process; nothing lost.",
    "Stood up cloud workspaces and wrote runbooks so the client could operate the account without leftover standing access.",
  ],
)
job(
  "AWS Cloud Associate",
  "Nov 2024 — Aug 2025",
  "Amazon Web Services (AWS) · Contract Full-time, Toronto, ON · Remote",
  [
    "Hosted and operated TypeScript, Node.js, and React applications on AWS, including the IAM and networking needed to keep them running.",
    "Scoped IAM so each app had one role, real resource ARNs, and no long-lived access keys in the environment.",
    "Wired CloudWatch logs, metrics, and budget alarms so outages and spend spikes showed up as email instead of a surprise.",
  ],
)
job(
  "Full Stack Engineer",
  "Jan 2023 — May 2024",
  "Contractor · Contract Part-time, Toronto, ON · Hybrid",
  [
    "Built and shipped applications in TypeScript, Node.js, React, and PostgreSQL.",
    "Designed REST APIs and relational/NoSQL schemas.",
    "Implemented authentication and fixed issues when they broke in production.",
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
