import { FaCode, FaLightbulb, FaRocket, FaUsers } from "react-icons/fa";

const highlights = [
  {
    icon: FaCode,
    title: "Clean Code",
    description:
      "Writing maintainable, scalable code that stands the test of time.",
  },
  {
    icon: FaRocket,
    title: "Performance",
    description:
      "Optimizing for speed and delivering lightning-fast user experiences.",
  },
  {
    icon: FaUsers,
    title: "Collaboration",
    description: "Working closely with teams to bring ideas to life.",
  },
  {
    icon: FaLightbulb,
    title: "Innovation",
    description:
      "Staying ahead with the latest technologies and best practices.",
  },
];

export const About = () => {
  return (
    <section id="about" className="py-10 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">

          {/* Left Column */}
          <div className="space-y-6">
            <div className="animate-fade-in">
              <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase">
                About Me
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold leading-relaxed animate-fade-in animation-delay-100 text-secondary-foreground">
              Building the future,
              <span className="font-serif italic font-normal text-white">
                {" "}one component at a time.
              </span>
            </h2>

            <div className="space-y-5 text-muted-foreground animate-fade-in animation-delay-200">
              <p>
                I'm a passionate software engineer with over 2 years of
                experience crafting digital products that make a difference.
              </p>
              <p>
                I build modern web applications using React, Next.js, 
                TypeScript, and Django, with Git, GitHub, and Jira for 
                efficient development.
              </p>
              <p>
                Beyond coding, I stay curious by exploring emerging technologies
                and keeping pace with the ever-evolving tech landscape. 
                I actively engage with the developer community, continuously
                learning, sharing insights, and refining my skills to build more 
                impactful solutions.
              </p>
            </div>

            <div className="glass rounded-2xl p-8 glow-border animate-fade-in animation-delay-300">
              <p className="text-lg font-medium italic text-foreground">
                "I don’t just build applications—I create scalable, high-performance digital experiences
                 that make a real impact."
              </p>
            </div>
          </div>

          {/* Right Column - Highlights */}
          <div className="grid sm:grid-cols-2 gap-6">
            {highlights.map((item, idx) => (
              <div
                key={idx}
                className={`glass p-8 rounded-2xl min-h-[220px] transform opacity-0 scale-95 
                           animate-fade-in-up 
                           hover:scale-105 hover:shadow-xl hover:glow-border 
                           transition-all duration-300`}
                style={{ animationDelay: `${(idx + 1) * 150}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 
                                hover:bg-primary/20 transition-colors duration-300">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>

                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};