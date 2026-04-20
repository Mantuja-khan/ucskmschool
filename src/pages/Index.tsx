import { useEffect, useState } from "react";
import { ArrowRight, Star, X, Facebook, Linkedin, Instagram, BookOpen } from "lucide-react";
import { getApiUrl, toAbsoluteMediaUrl } from "@/lib/api";
import { Link } from "react-router-dom";
import heroImg from "@/assets/hero_section.png";
import portraitImg from "@/assets/speaker-portrait.jpg";
import eventsImg from "@/assets/events-speaker.jpg";
import mainImg from "@/assets/main_image.jpg";
import about_image from "@/assets/about_image.png";
import ScrollReveal from "@/components/ScrollReveal";
import book1 from "@/assets/book_1.png";
import book2 from "@/assets/book_2.png";
import book3 from "@/assets/book_3.png";
import book4 from "@/assets/book_4.png";
import book5 from "@/assets/book_5.png";
import book6 from "@/assets/book_6.png";
import book7 from "@/assets/book_7.png";
import CountUp from "react-countup";
import depshikha from "@/assets/deepshikha.jpg";
import pratima from "@/assets/pratima_singh.png";
import gaurav from "@/assets/gaurav.jpg";

const stats = [
  { number: "120", label: "Presentations" },
  { number: "20+", label: "Years Speaking" },
  { number: "280", label: "Seminars" },
  { number: "18", label: "Countries" },
];

const Index = () => {
  const [selectedTestimonial, setSelectedTestimonial] = useState<any | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [videos, setVideos] = useState<any[]>([]);
  const [books, setBooks] = useState<any[]>([]);

  const singlePageTestimonials = [
    "1mqqpQCpuVRNnlCALrBpcyGnBt3H6xBIQ",
    "1o6kK9hXEV_ywI_Q29Ji0-Yrv7kXgsdVp",
    "1bEfuDYI8BYFqObJbi4t_NsYmz8lSxHUh",
    "1n1bWSMZJqCTdLtbaNBohpRWaZZHnfU6Z",
    "10Nx2VN-koCXIP1VkxH73WJsuDDb35TZI",
  ];

  const getDriveImageUrl = (id: string) => `https://lh3.googleusercontent.com/d/${id}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [videosRes, booksRes] = await Promise.all([
          fetch(getApiUrl("/api/videos")),
          fetch(getApiUrl("/api/books"))
        ]);

        if (videosRes.ok) {
          const data = await videosRes.json();
          setVideos(Array.isArray(data) ? data.slice(0, 4) : []);
        }

        if (booksRes.ok) {
          const data = await booksRes.json();
          setBooks(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative w-full overflow-hidden flex items-start pt-8 sm:pt-24 pb-12 lg:pt-32 lg:pb-16 bg-black">
        <div className="absolute inset-0 bg-black" />

        <style>
          {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
            100% { transform: translateY(0px); }
          }
          .animate-float-1 { animation: float 4s ease-in-out infinite; }
          .animate-float-2 { animation: float 5s ease-in-out infinite 1s; }
          .animate-float-3 { animation: float 6s ease-in-out infinite 2s; }
          @keyframes marquee-books {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee-books { animation: marquee-books 35s linear infinite; }
          .animate-marquee-books:hover { animation-play-state: paused; }
        `}
        </style>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-8 items-start">

          {/* Left: Motivation Line & CTA */}
          <div className="text-white space-y-6 lg:pr-10 lg:pt-10 order-2 lg:order-1 text-center lg:text-left">
            <h1 className="text-2xl sm:text-5xl md:text-6xl font-bold font-heading leading-[1.1] drop-shadow-lg">
              Empowering Minds, <br className="hidden lg:block" /> <span className="text-secondary">Transforming Horizons</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-200 max-w-lg mx-auto lg:mx-0 drop-shadow-md">
              Inspiring positive change across the globe through visionary leadership, transformative keynotes, and deep educational expertise.
            </p>
            <div className="pt-2 flex flex-nowrap gap-4 items-center justify-center lg:justify-start">
              <a href="https://www.facebook.com/prabhat.kaushik.bhiwadi" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-full hover:scale-110 transition-transform shadow-md hover:bg-gray-200 p-2">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg" 
                  alt="Facebook" 
                  className="w-full h-auto p-2"
                />
              </a>
              <a href="https://www.youtube.com/@DRPRABHATKAUSHIK" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-full hover:scale-110 transition-transform shadow-md hover:bg-gray-200 p-2">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png" 
                  alt="YouTube" 
                  className="w-full h-auto"
                />
              </a>
              <a href="https://www.instagram.com/prabhatkaushik.vidyatree?igsh=eDN5bHFyM2xya2hp" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-full hover:scale-110 transition-transform shadow-md hover:bg-gray-200 p-2">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" 
                  alt="Instagram" 
                  className="w-full h-auto"
                />
              </a>
              <a href="https://www.linkedin.com/in/dr-prabhat-kaushik-82913720/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-full hover:scale-110 transition-transform shadow-md hover:bg-gray-200 p-2">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" 
                  alt="LinkedIn" 
                  className="w-full h-auto"
                />
              </a>
            </div>
          </div>

          {/* Right: Main Image & Floating Badges */}
          <div className="relative w-full flex flex-col items-center justify-start order-1 lg:order-2">
            <div className="relative z-10 flex flex-col items-center justify-center">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] sm:w-[600px] sm:h-[600px] bg-white/50 rounded-full blur-[90px] sm:blur-[150px] pointer-events-none z-0"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] sm:w-[350px] sm:h-[350px] bg-white/70 rounded-full blur-[50px] sm:blur-[80px] pointer-events-none z-0"></div>
              <img
                src={mainImg}
                alt="Dr. Prabhat Kaushik"
                className="relative z-10 w-auto h-[250px] sm:h-[450px] object-cover rounded-lg shadow-md"
              />
              <div className="bg-[#FF9933] text-white font-bold px-6 py-2 rounded shadow-md -mt-4 z-20">
                Dr. Prabhat Kaushik
              </div>
            </div>

            <div className="absolute inset-0 z-20 pointer-events-none block">
              <div className="absolute top-[5%] sm:top-[10%] left-[0%] sm:left-[0%] bg-white/90 backdrop-blur-sm border border-gray-100 text-foreground px-2 py-1 sm:px-4 sm:py-1.5 rounded-full text-[10px] sm:text-sm shadow-sm animate-float-1">
                School Principal
              </div>
              <div className="absolute top-[25%] sm:top-[30%] right-[-5%] sm:right-[-5%] bg-white/90 backdrop-blur-sm border border-gray-100 text-foreground px-2 py-1 sm:px-4 sm:py-1.5 rounded-full text-[10px] sm:text-sm shadow-sm animate-float-2">
                Keynote Speaker
              </div>
              <div className="absolute bottom-[25%] sm:bottom-[20%] left-[-5%] sm:left-[-5%] bg-white/90 backdrop-blur-sm border border-gray-100 text-foreground px-2 py-1 sm:px-4 sm:py-1.5 rounded-full text-[10px] sm:text-sm shadow-sm animate-float-3">
                Gifted & Talented
              </div>
              <div className="absolute bottom-[10%] right-[0%] sm:right-[0%] bg-white/90 backdrop-blur-sm border border-gray-100 text-foreground px-2 py-1 sm:px-4 sm:py-1.5 rounded-full text-[10px] sm:text-sm shadow-sm animate-float-1" style={{ animationDelay: '1.2s' }}>
                Zee News Head
              </div>
              <div className="absolute top-[10%] sm:top-[5%] right-[10%] sm:right-[20%] bg-white/90 backdrop-blur-sm border border-gray-100 text-foreground px-2 py-1 sm:px-4 sm:py-1.5 rounded-full text-[10px] sm:text-sm shadow-sm animate-float-2" style={{ animationDelay: '0.8s' }}>
                Master Trainer
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About preview */}
      <section className="relative py-14 sm:py-20 md:py-24 overflow-hidden border-y border-border">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed opacity-[0.05]"
          style={{ backgroundImage: `url('https://i.pinimg.com/1200x/62/3f/18/623f18f311dae794827b1d73be9c305b.jpg')` }}
        />
        <div className="absolute inset-0 bg-background/80" />

        <div className="relative container grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
          <ScrollReveal delay={120} className="flex flex-col items-center md:items-start gap-6">
            <div className="relative w-full max-w-sm md:max-w-full flex justify-center">
              <div className="relative w-[90%] md:w-[85%]">
                <img
                  src={about_image}
                  alt="Prabhat Kaushik portrait"
                  className="w-full rounded-lg shadow-xl"
                />
              </div>
            </div>
            <div className="w-full overflow-hidden">
              <h3 className="font-heading text-base sm:text-lg font-bold mb-3">Featured In:</h3>
              <div className="flex overflow-hidden">
                <div style={{ animation: "marquee 14s linear infinite" }} className="flex gap-3 whitespace-nowrap">
                  {["Zee News", "TEDx Talks", "Education Today", "NDTV", "India Today", "Zee News", "TEDx Talks", "Education Today", "NDTV", "India Today"].map((name, i) => (
                    <span key={i} className="bg-black px-3 py-1.5 text-xs font-heading uppercase tracking-wider text-white flex-shrink-0">{name}</span>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <h2 className="section-heading text-2xl sm:text-3xl md:text-4xl">Make Something Different.</h2>
            <div className="mt-4 sm:mt-6 space-y-4 text-muted-foreground leading-relaxed text-pretty text-sm sm:text-base">
              <p>One of the most rewarded institutional strategist & globally renowned educationist, Dr. Prabhat Kaushik is M.Sc., M.Ed., M.B.A.(HR), LLB. & Ph.D. on Gifted & Talented (one of the most meaningful research on gifted & talented in the world).</p>
              <p>He is internationally acclaimed TRAINER AND ASSESSOR with Australia's highest qualification as Trainer & Assessor from Central Institute of Technology, Perth (under Govts. of India & Australia).</p>
              <p>His exposure includes MIT, Harvard, Hawaii & Rice Univ., Australia, England, Singapore, Japan, South Korea, Dubai, IIMs, CBSE, NCERT.</p>
              <p>For last 30 years Dr. Kaushik is highly sought after educationist for GIFTED & TALENTED and has been passionately working for this noble cause on millions worldwide.</p>
            </div>
            <Link to="/about" className="btn-speaker mt-6 sm:mt-8 text-xs sm:text-sm inline-flex">
              About Prabhat <ArrowRight size={16} />
            </Link>
          </ScrollReveal>
        </div>

        <style>{`
          @keyframes marquee {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </section>

      {/* Stats */}
      <ScrollReveal>
        <section className="bg-section-gray py-12 sm:py-16">
          <div className="container grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
            {stats.map((s, i) => {
              const numMatch = s.number.match(/(\d+)(.*)/);
              const endVal = numMatch ? parseInt(numMatch[1], 10) : 0;
              const suffixStr = numMatch ? numMatch[2] : "";
              return (
                <div key={s.label} className="animate-count-up" style={{ animationDelay: `${i * 100}ms` }}>
                  <div className="text-3xl sm:text-5xl md:text-6xl font-bold">
                    <CountUp end={endVal} suffix={suffixStr} duration={3} enableScrollSpy scrollSpyOnce />
                  </div>
                  <div className="stat-label text-xs sm:text-sm">{s.label}</div>
                </div>
              );
            })}
          </div>
        </section>
      </ScrollReveal>

      {/* Books Section */}
      <ScrollReveal>
        <section className="bg-background py-10 sm:py-14">
          <div className="px-4 sm:px-6 lg:px-12 text-center max-w-[1600px] mx-auto">
            <h2 className="section-heading text-2xl sm:text-3xl md:text-4xl text-center">Featured Books</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto text-sm sm:text-base">
              Discover Prabhat's inspiring written works.
            </p>
            <div className={`mt-6 w-full ${books.length > 3 ? 'overflow-hidden relative' : ''}`}>
              <div className={`flex ${books.length > 3 ? 'w-max gap-8 animate-marquee-books' : 'justify-center gap-10 flex-wrap'}`}>
                {(books.length > 3 ? [...books, ...books] : books).map((book, i) => (
                  <div key={i} className="w-[140px] sm:w-[180px] flex-shrink-0 flex flex-col items-center text-center group">
                    <div className="w-full h-[180px] sm:h-[240px] flex items-center justify-center overflow-hidden">
                      <img 
                        src={toAbsoluteMediaUrl(book.image)} 
                        alt={book.title} 
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-md" 
                      />
                    </div>
                    <div className="pt-1.5 px-2 flex flex-col items-center">
                      <h3 className="font-heading font-bold text-sm sm:text-base mb-0.5 leading-tight">{book.title}</h3>
                      <p className="text-muted-foreground text-[10px] sm:text-xs line-clamp-1 mb-3">{book.description}</p>
                      
                      {book.pdfUrl && (
                        <a 
                          href={book.pdfUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="mt-1 flex items-center gap-1.5 px-3 py-1.5 bg-secondary text-white rounded-full text-[10px] sm:text-xs font-bold hover:bg-secondary/90 transition-colors shadow-sm"
                        >
                          <BookOpen size={12} /> Read Book
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {books.length === 0 && (
                <div className="py-12 text-center text-muted-foreground w-full">
                  <p>No featured books available at the moment.</p>
                </div>
              )}
            </div>
            <div className="mt-4 sm:hidden flex justify-center">
              <Link to="/achievements" className="btn-speaker-accent text-xs">
                View More Books <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* YouTube Videos Section */}
      <ScrollReveal>
        <section className="bg-section-gray py-16 sm:py-20">
          <div className="container max-w-5xl">
            <div className="text-center mb-10 sm:mb-12">
              <h2 className="section-heading text-2xl sm:text-3xl md:text-4xl text-center">Featured Videos</h2>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-sm sm:text-base">
                Watch Prabhat in action. Inspiring keynotes, actionable leadership tips, and more.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {videos.length > 0 ? (
                videos.map((video, i) => {
                  const videoId = video.videoId;
                  const videoUrl = videoId 
                    ? `https://www.youtube.com/watch?v=${videoId}` 
                    : toAbsoluteMediaUrl(video.video);
                  const thumbUrl = videoId 
                    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` 
                    : "/placeholder.svg"; // Fallback for uploaded videos

                  return (
                    <ScrollReveal key={video._id || i} delay={i * 100}>
                      <a
                        href={videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full aspect-video rounded-lg overflow-hidden shadow-lg bg-card relative group cursor-pointer"
                      >
                        <img
                          src={thumbUrl}
                          alt={video.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-foreground/30 group-hover:bg-foreground/50 transition-colors duration-300 flex items-center justify-center">
                          <div className="w-12 sm:w-20 h-12 sm:h-14 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <img 
                              src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png" 
                              alt="YouTube Logo" 
                              className="w-full h-auto drop-shadow-lg"
                            />
                          </div>
                        </div>
                      </a>
                    </ScrollReveal>
                  );
                })
              ) : (
                <div className="col-span-full py-12 text-center text-muted-foreground">
                  <p>No featured videos available.</p>
                </div>
              )}
            </div>
            <div className="mt-10 sm:mt-12 flex justify-center">
              <Link to="/blog" className="btn-speaker-accent text-sm sm:text-base group flex items-center gap-2">
                View More Publications <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Testimonials Section */}
      <ScrollReveal>
        <section className="bg-background py-16 sm:py-20 border-t border-border">
          <div className="container max-w-6xl">
            <h2 className="section-heading text-2xl sm:text-3xl md:text-4xl text-center mb-10 sm:mb-12">What People Say</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {[
                { text: "I am privileged to grab the opportunity to work under the guidance of Dr. Prabhat Kaushik, which is always a great source of inspiration for everyone. You are really a potential factor in my life for providing me a positive outlook. I am really impressed by your motto of ‘busy bee pleasure’ which has always encouraged me to engage myself to do innovative work. The positive vibrant coming out of your motivational speeches inspired us to step ahead in our future. Thank you for being there for us as a guide, mentor and an advisor.", author: "Deepika Aggarwal", role: "", image: depshikha },
                { text: "I had a chance to meet Dr. Kaushik in our school a few years back. Dr Prabhat, a well known educationist, he emerged as a man of deep knowledge, sincerity and hard working. He has devoted his life to the strengthening of education system in our country. His work on gifted children and slow learner is commendable. His passion or his work is evident by the time he puts his efforts. He has ventured into various aspects of of educational development, applying his global experiences and knowledge to give solution for problems like bullying and suggesting next generation teaching method.", author: "Pratima Singh", role: "Royal Oak International School", image: pratima },
                { text: "Dr.Prabhat kaushik exhibits great leadership qualities. He always takes responsibility for the success of the people associated with him. He is visionary, fair and consistent in his judgment. He is a patient listener and helps everyone to solve their problem. I am happy to work with him.", author: "Gaurav Sharma", role: "", image: gaurav }
              ].map((testimonial, i) => (
                <div key={i} className="bg-card p-5 rounded-xl shadow-sm border border-border flex flex-col items-center text-center group hover:-translate-y-1 transition-transform duration-300 h-full min-h-[350px]">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-xl overflow-hidden border-[3px] border-secondary shadow-md mb-4 flex-shrink-0">
                    <img src={testimonial.image} alt={testimonial.author} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col flex-1">
                    <div className="flex text-secondary mb-3 gap-1 justify-center">
                      {[1, 2, 3, 4, 5].map(star => <Star key={star} size={14} fill="currentColor" />)}
                    </div>
                    <div className="flex-1 flex flex-col justify-center mb-4">
                      <p className="text-muted-foreground italic text-xs leading-relaxed">
                        "{testimonial.text.length > 70 ? `${testimonial.text.slice(0, 70)}...` : testimonial.text}"
                      </p>
                      {testimonial.text.length > 70 && (
                        <button 
                          onClick={() => setSelectedTestimonial(testimonial)}
                          className="text-secondary text-[10px] font-bold mt-2 hover:underline cursor-pointer"
                        >
                          Read More
                        </button>
                      )}
                    </div>
                    <div className="mt-auto border-t border-border/50 pt-3 w-full">
                      <h4 className="font-bold text-foreground text-sm truncate">{testimonial.author}</h4>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Single Page Image Testimonials Section */}
      <section className="bg-section-gray py-16 sm:py-20 border-t border-border">
        <div className="container max-w-6xl">
          <h2 className="section-heading text-2xl sm:text-3xl md:text-4xl text-center mb-10 sm:mb-12">Letters of Appreciation</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {singlePageTestimonials.map((imgId, i) => (
              <ScrollReveal key={i} delay={i * 50}>
                <div 
                  className="bg-card rounded-lg shadow-sm border border-border overflow-hidden hover:scale-105 transition-transform duration-300 aspect-[3/4] cursor-pointer"
                  onClick={() => setSelectedImage(getDriveImageUrl(imgId))}
                >
                  <img src={getDriveImageUrl(imgId)} alt={`Appreciation ${i + 1}`} className="w-full h-full object-contain bg-white/5" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {selectedTestimonial && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm shadow-sm"
          onClick={() => setSelectedTestimonial(null)}
        >
          <div 
            className="bg-card w-full max-w-lg rounded-xl p-6 md:p-8 shadow-xl relative border"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setSelectedTestimonial(null)}
            >
              <X size={20} />
            </button>
            <div className="flex flex-col items-center text-center">
              <img src={selectedTestimonial.image} alt={selectedTestimonial.author} className="w-20 h-20 rounded-full mb-4 object-cover border-2 border-primary/20" />
              <div className="flex text-secondary mb-3 gap-1">
                {[1, 2, 3, 4, 5].map(star => <Star key={star} size={16} fill="currentColor" />)}
              </div>
              <div className="max-h-[50vh] overflow-y-auto w-full custom-scrollbar pr-2 mb-6 text-left">
                <p className="text-sm md:text-base italic text-muted-foreground leading-relaxed w-full">"{selectedTestimonial.text}"</p>
              </div>
              <h4 className="font-bold text-lg">{selectedTestimonial.author}</h4>
              <p className="text-sm text-muted-foreground">{selectedTestimonial.role}</p>
            </div>
          </div>
        </div>
      )}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md shadow-2xl"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-2 bg-white/10 rounded-full"
            onClick={() => setSelectedImage(null)}
          >
            <X size={32} />
          </button>
          <div className="max-w-5xl w-full max-h-[90vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <img 
              src={selectedImage} 
              alt="Testimonial Full View" 
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-zoom-in" 
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Index;
