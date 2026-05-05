import { useEffect, useState } from "react";
import { BookOpen } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { getApiUrl, toAbsoluteMediaUrl } from "@/lib/api";

const Books = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-16 pb-12 sm:pt-24 sm:pb-20 overflow-hidden bg-[#FAF7F2] border-b border-secondary/10">
        <div className="relative container text-center">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold font-heading mb-3 sm:mb-4 animate-fade-up text-[#C26E16]">Books </h1>
          <div className="w-16 h-1 bg-secondary mx-auto mb-4 rounded-full animate-fade-up" style={{ animationDelay: '50ms' }} />
          <p className="max-w-3xl mx-auto text-sm sm:text-base md:text-lg text-[#8B5E3C] font-medium opacity-90 animate-fade-up" style={{ animationDelay: '100ms' }}>
            Highly acclaimed published literature including 'Shikshaprayogi', 'Rise & Thrive', and 'Legally Upright'.
          </p>
        </div>
      </section>

      {/* Books Grid Section */}
      <section className="bg-background py-16 sm:py-24">
        <div className="container">
          <ScrollReveal>
            <div className="text-center mb-12 sm:mb-16">
              <span className="bg-secondary/10 text-secondary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                Literature & Wisdom
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold font-heading mt-4">Inspiring Publications</h2>
            </div>
          </ScrollReveal>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="w-10 h-10 border-4 border-secondary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : books.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {books.map((book, i) => (
                <ScrollReveal key={book._id || i} delay={i * 80}>
                  <div className="flex flex-col h-full bg-card rounded-2xl border border-border p-6 shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
                    <div className="w-full h-[220px] sm:h-[300px] relative flex items-center justify-center overflow-hidden mb-6 bg-secondary/5 rounded-xl">
                      <img
                        src={toAbsoluteMediaUrl(book.image)}
                        alt={book.title}
                        className="w-full h-full object-contain relative z-10 group-hover:scale-105 transition-transform duration-500 drop-shadow-md p-4"
                      />
                    </div>
                    <div className="flex flex-col flex-1 text-center items-center">
                      <h3 className="font-heading font-bold text-lg sm:text-xl mb-2 text-foreground line-clamp-2 leading-snug">{book.title}</h3>
                      <p className="text-muted-foreground text-xs sm:text-sm line-clamp-3 mb-6 leading-relaxed flex-1">{book.description}</p>

                      {book.pdfUrl && (
                        <a
                          href={book.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-6 py-2.5 bg-secondary text-white rounded-full text-xs sm:text-sm font-bold hover:bg-secondary/90 transition-all hover:scale-105 shadow-md active:scale-95 mt-auto"
                        >
                          <BookOpen size={16} /> Read Full Book
                        </a>
                      )}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-muted-foreground">
              <p className="text-lg">No featured books available at the moment.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Books;
