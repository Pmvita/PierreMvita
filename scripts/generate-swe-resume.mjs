import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import PDFDocument from "pdfkit"

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..")
const out = path.join(root, "..", "Resume's", "IT Resume", "PierreMvita-SwE.pdf")

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
  doc.moveDown(0.2)
  doc.font("Helvetica-Bold").fontSize(9).fillColor(ink).text(text.toUpperCase())
  doc
    .moveTo(doc.page.margins.left, doc.y + 1)
    .lineTo(doc.page.width - doc.page.margins.right, doc.y + 1)
    .strokeColor("#444444")
    .lineWidth(0.5)
    .stroke()
  doc.moveDown(0.16)
}

function bullets(items) {
  doc.font("Helvetica").fontSize(8.5).fillColor(ink)
  for (const item of items) {
    doc.text(`•  ${item}`, { indent: 8, paragraphGap: 0.35, lineGap: 0.15 })
  }
}

function job(title, date, subtitle, items) {
  const left = doc.page.margins.left
  const width = doc.page.width - doc.page.margins.left - doc.page.margins.right
  const y = doc.y
  doc.font("Helvetica-Bold").fontSize(9.5).fillColor(ink)
  doc.text(title, left, y, { width: width - 120, lineBreak: false })
  doc.font("Helvetica").fontSize(8.5).fillColor(ink)
  doc.text(date, left, y, { width, align: "right", lineBreak: false })
  doc.x = left
  doc.y = y + 12
  if (subtitle) {
    doc.font("Helvetica-Oblique").fontSize(8).fillColor(muted).text(subtitle, { width })
  }
  if (items.length) bullets(items)
  doc.moveDown(0.1)
}

doc.font("Helvetica-Bold").fontSize(16).fillColor(navy).text("PIERRE MVITA")
doc.font("Helvetica-Bold").fontSize(10).fillColor(ink).text("Software Engineer")
doc
  .font("Helvetica")
  .fontSize(8.5)
  .fillColor(ink)
  .text(
    "Toronto, Ontario, Canada  |  +1 437 575 8178  |  PierreMvita@yahoo.ca  |  linkedin.com/in/pierre-mvita  |  github.com/pmvita  |  pierremvita.dev",
  )
doc.moveDown(0.22)
doc
  .font("Helvetica")
  .fontSize(8.5)
  .fillColor(ink)
  .text(
    "Builds full-stack web applications and React Native mobile apps with TypeScript, React, Next.js, Expo, Node.js, and PostgreSQL. Takes work from requirements through UI, API, and deployment, including iOS and Android targets.",
    { lineGap: 0.35 },
  )

heading("Certifications")
doc
  .font("Helvetica")
  .fontSize(8.5)
  .fillColor(ink)
  .text(
    "Meta Front-End Developer Certificate  |  Meta Back-End Developer Certificate  |  Docker Foundations Professional Certificate  |  Google IT Support Professional Certificate  |  NPower Junior IT Analyst (JITA)",
  )

heading("Technical Skills")
const skills = [
  [
    "Languages & frameworks",
    "JavaScript, TypeScript, React, React Native, Expo, Next.js, Node.js, HTML5, CSS3",
  ],
  ["Backend & data", "REST APIs, PostgreSQL, Supabase, SQL, database design"],
  ["Mobile", "Expo apps for iOS and Android, secure device storage, biometric unlock"],
  ["Cloud & tools", "AWS, Git/GitHub, Docker, CI/CD basics"],
]
for (const [label, value] of skills) {
  doc.font("Helvetica-Bold").fontSize(8.5).fillColor(ink).text(`${label}: `, { continued: true })
  doc.font("Helvetica").text(value, { lineGap: 0.12 })
}

heading("Selected Projects")
job(
  "SwissOne — Web and Mobile Banking Client",
  "2026",
  "Technologies: Next.js, React Native, Expo, Supabase, PostgreSQL",
  [
    "Built the web app and the Expo mobile app in one TypeScript codebase, with Supabase auth and PostgreSQL.",
    "Shipped shared product flows on the web and on iOS and Android targets.",
  ],
)
job(
  "OneLock — Mobile Credential Vault",
  "2025",
  "Technologies: React Native, Expo, SecureStore, biometrics",
  [
    "Built a React Native vault with biometric unlock and credentials kept in secure device storage.",
  ],
)
job(
  "LiveZone — Mobile Sports Scores",
  "2026",
  "Technologies: Expo, React Native, TypeScript",
  [
    "Built an Expo scoreboard for iOS, Android, and web, with server routes that keep the API key off the phone and cache live scores.",
  ],
)

heading("Experience")
job(
  "Full-Stack Developer / Technical Product Manager",
  "2023 — Present",
  "Self-Employed / Freelance — Independent Technology Projects",
  [
    "Designed and built web applications with React, TypeScript, Node.js, and PostgreSQL, from schema and REST APIs through the UI.",
    "Built React Native and Expo apps for iOS and Android, including a credential vault, a banking client, and a live sports scoreboard.",
    "Shipped in short iterations and wrote down requirements, trade-offs, and what changed.",
  ],
)
job(
  "Business Systems Analyst / Technology Consultant",
  "2021 — 2023",
  "Self-Employed / Freelance — Independent Business Technology Projects",
  [
    "Turned business processes into documented technical solutions, automation, and reporting.",
    "Compared options against requirements, scalability, and feasibility.",
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
