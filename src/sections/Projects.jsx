import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ✅ BASE URL FIX (IMPORTANT for GitHub Pages)
const base = import.meta.env.BASE_URL;

export const Projects = () => {
  const [cursorPreview, setCursorPreview] = useState(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const [selectedProject, setSelectedProject] = useState(null);
  const [openFullView, setOpenFullView] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const projectsPerPage = 2;

  const projects = [
    {
      title: "Travel Booking System",
      description:
        "Travel booking system with real-time availability and pricing.",
      technologies: ["PHP", "SQL", "CSS", "HTML", "JavaScript"],
      image: `${base}projects/Travel.png`,
      github: "https://github.com/nikesh1-asus/Travel.git",
    },
    {
      title: "E-commerce Platform",
      description: "Full shopping platform with cart and payments.",
      technologies: ["React", "Django", "Stripe"],
      image: `${base}projects/E-commerce.png`,
      github: "https://github.com/nikesh1-asus/E-Commerce-Site.git",
    },
    {
      title: "Blog Management System",
      description: "Blog system with authentication and roles.",
      technologies: ["Django", "React", "SQLite"],
      image: `${base}projects/blog.png`,
      github: "https://github.com/nikesh1-asus/Django-Blog.git",
    },
    {
      title: "Suitcase Android App",
      description: "App for managing travel essentials.",
      technologies: ["Java", "Firebase", "Android Studio"],
      image: `${base}projects/Suitcase-Android-App.png`,
      github: "https://github.com/nikesh1-asus/Suitcase-App.git",
    },
    {
      title: "Heart Disease Prediction",
      description: "ML model for predicting heart disease.",
      technologies: ["Python", "TensorFlow", "Pandas"],
      image: `${base}projects/Heart-Disease-Prediction.png`,
      github: "https://github.com/nikesh1-asus/Heart-Diseases-Prediction.git",
    },
    {
      title: "Weather Forecasting App",
      description: "ML-based weather prediction system.",
      technologies: ["Python", "TensorFlow", "Pandas"],
      image: `${base}projects/weather.png`,
      github: "https://github.com/nikesh1-asus/Weather-App.git",
    },
  ];

  // 🔍 SEARCH FILTER
  const filteredProjects = projects.filter((project) =>
    `${project.title} ${project.description} ${project.technologies.join(" ")}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  // 📄 PAGINATION
  const paginatedProjects = [];
  for (let i = 0; i < filteredProjects.length; i += projectsPerPage) {
    paginatedProjects.push(filteredProjects.slice(i, i + projectsPerPage));
  }

  const totalPages = paginatedProjects.length;

  return (
    <section
      id="projects"
      className="py-20 bg-background text-foreground relative"
    >
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-6 glow-text">
          My Selected Projects
        </h2>

        {/* 🔍 SEARCH INPUT */}
        <motion.input
          type="text"
          placeholder="Search projects"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full mb-8 px-4 py-2 border rounded-lg bg-background text-foreground"
        />

        {/* ❌ NO RESULTS */}
        {filteredProjects.length === 0 && (
          <p className="text-center text-muted-foreground">
            No projects found.
          </p>
        )}

        {/* 🔥 PROJECT LIST */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${(currentPage - 1) * 100}%)`,
            }}
          >
            {paginatedProjects.map((page, pageIndex) => (
              <div key={pageIndex} className="w-full flex-shrink-0 space-y-6">
                <AnimatePresence mode="wait">
                  {page.map((project) => (
                    <motion.div
                      key={project.title}
                      layout
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30 }}
                      transition={{ duration: 0.4 }}
                      onMouseEnter={() => setCursorPreview(project)}
                      onMouseMove={(e) =>
                        setCursorPos({ x: e.clientX, y: e.clientY })
                      }
                      onMouseLeave={() => setCursorPreview(null)}
                      onClick={() => {
                        setSelectedProject(project);
                        setOpenFullView(true);
                      }}
                      className="flex justify-between items-center border-b border-border pb-4 cursor-pointer group"
                    >
                      <div>
                        <h3 className="text-lg font-semibold group-hover:text-primary">
                          {project.title}
                        </h3>

                        <div className="flex gap-3 text-sm text-muted-foreground mt-1">
                          {project.technologies.map((tech, i) => (
                            <span key={i}>{tech}</span>
                          ))}
                        </div>
                      </div>

                      <span className="text-sm text-muted-foreground group-hover:text-primary">
                        Read More →
                      </span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* 🔵 PAGINATION */}
        {filteredProjects.length > 0 && (
          <div className="flex justify-center gap-4 mt-8">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 border rounded ${
                  currentPage === i + 1 ? "bg-primary text-white" : ""
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* 🟡 CURSOR PREVIEW */}
      {cursorPreview && (
        <div
          className="fixed pointer-events-none z-50"
          style={{
            top: cursorPos.y + 20,
            left: cursorPos.x + 20,
          }}
        >
          <div className="w-64 h-40 rounded-xl overflow-hidden shadow-2xl border">
            <img
              src={cursorPreview.image}
              className="w-full h-full object-cover"
              alt="preview"
            />
          </div>
        </div>
      )}

      {/* 🔥 FULL VIEW */}
      {openFullView && selectedProject && (
        <div className="fixed inset-0 z-50 bg-background overflow-y-auto">
          <button
            onClick={() => setOpenFullView(false)}
            className="fixed top-6 right-6 w-10 h-10 rounded-full bg-secondary"
          >
            ✕
          </button>

          <div className="max-w-6xl mx-auto px-6 py-10">
            <img
              src={selectedProject.image}
              className="w-full h-[350px] object-cover rounded-2xl mb-6"
              alt={selectedProject.title}
            />

            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <h2 className="text-3xl font-bold mb-4">
                  {selectedProject.title}
                </h2>

                <p className="mb-6">
                  {selectedProject.description}
                </p>

                <div className="flex flex-wrap gap-3">
                  {selectedProject.technologies.map((tech, i) => (
                    <span key={i} className="px-4 py-2 bg-secondary rounded-lg">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-6 border rounded-2xl flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Project Details
                  </h3>
                  <ul className="text-sm space-y-2">
                    <li>✔ High performance</li>
                    <li>✔ Clean UI</li>
                    <li>✔ Scalable system</li>
                    <li>✔ Modern architecture</li>
                  </ul>
                </div>

                <button
                  className="glow-btn mt-6 px-4 py-2 bg-primary text-white rounded"
                  onClick={() =>
                    window.open(selectedProject.github, "_blank")
                  }
                >
                  Visit Project
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};