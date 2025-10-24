"use client";
  import { useEffect, useState, useRef } from "react";
  import { motion, AnimatePresence } from "framer-motion";
  import { Space_Grotesk } from "next/font/google";
  import Image from "next/image";
  import { FaBitcoin, FaWindows } from "react-icons/fa";
  import { FcLinux } from "react-icons/fc";
  import { TbWorld } from "react-icons/tb";
  import { FaXTwitter } from "react-icons/fa6";
  import Script from "next/script";
  import { profile } from "./profile";

  const spaceGrotesk = Space_Grotesk({
    weight: ["400", "500", "600", "700"],
    subsets: ["latin"],
  });

  const sections = [
    { id: "intro", title: "Intro" },
    { id: "background", title: "Work Experience" },
    { id: "education", title: "Education" },
    { id: "certifications", title: "Certifications" },
    { id: "skills", title: "Skills" },
    { id: "about", title: "About" },
    { id: "contact", title: "Contact" }
  ];

  const workProjects = [
    {
      title: "Wiki",
      description: "A command-line tool to get Wikipedia summaries in your terminal - Powered By Gemini AI",
      tags: ["Python", "Snapcraft", "WinGet", "Gemini AI"],
      link: profile.links.wikiProjectUrl || "#",
      platforms: [
        { icon: FaWindows, color: "#00A4EF" },
        { icon: FcLinux }
      ]
    },
    {
      title: "BTC Converter", 
      description: "A Basic Bitcoin to Fiat converter with price feeds from Coindesk",
      tags: ["Python", "JavaScript", "HTML", "CSS"],
      link: "https://github.com/bitkarrot/satsconverter",
      platforms: [
        { icon: TbWorld, color: "#4285F4" },
        // { icon: FaBitcoin, color: "#F7931A" }
      ]
    },
    // {
    //   title: "BotPool", 
    //   description: "An X (Twitter) bot that responds to mentions with witty Deadpool-style quips and one-liners",
    //   tags: ["Python", "X", "Twitter API"],
    //   link: "https://github.com/charanravi-online/BotPool",
    //   platforms: [
    //     { icon: FaXTwitter, color: "#fefeff" }
    //   ]
    // }
  ];

  type AudienceType = 'anyone' | 'recruiters' | 'engineers' | 'product-managers';

  const audienceContent = {
    anyone: {
      title: "For Anyone",
      description: "I'm a developer who loves creating meaningful digital experiences, with a focus on tech, minimalism, and where they intersect.",
      skills: [""]
    },
    recruiters: {
      title: "Recruiters",
      description: (
        <>
          Software developer with over 4 years of experience building software solutions. My expertise includes{" "}
          <span className="hover:text-[#3776AB] transition-colors cursor-default">Python</span>
          {", "}
          <span className="hover:text-[#F7DF1E] transition-colors cursor-default">JavaScript</span>
          {" "}etc.
        </>
      ),
      skills: [<a href="https://drive.google.com/file/d/1Xu9YMnGVI0UzZkG-t2Eie5ZeZD6cnjxe/view?usp=sharing" download className="hover:text-[#fefeff] transition-colors">Download Resume</a>]
    },
    engineers: {
      title: "Engineers",
      description: (
        <>
          Driven by technology, innovation, and open source. Explore my technical deep dives and projects over at my{" "}
          <a 
            href={profile.links.github} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="transition-colors hover:text-sky-500"
            style={{ display: "inline-flex", alignItems: "center" }}
          >
            GitHub &#x2197;
          </a>
        </>
      ),
      skills: [<a href="https://drive.google.com/file/d/1Xu9YMnGVI0UzZkG-t2Eie5ZeZD6cnjxe/view?usp=sharing" download className="hover:text-[#fefeff] transition-colors">Download Resume</a>]
    },
    'product-managers': {
      title: "Product Managers",
      description: "I bring technical expertise to product development, bridging the gap between business objectives and technical execution.",
      skills: [<a href="https://drive.google.com/file/d/1Xu9YMnGVI0UzZkG-t2Eie5ZeZD6cnjxe/view?usp=sharing" download className="hover:text-[#fefeff] transition-colors">Download Resume</a>]
    }
  };

  export default function Home() {
    const [loading, setLoading] = useState(true);
    const [activeSection, setActiveSection] = useState("intro");
    const [selectedAudience, setSelectedAudience] = useState<AudienceType>("anyone");
    const [isNameExpanded, setIsNameExpanded] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
      setTimeout(() => {
        setLoading(false);
      }, 2500);
    }, []);

    useEffect(() => {
      const handleScroll = () => {
        const sections = document.querySelectorAll("section");
        const scrollPosition = window.scrollY;

        sections.forEach((section) => {
          const sectionTop = section.offsetTop - 100;
          const sectionBottom = sectionTop + section.offsetHeight;

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(section.id);
          }
        });
      };

      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

    const handleHorizontalScroll = () => {
      if (scrollContainerRef.current) {
        setScrollPosition(scrollContainerRef.current.scrollLeft);
      }
    };

    useEffect(() => {
      const container = scrollContainerRef.current;
      if (container) {
        container.addEventListener('scroll', handleHorizontalScroll);
        return () => container.removeEventListener('scroll', handleHorizontalScroll);
      }
    }, []);

    const scrollToSection = (sectionId: string) => {
      const section = document.getElementById(sectionId);
      if (section) {
        const offset = sectionId === "intro" ? 0 : section.offsetTop;
        window.scrollTo({
          top: offset,
          behavior: 'smooth'
        });
        setIsMenuOpen(false);
      }
    };

    const handleLogoClick = () => {
      // Toggle name expansion on mobile instead of refreshing the page
      if (window.innerWidth < 768) {
        setIsNameExpanded(!isNameExpanded);
      } else {
        window.location.reload();
      }
    };

    const fullName = profile.name;
    const firstLetter = fullName.charAt(0);
    const remainingLetters = fullName.slice(1).split("");

    return (
      <div className={`${spaceGrotesk.className} bg-black text-[#fefeff] flex flex-col min-h-screen`}>
        {/* Google Analytics */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-KD6ZK493X5" />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-KD6ZK493X5');
          `}
        </Script>
        
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loader"
              className="h-screen w-screen flex items-center justify-center bg-black"
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <motion.h1 
                  className="text-[12vw] md:text-[8vw] font-medium leading-none"
                  animate={{
                    opacity: [1, 0],
                    y: [0, -20],
                    transition: { duration: 0.5, delay: 1.5 }
                  }}
                >
                  {profile.name}
                </motion.h1>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex-grow"
            >
              {/* Logo */}
              <motion.div 
                className="fixed top-8 left-4 md:left-8 z-50 cursor-pointer"
                onHoverStart={() => setIsNameExpanded(true)}
                onHoverEnd={() => setIsNameExpanded(false)}
                onClick={handleLogoClick}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative text-3xl font-medium flex">
                  <span>{firstLetter}</span>
                  <AnimatePresence>
                    {isNameExpanded && (
                      <div className="flex">
                        {remainingLetters.map((letter, index) => (
                          <motion.span
                            key={index}
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 5 }}
                            transition={{
                              duration: 0.1,
                              delay: index * 0.02,
                              ease: "easeOut"
                            }}
                          >
                            {letter}
                          </motion.span>
                        ))}
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* Mobile Menu Button */}
              <button 
                className="fixed top-8 right-4 z-50 md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <div className="space-y-2">
                  <span className={`block w-8 h-0.5 bg-[#fefeff] transition-transform ${isMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
                  <span className={`block w-8 h-0.5 bg-[#fefeff] transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                  <span className={`block w-8 h-0.5 bg-[#fefeff] transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
                </div>
              </button>

              {/* Mobile Menu */}
              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ type: "tween", duration: 0.3 }}
                    className="fixed inset-0 bg-black z-40 md:hidden pt-24 px-8"
                  >
                    {sections.map(({ id, title }) => (
                      <div key={id} className="mb-6">
                        <button
                          onClick={() => scrollToSection(id)}
                          className="text-2xl font-medium"
                        >
                          <span className={`${activeSection === id ? 'text-[#fefeff]' : 'text-[#969696]'}`}>
                            {title}
                          </span>
                        </button>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Header */}
              <header className="p-4 md:p-8 pt-24 md:pt-8">
                <div className="relative md:static mb-8">
                  <div 
                    className="absolute left-0 z-10 w-12 h-full bg-gradient-to-r from-black to-transparent pointer-events-none"
                    style={{
                      opacity: scrollPosition > 0 ? 1 : 0,
                      transition: 'opacity 0.3s ease'
                    }}
                  ></div>
                  <div className="absolute right-0 z-10 w-12 h-full bg-gradient-to-l from-black to-transparent pointer-events-none"></div>
                  <div 
                    ref={scrollContainerRef}
                    className="flex gap-4 md:gap-8 justify-start md:justify-center text-sm overflow-x-auto scrollbar-hide"
                    style={{
                      scrollbarWidth: 'none',
                      msOverflowStyle: 'none',
                      WebkitOverflowScrolling: 'touch',
                      paddingLeft: '1rem',
                      paddingRight: '1rem'
                    }}
                  >
                    {(['anyone', 'recruiters', 'engineers', 'product-managers'] as AudienceType[]).map((audience) => (
                      <button
                        key={audience}
                        onClick={() => setSelectedAudience(audience)}
                        className={`transition-colors whitespace-nowrap flex-shrink-0 ${
                          selectedAudience === audience 
                            ? 'text-[#fefeff] font-medium' 
                            : 'text-[#969696] hover:text-[#fefeff]'
                        }`}
                      >
                        {audienceContent[audience].title}
                      </button>
                    ))}
                  </div>
                </div>
              </header>

              {/* Desktop Navigation */}
              <nav className="hidden md:block fixed left-8 top-1/2 -translate-y-1/2 z-40">
                {sections.map(({ id, title }) => (
                  <div key={id} className="mb-4 text-left">
                    <button
                      onClick={() => scrollToSection(id)}
                      className="group flex items-center gap-2 text-sm"
                    >
                      <span className={`transition-all duration-300 ${
                        activeSection === id ? 'text-[#fefeff]' : 'text-[#969696]'
                      }`}>
                        {title}
                      </span>
                    </button>
                  </div>
                ))}
              </nav>

              {/* Main Content */}
              <main className="flex-grow">
                <section id="intro" className="min-h-screen px-4 md:px-24">
                  <div className="pt-16 pb-8"> {/* Adjusted padding-bottom to 8 */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-center max-w-7xl mx-auto"
                    >
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={selectedAudience}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.5 }}
                        >
                          <p className="text-3xl md:text-6xl text-[#fefeff] leading-tight mb-12 max-w-3xl mx-auto">
                            I'm an experienced professional blending technical knowledge with strong analytical and communication skills, specializing in AI data quality, compliance, and process optimization.
                          </p>
                          <div className="flex gap-4 flex-wrap justify-center">
                            {audienceContent[selectedAudience].skills.map((skill, index) => (
                              <span key={index} className="text-sm text-[#969696]">
                                {skill}
                              </span>
                            ))}
                          </div>
                          
                          {/* Scroll Down Arrow */}
                          <motion.div 
                            className="mt-16 flex justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.6 }}
                            transition={{ 
                              delay: 1,
                              duration: 1.5
                            }}
                          >
                            <motion.div
                              className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[12px] border-t-[#fefeff]"
                              animate={{ 
                                y: [0, 10, 0],
                                opacity: [0.6, 0.3, 0.6]
                              }}
                              transition={{ 
                                repeat: Infinity,
                                duration: 2,
                                ease: "easeInOut"
                              }}
                              onClick={() => scrollToSection("background")}
                              style={{ cursor: "pointer" }}
                            />
                          </motion.div>
                        </motion.div>
                      </AnimatePresence>
                    </motion.div>
                  </div>
                </section>

                {/* Work Experience Section */}
                <section id="background" className="min-h-screen px-4 md:px-24 py-8 md:py-16 pt-20">
                  <div className="max-w-5xl mx-auto">
                    <div className="max-w-2xl mx-auto">
                      <div className="mt-16">
                        <div className="relative w-40 h-40 flex-shrink-0 mb-8">
                          <Image
                            src="/assets/img/logo-invisible-tech.jpg"
                            alt="Invisible Technologies Logo"
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            style={{ objectFit: "contain" }}
                          />
                        </div>
                        <div className="space-y-4">
                          <p className="font-mono text-sm text-[#969696]">Invisible Technologies</p>
                          <h3 className="text-4xl font-medium text-[#fefeff]">Advanced AI Data Trainer</h3>
                          <p className="text-sm text-[#fefeff]">May 2024 — Present &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Remote</p>
                          <ul className="text-sm text-[#969696] list-disc ml-4 space-y-2">
                            <li>Develop and implement high-quality conversational examples to facilitate the AI’s understanding of complex knowledge and contextual nuances.</li>
                            <li>Continuously assess the AI’s performance against criteria of safety, accuracy, and beneficial outcomes.</li>
                            <li>Maintain detailed records of training outcomes and testing results, providing actionable feedback.</li>
                            <li>Collaborate with trainers and researchers to refine training protocols.</li>
                          </ul>
                        </div>
                      </div>
                      <br/>
                      <br/>
                      <br/>
                      <div className="relative w-48 h-40 flex-shrink-0 mb-4">
                        <Image
                          src="/assets/img/logo-revolut.jpg"
                          alt="Revolut Logo"
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          style={{ objectFit: "contain" }}
                        />
                      </div>
                      <div className="space-y-4">
                        <p className="font-mono text-sm text-[#969696]">Revolut</p>
                        <h3 className="text-4xl font-medium text-[#fefeff]">Support Specialist (KYC and Verification)</h3>
                        <p className="text-sm text-[#fefeff]">Feb 2024 — June 2024 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Jammu & Kashmir</p>
                        <ul className="text-sm text-[#969696] list-disc ml-4 space-y-2">
                          <li>Supported KYC compliance, ensuring smooth onboarding and addressing inquiries efficiently.</li>
                          <li>Maintained adherence to AML and KYC standards and internal policies.</li>
                          <li>Analyzed customer documentation to ensure compliance and resolve discrepancies.</li>
                        </ul>
                      </div>
                      <br />
                      <br />
                      <br />
                      <div className="mt-16">
                        <div className="relative w-24 h-24 flex-shrink-0 mb-8">
                          <Image
                            src="/assets/img/logo-dask-power.jpg"
                            alt="Dask Power Pvt. Ltd Logo"
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            style={{ objectFit: "contain" }}
                          />
                        </div>
                        <div className="space-y-4">
                          <p className="font-mono text-sm text-[#969696]">Dask Power Pvt. Ltd</p>
                          <h3 className="text-4xl font-medium text-[#fefeff]">Management Trainee</h3>
                          <p className="text-sm text-[#fefeff]">2021 — 2022 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Jammu & Kashmir</p>
                          <ul className="text-sm text-[#969696] list-disc ml-4 space-y-2">
                            <li>Managed data from over 350 sites within the backup power and distribution division.</li>
                            <li>Maintained a database of 15,000+ installations and supported data-driven decisions.</li>
                            <li>Onboarded 45 new clients by aligning energy needs with sustainable solutions.</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                

                {/* Education Section */}
                <section id="education" className="min-h-screen px-4 md:px-24 py-8 md:py-16 pt-20">
                  <div className="max-w-5xl mx-auto">
                    <div className="max-w-2xl mx-auto">
                      <div className="space-y-8">
                        <div>
                          <p className="font-mono text-sm text-[#969696]">2020 — 2022</p>
                          <h3 className="text-2xl font-medium text-[#fefeff]">Master of Administration</h3>
                          <p className="text-xs text-[#969696]">Specialization: Marketing and IT</p>
                          <p className="text-sm text-[#969696]">University of Kashmir, Srinagar</p>
                        </div>
                        <div>
                          <p className="font-mono text-sm text-[#969696]">2015 — 2019</p>
                          <h3 className="text-2xl font-medium text-[#fefeff]">Bachelor of Technology</h3>
                          <p className="text-xs text-[#969696]">Specialization: Electronics and Communication</p>
                          <p className="text-sm text-[#969696]">Islamic University of Science and Technology, Awantipora</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Certifications Section */}
                <section id="certifications" className="min-h-screen px-4 md:px-24 py-8 md:py-16 pt-20">
                  <div className="max-w-5xl mx-auto">
                    <div className="max-w-2xl mx-auto">
                      <div className="space-y-8">
                        <div>
                          <h3 className="text-2xl font-medium text-[#fefeff]"><a href="https://coursera.org/share/42632083bc8eb17cfaeba1fed937455c" target="_blank" rel="noopener noreferrer" className="hover:text-[#969696] transition-colors">Excel Skills for Business</a></h3>
                          <p className="font-mono text-sm text-[#969696]">Macquarie University</p>
                        </div>
                        <div>
                          <h3 className="text-2xl font-medium text-[#fefeff]"><a href="https://coursera.org/share/a270e794a6b7fd82b8c9ddc18e5f2500" target="_blank" rel="noopener noreferrer" className="hover:text-[#969696] transition-colors">Excel Skills for Data Analytics and Visualization</a></h3>
                          <p className="font-mono text-sm text-[#969696]">Macquarie University</p>
                        </div>
                        <div>
                          <h3 className="text-2xl font-medium text-[#fefeff]"><a href="https://coursera.org/share/aa4709d8493b6e9ec5e3f1a3d039d0e3" target="_blank" rel="noopener noreferrer" className="hover:text-[#969696] transition-colors">Google Project Management</a></h3>
                          <p className="font-mono text-sm text-[#969696]">Google</p>
                        </div>
                        <div>
                          <h3 className="text-2xl font-medium text-[#fefeff]"><a href="https://www.credly.com/badges/211ed50d-d42d-4892-b09a-5e870dd0ef27/public_url" target="_blank" rel="noopener noreferrer" className="hover:text-[#969696] transition-colors">McKinsey.org Forward Program</a></h3>
                          <p className="font-mono text-sm text-[#969696]">McKinsey & Company</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Skills Section */}
                <section id="skills" className="min-h-screen px-4 md:px-24 py-8 md:py-16 pt-20">
                  <div className="max-w-5xl mx-auto">
                    <div className="max-w-2xl mx-auto">
                      <div className="grid md:grid-cols-2 gap-12">
                        <div>
                          <h3 className="text-2xl font-medium text-[#fefeff] mb-4">Technical Skills</h3>
                          <ul className="space-y-2 text-sm text-[#969696] list-disc list-inside">
                            <li>Microsoft Excel</li>
                            <li>SQL</li>
                            <li>Tableau</li>
                            <li>Python</li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-2xl font-medium text-[#fefeff] mb-4">Soft Skills</h3>
                          <ul className="space-y-2 text-sm text-[#969696] list-disc list-inside">
                            <li>Communication</li>
                            <li>Presentation</li>
                            <li>Team Collaboration</li>
                            <li>Problem Solving</li>
                            <li>Critical Thinking</li>
                            <li>Adaptability</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* About Section */}
                <section id="about" className="min-h-screen px-4 md:px-24 py-8 md:py-16 pt-20">
                  <div className="max-w-5xl mx-auto">
                    <h2 className="text-4xl md:text-7xl font-medium mb-8 max-w-4xl mx-auto">about.</h2>
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                      <div>
                        <div className="space-y-8">
                          <p className="text-sm text-[#fefeff]">
                          I'm a software developer based in India with over 4 years of experience across brand and product, 
                          at companies large and small.
                          I take pride in my craft, and love mentoring earlier career developers. 
                          I develop cross functional partnerships, and thrive in complex, ambiguous environments.
                          </p>
                        </div>
                      </div>
                      
                      <div className="md:mt-32">
                        <div className="space-y-8">
                          <p className="text-sm text-[#fefeff]">
                          My approach combines technical expertise with creative problem-solving,
                            always striving to build solutions that are both elegant and practical.
                            Zooming out on company strategy, zooming in on details.
                          </p>
                        </div>
                      </div>
                    </div>

                    <br />
                    <br />
                    
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                      <div>
                        <div className="space-y-8">
                          <p className="text-sm text-[#fefeff]">
                            In my free time I try to challenge myself with new projects, learn new things, compose music,
                            practice yoga, go for a long run or just kick back relax at a temple nearby.
                          </p>
                        </div>
                      </div>
                      
                      <div className="md:mt-32">
                        <div className="space-y-8">
                          <p className="text-sm text-[#fefeff]">
                            Creating something from the ground up and watching it grow is incredibly fulfilling.
                            Engaging in this process with passion feels spiritual to me.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="min-h-screen px-4 md:px-24 py-8 md:py-16 pt-20">
                  <div className="max-w-5xl mx-auto">
                    <div className="max-w-2xl mx-auto">
                      <Image
                        src={profile.images.avatar}
                        alt={profile.name}
                        width={500}
                        height={300}
                        className="mb-8 mx-auto rounded-lg"
                      />
                      <p className="text-xl md:text-xl text-[#fefeff] underline text-center">{profile.email}</p>
                      <div className="flex items-center gap-2 justify-center mt-4">
                        <div className="relative">
                          <div className="w-2 h-2 bg-[#fefeff] rounded-full animate-pulse"></div>
                          <div className="absolute top-0 left-0 w-2 h-2 bg-[#fefeff] rounded-full animate-[ping_1.5s_ease-in-out_infinite] opacity-90"></div>
                        </div>
                        <p className="text-l text-[#969696]">status : active</p>
                      </div>
                      <div className="flex flex-wrap gap-4 md:gap-8 pt-8 justify-center">
                        <a
                          href={profile.links.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#969696] hover:text-[#fefeff] transition-colors text-sm px-2 py-1"
                        >
                          LinkedIn
                        </a>
                        {profile.links.github && (
                          <a
                            href={profile.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#969696] hover:text-[#fefeff] transition-colors text-sm px-2 py-1"
                          >
                            GitHub
                          </a>
                        )}
                        <a
                          href={profile.links.x}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#969696] hover:text-[#fefeff] transition-colors text-sm px-2 py-1"
                        >
                          X [Twitter]
                        </a>
                        {profile.links.instagram && (
                          <a
                            href={profile.links.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#969696] hover:text-[#fefeff] transition-colors text-sm px-2 py-1"
                          >
                            Instagram
                          </a>
                        )}
                        {profile.links.blog && (
                          <a
                            href={profile.links.blog}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#969696] hover:text-[#fefeff] transition-colors text-sm px-2 py-1"
                          >
                            Blog
                          </a>
                        )}
                        {profile.links.docs && (
                          <a
                            href={profile.links.docs}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#969696] hover:text-[#fefeff] transition-colors text-sm px-2 py-1"
                          >
                            Docs
                          </a>
                        )}
                        {profile.links.calendar && (
                          <a
                            href={profile.links.calendar}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#969696] hover:text-[#fefeff] transition-colors text-sm px-2 py-1"
                          >
                            Meeting
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </section>
              </main>

              {/* Footer */}
              <footer className="px-4 md:px-24 py-8 text-[#969696]">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 max-w-5xl mx-auto">
                  <span className="text-sm text-center md:text-left">© 2025 {profile.name}. All rights reserved.</span>
                  <div className="flex gap-4 md:gap-8">
                    <span className="text-sm text-center md:text-left">Design & Code by - <a href="/" className="hover:text-[#fefeff] transition-colors">{profile.name}</a></span>
                  </div>
                </div>
              </footer>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
