import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Facebook, Youtube, Linkedin, Instagram, Book } from "lucide-react";
import { getApiUrl } from "@/lib/api";

const Footer = () => {
  const [books, setBooks] = useState<any[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch(getApiUrl("/api/books"));
        if (res.ok) {
          const data = await res.json();
          setBooks(Array.isArray(data) ? data.slice(0, 6) : []);
        }
      } catch (error) {
        console.error("Failed to fetch books for footer", error);
      }
    };
    fetchBooks();
  }, []);

  return (
    <>
      {/* Social bar */}
      <div className="bg-section-dark">
        <div className="container py-6 sm:py-8 flex flex-wrap justify-center gap-6 sm:gap-8">
          {[
            {
              label: "Facebook",
              link: "https://www.facebook.com/prabhat.kaushik.bhiwadi",
              customIcon: (
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg"
                  alt="Facebook"
                  className="w-6 h-auto sm:w-8"
                />
              )
            },
            {
              label: "YouTube",
              link: "https://www.youtube.com/@DRPRABHATKAUSHIK",
              customIcon: (
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png"
                  alt="YouTube"
                  className="w-6 h-auto sm:w-8"
                />
              )
            },
            {
              label: "LinkedIn",
              link: "https://www.linkedin.com/in/dr-prabhat-kaushik-82913720/",
              customIcon: (
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png"
                  alt="LinkedIn"
                  className="w-6 h-auto sm:w-8"
                />
              )
            },
            {
              label: "Instagram",
              link: "https://www.instagram.com/prabhatkaushik.vidyatree?igsh=eDN5bHFyM2xya2hp",
              customIcon: (
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg"
                  alt="Instagram"
                  className="w-6 h-auto sm:w-8"
                />
              )
            },
          ].map(({ label, link, customIcon }: any) => (
            <a
              key={label}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 text-section-dark-foreground/60 hover:text-secondary transition-colors"
            >
              {customIcon}
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
            <p className="text-xs opacity-60 mt-1">Designed by Metaweb Kit</p>
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
            </div>
          </div>
          <div>
            <h4 className="font-heading text-lg sm:text-xl text-nav-foreground mb-4">Featured Books</h4>
            <div className="flex flex-col gap-3 text-sm">
              {books.length > 0 ? (
                books.map((book) => (
                  <a
                    key={book._id}
                    href={book.pdfUrl || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-secondary hover:translate-x-1 transition-all w-fit flex items-center gap-2"
                  >
                    <Book size={14} className="text-secondary opacity-70" />
                    <span className="line-clamp-1">{book.title}</span>
                  </a>
                ))
              ) : (
                <p className="opacity-50 text-xs italic">Loading books...</p>
              )}
              {books.length > 0 && (
                <Link to="/achievements" className="text-secondary text-xs font-bold mt-2 hover:underline">
                  View All Books →
                </Link>
              )}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
