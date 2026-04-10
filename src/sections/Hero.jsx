import { useEffect, useRef, useState } from "react"; 
import { FaGithub, FaLinkedin, FaFacebook, FaDownload, FaEye } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import Typed from "typed.js";

export const Hero = () => {
  const location = useLocation();
  const typedRef = useRef(null);

  const [showModal, setShowModal] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // ✨ TYPEWRITER
  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: [
        "Frontend Developer",
        "React Specialist",
        "Django Developer",
        "Full Stack Engineer",
        "Software Engineering Student",
      ],
      typeSpeed: 60,
      backSpeed: 40,
      backDelay: 1500,
      loop: true,
    });

    return () => typed.destroy();
  }, []);

  // 🚀 PARALLAX (disabled on mobile)
  const handleMouseMove = (e) => {
    if (window.innerWidth < 768) return; // disable parallax on small screens
    const x = (window.innerWidth / 2 - e.clientX) / 25;
    const y = (window.innerHeight / 2 - e.clientY) / 25;
    setPosition({ x, y });
  };

  const handleDownload = () => {
    let count = localStorage.getItem("cv_downloads") || 0;
    localStorage.setItem("cv_downloads", Number(count) + 1);
  };

  const socialLinks = [
    { href: "https://github.com/nikesh1-asus", icon: <FaGithub /> },
    { href: "https://www.linkedin.com/in/nikesh-ojha-3698a7223/", icon: <FaLinkedin /> },
    { href: "https://www.facebook.com/nikesh.ojha.752", icon: <FaFacebook /> },
  ];

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      className="min-h-[100dvh] pt-16 md:pt-0 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 lg:gap-28 px-6 md:px-20 lg:px-32"
    >
      {/* SOCIAL LINKS - desktop */}
      {location.pathname === "/" && (
        <div className="hidden md:flex flex-col gap-4 fixed left-4 top-1/2 transform -translate-y-1/2 z-[1000]">
          {socialLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="glow-btn text-2xl p-2"
            >
              {link.icon}
            </a>
          ))}
        </div>
      )}

      {/* TEXT */}
      <div className="w-full md:w-[42%] flex flex-col items-center justify-center text-center order-2 md:order-1">

        {/* TITLE */}
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold">
          Hi, I'm{" "}
          <span className="gradient-text">NIKESH OJHA</span>
        </h1>

        {/* TYPEWRITER */}
        <h2 className="mt-4 text-xl sm:text-2xl text-gray-300 h-[30px]">
          <span ref={typedRef}></span>
        </h2>

        {/* DESCRIPTION */}
        <p className="mt-4 text-gray-400 max-w-xl leading-relaxed text-base">
          I craft modern, scalable web applications using React, Next.js, and Django,
          while leveraging GitHub and Jira for streamlined development and collaboration.
          As a software engineering student, I’ve built accounting and e-commerce solutions
          with a strong emphasis on performance, scalability, and intuitive user experiences.
        </p>

        {/* BUTTONS */}
        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          <a
            href="/Nikesh.pdf"
            download
            onClick={handleDownload}
            className="glow-btn flex items-center gap-2"
          >
            <FaDownload /> Download CV
          </a>

          <button
            onClick={() => setShowModal(true)}
            className="glow-btn flex items-center gap-2"
          >
            <FaEye /> Preview CV
          </button>

          <a href="#contact" className="glow-btn">
            Get in Touch
          </a>
        </div>

        {/* SOCIAL LINKS - mobile */}
        {location.pathname === "/" && (
          <div className="flex md:hidden gap-6 mt-4 justify-center">
            {socialLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="glow-btn text-2xl p-2"
              >
                {link.icon}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* IMAGE */}
      <div className="w-full md:w-[42%] flex justify-center md:justify-end order-1 md:order-2">
        <div
          style={{
            transform: `translate(${position.x}px, ${position.y}px)`,
          }}
          className="w-72 h-72 md:w-80 md:h-80 relative transition-transform duration-200 mt-8 md:mt-0"
        >
          <div className="blob animate-float">
            <img
              src="/nikeshh.png"
              alt="profile"
              className="blob-img"
            />
          </div>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[2000]">
          <div className="bg-[#0f1418] w-[90%] md:w-[70%] h-[80%] rounded-xl overflow-hidden shadow-xl relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-4 text-white text-xl hover:text-teal-400"
            >
              ✕
            </button>

            <iframe
              src="/Nikesh.pdf"
              title="CV Preview"
              className="w-full h-full"
            />
          </div>
        </div>
      )}
    </section>
  );
};