// src/components/ScrollToTop.jsx
import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

export const ScrollToTop = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`
        fixed bottom-6 right-6 p-3 rounded-full bg-primary text-white shadow-lg 
        transform transition-all duration-500 z-50
        ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}
      `}
    >
      <FaArrowUp />
    </button>
  );
};