import { useEffect, useState } from "react";
import { Award, BookOpen, Mic, Globe, Users, Trophy } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { getApiUrl, toAbsoluteMediaUrl } from "@/lib/api";

const achievements = [
  { icon: Mic, title: "1,200+ Keynotes Delivered", desc: "From intimate boardrooms to auditoriums of thousands." },
  { icon: Globe, title: "18 Countries", desc: "Spreading the message of transformation across the globe." },
  { icon: BookOpen, title: "Zee News Head", desc: "Leading one of India's most influential news networks with editorial excellence." },
  { icon: Award, title: "Renowned School Principal", desc: "Shaping the future generation through educational leadership and innovation." },
  { icon: Users, title: "2M+ Lives Touched", desc: "Through live events, workshops, news coverage, and mentorship programs." },
  { icon: Trophy, title: "National Education Award", desc: "Recognized for outstanding contributions to education and youth empowerment." },
];

const Achievements = () => {
  const [books, setBooks] = useState<any[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch(getApiUrl("/api/books"));
        if (res.ok) {
          const data = await res.json();
          setBooks(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("Failed to fetch books", error);
      }
    };
    fetchBooks();
  }, []);

  return (
  <>
    {/* Hero Section */}
    <section className="relative pt-16 pb-12 sm:pt-32 sm:pb-24 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-[6px] scale-110"
        style={{ backgroundImage: `url('https://i.pinimg.com/1200x/9d/d2/86/9dd28648454a2c26f43472351d521c33.jpg')` }}
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative container text-center text-white">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold font-heading mb-3 sm:mb-4 animate-fade-up">Achievements & Books</h1>
        <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg opacity-90 animate-fade-up" style={{ animationDelay: '100ms' }}>
          Explore a legacy of transformation, global impact, and inspiring written works.
        </p>
      </div>
    </section>

    <section className="py-10 sm:py-14 md:py-20">
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-none">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {achievements.map((a, i) => (
            <ScrollReveal key={a.title} delay={i * 80}>
              <div className="border border-border p-6 sm:p-8 hover:shadow-lg transition-shadow duration-300 group">
                <a.icon size={28} className="text-secondary mb-3 sm:mb-4 group-hover:scale-105 transition-transform sm:w-8 sm:h-8" />
                <h3 className="font-heading text-base sm:text-xl font-bold">{a.title}</h3>
                <p className="text-muted-foreground text-xs sm:text-sm mt-1.5 sm:mt-2 leading-relaxed">{a.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    {/* Books Section */}
    <ScrollReveal>
      <section className="bg-background py-16 sm:py-20">
        <div className="w-full px-4 sm:px-6 lg:px-8 text-center max-w-none">
          <h2 className="section-heading text-2xl sm:text-3xl md:text-4xl text-center">Featured Books</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-sm sm:text-base">
            Discover Prabhat's inspiring written works, offering deep insights into leadership, education, and personal growth.
          </p>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 text-left">
            {books.length > 0 ? (
              books.map((book, i) => (
                <div key={book._id || i} className="flex flex-col items-center text-center group">
                  <div className="w-full aspect-[3/4] relative flex items-center justify-center overflow-hidden p-2">
                    <img 
                      src={toAbsoluteMediaUrl(book.image)} 
                      alt={book.title} 
                      className="w-full h-full object-contain relative z-10 hover:scale-110 transition-transform duration-500 drop-shadow-lg" 
                    />
                  </div>
                  <div className="pt-4 px-2">
                    <h3 className="font-heading font-bold text-xl mb-2">{book.title}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-3">{book.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-muted-foreground">
                <p>No featured books available at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </ScrollReveal>

    <ScrollReveal>
      <section className="bg-section-dark text-section-dark-foreground py-14 sm:py-20">
        <div className="container text-center max-w-2xl">
          <h2 className="font-heading text-xl sm:text-3xl md:text-4xl font-bold">
            "The greatest achievement is not in never falling, but in rising every time we fall."
          </h2>
          <div className="w-12 h-0.5 bg-secondary mx-auto mt-4 sm:mt-6 mb-3 sm:mb-4" />
          <p className="text-secondary font-heading uppercase tracking-wider text-xs sm:text-sm">— Dr. Prabhat Kaushik</p>
        </div>
      </section>
    </ScrollReveal>
  </>
  );
};

export default Achievements;
