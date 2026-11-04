import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import PDFDocument from "pdfkit"

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..")
const out = path.join(
  root,
  "..",
  "Resume's",
  "IT Resume",
  "IT Solutions Analyst",
  "PierreMvita-ITSolutions.pdf",
)

const doc = new PDFDocument({
  size: "LETTER",
  margins: { top: 28, bottom: 28, left: 40, right: 40 },
  bufferPages: true,
})

fs.mkdirSync(path.dirname(out), { recursive: true })
const stream = fs.createWriteStream(out)
doc.pipe(stream)

const navy = "#1F3864"
const ink = "#1a1a1a"
const muted = "#333333"

function heading(text) {
  doc.moveDown(0.22)
  doc.font("Helvetica-Bold").fontSize(9).fillColor(ink).text(text.toUpperCase())
  doc
    .moveTo(doc.page.margins.left, doc.y + 1)
    .lineTo(doc.page.width - doc.page.margins.right, doc.y + 1)
    .strokeColor("#444444")
    .lineWidth(0.5)
    .stroke()
  doc.moveDown(0.18)
}

function bullets(items) {
  doc.font("Helvetica").fontSize(8.5).fillColor(ink)
  for (const item of items) {
    doc.text(`•  ${item}`, { indent: 8, paragraphGap: 0.4, lineGap: 0.15 })
  }
}

function job(title, date, subtitle, items) {
  const left = doc.page.margins.left
  const width = doc.page.width - doc.page.margins.left - doc.page.margins.right
  const y = doc.y
  doc.font("Helvetica-Bold").fontSize(9.5).fillColor(ink)
  doc.text(title, left, y, { width: width - 110, lineBreak: false })
  doc.font("Helvetica").fontSize(8.5).fillColor(ink)
  doc.text(date, left, y, { width, align: "right", lineBreak: false })
  doc.x = left
  doc.y = y + 12
  if (subtitle) {
    doc.font("Helvetica-Oblique").fontSize(8).fillColor(muted).text(subtitle, { width })
  }
  if (items.length) bullets(items)
  doc.moveDown(0.12)
}

doc.font("Helvetica-Bold").fontSize(16).fillColor(navy).text("PIERRE MVITA")
doc.font("Helvetica-Bold").fontSize(10).fillColor(ink).text("IT Solutions Analyst")
doc
  .font("Helvetica")
  .fontSize(8.5)
  .fillColor(ink)
  .text(
    "Toronto, Ontario, Canada  |  +1 437 575 8178  |  PierreMvita@yahoo.ca  |  linkedin.com/in/pierre-mvita  |  github.com/pmvita  |  pierremvita.dev",
  )
doc.moveDown(0.25)
doc
  .font("Helvetica")
  .fontSize(8.5)
  .fillColor(ink)
  .text(
    "End-user technical support in Toronto: workstation troubleshooting, Microsoft 365, and equipment and access setup. Follows each issue through until it is resolved and writes down what was done.",
    { lineGap: 0.4 },
  )

heading("Certifications")
doc
  .font("Helvetica")
  .fontSize(8.5)
  .fillColor(ink)
  .text(
    "Google IT Support Professional Certificate  |  NPower Junior IT Analyst (JITA)  |  AWS Certified Solutions Architect – Associate (SAA-C03)  |  CompTIA Security+",
    { paragraphGap: 0 },
  )

heading("Technical Skills")
const skills = [
  [
    "IT support & operations",
    "Windows, Microsoft 365, workstation and application troubleshooting, ticket-style issue handling, runbooks, plain-language status updates",
  ],
  [
    "Networking",
    "IP addresses, local networks, routers, ports, TCP/IP, DNS, DHCP, internet connectivity troubleshooting",
  ],
  [
    "Systems",
    "Equipment setup and access documentation, Linux fundamentals, Git, Bash",
  ],
]
for (const [label, value] of skills) {
  doc.font("Helvetica-Bold").fontSize(8.5).fillColor(ink).text(`${label}: `, { continued: true })
  doc.font("Helvetica").text(value, { lineGap: 0.15 })
}

heading("Selected Projects")
job(
  "IT Asset Manager",
  "2025",
  "Technologies: Microsoft 365, asset tracking, documentation systems",
  [
    "Built a record of technology assets and equipment across setup, use, and reclaim.",
    "Organized inventory so hardware and software were easier to locate, audit, and account for.",
  ],
)
job(
  "Packly — Network Monitoring",
  "2026",
  "Technologies: TCP/IP, PostgreSQL, Docker",
  [
    "Diagnosed connectivity from live network flows and wrote the findings up for handoff.",
  ],
)
job(
  "Logwatch — Investigation Notes",
  "2026",
  "Technologies: Windows Event Logs, CloudTrail",
  [
    "Wrote investigation notes from Windows and cloud events so another operator could triage without reading raw logs.",
  ],
)

heading("Experience")
job(
  "Technical Consultant",
  "Sep 2025 — Present",
  "Independent (NDA client engagements) · Contract Full-time, Toronto, ON · Hybrid",
  [
    "Primary technical contact for client environments: explained issues in plain language, wrote runbooks, and followed each issue until it was resolved or handed off.",
    "Stood up workspaces and scoped access so day-to-day operations stayed reliable.",
    "Managed a 10TB+ data migration into S3 with lifecycle rules and a documented recovery process.",
  ],
)
job(
  "AWS Cloud Associate",
  "Nov 2024 — Aug 2025",
  "Amazon Web Services (AWS) · Contract Full-time, Toronto, ON · Remote",
  [
    "Kept applications available by watching networking, logs, and alarms, then documented the response.",
    "Hosted TypeScript, Node.js, and React applications on AWS.",
  ],
)
job(
  "Full Stack Engineer",
  "Jan 2023 — May 2024",
  "Contractor · Contract Part-time, Toronto, ON · Hybrid",
  [
    "Fixed production issues and wrote down what changed for the next person.",
    "Maintained applications in TypeScript, React, Node.js, and PostgreSQL.",
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
