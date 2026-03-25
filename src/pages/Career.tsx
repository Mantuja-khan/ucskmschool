import ScrollReveal from "@/components/ScrollReveal";
import heroImg from "@/assets/hero-speaker.jpg";

const timeline = [
  { year: "2000", title: "Joined Zee News", desc: "Started his journey in broadcast journalism, quickly rising through the ranks at one of India's premier news networks." },
  { year: "2005", title: "Became School Principal", desc: "Took on the role of School Principal, combining educational leadership with a passion for shaping young minds." },
  { year: "2008", title: "First Motivational Keynote", desc: "Delivered his first major motivational keynote to over 500 educators and students, sparking a new career path." },
  { year: "2012", title: "Zee News Head", desc: "Appointed as Head at Zee News, overseeing editorial direction and leading a team of hundreds of journalists." },
  { year: "2018", title: "National Speaking Tour", desc: "Embarked on a nationwide speaking tour, reaching over 100,000 live attendees across India." },
  { year: "2024", title: "Leadership Academy Founded", desc: "Launched the Kaushik Leadership Academy to train the next generation of educators, journalists, and speakers." },
];

const Career = () => (
  <>
    {/* <section className="page-hero">
      <img src={heroImg} alt="On stage" className="absolute inset-0 w-full h-full object-cover opacity-30" />
      <div className="relative container py-12 sm:py-16 md:py-20">
        <h1 className="font-heading text-3xl sm:text-5xl md:text-7xl font-bold animate-fade-up leading-[0.95]">Career</h1>
        <div className="w-12 h-1 bg-secondary mt-4 sm:mt-6 animate-fade-up" style={{ animationDelay: "150ms" }} />
      </div>
    </section> */}

    <section className="py-10 sm:py-14 md:py-20">
      <div className="container max-w-3xl">
        <ScrollReveal>
          <h2 className="section-heading text-center mx-auto text-2xl sm:text-3xl md:text-4xl">A Timeline of Impact</h2>
        </ScrollReveal>

        <div className="mt-10 sm:mt-16 relative">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border" />

          {timeline.map((item, i) => (
            <ScrollReveal key={item.year} delay={i * 80}>
              <div className={`relative flex items-start gap-4 sm:gap-6 mb-8 sm:mb-12 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                <div className="hidden md:block flex-1" />
                <div className="relative z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-heading text-xs sm:text-sm font-bold shrink-0">
                  {item.year.slice(2)}
                </div>
                <div className="flex-1">
                  <span className="text-[10px] sm:text-xs font-heading uppercase tracking-wider text-muted-foreground">{item.year}</span>
                  <h3 className="font-heading text-base sm:text-xl font-bold mt-1">{item.title}</h3>
                  <p className="text-muted-foreground text-xs sm:text-sm mt-1.5 sm:mt-2 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default Career;
