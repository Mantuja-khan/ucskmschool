import { Award, Mic, Globe, Users, Trophy, GraduationCap, Briefcase, Landmark, Library, Target, ShieldCheck, HeartHandshake } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const achievements = [
  { icon: Mic, title: "1,200+ Keynotes Delivered", desc: "Delivered transformative speeches from intimate boardrooms to auditoriums of thousands worldwide." },
  { icon: Globe, title: "18 Countries Visited", desc: "Spreading the message of educational transformation and leadership across the globe." },
  { icon: GraduationCap, title: "Ph.D. on Gifted & Talented", desc: "Completed pioneering global research on identifying and nurturing gifted and talented children." },
  { icon: Briefcase, title: "Trainer & Assessor ", desc: "Earned  highest qualification as a Trainer & Assessor ." },
  { icon: Landmark, title: "MIT & Harvard Exposure", desc: "Engaged in advanced educational leadership programs at MIT, Harvard, Hawaii, and Rice University." },
  { icon: Library, title: "2 India Book of Records", desc: "Recognized nationally for authoring outstanding books including 'Shikshaprayogi' and 'Rise & Thrive'." },
  { icon: Target, title: "Founder of IGC & CGC", desc: "Pioneered 'Institute for Gifted Children' and 'Child Guidance Clinics' for total transformation." },
  { icon: Trophy, title: "National Education Award", desc: "Recognized globally for outstanding contributions to modern education and youth empowerment." },
  { icon: Users, title: "2M+ Lives Touched", desc: "Empowered millions of children, parents, and educators through events, workshops, and mentorship." },
  { icon: Award, title: "Renowned School Principal", desc: "Led multiple premier institutions, shaping future generations through academic excellence." },
  { icon: ShieldCheck, title: "Legally Upright Headmaster", desc: "Published and researched legal and ethical frameworks within educational administration." },
  { icon: HeartHandshake, title: "Education Beyond Books", desc: "Championed experiential learning programs that focus on holistic development and character building." },
];

const Achievements = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-16 pb-12 sm:pt-24 sm:pb-20 overflow-hidden bg-[#FAF7F2] border-b border-secondary/10">
        <div className="relative container text-center">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold font-heading mb-3 sm:mb-4 animate-fade-up text-[#C26E16]">Achievements </h1>
          <div className="w-16 h-1 bg-secondary mx-auto mb-4 rounded-full animate-fade-up" style={{ animationDelay: '50ms' }} />
          <p className="max-w-3xl mx-auto text-sm sm:text-base md:text-lg text-[#8B5E3C] font-medium opacity-90 animate-fade-up" style={{ animationDelay: '100ms' }}>
            Keynotes delivered, global academic exposure, national records, and millions of lives empowered.
          </p>
        </div>
      </section>

      {/* Grid Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-background">
        <div className="container">
          <div className="text-center mb-12 sm:mb-16">
            <span className="bg-secondary/10 text-secondary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              Milestones of Excellence
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold font-heading mt-4">Pioneering Educational Leadership</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {achievements.map((a, i) => (
              <ScrollReveal key={a.title} delay={i * 65}>
                <div className="border border-border p-6 sm:p-8 rounded-2xl hover:shadow-xl hover:border-secondary/30 transition-all duration-300 group bg-card flex flex-col h-full hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                    <a.icon size={24} className="text-secondary group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-foreground">{a.title}</h3>
                  <p className="text-muted-foreground text-xs sm:text-sm mt-2 leading-relaxed flex-1">{a.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <ScrollReveal>
        <section className="bg-section-dark text-section-dark-foreground py-14 sm:py-20">
          <div className="container text-center max-w-2xl">
            <h2 className="font-heading text-xl sm:text-3xl md:text-4xl font-bold leading-relaxed">
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
