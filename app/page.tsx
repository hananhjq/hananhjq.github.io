"use client";
import { useEffect, useState } from "react";
import { profile } from "./profile";
import { Space_Grotesk, Source_Code_Pro } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const sourceCodePro = Source_Code_Pro({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export default function Home() {
  const [activeSection, setActiveSection] = useState("intro");

  const handleScroll = () => {
    const sections = document.querySelectorAll("section");
    let scrollPosition = window.scrollY;

    sections.forEach((section) => {
      const sectionTop = (section as HTMLElement).offsetTop;
      const sectionHeight = (section as HTMLElement).clientHeight;

      if (
        scrollPosition >= sectionTop - 50 &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        setActiveSection((section as HTMLElement).getAttribute("id") || "");
      }
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`${spaceGrotesk.className} bg-black text-[#fefeff]`}>
      <div className="flex flex-col md:flex-row">
        {/* Left Navigation */}
        <nav className="hidden md:block fixed left-8 top-1/2 -translate-y-1/2 z-40">
          {profile.navLinks.map((link) => (
            <div key={link.href} className="mb-4">
              <a
                href={link.href}
                className="group flex items-center gap-2 text-sm"
              >
                <span
                  className={`transition-all duration-300 h-px ${
                    activeSection === link.href.substring(1)
                      ? "w-16 bg-[#fefeff]"
                      : "w-8 bg-[#969696] group-hover:w-16 group-hover:bg-[#fefeff]"
                  }`}
                ></span>
                <span
                  className={`transition-all duration-300 ${
                    activeSection === link.href.substring(1)
                      ? "text-[#fefeff]"
                      : "text-[#969696] group-hover:text-[#fefeff]"
                  }`}
                >
                  {link.label}
                </span>
              </a>
            </div>
          ))}
        </nav>

        {/* Additional Certifications Button */}
        <nav className="hidden md:block fixed right-8 top-1/2 -translate-y-1/2 z-40">
          <div className="mb-4 text-right">
            <a
              href="/additional-certifications"
              className="group flex items-center gap-2 text-sm"
            >
              <span className="transition-all duration-300 text-[#969696] hover:text-[#fefeff]">
                Additional Certifications
              </span>
            </a>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-grow">
          <section id="intro" className="min-h-screen px-4 md:px-24">
            <div className="max-w-5xl mx-auto flex flex-col justify-center min-h-screen">
              <div className="max-w-2xl">
                <h1 className="text-4xl md:text-7xl font-medium">
                  {profile.name}
                </h1>
                <h2 className="text-lg md:text-xl mt-4">{profile.title}</h2>
                <p className="mt-4 text-[#969696]">{profile.bio}</p>
              </div>
              <div className="flex gap-4 mt-8">
                {profile.socials.map((social) => (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#969696] hover:text-[#fefeff] transition-colors"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </section>

          <section id="about" className="min-h-screen px-4 md:px-24">
            <div className="max-w-5xl mx-auto flex flex-col justify-center min-h-screen">
              <div className="max-w-2xl">
                <h2 className="text-sm uppercase text-[#969696] tracking-widest">
                  About
                </h2>
                <p className="mt-4">{profile.about}</p>
              </div>
            </div>
          </section>

          <section id="experience" className="min-h-screen px-4 md:px-24">
            <div className="max-w-5xl mx-auto flex flex-col justify-center min-h-screen">
              <h2 className="text-sm uppercase text-[#969696] tracking-widest mb-8">
                Experience
              </h2>
              <div className="space-y-8">
                {profile.experience.map((exp, index) => (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row gap-4 md:gap-8"
                  >
                    <p
                      className={`${sourceCodePro.className} text-sm text-[#969696] md:w-1/4`}
                    >
                      {exp.duration}
                    </p>
                    <div className="md:w-3/4">
                      <h3 className="font-medium text-lg text-[#fefeff]">
                        {exp.role} · {exp.company}
                      </h3>
                      <p className="mt-2 text-[#969696]">{exp.description}</p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {exp.skills.map((skill) => (
                          <span
                            key={skill}
                            className="text-sm bg-[#2d2d2d] text-[#fefeff] px-2 py-1 rounded"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="projects" className="min-h-screen px-4 md:px-24">
            <div className="max-w-5xl mx-auto flex flex-col justify-center min-h-screen">
              <h2 className="text-sm uppercase text-[#969696] tracking-widest mb-8">
                Projects
              </h2>
              <div className="space-y-8">
                {profile.projects.map((project, index) => (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row gap-4 md:gap-8"
                  >
                    <div className="md:w-3/4">
                      <h3 className="font-medium text-lg text-[#fefeff]">
                        {project.name}
                      </h3>
                      <p className="mt-2 text-[#969696]">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {project.skills.map((skill) => (
                          <span
                            key={skill}
                            className="text-sm bg-[#2d2d2d] text-[#fefeff] px-2 py-1 rounded"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-4 mt-4">
                        {project.links.map((link) => (
                          <a
                            key={link.href}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#969696] hover:text-[#fefeff] transition-colors"
                          >
                            {link.icon}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}