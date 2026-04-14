// src/sections/Footer.jsx
export const Footer = () => {
  return (
    <footer className="bg-background/80 py-8 mt-16 border-t border-primary/30">
      <div className="container mx-auto px-6 max-w-6xl flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
        
        {/* Left: copyright */}
        <p>&copy; {new Date().getFullYear()} Nikesh Ojha. All rights reserved.</p>

        {/* Right: social links */}
        <div className="flex gap-4 mt-4 md:mt-0">
          <a
            href="https://github.com/nikesh1-asus"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors duration-300"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/nikesh-ojha-3698a7223/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors duration-300"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};