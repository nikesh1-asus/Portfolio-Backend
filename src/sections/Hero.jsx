import { useEffect, useRef, useState } from "react";
import { FaGithub, FaLinkedin, FaFacebook, FaDownload, FaEye } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import Typed from "typed.js";

export const Hero = () => {
  const location = useLocation();
  const typedRef = useRef(null);

  const [showModal, setShowModal] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // ✅ BASE URL (CRITICAL FIX)
  const base = import.meta.env.BASE_URL;

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

  // 🚀 PARALLAX
  const handleMouseMove = (e) => {
    if (window.innerWidth < 768) return;
    const x = (window.innerWidth / 2 - e.clientX) / 25;
    const y = (window.innerHeight / 2 - e.clientY) / 25;
    setPosition({ x, y });
  };

  const handleDownload = () => {
    let count = localStorage.getItem("cv_downloads") || 0;
    localStorage.setItem("cv_downloads", Number(count) + 1);
  };

  // ✅ SOCIAL LINKS
  const socialLinks = [
    { href: "https://github.com/nikesh1-asus", icon: <FaGithub size={22} /> },
    { href: "https://www.linkedin.com/in/nikesh-ojha-3698a7223/", icon: <FaLinkedin size={22} /> },
    { href: "https://www.facebook.com/nikesh.ojha.752", icon: <FaFacebook size={22} /> },
  ];

  // 📄 FIXED FILE PATHS
  const cvFile = `${base}Nikesh.pdf`;
  const profileImg = `${base}nikeshh.png`;

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      className="min-h-[100dvh] pt-16 md:pt-0 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 lg:gap-28 px-6 md:px-20 lg:px-32"
    >

      {/* SOCIAL DESKTOP */}
      {location.pathname === "/" && (
        <div className="hidden md:flex flex-col gap-4 fixed left-4 top-1/2 transform -translate-y-1/2 z-[1000]">
          {socialLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="glow-btn text-xl p-2 hover:scale-110 transition"
            >
              {link.icon}
            </a>
          ))}
        </div>
      )}

      {/* TEXT */}
      <div className="w-full md:w-[42%] flex flex-col items-center text-center order-2 md:order-1">

        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold">
          Hi, I'm <span className="gradient-text">NIKESH OJHA</span>
        </h1>

        <h2 className="mt-4 text-xl sm:text-2xl text-gray-300 h-[30px]">
          <span ref={typedRef}></span>
        </h2>

        <p className="mt-4 text-gray-400 max-w-xl leading-relaxed">
          I craft modern, scalable web applications using React, Next.js, and Django.
        </p>

        {/* BUTTONS */}
        <div className="mt-6 flex flex-wrap gap-3 justify-center">

          {/* DOWNLOAD CV (SAFE) */}
          <a
            href={cvFile}
            download
            onClick={handleDownload}
            className="glow-btn flex items-center gap-2"
          >
            <FaDownload /> Download CV
          </a>

          {/* PREVIEW CV (FIXED SAFETY) */}
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

        {/* MOBILE SOCIAL */}
        {location.pathname === "/" && (
          <div className="flex md:hidden gap-6 mt-4 justify-center">
            {socialLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="glow-btn text-xl p-2"
              >
                {link.icon}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* IMAGE (FIXED) */}
      <div className="w-full md:w-[42%] flex justify-center md:justify-end order-1 md:order-2">
        <div
          style={{
            transform: `translate(${position.x}px, ${position.y}px)`,
          }}
          className="w-72 h-72 md:w-80 md:h-80 relative transition-transform duration-200 mt-8 md:mt-0"
        >
          <div className="blob animate-float">
            <img
              src={profileImg}
              alt="profile"
              className="blob-img"
            />
          </div>
        </div>
      </div>

      {/* MODAL (FIXED + SAFE PDF LOADING) */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[2000]">
          <div className="bg-[#0f1418] w-[90%] md:w-[70%] h-[80%] rounded-xl overflow-hidden shadow-xl relative">

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-4 text-white text-xl hover:text-teal-400 z-10"
            >
              ✕
            </button>

            {/* PDF SAFE VIEW */}
            <iframe
              src={cvFile}
              title="CV Preview"
              className="w-full h-full"
            />
          </div>
        </div>
      )}

    </section>
  );
};