import { Navbar } from "@/layout/Navbar";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Career } from "@/sections/Career";
import { Services } from "@/sections/Services";
import { Projects } from "@/sections/Projects";
import { Testimonials } from "@/sections/Testimonials";
import { Contact } from "@/sections/Contact";
import { Footer } from "@/sections/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";


function App() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Career />
        <Services />
        <Projects />
        <Testimonials />
        <Contact />
        {/* THIS is what you’re looking for */}
      {/* You’ll add the new section right BELOW this */}
      <section className="py-20">
  <div className="container mx-auto px-6 text-center">
    <h2 className="text-4xl font-bold mb-4">Building in Public</h2>
    <p className="text-muted-foreground mb-12">
      Passionate about open-source development and contributing to the community
    </p>

    <div className="grid md:grid-cols-3 gap-6">
      <div className="glass text-center">
        <h3 className="text-xl font-semibold mb-2">Active</h3>
        <p className="text-muted-foreground">Consistently building projects</p>
      </div>
      <div className="glass text-center">
        <h3 className="text-xl font-semibold mb-2">Collaborative</h3>
        <p className="text-muted-foreground">Open to working with others</p>
      </div>
      <div className="glass text-center">
        <h3 className="text-xl font-semibold mb-2">Quality Code</h3>
        <p className="text-muted-foreground">Clean and maintainable code</p>
      </div>
    </div>

    <div className="mt-10">
      <a href="https://github.com/nikesh1-asus" className="glow-btn">
        Check Out My GitHub
      </a>
    </div>
  </div>
</section>
        
      </main>
      {/* Footer */}
      <Footer />

      {/* Scroll to top button */}
      <ScrollToTop />
      
    </div>
  );
}

export default App;