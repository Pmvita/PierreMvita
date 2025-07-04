'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Github, 
  Linkedin, 
  Mail, 
  Download, 
  ExternalLink,
  Code,
  Database,
  Globe,
  Server,
  GitBranch,
  Shield,
  Cloud,
  Monitor,
  Smartphone as Mobile
} from 'lucide-react'

export default function Home() {
  const [activeSection, setActiveSection] = useState('home')

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

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl font-bold text-gray-900"
            >
              Pierre Mvita
            </motion.div>
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'skills', 'projects', 'experience', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-colors duration-200 ${
                    activeSection === section
                      ? 'text-blue-600 font-medium'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-20 pb-16 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
                 Hi, I&apos;m <span className="text-blue-600">Pierre</span>
               </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Mobile & Full-Stack Developer passionate about secure software development, cloud applications, and cybersecurity
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = '/Pierre.Mvita_Resume.pdf';
                    link.download = 'Pierre_Mvita_Resume.pdf';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  <Download className="inline mr-2 h-5 w-5" />
                  Download Resume
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection('contact')}
                  className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-600 hover:text-white transition-colors"
                >
                  Get In Touch
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">About Me</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
               I&apos;m a Mobile & Full-Stack Developer with 2 years of experience creating software and security tools within the technology sector.
             </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">My Journey</h3>
                <p className="text-blue-100 mb-6">
                   With 2 years of experience in Mobile & Full-Stack Development, I&apos;ve worked on diverse projects ranging from secure web applications to mobile apps and cybersecurity tools. I believe in writing clean, maintainable code and staying up-to-date with the latest technologies.
                 </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="font-semibold">Experience</div>
                    <div className="text-blue-100">2+ Years</div>
                  </div>
                  <div>
                    <div className="font-semibold">Projects</div>
                    <div className="text-blue-100">45+ Repositories</div>
                  </div>
                  <div>
                    <div className="font-semibold">GitHub Stars</div>
                    <div className="text-blue-100">56+ Received</div>
                  </div>
                  <div>
                    <div className="font-semibold">Certifications</div>
                    <div className="text-blue-100">6+ Completed</div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">What I Do</h3>
                <p className="text-gray-600">
                  I specialize in secure software development, creating responsive web applications, mobile apps, and robust backend systems with a focus on cybersecurity and cloud applications.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">My Approach</h3>
                <p className="text-gray-600">
                  I believe in collaborative development, continuous learning, and writing secure, maintainable code. I enjoy working in agile environments and contributing to open-source projects while pursuing cybersecurity certifications.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Beyond Code</h3>
                <p className="text-gray-600">
                  When I&apos;m not coding, you can find me pursuing CompTIA Security+ and AWS Cloud Practitioner certifications, exploring new technologies, or contributing to the developer community. I&apos;m always eager to learn and take on new challenges.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Code className="h-8 w-8" />,
                title: "Programming Languages",
                skills: ["HTML", "CSS", "JavaScript", "TypeScript", "Python", "SQL"]
              },
              {
                icon: <Mobile className="h-8 w-8" />,
                title: "Mobile Development",
                skills: ["React Native", "Expo", "iOS", "Android"]
              },
              {
                icon: <Server className="h-8 w-8" />,
                title: "Backend Development",
                skills: ["FastAPI", "REST APIs", "PostgreSQL", "SQLite"]
              },
              {
                icon: <Database className="h-8 w-8" />,
                title: "Databases",
                skills: ["Firebase", "PostgreSQL", "SQLite", "MongoDB"]
              },
              {
                icon: <Cloud className="h-8 w-8" />,
                title: "Cloud Platforms",
                skills: ["Amazon Web Services", "Docker", "CI/CD", "GitHub Actions"]
              },
              {
                icon: <Shield className="h-8 w-8" />,
                title: "Security & Tools",
                skills: ["Cybersecurity", "VMware", "Packet Tracer", "Secure Coding"]
              },
              {
                icon: <GitBranch className="h-8 w-8" />,
                title: "Version Control",
                skills: ["Git", "GitHub", "GitHub Actions", "CI/CD Pipelines"]
              },
              {
                icon: <Monitor className="h-8 w-8" />,
                title: "Operating Systems",
                skills: ["Windows", "Android", "iOS", "Mac OS", "Linux"]
              },
              {
                icon: <Globe className="h-8 w-8" />,
                title: "Project Management",
                skills: ["Agile", "Waterfall", "Scrum", "Microsoft Office 365"]
              }
            ].map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-blue-600 mb-4">{category.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{category.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
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

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Here are some of the projects I&apos;ve worked on recently
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "SecureNet",
                description: "Real-time network defence. Enterprise-grade intelligence. One dashboard. AI-powered cybersecurity platform with live network discovery and threat detection.",
                technologies: ["Python", "Machine Learning", "AI", "Network Security", "Cybersecurity"],
                image: "/SecureNet.png",
                github: "https://github.com/Pmvita/SecureNet",
                live: "#"
              },
              {
                title: "OneSocial-supabase",
                description: "Cross-platform social media, messaging, and crypto wallet app built using React Native and Expo with Supabase backend.",
                technologies: ["React Native", "Expo", "TypeScript", "Supabase", "Crypto Wallet"],
                image: "/OneSocial.png",
                github: "https://github.com/Pmvita/OneSocial-supabase",
                live: "#"
              },
              {
                title: "AWS CSPM",
                description: "Terraform configuration for AWS Cloud Security Management with Lambda, CloudWatch, GuardDuty, and SecurityHub for monitoring and remediating security threats.",
                technologies: ["Terraform", "AWS", "Lambda", "CloudWatch", "GuardDuty", "SecurityHub"],
                image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
                github: "https://github.com/Pmvita/aws-CSPM",
                live: "#"
              },
              {
                title: "Network Packet Sniffer",
                description: "Python-based tool for capturing and analyzing network traffic in real-time with GUI for monitoring packets and detecting suspicious activity.",
                technologies: ["Python", "Network Analysis", "GUI", "Packet Capture", "Security"],
                image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop",
                github: "https://github.com/Pmvita/Network-Packet-Sniffer_app",
                live: "#"
              },
              {
                title: "Firewall IP Blocker",
                description: "Python-based Firewall Application with GUI that blocks unauthorized IP addresses and logs malicious activity for security monitoring.",
                technologies: ["Python", "Firewall", "GUI", "IP Blocking", "Security Logging"],
                image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop",
                github: "https://github.com/Pmvita/Firewall-IP-Blocker",
                live: "#"
              },
              {
                title: "Intrusion Detection System",
                description: "Python-based IDS for monitoring network traffic, system logs, and port scanning activities to detect potential security threats with GUI interface.",
                technologies: ["Python", "IDS", "Network Monitoring", "Security", "GUI"],
                image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop",
                github: "https://github.com/Pmvita/Intrusion-Detection-System_App",
                live: "#"
              }
            ].map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="h-48 bg-gray-200 relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <a
                      href={project.github}
                      className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      <Github className="h-4 w-4 mr-1" />
                      Code
                    </a>
                    <a
                      href={project.live}
                      className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Live Demo
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Experience</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              My professional journey and the companies I&apos;ve had the pleasure to work with
            </p>
          </motion.div>

          <div className="space-y-8">
            {[
              {
                title: "Mobile & Web Development",
                company: "Independent Project & Freelance",
                period: "Jan 2024 - Present",
                description: "Designing, building, and deploying secure web and mobile applications with a focus on cybersecurity and cloud applications.",
                achievements: [
                  "Designed, built, and deployed SecureNet, an AI-powered cybersecurity SaaS platform featuring live network discovery and threat detection",
                  "Utilized FastAPI, PostgreSQL, React, Tailwind CSS, Stripe, Docker, and custom machine learning models for real-time security analytics",
                  "Delivered secure, scalable web and mobile applications with responsive design",
                  "Collaborated with global clients to analyze requirements and design scalable UIs with TypeScript, Tailwind CSS, and responsive frameworks",
                  "Managed codebase with GitHub, implemented CI/CD pipelines via GitHub Actions, and documented features for client handoff"
                ]
              },
              {
                title: "Diesel Technician II",
                company: "Penske Truck Leasing",
                period: "Jan 2023 - Dec 2023",
                description: "Completed preventative maintenance tasks and performed full vehicle inspections, using diagnostic tools to troubleshoot electronic control systems.",
                achievements: [
                  "Completed preventative maintenance tasks and performed full vehicle inspections, reducing downtime by 18% according to company software metrics",
                  "Used diagnostic tools to troubleshoot electronic control systems, wiring issues, and emission components",
                  "Coordinated with service managers and logistics teams to streamline repair workflows and minimize asset hold times",
                  "Ensured compliance with safety and environmental regulations during maintenance"
                ]
              }
            ].map((job, index) => (
              <motion.div
                key={job.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-8 shadow-lg"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900">{job.title}</h3>
                    <p className="text-xl text-blue-600">{job.company}</p>
                  </div>
                  <span className="text-gray-500 font-medium mt-2 md:mt-0">{job.period}</span>
                </div>
                <p className="text-gray-600 mb-4">{job.description}</p>
                <ul className="space-y-2">
                  {job.achievements.map((achievement, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span className="text-gray-700">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              I&apos;m always interested in new opportunities and exciting projects. Let&apos;s connect!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Let&apos;s Connect</h3>
              <div className="space-y-4">
                <a
                  href="mailto:Petermvita@hotmail.com"
                  className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <Mail className="h-5 w-5 mr-3" />
                  Petermvita@hotmail.com
                </a>
                <a
                  href="tel:+14375758178"
                  className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <Mail className="h-5 w-5 mr-3" />
                  (437) 575-8178
                </a>
                <a
                  href="https://github.com/Pmvita"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <Github className="h-5 w-5 mr-3" />
                  github.com/Pmvita
                </a>
                <a
                  href="https://linkedin.com/in/pierre-mvita"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <Linkedin className="h-5 w-5 mr-3" />
                  linkedin.com/in/pierre-mvita
                </a>

              </div>
              
              <div className="mt-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Available for:</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    <span className="text-gray-700">Full-time positions</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    <span className="text-gray-700">Freelance projects</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    <span className="text-gray-700">Cybersecurity consulting</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    <span className="text-gray-700">Cloud infrastructure projects</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tell me about your project or opportunity..."
                  ></textarea>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2024 Pierre Mvita. All rights reserved.
          </p>
          <p className="text-gray-500 mt-2">
            Built with Next.js, TypeScript, and Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  )
}
