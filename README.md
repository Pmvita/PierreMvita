# Pierre Mvita - Mobile & Full-Stack Developer Portfolio

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS. This website showcases my skills, projects, and experience as a Mobile & Full-Stack Developer with a focus on secure software development, cloud applications, and cybersecurity.

## 🚀 Features

- **Modern Design**: Clean, professional design with smooth animations
- **Responsive**: Fully responsive layout that works on all devices
- **Performance Optimized**: Built with Next.js for optimal performance
- **SEO Friendly**: Proper meta tags and structured data
- **Smooth Animations**: Framer Motion animations for enhanced user experience
- **Contact Form**: Interactive contact form for potential clients/employers
- **Project Showcase**: Dedicated section to highlight projects and skills
- **Security Focus**: Emphasis on cybersecurity and secure development practices

## 🛠️ Technologies Used

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📁 Project Structure

```text
app/
  layout.tsx          # Root layout + OG metadata
  page.tsx            # Shell: Scene + SiteNav + Hero/Work/Capabilities/Experience/Contact
  globals.css         # Brand tokens + house rules
app/api/contact/route.ts   # Contact form handler (Resend)
app/sitemap/route.ts       # XML sitemap
app/work/[slug]/*          # Project detail pages + per-project OG images
components/
  brand/              # Brand identity sheet
  contact/Contact.tsx          # Contact section (client form)
  experience/Timeline.tsx
  hero/Hero.tsx
  nav/SiteNav.tsx
  scene/Scene.tsx, WebGLBackdrop.tsx
  skills/Capabilities.tsx
  work/ProjectCard.tsx, WorkList.tsx
content/              # typed content: site.ts, experience.ts, projects.ts, skills.ts
scripts/              # resume generators (see package.json scripts)
styles/design.md      # this project's design specification
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` (values optional — the site ships without them):

```
# Contact form: leave RESEND_API_KEY empty to skip outbound mail
RESEND_API_KEY=
RESEND_FROM=hello@pierre-mvita.vercel.app
RESEND_TO=pierrermvita@yahoo.com
```

Optional analytics: `NEXT_PUBLIC_VERCEL_ANALYTICS` or a Google Analytics
`GTM_ID`.

## 📦 Code & Quality

- `npm run build` — production build (passes).
- `npx tsc --noEmit` — type-check (passes). The `npm run lint` script is
  dev-only: it reports `Invalid project directory` under Next 16 / ESLint 9,
  so `tsc --noEmit` is the honest gate.
- Audit: `.npmrc` sets `audit-level=high`. **`npm audit fix --force` is
  deliberately not used** — it collapses `eslint@9 → 4.0.0` and
  `eslint-config-next → 0.2.4`, breaking the Next 16 / ESLint 9 flat-config
  chain. Dev-toolchain advisories remain on the ESLint chain (no criticals):
  re-evaluate quarterly once ESLint 10 / TypeScript ESLint 9 / Next 17 ship.

## 📱 Performance Optimization

This portfolio is already optimized for performance with:

- Next.js App Router for optimal loading
- Tailwind CSS for minimal CSS bundle
- Optimized images (consider using Next.js Image component for production)
- Lazy loading animations with Framer Motion

## 🔧 Additional Features to Consider

- **Blog Section**: Add a blog to showcase your writing
- **Dark Mode**: Implement a dark/light theme toggle
- **Contact Form Backend**: Built in — see Environment Variables above
- **Analytics**: Integrated (set `NEXT_PUBLIC_VERCEL_ANALYTICS` / `GTM_ID`)
- **SEO**: Proper meta tags and structured data on every page
- **PWA**: Make it a Progressive Web App
- **Internationalization**: Add multiple language support
- **Security Features**: Add security headers and best practices

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio. If you
find any bugs or have suggestions, please open an issue.

## 📞 Contact

- Email: [pierrermvita@yahoo.com](mailto:pierrermvita@yahoo.com)
- GitHub: [github.com/Pmvista](https://github.com/Pmvista)
- LinkedIn: [linkedin.com/in/pierre-mvita](https://linkedin.com/in/pierre-mvita)
