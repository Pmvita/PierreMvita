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

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main portfolio page
│   └── globals.css         # Global styles
├── public/                 # Static assets
├── package.json
├── tailwind.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.


### Environment Variables

No environment variables are required for this basic portfolio, but you can add them if needed for:
- Contact form functionality
- Analytics
- API keys for additional features

## 📱 Performance Optimization

This portfolio is already optimized for performance with:

- Next.js App Router for optimal loading
- Tailwind CSS for minimal CSS bundle
- Optimized images (consider using Next.js Image component for production)
- Lazy loading animations with Framer Motion

## 🔧 Additional Features to Consider

- **Blog Section**: Add a blog to showcase your writing
- **Dark Mode**: Implement a dark/light theme toggle
- **Contact Form Backend**: Add form submission functionality
- **Analytics**: Integrate Google Analytics or Vercel Analytics
- **SEO**: Add more meta tags and structured data
- **PWA**: Make it a Progressive Web App
- **Internationalization**: Add multiple language support
- **Security Features**: Add security headers and best practices

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio. If you find any bugs or have suggestions, please open an issue.

## 📞 Contact

- Email: Petermvita@hotmail.com
- GitHub: [github.com/Pmvita](https://github.com/Pmvita)
- LinkedIn: [linkedin.com/in/pierre-mvita](https://linkedin.com/in/pierre-mvita)


---
# Pierre Mvita — Cloud / Full-stack / Mobile Portfolio

Design system: dark editorial brand — one ground (`#070705`), one ink
(`#f4f0e6`), one accent (`#d4af5a`), square-cornered "paper" surfaces, a
paper-stripe section separator, and a single interactive element on the
hero (a live cost/history counter). No gradients on the UI, no glass,
no hairline rules, no eyebrows, no index numbers, no pill badges.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4
- Three.js (flat, alpha-bg scene backdrop in `components/scene/WebGLBackdrop.tsx`)
- Framer Motion (drawer + entrance)
- Lucide React (icons)
- [shadcn](https://ui.shadcn.com) (config present, no UI components committed)

## Structure

```
app/
  layout.tsx          # Root layout + OG metadata
  page.tsx            # Shell: Scene + SiteNav + Hero/Work/Capabilities/Experience/Contact
  globals.css         # Brand tokens + house rules (tokens: --color-*, --text-*, --space-*)
components/
  brand/              # Brand identity sheet
  contact/brand/      # Contact section
  experience/Timeline.tsx
  hero/Hero.tsx
  nav/SiteNav.tsx
  portfolio/          # (future portfolio dashboard)
  scene/Scene.tsx, WebGLBackdrop.tsx
  skills/Capabilities.tsx
  work/ProjectCard.tsx, WorkList.tsx
content/              # typed content: site.ts, experience.ts, projects.ts, skills.ts
scripts/              # resume generators (see package.json scripts)
styles/design.md      # this project's design specification
```

## Commands

- `npm run dev` — dev server (port 3001; 3000 is usually already in use)
- `npm run build` — production build
- `npm run lint` — Next lint (see notes below)

## Notes

- `npm run lint` fails in this Next 16 / ESLint 9 setup (`next lint` is
  deprecated and `eslint-config-next` v16 is not compatible with ESLint's
  flat config loader). The project's code is type-checked with
  `npx tsc --noEmit` (passes) and ships via `npm run build` (passes).
- Environment variables: none required. Contact, GitHub, and LinkedIn are
  plain `mailto:` / `href` links.
---
