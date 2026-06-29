import React, { useState, useEffect } from 'react';
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Code2,
  Terminal,
  Database,
  Award,
  Menu,
  X,
  Sun,
  Moon,
  Send,
  CheckCircle,
  Download,
  Globe,
  Wrench,
  GraduationCap,
  Sparkles,
  ChevronRight,
  ArrowUpRight,
  User,
  BookOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Skills Data structured for categories
const skillsData = [
  {
    category: "Languages",
    icon: <Terminal className="w-5 h-5" />,
    skills: [
      { name: "Python", level: 3 },
      { name: "Java", level: 2 },
      { name: "C", level: 2 },
      { name: "JavaScript", level: 2 }
    ]
  },
  {
    category: "Web Technologies",
    icon: <Globe className="w-5 h-5" />,
    skills: [
      { name: "React.js", level: 2 },
      { name: "Node.js", level: 1 },
      { name: "Express.js", level: 1 },
      { name: "Django", level: 2 },
      { name: "PHP", level: 1 },
      { name: "HTML", level: 3 },
      { name: "CSS", level: 2 }
    ]
  },
  {
    category: "Databases & Tools",
    icon: <Database className="w-5 h-5" />,
    skills: [
      { name: "MySQL", level: 2 },
      { name: "SQL", level: 2 },
      { name: "GitHub", level: 2 },
      { name: "VS Code", level: 2 }
    ]
  },
  {
    category: "Soft Skills",
    icon: <Wrench className="w-5 h-5" />,
    skills: [
      { name: "Project Management", level: 4 },
      { name: "Teamwork", level: 3 },
      { name: "Time Management", level: 4 },
      { name: "Leadership", level: 3 },
      { name: "Effective Communication", level: 3 },
      { name: "Adaptability", level: 4 }
    ]
  }
];

// Projects Data
const projectsData = [
  {
    title: "Food Image Based Nutrition Estimation App",
    description: "Developed a full-stack food recommendation and nutrition analysis application featuring secure user accounts, interactive nutrition dash, and instant visual meal estimation.",
    tags: ["React.js", "OpenAI API", "Python", "Node.js", "Express.js", "MongoDB"],
    github: "https://github.com/dayasagarthota",
    demo: "#",
    details: "Features user auth, personalization dashboards, food photo uploads with prompt-based estimation, and AI chatbot assistance for dietary planning."
  },
  {
    title: "React.js Portfolio SPA",
    description: "A highly interactive, responsive portfolio showcase utilizing modern React structures, custom theme contexts, Tailwind styles, and fluid layout animations.",
    tags: ["React.js", "Tailwind CSS", "Framer Motion", "Vite"],
    github: "https://github.com/dayasagarthota",
    demo: "#",
    details: "Leverages React Hooks, local storage persistence for dark/light state, and dynamic hash routing with smooth scroll bindings."
  },
  {
    title: "Quiz Universe",
    description: "An intelligent, AI-powered quiz platform which generates tailored trivia dynamically on-the-fly, scores answers, and tracks educational performance over time.",
    tags: ["React.js", "Node.js", "Claude API", "Express.js", "MongoDB"],
    github: "https://github.com/dayasagarthota",
    demo: "#",
    details: "Integrates Anthropics Claude AI endpoint for real-time quiz generation, offering custom difficulty settings and categorical search capabilities."
  }
];

// Certifications Data
const certificationsData = [
  {
    title: "Coding Interview Preparation",
    provider: "Meta (via Coursera)",
    badge: "Meta Prep",
    highlight: true,
    link: "/Coursera_META.pdf"
  },
  {
    title: "Introduction to Generative AI",
    provider: "Google AI (via Coursera)",
    badge: "GenAI",
    highlight: true,
    link: "/Google_GenAI.pdf"
  },
  {
    title: "Web Development Fundamentals",
    provider: "L&T EduTech",
    badge: "L&T Boot",
    highlight: false,
    link: "/LT_Web_Dev_Fundamentals.pdf"
  },
  {
    title: "FullStack Web Development Bootcamps",
    provider: "L&T EduTech",
    badge: "L&T Boot",
    highlight: false,
    link: "/LT_FullStack_Web_Dev.pdf"
  },
  {
    title: "The Joy of Computing using Python",
    provider: "NPTEL – IIT Madras",
    badge: "IIT Madras",
    highlight: false,
    link: "/NPTEL_Python.pdf"
  },
  {
    title: "Introduction to Industry 4.0 and Industrial Internet of Things",
    provider: "NPTEL",
    badge: "NPTEL",
    highlight: false,
    link: "/NPTEL_IoT.pdf"
  },
  {
    title: "Artificial Intelligence Fundamentals",
    provider: "IBM Skill Build",
    badge: "IBM Skill",
    highlight: false,
    link: "/IBM_AI_Fundamentals.pdf"
  },
  {
    title: "Internship-Django Certification",
    provider: "HippoCloud Tech",
    badge: "Django",
    highlight: false,
    link: "/HippoCloud_Internship.jpg"
  }
];

// Education Data
const educationData = [
  {
    degree: "Bachelor of Technology (B.Tech)",
    major: "Computer Science and Engineering",
    school: "GMR Institute of Technology, Rajam, Srikakulam",
    duration: "2023 - 2027",
    score: "CGPA: 8.1 / 10",
    current: true
  },
  {
    degree: "Intermediate (M.P.C)",
    school: "Sri Chaitanya Jr College, Vishakhapatnam",
    duration: "2021 - 2023",
    score: "Percentage: 90.5%"
  },
  {
    degree: "Secondary School Certificate (SSC)",
    school: "Kesava Reddy School, Etcherla",
    duration: "2020 - 2021",
    score: "Percentage: 100%"
  }
];

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [showImageModal, setShowImageModal] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);



  // Update HTML class for dark/light mode
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Track scrolling to toggle header styling & active link
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'certifications', 'contact'];
      const scrollPosition = window.scrollY + 160;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formState.name && formState.email && formState.message) {
      setFormSubmitting(true);
      setFormError(null);

      const apiEndpoint = import.meta.env.DEV
        ? "http://localhost:3001/api/send"
        : "/api/send";

      fetch(apiEndpoint, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          message: formState.message
        })
      })
        .then(async response => {
          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.error || 'Failed to send email.');
          }
          return data;
        })
        .then(() => {
          setFormSubmitting(false);
          setFormSubmitted(true);
          setFormError(null);
          setFormState({ name: '', email: '', message: '' });
          setTimeout(() => setFormSubmitted(false), 5000);
        })
        .catch((error) => {
          console.error("Error submitting form", error);
          setFormSubmitting(false);
          setFormError(error.message || "Failed to connect to email backend server. Make sure it is active.");
        });
    }
  };

  return (
    <div className={`min-height-screen font-sans ${isDark ? 'bg-[#030712] text-slate-100' : 'bg-slate-50 text-slate-900'} transition-colors duration-300 overflow-x-hidden`}>

      {/* BACKGROUND DECORATIONS */}
      <div className="absolute top-0 left-0 w-full overflow-hidden pointer-events-none z-0 h-[800px]">
        <div className={`absolute top-[-10%] left-[-10%] w-[50%] h-[60%] rounded-full ${isDark ? 'bg-blue-900/10' : 'bg-blue-100/30'} blur-[120px]`} />
        <div className={`absolute top-[30%] right-[-15%] w-[45%] h-[50%] rounded-full ${isDark ? 'bg-indigo-900/10' : 'bg-indigo-100/20'} blur-[120px]`} />
        <div className={`absolute top-[60%] left-[20%] w-[35%] h-[40%] rounded-full ${isDark ? 'bg-teal-900/5' : 'bg-teal-100/10'} blur-[120px]`} />
      </div>

      {/* HEADER / NAVIGATION */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled
          ? isDark
            ? 'bg-[#030712]/80 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/20'
            : 'bg-white/80 backdrop-blur-md border-b border-slate-200/80 shadow-md shadow-slate-100/50'
          : 'bg-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => handleNavClick('home')}
          >
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg border border-slate-700/30 flex items-center justify-center bg-slate-900">
              <img
                src="/profile.png"
                alt="Dayasagar Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-semibold text-xl tracking-tight hidden sm:block">
              Dayasagar<span className="text-blue-500 font-bold font-display">.</span>
            </span>
          </motion.div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-8">
            {['home', 'about', 'skills', 'projects', 'experience', 'certifications', 'contact'].map((item) => (
              <button
                key={item}
                id={`nav-link-${item}`}
                onClick={() => handleNavClick(item)}
                className={`text-sm font-medium tracking-wide uppercase transition-colors relative py-2 ${activeSection === item
                  ? isDark ? 'text-blue-400 font-semibold' : 'text-blue-600 font-semibold'
                  : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
                  }`}
              >
                {item}
                {activeSection === item && (
                  <motion.span
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500 to-teal-400 rounded-full"
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Nav Actions */}
          <div className="flex items-center gap-4">
            <button
              id="theme-toggle"
              onClick={() => setIsDark(!isDark)}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${isDark
                ? 'bg-slate-800/80 hover:bg-slate-700 text-yellow-400 border border-slate-700'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-sm'
                }`}
              aria-label="Toggle light/dark theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              id="hamburger-menu"
              onClick={() => setMenuOpen(!menuOpen)}
              className={`lg:hidden w-10 h-10 rounded-xl flex items-center justify-center transition-all ${isDark
                ? 'bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700'
                : 'bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 shadow-sm'
                }`}
              aria-label="Open mobile menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              id="mobile-drawer"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`lg:hidden border-b ${isDark ? 'bg-[#0a1128] border-slate-800' : 'bg-white border-slate-200'
                }`}
            >
              <div className="px-6 py-6 flex flex-col gap-4">
                {['home', 'about', 'skills', 'projects', 'experience', 'certifications', 'contact'].map((item) => (
                  <button
                    key={item}
                    id={`mobile-nav-link-${item}`}
                    onClick={() => handleNavClick(item)}
                    className={`text-left text-base font-semibold py-2 px-4 rounded-xl transition-all ${activeSection === item
                      ? 'bg-blue-600 text-white'
                      : isDark ? 'text-slate-300 hover:bg-slate-800/50' : 'text-slate-700 hover:bg-slate-100'
                      }`}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO SECTION */}
      <section
        id="home"
        className="min-h-screen pt-28 flex items-center relative overflow-hidden px-6 max-w-7xl mx-auto z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-6"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              Available for Full-Stack Opportunities
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight"
            >
              Hi, I'm <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-indigo-400 to-teal-400 drop-shadow-sm">
                Dayasagar Thota
              </span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`text-xl sm:text-2xl font-semibold mt-4 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}
            >
              Full Stack Developer <span className="text-blue-500">|</span> CS Student
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className={`text-base sm:text-lg mt-6 max-w-xl leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
            >
              Computer Science undergraduate from GMRIT. Passionate about building robust web applications, crafting smooth frontends, and integrating intelligent backend and AI systems.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 mt-10 w-full sm:w-auto"
            >
              <button
                id="hero-view-projects"
                onClick={() => handleNavClick('projects')}
                className="px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                View Projects
                <ChevronRight className="w-5 h-5" />
              </button>

              <a
                id="hero-download-resume"
                href="/resume.pdf"
                download="Dayasagar_Thota_Resume.pdf"
                className={`px-8 py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 border hover:scale-[1.02] active:scale-[0.98] transition-all ${isDark
                  ? 'border-slate-700 bg-slate-800/40 hover:bg-slate-800 text-slate-200'
                  : 'border-slate-300 bg-white hover:bg-slate-50 text-slate-800 shadow-sm'
                  }`}
              >
                Download Resume
                <Download className="w-5 h-5 text-blue-500" />
              </a>
            </motion.div>

            {/* Quick Contact Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-6 mt-12 border-t pt-8 w-full border-slate-800/40"
            >
              <a
                href="https://github.com/dayasagarthota"
                target="_blank"
                rel="noreferrer"
                id="hero-social-github"
                className={`transition-colors ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-black'}`}
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/dayasagar-thota-110544295/"
                target="_blank"
                rel="noreferrer"
                id="hero-social-linkedin"
                className={`transition-colors ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-blue-600'}`}
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="mailto:sisindri2006@gmail.com"
                id="hero-social-mail"
                className={`transition-colors ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-red-500'}`}
              >
                <Mail className="w-6 h-6" />
              </a>
            </motion.div>
          </div>

          {/* Profile Card Mock Visual */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, type: 'spring' }}
              className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96"
            >
              {/* Spinning background glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-teal-400 blur-2xl opacity-40 animate-pulse" />

              {/* Realistic Mock Profile / Avatar UI */}
              <div className={`absolute inset-3 rounded-2xl p-6 border flex flex-col justify-between overflow-hidden shadow-2xl ${isDark
                ? 'bg-slate-900/90 border-slate-800 text-slate-100'
                : 'bg-white border-slate-100 text-slate-900'
                }`}>
                {/* Header Dots */}
                <div className="flex justify-between items-center pb-4 border-b border-slate-800/20">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500/80" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <span className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500">
                    Dayasagar.json
                  </span>
                </div>

                {/* Avatar Placeholder Area */}
                <div className="flex flex-col items-center py-6">
                  <div
                    onClick={() => setShowImageModal(true)}
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 p-1 mb-4 shadow-xl shadow-blue-500/20 cursor-zoom-in hover:scale-105 transition-transform duration-300"
                  >
                    <img
                      src="/profile.png"
                      alt="Dayasagar Thota"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-lg">Dayasagar Thota</h3>
                  <p className="text-xs text-blue-400 font-mono mt-1">&lt;FullStackStudent /&gt;</p>
                </div>

                {/* Simulated stats */}
                <div className="grid grid-cols-3 gap-2 border-t border-slate-800/20 pt-4 text-center font-mono">
                  <div>
                    <div className="text-blue-500 font-bold text-sm">8.1</div>
                    <div className="text-[9px] text-slate-500">B.Tech CGPA</div>
                  </div>
                  <div>
                    <div className="text-teal-400 font-bold text-sm">100%</div>
                    <div className="text-[9px] text-slate-500">SSC Score</div>
                  </div>
                  <div>
                    <div className="text-indigo-400 font-bold text-sm">2027</div>
                    <div className="text-[9px] text-slate-500">Grad Year</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section
        id="about"
        className="py-24 px-6 max-w-7xl mx-auto relative z-10"
      >
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-xs uppercase font-mono tracking-widest text-blue-500 font-bold">About Me</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold mt-2 font-display">My Background</h3>
          <div className="w-12 h-1 bg-blue-600 rounded-full mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className={`p-8 rounded-2xl border flex flex-col h-full justify-between shadow-sm ${isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200'
              }`}>
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-6">
                  <User className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold mb-4 font-display">B.Tech CSE Background</h4>
                <p className={`leading-relaxed text-sm sm:text-base ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  I am Dayasagar Thota, currently pursuing my Bachelor of Technology in Computer Science and Engineering at GMR Institute of Technology (Rajam, Srikakulam). My studies provide me with a solid grounding in algorithmic development, systems design, database architectures, and software methodologies.
                </p>
              </div>
              <div className="mt-8 flex flex-col gap-4 border-t border-slate-800/10 pt-6">
                <div className="flex items-center gap-3">
                  <GraduationCap className="w-5 h-5 text-teal-400" />
                  <span className="text-sm font-medium">B.Tech CSE Student (2023-2027)</span>
                </div>
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-indigo-400" />
                  <span className="text-sm font-medium">Focused on Full-Stack Systems & Generative AI</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            <div className={`p-8 rounded-2xl border flex-1 shadow-sm ${isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200'
              }`}>
              <h4 className="text-xl font-bold mb-4 font-display">Core Objective</h4>
              <p className={`leading-relaxed text-sm sm:text-base ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                As a Computer Science and Engineering undergraduate, I am driven to build a career in software development. I look forward to obtaining opportunities where I can make the best of my potentials, solve real-world technical problems, and contribute meaningfully to the organizational growth.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {educationData.map((edu, idx) => (
                <div
                  key={idx}
                  className={`p-6 rounded-2xl border flex flex-col justify-between shadow-sm ${isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200'
                    }`}
                >
                  <div>
                    <span className="text-[10px] font-mono text-blue-500 uppercase tracking-wider">{edu.duration}</span>
                    <h5 className="font-bold text-sm sm:text-base mt-2 font-display leading-tight">{edu.degree}</h5>
                    <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{edu.school}</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-800/10 flex items-center justify-between">
                    <span className="text-xs font-semibold text-teal-400">{edu.score}</span>
                    {edu.current && <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section
        id="skills"
        className="py-24 px-6 max-w-7xl mx-auto relative z-10"
      >
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-xs uppercase font-mono tracking-widest text-blue-500 font-bold">Skills Stack</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold mt-2 font-display">Technology Matrix</h3>
          <div className="w-12 h-1 bg-blue-600 rounded-full mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillsData.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`p-6 rounded-2xl border shadow-sm flex flex-col justify-between ${isDark ? 'bg-slate-900/40 border-slate-800/80' : 'bg-white border-slate-200'
                }`}
            >
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                    {cat.icon}
                  </div>
                  <h4 className="font-bold text-md sm:text-lg font-display">{cat.category}</h4>
                </div>
                <div className="flex flex-col gap-4">
                  {cat.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="flex flex-col gap-1.5">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-[10px] font-mono text-slate-500">{skill.level}/5</span>
                      </div>
                      <div className={`h-1.5 rounded-full w-full ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-blue-600 to-teal-400"
                          style={{
                            width: `${(skill.level / 5) * 100}%`
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section
        id="projects"
        className="py-24 px-6 max-w-7xl mx-auto relative z-10"
      >
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-xs uppercase font-mono tracking-widest text-blue-500 font-bold">Featured Projects</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold mt-2 font-display">Work Showcase</h3>
          <div className="w-12 h-1 bg-blue-600 rounded-full mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projectsData.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className={`rounded-2xl border flex flex-col justify-between overflow-hidden shadow-md group hover:shadow-xl transition-all duration-300 ${isDark
                ? 'bg-slate-900/40 border-slate-800/80 hover:border-blue-500/50'
                : 'bg-white border-slate-200 hover:border-blue-500/50'
                }`}
            >
              <div className="p-6">
                {/* Project Badge/Icon */}
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                    <Code2 className="w-6 h-6" />
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      id={`project-gh-${idx}`}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all ${isDark
                        ? 'border-slate-800 bg-slate-850 hover:bg-slate-800 text-slate-400 hover:text-white'
                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900'
                        }`}
                      aria-label={`View GitHub for ${project.title}`}
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <a
                      href={project.demo}
                      id={`project-demo-${idx}`}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all ${isDark
                        ? 'border-slate-800 bg-slate-850 hover:bg-slate-800 text-slate-400 hover:text-white'
                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900'
                        }`}
                      aria-label={`View Demo for ${project.title}`}
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                <h4 className="text-lg sm:text-xl font-bold font-display leading-tight group-hover:text-blue-500 transition-colors">
                  {project.title}
                </h4>

                <p className={`text-sm mt-3 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {project.description}
                </p>

                <p className={`text-xs mt-4 italic font-sans leading-relaxed border-l-2 pl-3 ${isDark ? 'border-slate-700 text-slate-500' : 'border-slate-200 text-slate-500'
                  }`}>
                  {project.details}
                </p>
              </div>

              {/* Tags panel */}
              <div className={`px-6 py-4 border-t flex flex-wrap gap-2 ${isDark ? 'border-slate-800/60 bg-slate-950/20' : 'border-slate-100 bg-slate-50/50'
                }`}>
                {project.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[10px] font-mono font-semibold px-2 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section
        id="experience"
        className="py-24 px-6 max-w-7xl mx-auto relative z-10"
      >
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-xs uppercase font-mono tracking-widest text-blue-500 font-bold">Practical Experience</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold mt-2 font-display">Internships</h3>
          <div className="w-12 h-1 bg-blue-600 rounded-full mt-4" />
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Vertical Timeline container */}
          <div className="relative border-l-2 border-blue-500/20 pl-8 ml-4 sm:ml-6 flex flex-col gap-12">

            {/* Internship Node */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Blue dot on line */}
              <div className="absolute left-[-42px] top-1.5 w-6 h-6 rounded-full border-4 border-slate-900 bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30" />

              <div className={`p-6 sm:p-8 rounded-2xl border shadow-sm ${isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200'
                }`}>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400">June 2025</span>
                    <h4 className="text-xl font-bold font-display mt-1">Web Development Intern</h4>
                    <p className={`text-md font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      HippoCloud Technologies
                    </p>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                      <MapPin className="w-3.5 h-3.5" /> Visakhapatnam, AP (On-site/Remote Hybrid)
                    </p>
                  </div>
                  <div className="self-start sm:self-center">
                    <span className="px-3 py-1.5 rounded-full text-xs font-bold font-mono bg-blue-500/10 text-blue-400 border border-blue-500/10">
                      Django & JS
                    </span>
                  </div>
                </div>

                <div className="mt-6 border-t border-slate-800/10 pt-6">
                  <h5 className="font-semibold text-sm mb-3">Key Responsibilities & Achievements:</h5>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2.5 text-sm leading-relaxed">
                      <ChevronRight className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                      <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                        Developed a full-stack **Instagram clone** from scratch utilizing **Django** for dynamic service APIs, user account settings, and administrative dashboard.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5 text-sm leading-relaxed">
                      <ChevronRight className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                      <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                        Utilized **JavaScript, HTML, and CSS** on the frontend to structure responsive galleries, comment threads, and interactive image styling elements.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5 text-sm leading-relaxed">
                      <ChevronRight className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                      <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                        Gained hands-on mentorship, code-review practices, and insights into engineering cycles and full-stack software development workflows.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* CERTIFICATIONS SECTION */}
      <section
        id="certifications"
        className="py-24 px-6 max-w-7xl mx-auto relative z-10"
      >
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-xs uppercase font-mono tracking-widest text-blue-500 font-bold">Academic Recognition</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold mt-2 font-display">Credentials & Badges</h3>
          <div className="w-12 h-1 bg-blue-600 rounded-full mt-4" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificationsData.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className={`p-6 rounded-2xl border shadow-sm flex flex-col justify-between transition-all duration-300 ${cert.highlight
                ? 'border-blue-500/50 bg-gradient-to-br from-blue-950/20 to-indigo-950/10'
                : isDark
                  ? 'bg-slate-900/40 border-slate-800'
                  : 'bg-white border-slate-200'
                }`}
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                    <Award className="w-5.5 h-5.5" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400">
                    {cert.badge}
                  </span>
                </div>
                <h4 className="font-bold text-base font-display leading-snug">{cert.title}</h4>
                <p className={`text-xs mt-1.5 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>{cert.provider}</p>
              </div>
              {cert.link ? (
                <a 
                  href={cert.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 pt-4 border-t border-slate-800/10 flex items-center gap-1.5 text-xs text-blue-500 hover:text-blue-400 font-semibold cursor-pointer transition-colors"
                >
                  Verified Certificate <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              ) : (
                <div className="mt-6 pt-4 border-t border-slate-800/10 flex items-center gap-1.5 text-xs text-slate-500 font-semibold select-none">
                  Verified Certificate <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section
        id="contact"
        className="py-24 px-6 max-w-7xl mx-auto relative z-10"
      >
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-xs uppercase font-mono tracking-widest text-blue-500 font-bold">Get In Touch</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold mt-2 font-display">Contact Information</h3>
          <div className="w-12 h-1 bg-blue-600 rounded-full mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Info Details */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h4 className="text-2xl font-bold font-display mb-4">Let's discuss opportunities!</h4>
              <p className={`leading-relaxed text-sm sm:text-base ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                I am actively seeking software engineering roles, full-stack internships, and technical collaborations. Drop me a line or send an email directly, and I'll get back to you within 24 hours.
              </p>

              <div className="mt-8 flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
                    <Mail className="w-5.5 h-5.5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Email address</div>
                    <a href="mailto:sisindri2006@gmail.com" id="contact-email" className="font-medium text-sm sm:text-base hover:text-blue-500 transition-colors">
                      sisindri2006@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
                    <Phone className="w-5.5 h-5.5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Phone number</div>
                    <a href="tel:+916300693563" id="contact-phone" className="font-medium text-sm sm:text-base hover:text-blue-500 transition-colors">
                      +91 6300693563
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
                    <MapPin className="w-5.5 h-5.5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Location</div>
                    <span id="contact-location" className="font-medium text-sm sm:text-base text-slate-400">
                      Ranasthalam, Srikakulam, AP, 532407
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Connect links */}
            <div className="mt-12 pt-8 border-t border-slate-800/10">
              <h5 className="text-xs uppercase font-mono tracking-wider text-slate-500 mb-4">Connect on Networks</h5>
              <div className="flex gap-4">
                <a
                  href="https://github.com/dayasagarthota"
                  target="_blank"
                  rel="noreferrer"
                  id="contact-social-github"
                  className={`w-11 h-11 rounded-xl flex items-center justify-center border transition-all ${isDark
                    ? 'border-slate-800 bg-slate-900/60 hover:bg-slate-850 hover:text-white text-slate-400'
                    : 'border-slate-200 bg-white hover:bg-slate-50 hover:text-slate-950 text-slate-600 shadow-sm'
                    }`}
                  aria-label="GitHub Profile"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/dayasagar-thota-110544295/"
                  target="_blank"
                  rel="noreferrer"
                  id="contact-social-linkedin"
                  className={`w-11 h-11 rounded-xl flex items-center justify-center border transition-all ${isDark
                    ? 'border-slate-800 bg-slate-900/60 hover:bg-slate-850 hover:text-white text-slate-400'
                    : 'border-slate-200 bg-white hover:bg-slate-50 hover:text-blue-600 text-slate-600 shadow-sm'
                    }`}
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <div className={`p-8 rounded-2xl border shadow-sm ${isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200'
              }`}>
              {formSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center py-12 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-6">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Message Sent Successfully!</h4>
                  <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Thank you, Dayasagar has received your inquiry. I will get back to you shortly.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleFormSubmit} className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="form-name" className="text-xs font-mono text-slate-500 font-semibold">Your Name</label>
                      <input
                        type="text"
                        id="form-name"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="John Doe"
                        className={`w-full px-4 py-3 rounded-xl border text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all ${isDark
                          ? 'bg-slate-950/80 border-slate-800 focus:border-blue-500 text-white placeholder-slate-650'
                          : 'bg-white border-slate-200 focus:border-blue-500 text-slate-900 placeholder-slate-400'
                          }`}
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="form-email" className="text-xs font-mono text-slate-500 font-semibold">Email Address</label>
                      <input
                        type="email"
                        id="form-email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="john@example.com"
                        className={`w-full px-4 py-3 rounded-xl border text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all ${isDark
                          ? 'bg-slate-950/80 border-slate-800 focus:border-blue-500 text-white placeholder-slate-650'
                          : 'bg-white border-slate-200 focus:border-blue-500 text-slate-900 placeholder-slate-400'
                          }`}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="form-message" className="text-xs font-mono text-slate-500 font-semibold">Message</label>
                    <textarea
                      id="form-message"
                      rows={5}
                      required
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Hi Dayasagar, I'd like to talk about..."
                      className={`w-full px-4 py-3 rounded-xl border text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all resize-none ${isDark
                        ? 'bg-slate-950/80 border-slate-800 focus:border-blue-500 text-white placeholder-slate-650'
                        : 'bg-white border-slate-200 focus:border-blue-500 text-slate-900 placeholder-slate-400'
                        }`}
                    />
                  </div>

                  {formError && (
                    <div className="p-4 rounded-xl text-xs sm:text-sm font-medium bg-red-500/10 text-red-500 border border-red-500/10 animate-shake">
                      ⚠️ {formError}
                    </div>
                  )}

                  <button
                    type="submit"
                    id="form-submit"
                    disabled={formSubmitting}
                    className={`px-6 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer shadow-lg shadow-blue-500/20 ${formSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {formSubmitting ? 'Sending Message...' : 'Send Message'}
                    <Send className="w-4.5 h-4.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={`py-12 border-t px-6 ${isDark ? 'bg-[#01040a] border-slate-850' : 'bg-slate-100/50 border-slate-200'
        }`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg overflow-hidden shadow-md border border-slate-700/30 flex items-center justify-center bg-slate-900">
              <img
                src="/profile.png"
                alt="Dayasagar Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-semibold text-base tracking-tight">
              Dayasagar Thota
            </span>
          </div>

          <p className="text-xs text-slate-500 text-center md:text-left">
            &copy; {new Date().getFullYear()} Dayasagar Thota. All rights reserved. Designed & Built in India.
          </p>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/dayasagarthota"
              target="_blank"
              rel="noreferrer"
              id="footer-social-github"
              className={`text-slate-500 hover:text-blue-500 transition-colors`}
              aria-label="GitHub Profile"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/dayasagar-thota-110544295/"
              target="_blank"
              rel="noreferrer"
              id="footer-social-linkedin"
              className={`text-slate-500 hover:text-blue-500 transition-colors`}
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>

      {/* IMAGE LIGHTBOX MODAL */}
      <AnimatePresence>
        {showImageModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowImageModal(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-lg w-full max-h-[85vh] overflow-hidden rounded-2xl border border-slate-800 shadow-2xl bg-slate-950 flex justify-center items-center p-2"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowImageModal(false)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors border border-white/10 z-10 cursor-pointer"
                aria-label="Close image modal"
              >
                <X className="w-5 h-5" />
              </button>
              <img
                src="/profile.png"
                alt="Dayasagar Thota"
                className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
