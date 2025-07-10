"use client";
import React, { useState, useEffect } from "react";
import { FaLinkedin, FaTwitter, FaGithub, FaInstagram, FaEnvelope, FaBriefcase, FaProjectDiagram, FaArrowUp } from "react-icons/fa";
import { motion } from "framer-motion";
import Image from "next/image";
import emailjs from '@emailjs/browser';

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

function TypingEffect({ texts }: { texts: string[] }) {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    setDisplayed("");
    const interval = setInterval(() => {
      setDisplayed(texts[index].slice(0, i + 1));
      i++;
      if (i === texts[index].length) {
        clearInterval(interval);
        setTimeout(() => {
          setIndex((prev) => (prev + 1) % texts.length);
        }, 1200); // Pause before next phrase
      }
    }, 80);
    return () => clearInterval(interval);
  }, [index, texts]);

  return (
    <span>
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  );
}

function Navbar({ activeSection }: { activeSection: string }) {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-center px-8 py-4 bg-white/40 dark:bg-[#0a1833aa] backdrop-blur-md border-b border-gray-200 dark:border-[#4cd7ff33]">
      <div className="flex items-center gap-6">
        {navSections.map((s) => (
          <button
            key={s.id}
            onClick={() => scrollToSection(s.id)}
            className={`text-gray-700 dark:text-white font-medium uppercase tracking-wide text-sm px-3 py-2 rounded transition whitespace-nowrap hover:text-[#4cd7ff] ${activeSection === s.id ? 'bg-[#4cd7ff22] text-[#4cd7ff] font-bold' : ''}`}
          >
            {s.label}
          </button>
        ))}
        <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-4"></div>
        <button
          onClick={() => scrollToSection('contact')}
          className="flex items-center gap-2 text-gray-700 dark:text-white font-medium px-4 py-2 rounded transition hover:text-[#4cd7ff] hover:bg-[#4cd7ff22] focus:outline-none"
        >
          <FaEnvelope className="text-xl" />
          <span>GET IN TOUCH</span>
        </button>
      </div>
    </nav>
  );
}

const navSections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

// Update SkillBar to accept an image/icon
function SkillBar({ skill, level, img }: { skill: string; level: number; img: string }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-4">
        <div className="relative group">
          <div className="w-16 h-16 rounded bg-white/10 p-2 cursor-pointer transition-all duration-300 flex items-center justify-center hover:scale-110 hover:bg-white/20">
            <img src={img} alt={skill + ' icon'} className="w-12 h-12 rounded transition-all duration-300 group-hover:opacity-0 group-hover:scale-90" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
              <span className="text-[#4cd7ff] font-bold text-lg animate-pulse">{level}%</span>
            </div>
          </div>
        </div>
        <span className="text-white/90 font-medium text-lg">{skill}</span>
      </div>
    </div>
  );
}

export default function Home() {
  // Initialize EmailJS once when Home mounts
  useEffect(() => {
    emailjs.init('ztI1rrRIdf6Nv_Rin');
  }, []);
  const [activeSection, setActiveSection] = useState<string>("");
  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = navSections.map(s => s.id);
      let current = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const [showBackToTop, setShowBackToTop] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gradient-to-br dark:from-[#0a1833] dark:to-[#1a2746] text-gray-900 dark:text-white overflow-x-hidden">
      <Navbar activeSection={activeSection} />
      <section id="hero" className="relative z-10 flex flex-col items-center justify-center min-h-screen w-full pt-24 overflow-hidden">
        {/* Nav links at the top of hero */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <div className="rounded-full border border-gray-300 dark:border-blue-200 w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] min-w-[320px] min-h-[320px] mx-auto" />
        </div>
        <div className="relative flex flex-col items-center justify-center w-full max-w-xl mx-auto">
          <Image
            src="/Abhay1.jpg"
            alt="Profile"
            width={500}
            height={500}
            className="w-64 h-64 rounded-full object-cover border-4 border-white shadow-lg mb-6 z-10"
            priority
          />
          {/* Social icons below profile photo */}
          <div className="flex items-center gap-4 mb-6">
            <a href="https://www.linkedin.com/in/abhay-singh-1112as" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-white text-2xl hover:text-[#0077b5]"><FaLinkedin /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-white text-2xl hover:text-[#1da1f2]"><FaTwitter /></a>
            <a href="https://github.com/abhay-singh1100" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-white text-2xl hover:text-[#333]"><FaGithub /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-white text-2xl hover:text-[#e1306c]"><FaInstagram /></a>
          </div>
          <div className="tracking-[0.5em] text-gray-500 dark:text-gray-300 text-xs md:text-sm mb-2 text-center">SOFTWARE ENGINEER | AI/ML ENTHUSIAST | DATA SCIENTIST</div>
          <h1 className="text-2xl md:text-4xl font-extrabold mb-4 text-center flex items-center justify-center gap-3">
            <TypingEffect texts={["I like riding my 🚲", "Turning coffee into ML models and insight.", "I turn data into decisions.", "I debug reality with machine learning."]} />
          </h1>
          <a href="/Abhay_Singh_Resume.pdf" download className="inline-block bg-[#4cd7ff] text-[#0a1833] font-bold px-6 py-2 rounded-full shadow-lg hover:bg-[#ff4c60] hover:text-white transition">Download Resume (PDF)</a>
        </div>

      </section>
      {/* Insert About Me section after hero section */}
      <motion.section id="about" className="max-w-3xl mx-auto py-20 px-4 border-b border-[#4cd7ff22] flex flex-col md:flex-row items-center gap-8" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7, ease: 'easeOut' }}>
        <img src="/Abhay1.jpg" alt="Abhay Singh" className="w-32 h-32 rounded-full object-cover border-4 border-[#4cd7ff] shadow-lg mb-4 md:mb-0" />
        <div>
          <h2 className="text-3xl font-bold text-[#4cd7ff] mb-2">About Me</h2>
          <p className="text-lg text-white/90 mb-4">Hi, I&apos;m Abhay Singh—a passionate software developer and AI/ML enthusiast. I love building intelligent solutions, automating workflows, and turning ideas into robust products. My background spans Software development, Machine learning, and data-driven applications.</p>
          <ul className="list-disc ml-6 text-white/80 space-y-1">
            <li>Real-world coding experience in Python, Java</li>
            <li>Specialized in Machine learning,DeepLearning, NLP, and computer vision</li>
            <li>Strong communicator and team player, with a drive for innovation</li>
          </ul>
        </div>
      </motion.section>
      {/* Section Placeholders */}
      <motion.section id="education" className="max-w-4xl mx-auto py-24 px-4 border-b border-[#4cd7ff22]" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7, ease: 'easeOut' }}>
        <h2 className="text-3xl font-bold text-[#4cd7ff] mb-4">Education</h2>
        <div className="text-lg text-white/90">
          <div className="mb-2 font-semibold">COER University</div>
          <div>Bachelor of Technology in Computer Science and Engineering</div>
        </div>
      </motion.section>
      <motion.section id="experience" className="max-w-4xl mx-auto py-24 px-4 border-b border-[#4cd7ff22]" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7, ease: 'easeOut' }}>
        <h2 className="text-3xl font-bold text-[#4cd7ff] mb-4">Experience</h2>
        <div className="space-y-8">
          <div className="bg-[#18243a] rounded-xl p-6 shadow-lg transition-transform duration-300 hover:scale-[1.03] hover:shadow-2xl flex gap-4 items-start">
            <FaBriefcase className="text-[#4cd7ff] text-3xl mt-1" />
            <div>
              <div className="font-semibold text-xl mb-1">Maxim Design Systems <span className="text-[#4cd7ff] font-normal">Software Developer · Internship</span></div>
              <div className="text-sm text-[#4cd7ff] mb-2">Sep 2022 – Present | Roorkee, Uttarakhand, India | Remote</div>
              <ul className="list-disc ml-6 text-white/90 space-y-1">
                <li>Designed TCURVE, a PyQt5-based multi-panel analysis app for comparing up to 4 datasets; improved analysis speed by 60%.</li>
                <li>Automated Parameter Optimization by integrating NGSpice and SciPy, reducing fitting time by 80% and achieving &lt;5% RMSE.</li>
                <li>Built a PyQt5-based ML tool in Python and scikit-learn to train neural networks on 780K-row datasets with 95% accuracy and GUI-driven multi-target prediction tool.</li>
              </ul>
            </div>
          </div>
          <div className="bg-[#18243a] rounded-xl p-6 shadow-lg transition-transform duration-300 hover:scale-[1.03] hover:shadow-2xl flex gap-4 items-start">
            <FaBriefcase className="text-[#4cd7ff] text-3xl mt-1" />
            <div>
              <div className="font-semibold text-xl mb-1">Infosys Springboard <span className="text-[#4cd7ff] font-normal">Python Full Stack · Internship</span></div>
              <div className="text-sm text-[#4cd7ff] mb-2">May 2024 – Jul 2024 | Remote</div>
              <ul className="list-disc ml-6 text-white/90 space-y-1">
                <li>Combined Tesseract OCR, OpenCV, and PyPDF2 to build a bank cheque data extractor, reducing manual entry errors by 15% and increasing processing speed by 20×.</li>
                <li>Engineered a Tkinter-based GUI with SQLite integration for efficient data storage and retrieval, improving usability and reducing the learning curve by 30%.</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.section>
      <motion.section id="projects" className="max-w-4xl mx-auto py-24 px-4 border-b border-[#4cd7ff22]" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7, ease: 'easeOut' }}>
        <h2 className="text-3xl font-bold text-[#4cd7ff] mb-4">Projects</h2>
        <div className="space-y-8">
          <div className="bg-[#18243a] rounded-xl p-6 shadow-lg transition-transform duration-300 hover:scale-[1.03] hover:shadow-2xl flex gap-4 items-start">
            <FaProjectDiagram className="text-[#4cd7ff] text-3xl mt-1" />
            <div>
              <div className="font-semibold text-xl mb-1">Natural Language SQL Query System Using LLMs</div>
              <div className="text-sm text-[#4cd7ff] mb-2">May 2025 – Jun 2025</div>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="bg-[#4cd7ff22] text-[#4cd7ff] px-2 py-1 rounded text-xs font-semibold">Python</span>
                <span className="bg-[#4cd7ff22] text-[#4cd7ff] px-2 py-1 rounded text-xs font-semibold">LLMs</span>
                <span className="bg-[#4cd7ff22] text-[#4cd7ff] px-2 py-1 rounded text-xs font-semibold">NLP</span>
              </div>
              <ul className="list-disc ml-6 text-white/90 space-y-1">
                <li>Developed an NLP system using Mistral LLM to convert English to SQL with 95% accuracy, supporting joins, aggregations, and subqueries.</li>
                <li>Integrated voice interface with Vosk (ASR) and pyttsx3 (TTS) for hands-free SQL querying (&lt;500ms latency, 85% accuracy in noise).</li>
                <li>Created a FastAPI + Streamlit app serving 100+ users; cut SQL query latency by 60% using SQLite and responsive UI design.</li>
              </ul>
              <div className="flex gap-3 mt-3">
                <a href="https://github.com/abhay-singh1100/Natural-Language-SQL-Query-System-Using-LLMs-.git" target="_blank" rel="noopener noreferrer" aria-label="View on GitHub" className="bg-[#22304a] text-[#4cd7ff] px-3 py-1 rounded hover:bg-[#4cd7ff] hover:text-white font-semibold transition">GitHub</a>
                <a href="https://your-live-demo.com" target="_blank" rel="noopener noreferrer" aria-label="View Live Demo" className="bg-[#4cd7ff] text-[#0a1833] px-3 py-1 rounded hover:bg-[#ff4c60] hover:text-white font-semibold transition">View Live</a>
              </div>
            </div>
          </div>
          <div className="bg-[#18243a] rounded-xl p-6 shadow-lg transition-transform duration-300 hover:scale-[1.03] hover:shadow-2xl flex gap-4 items-start">
            <FaProjectDiagram className="text-[#4cd7ff] text-3xl mt-1" />
            <div>
              <div className="font-semibold text-xl mb-1">Android Malware Detection System Using Machine Learning</div>
              <div className="text-sm text-[#4cd7ff] mb-2">Nov 2024 – Jan 2025</div>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="bg-[#4cd7ff22] text-[#4cd7ff] px-2 py-1 rounded text-xs font-semibold">Python</span>
                <span className="bg-[#4cd7ff22] text-[#4cd7ff] px-2 py-1 rounded text-xs font-semibold">Machine Learning</span>
                <span className="bg-[#4cd7ff22] text-[#4cd7ff] px-2 py-1 rounded text-xs font-semibold">Computer Vision</span>
              </div>
              <ul className="list-disc ml-6 text-white/90 space-y-1">
                <li>Trained a stacking model (Logistic Regression, SVM, Random Forest) with 96.9% recall and 84.2% accuracy on malware classification.</li>
                <li>Increased accuracy by 12% using API and permission-based features; reduced false negatives on obfuscated apps by 18%.</li>
                <li>Processed 30K+ APKs in a scalable ML pipeline (96% recall), automating malware detection via API and permission feature extraction.</li>
              </ul>
              <div className="flex gap-3 mt-3">
                <a href="https://github.com/abhay-singh1100/Android-Malware-Detection-System-Using-Machine-Learning-.git" target="_blank" rel="noopener noreferrer" aria-label="View on GitHub" className="bg-[#22304a] text-[#4cd7ff] px-3 py-1 rounded hover:bg-[#4cd7ff] hover:text-white font-semibold transition">GitHub</a>
                <a href="https://your-live-demo.com" target="_blank" rel="noopener noreferrer" aria-label="View Live Demo" className="bg-[#4cd7ff] text-[#0a1833] px-3 py-1 rounded hover:bg-[#ff4c60] hover:text-white font-semibold transition">View Live</a>
              </div>
            </div>
          </div>
          <div className="bg-[#18243a] rounded-xl p-6 shadow-lg transition-transform duration-300 hover:scale-[1.03] hover:shadow-2xl flex gap-4 items-start">
            <FaProjectDiagram className="text-[#4cd7ff] text-3xl mt-1" />
            <div>
              <div className="font-semibold text-xl mb-1">Real-Time Face Recognition Attendance System</div>
              <div className="text-sm text-[#4cd7ff] mb-2">Aug 2024 – Sep 2024</div>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="bg-[#4cd7ff22] text-[#4cd7ff] px-2 py-1 rounded text-xs font-semibold">Python</span>
                <span className="bg-[#4cd7ff22] text-[#4cd7ff] px-2 py-1 rounded text-xs font-semibold">Computer Vision</span>
                <span className="bg-[#4cd7ff22] text-[#4cd7ff] px-2 py-1 rounded text-xs font-semibold">FastAPI</span>
              </div>
              <ul className="list-disc ml-6 text-white/90 space-y-1">
                <li>Architected a FaceNet-based recognition engine using Flask and OpenCV, enabling real-time webcam attendance tracking for 100+ users and eliminating manual entry.</li>
                <li>Deployed 10 REST endpoints covering user enrollment, attendance capture, analytics, and admin control to enable full CRUD capability.</li>
                <li>Encrypted facial embeddings and implemented session auditing, improving cross-device recognition consistency by 25%.</li>
              </ul>
              <div className="flex gap-3 mt-3">
                <a href="https://github.com/abhay-singh1100/Real-Time-Face-Recognition-Attendance-System-.git" target="_blank" rel="noopener noreferrer" aria-label="View on GitHub" className="bg-[#22304a] text-[#4cd7ff] px-3 py-1 rounded hover:bg-[#4cd7ff] hover:text-white font-semibold transition">GitHub</a>
                <a href="https://your-live-demo.com" target="_blank" rel="noopener noreferrer" aria-label="View Live Demo" className="bg-[#4cd7ff] text-[#0a1833] px-3 py-1 rounded hover:bg-[#ff4c60] hover:text-white font-semibold transition">View Live</a>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
      {/* Replace Skills section content with animated skill bars for main skills */}
      <motion.section id="skills" className="max-w-4xl mx-auto py-24 px-4 border-b border-[#4cd7ff22]" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7, ease: 'easeOut' }}>
        <h2 className="text-3xl font-bold text-[#4cd7ff] mb-4">Skills</h2>
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-8">
          <SkillBar skill="Python" level={95} img="/python.png" />
          <SkillBar skill="Java" level={85} img="/java.png" />
          <SkillBar skill="JavaScript" level={80} img="/javascript.png" />
          <SkillBar skill="Machine Learning" level={90} img="/machine.jpeg" />
          <SkillBar skill="NLP" level={85} img="/nlp.png" />
          <SkillBar skill="Computer Vision" level={80} img="/cv.jpeg" />
          <SkillBar skill="React" level={80} img="/react.png" />
          <SkillBar skill="MySQL" level={75} img="/dbms.png" />
          <SkillBar skill="MongoDB" level={70} img="/md.png" />
        </div>
      </motion.section>
      <motion.section id="certifications" className="max-w-4xl mx-auto py-24 px-4 border-b border-[#4cd7ff22]" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7, ease: 'easeOut' }}>
        <h2 className="text-3xl font-bold text-[#4cd7ff] mb-4">Certifications & Achievements</h2>
        <ul className="list-disc ml-6 text-white/90 space-y-2">
          <li>
            <span className="font-semibold">Paper Presentation at SocProS 2025 – IIT Roorkee:</span> Presented research on “Threshold Optimized Ensemble Learning for Android Malware Detection” at an international conference.
          </li>
          <li>
            <span className="font-semibold">Certified AI & Data Quality Analyst – IIT Mandi iHub & NSDC (2024):</span> Attained expert-level proficiency in data quality analysis and AI model development by completing a 480-hour, Grade A certified training under the PMKVY scheme, and scoring in the top 5% of the cohort.
          </li>
        </ul>
      </motion.section>
      <motion.section id="contact" className="max-w-4xl mx-auto py-24 px-4" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7, ease: 'easeOut' }}>
        <h2 className="text-3xl font-bold text-[#4cd7ff] mb-4">Contact</h2>
        <ContactForm />
      </motion.section>
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-50 bg-[#4cd7ff] text-white p-4 rounded-full shadow-lg hover:bg-[#ff4c60] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#4cd7ff]"
          aria-label="Back to Top"
        >
          <FaArrowUp className="text-2xl" />
        </button>
      )}
    </main>
  );
}

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function validateEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    
    try {
      // EmailJS configuration
      const templateParams = {
        from_name: name,
        from_email: email,
        message: message,
        to_email: 'abhaychauhan5051a@gmail.com'
      };

      const result = await emailjs.send(
        'service_k6gl45r', // Replace with your EmailJS service ID
        'template_ezqdh7s', // Replace with your EmailJS template ID
        templateParams,
        'ztI1rrRIdf6Nv_Rin' // Replace with your EmailJS public key
      );

      if (result.status === 200) {
        setSuccess(true);
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setError("Failed to send message. Please try again.");
      }
    } catch {
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#18243a] rounded-xl p-8 shadow-lg max-w-xl mx-auto flex flex-col gap-4">
      {success && <div className="text-green-400 font-semibold mb-2">Thank you! Your message has been sent.</div>}
      {error && <div className="text-red-400 font-semibold mb-2">{error}</div>}
      <input
        type="text"
        placeholder="Your Name"
        className="px-4 py-2 rounded bg-[#22304a] text-white focus:outline-none focus:ring-2 focus:ring-[#4cd7ff]"
        value={name}
        onChange={e => setName(e.target.value)}
        disabled={loading}
      />
      <input
        type="email"
        placeholder="Your Email"
        className="px-4 py-2 rounded bg-[#22304a] text-white focus:outline-none focus:ring-2 focus:ring-[#4cd7ff]"
        value={email}
        onChange={e => setEmail(e.target.value)}
        disabled={loading}
      />
      <textarea
        placeholder="Your Message"
        className="px-4 py-2 rounded bg-[#22304a] text-white focus:outline-none focus:ring-2 focus:ring-[#4cd7ff] min-h-[120px]"
        value={message}
        onChange={e => setMessage(e.target.value)}
        disabled={loading}
      />
      <button
        type="submit"
        className="bg-[#4cd7ff] text-[#0a1833] font-bold px-6 py-2 rounded-full shadow-lg hover:bg-[#ff4c60] hover:text-white transition disabled:opacity-60"
        disabled={loading}
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
