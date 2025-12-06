'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { 
  Github, 
  Linkedin, 
  Mail, 
  Download, 
  ExternalLink,
  Globe,
  Server,
  Cloud,
  Smartphone as Mobile,
  ChevronDown,
  Shield,
  Code,
  Database,
  ArrowRight
} from 'lucide-react'

// TypeScript interfaces
interface Project {
  title: string
  description: string
  technologies: string[]
  image: string
  github: string
  live: string
}

interface SkillCategory {
  icon: React.ComponentType<{ className?: string }>
  title: string
  skills: string[]
}



// Custom hook for intersection observer
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [ref, setRef] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!ref) return

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting)
    }, options)

    observer.observe(ref)
    return () => observer.disconnect()
  }, [ref, options])

  return [setRef, isIntersecting] as const
}



// Custom hook for typing animation
const useTypewriter = (text: string, speed: number = 100) => {
  const [displayText, setDisplayText] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1))
        index++
      } else {
        setIsComplete(true)
        clearInterval(timer)
      }
    }, speed)

    return () => clearInterval(timer)
  }, [text, speed])

  return { displayText, isComplete }
}

// Interactive Project Card Component
const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [ref, isInView] = useIntersectionObserver({ threshold: 0.1 })

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.6, 
        delay: index * 0.1,
        type: "spring" as const,
        stiffness: 100
      }
    },
    hover: { 
      y: -10, 
      scale: 1.02,
      transition: { duration: 0.3 }
    }
  }

  const imageVariants = {
    hover: { scale: 1.1, transition: { duration: 0.3 } }
  }

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100"
    >
      {/* Project Image */}
      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        <motion.img
          variants={imageVariants}
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Hover Overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-black/60"
            >
              <div className="flex space-x-4">
                <motion.a
                  href={project.github}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors"
                >
                  <Github className="h-6 w-6" />
                </motion.a>
                <motion.a
                  href={project.live}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors"
                >
                  <ExternalLink className="h-6 w-6" />
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Project Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
            {project.title}
          </h3>
          <motion.button
            whileHover={{ rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ChevronDown className={`h-5 w-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </motion.button>
        </div>

        <motion.p
          initial={{ height: "auto" }}
          animate={{ height: isExpanded ? "auto" : "3rem" }}
          className="text-gray-600 mb-4 overflow-hidden"
        >
          {project.description}
        </motion.p>

        {/* Technologies */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4"
            >
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech: string, techIndex: number) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: techIndex * 0.05 }}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <motion.a
            href={project.github}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors font-medium"
          >
            <Github className="h-4 w-4 mr-2" />
            Code
          </motion.a>
          <motion.a
            href={project.live}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center text-blue-600 hover:text-blue-700 transition-colors font-medium"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Live Demo
          </motion.a>
        </div>
      </div>
    </motion.div>
  )
}

// Interactive Skill Card Component
const SkillCard = ({ category, index }: { category: SkillCategory; index: number }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [ref, isInView] = useIntersectionObserver({ threshold: 0.1 })

  const cardVariants = {
    hidden: { opacity: 0, y: 30, rotateX: -15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0,
      transition: { 
        duration: 0.6, 
        delay: index * 0.1,
        type: "spring" as const,
        stiffness: 100
      }
    },
    hover: { 
      y: -10, 
      rotateX: 5,
      transition: { duration: 0.3 }
    }
  }

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        <motion.div 
          className="text-blue-600 mb-4"
          animate={{ rotate: isHovered ? 360 : 0 }}
          transition={{ duration: 0.6 }}
        >
          <category.icon className="h-8 w-8" />
        </motion.div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
          {category.title}
        </h3>
        
        <div className="flex flex-wrap gap-2">
          {category.skills.map((skill: string, skillIndex: number) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: skillIndex * 0.05 }}
              whileHover={{ scale: 1.1, y: -2 }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md cursor-pointer"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Home() {
  const [activeSection, setActiveSection] = useState('home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])

  // Typewriter effect for hero text
  const { displayText: heroText, isComplete: heroComplete } = useTypewriter("Full-Stack Developer", 100)
  const { displayText: subtitleText } = useTypewriter("Building secure, scalable solutions with modern technologies", 50)

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Add Credly embed script once
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.credly.com/assets/utilities/embed.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
    setIsMenuOpen(false)
  }, [])

  const downloadResume = useCallback(() => {
    const link = document.createElement('a')
    link.href = '/Pierre.Mvita_Resume.pdf'
    link.download = 'Pierre.Mvita_Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }, [])

  // Memoized projects data
  const projects = useMemo(() => [
    {
      title: "SecureNet AI",
      description: "AI-powered cybersecurity platform with real-time threat detection, network monitoring, and automated incident response using machine learning algorithms.",
      technologies: ["Python", "Machine Learning", "AI", "Network Security", "Cybersecurity"],
      image: "https://github.com/Pmvita/SecureNet/raw/main/screenshots/dashboard.png",
      github: "https://github.com/Pmvita/SecureNet",
      live: "https://securenet-ai.vercel.app/"
    },
    {
      title: "SMB-Finance-OS",
      description: "Financial Operating System for Global Small and Medium Businesses",
      technologies: [
        "Flask (Python)", "PostgreSQL", "JWT", "RESTful API", "OpenAPI/Swagger", "pytest",
        "Next.js 14", "React", "TypeScript", "Tailwind CSS", "Zustand", "Vercel",
        "React Native", "Expo", "React Navigation", "Redux Toolkit",
        "Docker", "GitHub Actions", "Sentry", "PostgreSQL (managed)"
      ],
      image: "/SMB-Finance-OS.png",
      github: "https://github.com/Pmvita/SMB-Finance-OS",
      live: "https://smb-finance-os.vercel.app/"
    },
    {
      title: "AWS CSPM",
      description: "Terraform configuration for AWS Cloud Security Management with Lambda, CloudWatch, GuardDuty, and SecurityHub for monitoring and remediating security threats.",
      technologies: ["Terraform", "AWS", "Lambda", "CloudWatch", "GuardDuty", "SecurityHub"],
      image: "/AWS-CSPM.gif",
      github: "https://github.com/Pmvita/aws-CSPM",
      live: "#"
    },
    {
      title: "Network Packet Sniffer",
      description: "Python-based tool for capturing and analyzing network traffic in real-time with GUI for monitoring packets and detecting suspicious activity.",
      technologies: ["Python", "Network Analysis", "GUI", "Packet Capture", "Security"],
      image: "/NPS.png",
      github: "https://github.com/Pmvita/Network-Packet-Sniffer_app",
      live: "#"
    },
    {
      title: "Firewall IP Blocker",
      description: "Python-based Firewall Application with GUI that blocks unauthorized IP addresses and logs malicious activity for security monitoring.",
      technologies: ["Python", "Firewall", "GUI", "IP Blocking", "Security Logging"],
      image: "/Firewall-IP-Blocker.png",
      github: "https://github.com/Pmvita/Firewall-IP-Blocker",
      live: "#"
    },
    {
      title: "Intrusion Detection System",
      description: "Python-based IDS for monitoring network traffic, system logs, and port scanning activities to detect potential security threats with GUI interface.",
      technologies: ["Python", "IDS", "Network Monitoring", "Security", "GUI"],
      image: "/IDS.png",
      github: "https://github.com/Pmvita/Intrusion-Detection-System_App",
      live: "#"
    }
  ], [])

  // Memoized skills data
  const skills = useMemo(() => [
    {
      icon: Code,
      title: "Languages",
      skills: ["HTML", "CSS", "JavaScript", "TypeScript", "Python", "Dart", "C#", "C++"]
    },
    {
      icon: Globe,
      title: "Frontend",
      skills: ["React", "Next.js", "Three.js", "Tailwind CSS", "NativeWind", "Material UI", "Framer Motion", "Redux", "Zustand"]
    },
    {
      icon: Server,
      title: "Backend",
      skills: ["Node.js", "Express", "Django", "Flask", "Socket.io", "WebSockets", "REST"]
    },
    {
      icon: Mobile,
      title: "Mobile",
      skills: ["React Native", "Flutter", "Expo", "EAS Build"]
    },
    {
      icon: Database,
      title: "Databases",
      skills: ["SQLite", "PostgreSQL", "Prisma", "Supabase", "Redis"]
    },
    {
      icon: Cloud,
      title: "Tools & Testing",
      skills: ["Docker", "Jest", "Detox", "Playwright", "TensorFlow", "Ethers.js"]
    }
  ], [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-40 border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              Pierre Mvita
            </motion.div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'skills', 'projects', 'experience', 'contact'].map((section) => (
                <motion.button
                  key={section}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-all duration-200 relative ${
                    activeSection === section
                      ? 'text-blue-600 font-medium'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {section}
                  {activeSection === section && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600"
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <motion.span
                  animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 6 : 0 }}
                  className="w-6 h-0.5 bg-gray-600 mb-1"
                />
                <motion.span
                  animate={{ opacity: isMenuOpen ? 0 : 1 }}
                  className="w-6 h-0.5 bg-gray-600 mb-1"
                />
                <motion.span
                  animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? -6 : 0 }}
                  className="w-6 h-0.5 bg-gray-600"
                />
              </div>
            </motion.button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden border-t border-gray-200"
              >
                <div className="py-4 space-y-2">
                  {['home', 'about', 'skills', 'projects', 'experience', 'contact'].map((section) => (
                    <motion.button
                      key={section}
                      whileHover={{ x: 10 }}
                      onClick={() => scrollToSection(section)}
                      className={`block w-full text-left px-4 py-2 capitalize transition-colors ${
                        activeSection === section
                          ? 'text-blue-600 font-medium bg-blue-50'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {section}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-20 pb-16 bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mb-4 flex justify-center"
            >
              <div className="atom-icon" style={{ perspective: '1000px' }}>
                <div className="atom-container">
                  {/* Nucleus */}
                  <div className="nucleus"></div>

                  {/* Electron orbits using CSS transforms for smooth animation */}
                  <div className="orbit orbit-1">
                    <div className="orbit-ring"></div>
                    <div className="electron electron-1"></div>
                  </div>

                  <div className="orbit orbit-2">
                    <div className="orbit-ring"></div>
                    <div className="electron electron-2"></div>
                  </div>

                  <div className="orbit orbit-3">
                    <div className="orbit-ring"></div>
                    <div className="electron electron-3"></div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold text-gray-900 mb-2"
            >
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {heroText}
              </span>
              {!heroComplete && <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }}>|</motion.span>}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto"
            >
              {subtitleText}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('projects')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center"
              >
                View My Work
                <ArrowRight className="ml-2 h-5 w-5" />
                </motion.button>
              
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection('contact')}
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-600 hover:text-white transition-all duration-300"
                >
                  Get In Touch
                </motion.button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex justify-center space-x-6 mt-12"
            >
              {[
                { icon: Github, href: "https://github.com/Pmvita", label: "GitHub" },
                { icon: Linkedin, href: "https://linkedin.com/in/pierre-mvita", label: "LinkedIn" },
                { icon: Mail, href: "mailto:pierre.mvita@gmail.com", label: "Email" }
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-gray-600 hover:text-blue-600"
                >
                  <social.icon className="h-6 w-6" />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="h-8 w-8 text-gray-400" />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">About Me</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Passionate about creating secure, scalable solutions and staying up-to-date with the latest technologies.
              </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Full-Stack Developer</h3>
              <p className="text-gray-600 mb-6">
                I specialize in building comprehensive web and mobile applications with a strong focus on security and performance. 
                My expertise spans from frontend development with React and Next.js to backend systems using Python and Flask, 
                with particular emphasis on cybersecurity implementations.
              </p>
              <p className="text-gray-600 mb-6">
                With experience in cloud infrastructure, CI/CD pipelines, and modern development practices, 
                I create robust solutions that scale. I&apos;m always eager to learn new technologies and contribute 
                to the developer community.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={downloadResume}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center"
              >
                <Download className="mr-2 h-5 w-5" />
                Download Resume
              </motion.button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { icon: Code, label: "Full-Stack", value: "100%" },
                { icon: Shield, label: "Security", value: "95%" },
                { icon: Database, label: "Databases", value: "90%" },
                { icon: Cloud, label: "Cloud", value: "85%" }
              ].map((skill, index) => (
                <motion.div
                  key={skill.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl text-center"
                >
                  <div className="text-blue-600 mb-2">
                    <skill.icon className="h-8 w-8" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{skill.value}</div>
                  <div className="text-gray-600">{skill.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Skills & Technologies</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              I work with a variety of technologies to create comprehensive and secure solutions
            </p>
          </motion.div>

          {/* Tech Stack Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((category, index) => (
              <SkillCard key={category.title} category={category} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Here are some of my recent projects showcasing my skills and expertise
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Experience</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              My professional journey and achievements
            </p>
          </motion.div>

          <div className="space-y-8">
            {[
              {
                title: "Full-Stack Developer",
                company: "Freelance",
                period: "2023 - Present",
                description: "Developing secure web and mobile applications using modern technologies like React, Next.js, Python, and cloud services.",
                skills: ["React", "Next.js", "Python", "AWS", "Security"]
              },
              {
                title: "Cybersecurity Specialist",
                company: "Independent Projects",
                period: "2022 - Present",
                description: "Creating security tools and implementing best practices for network monitoring and threat detection.",
                skills: ["Network Security", "Python", "Penetration Testing", "Security Tools"]
              }
            ].map((job, index) => (
              <motion.div
                key={job.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{job.title}</h3>
                    <p className="text-blue-600 font-semibold">{job.company}</p>
                  </div>
                  <span className="text-gray-500 font-medium">{job.period}</span>
                </div>
                <p className="text-gray-600 mb-4">{job.description}</p>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              I&apos;m always interested in new opportunities and exciting projects
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Let&apos;s Work Together</h3>
              <p className="text-gray-600 mb-8">
                I&apos;m passionate about creating innovative solutions and would love to discuss 
                how I can help bring your ideas to life. Whether it&apos;s a new project, 
                collaboration opportunity, or just a chat about technology, I&apos;m all ears!
              </p>
              
              <div className="space-y-4">
                {[
                  { icon: Mail, text: "petermvita@gmail.com", href: "mailto:petermvita@gmail.com" },
                  { icon: Linkedin, text: "linkedin.com/in/pierre-mvita", href: "https://linkedin.com/in/pierre-mvita" },
                  { icon: Github, text: "github.com/Pmvita", href: "https://github.com/Pmvita" }
                ].map((contact, index) => (
                  <motion.a
                    key={contact.text}
                    href={contact.href}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                  className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                >
                    <contact.icon className="h-5 w-5 mr-3" />
                    {contact.text}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { label: "Projects Completed", value: "50+" },
                  { label: "Years Experience", value: "3+" },
                  { label: "Technologies", value: "15+" },
                  { label: "Happy Clients", value: "10+" }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
                    <div className="text-gray-600">{stat.label}</div>
                  </motion.div>
                ))}
                </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4">Pierre Mvita</h3>
            <p className="text-gray-400 mb-6">Full-Stack Developer</p>
            <div className="flex justify-center space-x-6 mb-8">
              {[
                { icon: Github, href: "https://github.com/Pmvita" },
                { icon: Linkedin, href: "https://linkedin.com/in/pierre-mvita" },
                { icon: Mail, href: "mailto:pierre.mvita@gmail.com" }
              ].map((social) => (
                <motion.a
                  key={social.href}
                  href={social.href}
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <social.icon className="h-6 w-6" />
                </motion.a>
              ))}
            </div>
            <p className="text-gray-500">&copy; 2024 Pierre Mvita. All rights reserved.</p>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}
