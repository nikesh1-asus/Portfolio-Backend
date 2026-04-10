import { useState } from "react";

// ================= DATA =================
const timelineData = {
  education: [
    {
      title: "MS in Software Engineering",
      place: "Tribhuwan University, Nepal",
      period: "2025 — Current",
    },
    {
      title: "BSc. Computer System Engineering",
      place: "University of Sunderland, UK",
      period: "2019 — 2023",
    },
    {
      title: "+2 Computer Science",
      place: "Trinity International College, Nepal",
      period: "2017 — 2019",

    },
    {
      title: "Secondary Education Examination (SEE)",
      place: "Brighter Academy, Nepal",
      period: "2017",
    },

  ],
  work: [
    {
      title: "Full Stack Engineer",
      company: "Ziva Medico Pvt. Ltd.",
      period: "February 2024 — Present",
      description: "Built and maintained multiple React and Node.js applications.",
    },
  ],
};

const skillsData = [
  {
    title: "Web Developer",
    experience: "More than 2 years",
    categories: [
      {
        title: "💻 Programming Languages",
        items: [
          { name: "C", level: 70 },
          { name: "C++", level: 75 },
          { name: "JavaScript", level: 90 },
          { name: "TypeScript", level: 85 },
          { name: "Python", level: 80 },
        ],
      },
      
      {
        title: "🌐 Frontend Development",
        items: [
          { name: "HTML5", level: 95 },
          { name: "CSS3", level: 90 },
          { name: "React", level: 92 },
          { name: "Tailwind", level: 88 },
        ],
      },
      {
        title: "🛠 Backend Development",
        items: [
          { name: "Node.js", level: 85 },
          { name: "Express", level: 80 },
          { name: "Django", level: 75 },
        ],
      },
        {
        title: "🗄️ Databases",
        items: [
          { name: "SQL", level: 70 },
          { name: "MongoDB", level: 75 },
          { name: "PostgreSQL", level: 65 },
          { name: "Redis", level: 60 },
          { name: "Firebase", level: 80 },
          { name: "SQLite", level: 70 },
          { name: "MySQL", level: 65 },
          { name: "GraphQL", level: 60 },
        ],
      },
       {
        title: "🛠️ Tools & Platforms",
        items: [
          { name: "Git", level: 70 },
          { name: "GitHub", level: 65 },
          { name: "Docker", level: 60 },
          { name: "AWS", level: 55 },
          { name: "Linux", level: 80 },
          { name: "VS Code", level: 90 },
          { name: "Postman", level: 75 },
          { name: "Jira", level: 65 },
          { name: "Figma", level: 70 },
        ],
      },

      
    ],
  },
  {
    title: "Photography / Videography",
    experience: "More than 6 years",
    categories: [
      {
        title: "📷 Skills",
        items: [
          { name: "Editing", level: 90 },
          { name: "Lighting", level: 85 },
          { name: "Composition", level: 88 },
        ],
      },
    ],
  },
];

// ================= COMPONENT =================
export const Career = () => {
  const [activeSection, setActiveSection] = useState("skills");
  const [openSkill, setOpenSkill] = useState(null);
  const [openCategory, setOpenCategory] = useState({});

  return (
    <section
      id="career"
      className="py-16 bg-[var(--color-background)] text-[var(--color-foreground)]"
    >
      <div className="max-w-5xl mx-auto px-4">
        {/* ================= HEADING ================= */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-10 animate-fade-in-up">
          🧭 My{" "}
          <span className="italic text-[var(--color-primary)]">
            Journey
          </span>
        </h2>

        {/* ================= TABS ================= */}
        <div className="flex gap-4 mb-10 justify-center flex-wrap">
          {[
            { key: "skills", label: "🛠️ Skills" },
            { key: "education", label: "🎓 Education" },
            { key: "work", label: "💼 Work" },
          ].map((btn) => (
            <button
              key={btn.key}
              onClick={() => setActiveSection(btn.key)}
              className={`px-6 py-2 rounded-full border font-semibold transition glow-btn
              ${activeSection === btn.key
                  ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]"
                  : "text-[var(--color-muted-foreground)] border-[var(--color-border)]"
                }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* ================= SKILLS ================= */}
        {activeSection === "skills" && (
          <div className="space-y-6">
            {skillsData.map((group, i) => (
              <div
                key={i}
                className="border border-[var(--color-border)] rounded-2xl p-5 bg-[var(--color-card)] glass"
              >
                {/* Header */}
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() =>
                    setOpenSkill(openSkill === i ? null : i)
                  }
                >
                  <div>
                    <h3 className="text-lg font-semibold">
                      {group.title}
                    </h3>
                    <p className="text-sm text-[var(--color-muted-foreground)]">
                      {group.experience}
                    </p>
                  </div>
                  <span>{openSkill === i ? "▲" : "▼"}</span>
                </div>

                {/* Content */}
                {openSkill === i && (
                  <div className="mt-6 space-y-5">
                    {group.categories.map((cat, idx) => {
                      const key = `${i}-${idx}`;
                      const isOpen = openCategory[key];

                      return (
                        <div key={key}>
                          <div
                            className="flex justify-between cursor-pointer"
                            onClick={() =>
                              setOpenCategory((prev) => ({
                                ...prev,
                                [key]: !prev[key],
                              }))
                            }
                          >
                            <h4 className="text-[var(--color-primary)]">
                              {cat.title}
                            </h4>
                            <span>{isOpen ? "−" : "+"}</span>
                          </div>

                          {isOpen && (
                            <div className="mt-4 space-y-4">
                              {cat.items.map((item, j) => (
                                <div key={j} className="animate-fade-in">
                                  <div className="flex justify-between text-sm mb-1">
                                    <span>{item.name}</span>
                                    <span>{item.level}%</span>
                                  </div>

                                  {/* Animated Bar */}
                                  <div className="w-full bg-[var(--color-muted)] rounded-full h-2 overflow-hidden">
                                    <div
                                      className="bg-[var(--color-primary)] h-2 rounded-full transition-all duration-700"
                                      style={{
                                        width: isOpen
                                          ? `${item.level}%`
                                          : "0%",
                                      }}
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ================= TIMELINE ================= */}
        {activeSection !== "skills" && (
          <div key={activeSection} className="relative space-y-10">
            {/* Desktop center line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-[var(--color-primary)] -translate-x-1/2 timeline-glow"></div>

            {timelineData[activeSection].map((item, i) => (
              <div
                key={i}
                style={{ animationDelay: `${i * 0.2}s` }}
                className="relative animate-fade-in-up"
              >
                {/* ================= MOBILE ================= */}
                <div className="md:hidden flex items-start gap-4 relative timeline-item-mobile">
                  {/* Dot + Line */}
                  <div className="flex flex-col items-center">
                    <div className="timeline-dot timeline-glow-mobile"></div>
                    {i !== timelineData[activeSection].length - 1 && (
                      <div className="timeline-line flex-1"></div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 bg-[var(--color-card)] p-4 rounded-lg glass shadow-md">
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-[var(--color-muted-foreground)]">
                      {activeSection === "education"
                        ? item.place
                        : item.company}
                    </p>
                    <p className="text-sm text-[var(--color-primary)] mt-1">
                      {item.period}
                    </p>
                    {item.description && (
                      <p className="text-sm mt-2">{item.description}</p>
                    )}
                  </div>
                </div>

                {/* ================= DESKTOP ================= */}
                <div className="hidden md:grid grid-cols-2 gap-8 items-center">
                  {/* Dot */}
                  <div className="absolute left-1/2 w-4 h-4 bg-[var(--color-primary)] rounded-full -translate-x-1/2 border-2 border-[var(--color-background)]"></div>

                  {/* Content */}
                  <div
                    className={`${i % 2 === 0
                        ? "text-right pr-12"
                        : "col-start-2 pl-12"
                      }`}
                  >
                    <div className="bg-[var(--color-card)] p-5 rounded-xl glass shadow-md">
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-sm text-[var(--color-muted-foreground)]">
                        {activeSection === "education"
                          ? item.place
                          : item.company}
                      </p>
                      <p className="text-sm text-[var(--color-primary)] mt-1">
                        {item.period}
                      </p>
                      {item.description && (
                        <p className="text-sm mt-2">{item.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};