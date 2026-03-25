import { Link } from "react-router-dom";
import { Facebook, Youtube, Linkedin, Instagram } from "lucide-react";

const Footer = () => (
  <>
    {/* Social bar */}
    <div className="bg-section-dark">
      <div className="container py-6 sm:py-8 flex flex-wrap justify-center gap-6 sm:gap-8">
        {[
          { icon: Facebook, label: "Facebook", link: "https://www.facebook.com/prabhat.kaushik.bhiwadi" },
          { icon: Youtube, label: "YouTube", link: "https://www.youtube.com/@DRPRABHATKAUSHIK" },
          { icon: Linkedin, label: "LinkedIn", link: "https://www.linkedin.com/in/dr-prabhat-kaushik-82913720/" },
          { icon: Instagram, label: "Instagram", link: "https://www.instagram.com/prabhatkaushik.vidyatree?igsh=eDN5bHFyM2xya2hp" },

        ].map(({ icon: Icon, label, link }) => (
          <a
            key={label}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 text-section-dark-foreground/60 hover:text-secondary transition-colors"
          >
            <Icon size={24} className="sm:w-7 sm:h-7" />
            <span className="text-[10px] sm:text-xs uppercase tracking-wider">
              {label}
            </span>
          </a>
        ))}

      </div>
    </div>

    {/* Footer */}
    <footer className="bg-footer-bg text-footer-foreground border-t border-border/10">
      <div className="container py-12 sm:py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        <div>
          <h4 className="font-heading text-xl sm:text-2xl text-nav-foreground mb-4">
            Dr. Prabhat <span className="italic font-light text-secondary">Kaushik</span>
          </h4>
          <p className="text-sm leading-relaxed mb-6 opacity-80 pr-4">
            World-renowned Educationist, Keynote Speaker, and Leadership Coach. Inspiring positive change globally through deep educational expertise.
          </p>
          <p className="text-xs opacity-60">© {new Date().getFullYear()} Dr. Prabhat Kaushik.</p>
          <p className="text-xs opacity-60 mt-1">All rights reserved.</p>
        </div>
        <div>
          <h4 className="font-heading text-lg sm:text-xl text-nav-foreground mb-4">Quick Links</h4>
          <div className="flex flex-col gap-3 text-sm">
            <Link to="/about" className="hover:text-secondary hover:translate-x-1 transition-all w-fit">About</Link>
            <Link to="/career" className="hover:text-secondary hover:translate-x-1 transition-all w-fit">Career</Link>
            <Link to="/achievements" className="hover:text-secondary hover:translate-x-1 transition-all w-fit">Achievements & Books</Link>
            <Link to="/blog" className="hover:text-secondary hover:translate-x-1 transition-all w-fit">Publications & Videos</Link>
            <Link to="/testimonials" className="hover:text-secondary hover:translate-x-1 transition-all w-fit">Testimonials</Link>
            <Link to="/contact" className="hover:text-secondary hover:translate-x-1 transition-all w-fit">Contact Us</Link>
            <Link to="/admin" className="hover:text-secondary transition-colors font-semibold text-secondary mt-2 w-fit">» Admin Login</Link>
          </div>
        </div>

      </div>
    </footer>
  </>
);

export default Footer;
