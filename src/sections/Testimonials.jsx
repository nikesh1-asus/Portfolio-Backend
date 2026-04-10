import { useEffect, useMemo, useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaQuoteLeft,
  FaStar,
} from "react-icons/fa";

// ✅ FIX: BASE URL for GitHub Pages
const base = import.meta.env.BASE_URL;

const testimonials = [
  {
    id: 1,
    feedback: [
      "Nikesh is an exceptional software engineer. His code is clean, efficient, and reliable.",
      "He consistently delivers projects on time and helps improve our system architecture significantly.",
      "His creativity and problem-solving skills make him a joy to work with.",
    ],
    name: "Suresh Shrestha",
    title: "Client",
    image: `${base}Suresh.png`,
    rating: 4,
  },
  {
    id: 2,
    feedback: [
      "Nikesh is extremely professional and detail-oriented. He understands project goals and aligns his work perfectly.",
      "His React and frontend expertise improved our user experience dramatically.",
      "He is communicative, reliable, and someone we trust with important tasks.",
    ],
    name: "Manish Pandey",
    title: "Client",
    image: `${base}Manish.png`,
    rating: 5,
  },
  {
    id: 3,
    feedback: [
      "Nikesh demonstrates incredible technical skills and a deep understanding of complex systems.",
      "He proactively identifies issues and provides elegant solutions, helping our projects succeed.",
      "Collaborating with him boosts confidence in delivering high-quality software.",
    ],
    name: "Niraj Ojha",
    title: "Client",
    image: `${base}Niraj.png`,
    rating: 5,
  },
  {
    id: 4,
    feedback: [
      "Nikesh is highly reliable and professional. He not only completes tasks efficiently but also adds value with suggestions and insights.",
      "He is easy to communicate with and ensures the project meets high standards.",
      "Working with Nikesh gives peace of mind that projects are in excellent hands.",
    ],
    name: "Rubin Chaulagain",
    title: "Client",
    image: `${base}Rubin.png`,
    rating: 5,
  },
];

export const Testimonials = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isAnimatingPhoto, setIsAnimatingPhoto] = useState(true);

  const activeTestimonial = useMemo(
    () => testimonials[activeIdx],
    [activeIdx]
  );

  useEffect(() => {
    setIsAnimatingPhoto(true);

    const timer = setTimeout(() => {
      setIsAnimatingPhoto(false);
    }, activeTestimonial.feedback.length * 220 + activeTestimonial.rating * 140);

    return () => clearTimeout(timer);
  }, [activeTestimonial]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const next = () => setActiveIdx((prev) => (prev + 1) % testimonials.length);

  const previous = () =>
    setActiveIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section
      id="testimonials"
      className="py-16 relative overflow-hidden bg-background"
    >
      <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-muted/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-muted-foreground text-sm font-medium uppercase">
            What Clients Say
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 glow-text">
            Why clients love working with{" "}
            <span className="font-serif italic font-normal">Nikesh</span>
          </h2>
        </div>

        <div className="max-w-6xl mx-auto relative overflow-hidden rounded-3xl glass-strong glow-border">
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${activeIdx * 100}%)` }}
          >
            {testimonials.map((t, idx) => (
              <div
                key={t.id}
                className="min-w-full text-foreground flex flex-col md:flex-row items-center"
              >
                <div
                  className={`w-full md:w-1/2 flex-shrink-0 transform transition-transform duration-500 flex items-center justify-center p-6 md:p-12 ${
                    isAnimatingPhoto && idx === activeIdx
                      ? "-translate-x-8 md:-translate-x-12"
                      : "translate-x-0"
                  }`}
                >
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-72 h-72 md:w-[400px] md:h-[400px] object-cover rounded-3xl animate-float border-2 border-primary/20 bg-background shadow-2xl"
                    loading="lazy"
                  />
                </div>

                <div className="p-8 md:p-16 md:w-1/2 relative">
                  <div className="absolute top-4 left-8 w-12 h-12 rounded-full flex items-center justify-center bg-background shadow-sm">
                    <FaQuoteLeft className="w-6 h-6 text-primary" />
                  </div>

                  <div>
                    {t.feedback.map((para, i) => (
                      <p
                        key={i}
                        className={`mb-4 text-lg md:text-xl transition-all duration-500 ${
                          idx === activeIdx
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 -translate-y-4"
                        }`}
                        style={{
                          transitionDelay:
                            idx === activeIdx ? `${i * 220}ms` : "0ms",
                        }}
                      >
                        {para}
                      </p>
                    ))}
                  </div>

                  <div className="flex items-center mb-4 mt-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FaStar
                        key={i}
                        className={`mr-1 transition-all duration-300 ${
                          i < t.rating
                            ? idx === activeIdx
                              ? "scale-110 opacity-100 animate-bounce-once"
                              : "scale-50 opacity-0"
                            : "opacity-20"
                        }`}
                        style={{
                          color:
                            i < t.rating
                              ? "var(--color-highlight)"
                              : "var(--color-muted)",
                          transitionDelay:
                            idx === activeIdx
                              ? `${t.feedback.length * 220 + i * 140}ms`
                              : "0ms",
                        }}
                      />
                    ))}
                  </div>

                  <div className="mt-2">
                    <div className="font-semibold text-lg">{t.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {t.title}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={previous}
            className="p-3 rounded-full bg-secondary hover:bg-muted transition"
          >
            <FaChevronLeft />
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIdx(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === activeIdx ? "w-8 bg-primary" : "w-2 bg-muted"
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="p-3 rounded-full bg-secondary hover:bg-muted transition"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce-once {
          0% {
            transform: scale(0.5);
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1.1);
          }
        }
        .animate-bounce-once {
          animation: bounce-once 0.3s forwards;
        }
      `}</style>
    </section>
  );
};
