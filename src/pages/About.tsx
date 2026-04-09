import { useState } from "react";
import mainImg from "@/assets/about_image.png";
import ScrollReveal from "@/components/ScrollReveal";
import depshikha from "@/assets/deepshikha.jpg";
import pratima from "@/assets/pratima_singh.png";
import gaurav from "@/assets/gaurav.jpg";
import { Star, X } from "lucide-react";

const About = () => {
  const [selectedTestimonial, setSelectedTestimonial] = useState<any | null>(null);

  const actualTestimonials = [
    { text: "I am privileged to grab the opportunity to work under the guidance of Dr. Prabhat Kaushik, which is always a great source of inspiration for everyone. You are really a potential factor in my life for providing me a positive outlook. I am really impressed by your motto of ‘busy bee pleasure’ which has always encouraged me to engage myself to do innovative work. The positive vibrant coming out of your motivational speeches inspired us to step ahead in our future. Thank you for being there for us as a guide, mentor and an advisor.", author: "Deepika Aggarwal", role: "", image: depshikha },
    { text: "I had a chance to meet Dr. Kaushik in our school a few years back. Dr Prabhat, a well known educationist, he emerged as a man of deep knowledge, sincerity and hard working. He has devoted his life to the strengthening of education system in our country. His work on gifted children and slow learner is commendable. His passion or his work is evident by the time he puts his efforts. He has ventured into various aspects of of educational development, applying his global experiences and knowledge to give solution for problems like bullying and suggesting next generation teaching method.", author: "Pratima Singh", role: "Royal Oak International School", image: pratima },
    { text: "Dr.Prabhat kaushik exhibits great leadership qualities. He always takes responsibility for the success of the people associated with him. He is visionary, fair and consistent in his judgment. He is a patient listener and helps everyone to solve their problem. I am happy to work with him.", author: "Gaurav Sharma", role: "", image: gaurav }
  ];

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
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold font-heading mb-3 sm:mb-4 animate-fade-up">About Dr. Prabhat Kaushik</h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg opacity-90 animate-fade-up" style={{ animationDelay: '100ms' }}>
            A legacy of visionary leadership and educational excellence.
          </p>
        </div>
      </section>

      {/* About Content Section - Responsive Grid */}
      <section className="relative py-14 sm:py-20 md:py-24 overflow-hidden border-b border-border">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed opacity-[0.05]"
          style={{ backgroundImage: `url('https://i.pinimg.com/1200x/62/3f/18/623f18f311dae794827b1d73be9c305b.jpg')` }}
        />
        <div className="absolute inset-0 bg-background/80" />
        <div className="relative container">
          <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-16 items-start">

            {/* Image Column */}
            <ScrollReveal className="w-full">
              <div className="relative w-full max-w-lg mx-auto lg:mx-0">
                <img
                  src={mainImg}
                  alt="Dr. Prabhat Kaushik"
                  className="w-full rounded-2xl shadow-2xl border-8 border-white dark:border-muted/30"
                />
                {/* <div className="absolute -bottom-6 -right-6 hidden sm:block bg-secondary text-white p-6 rounded-2xl shadow-xl max-w-[200px]">
                  <p className="font-heading font-bold text-lg leading-tight text-center">30+ Years of Excellence</p>
                </div> */}
              </div>
            </ScrollReveal>
            {/* Text Column */}
            <ScrollReveal delay={150}>
              <div className="space-y-6">
                <div className="space-y-2 text-center lg:text-left">
                  <span className="text-secondary font-bold uppercase tracking-widest text-sm">Visionary Leader</span>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-foreground">Dr. Prabhat Kaushik</h2>
                </div>

                <div className="text-muted-foreground leading-relaxed text-sm sm:text-base space-y-4">
                  <p>One of the most rewarded institutional strategist & globally renowned educationist, <strong className="text-foreground">Dr. Prabhat Kaushik</strong> is M.Sc., M.Ed., M.B.A.(HR), LLB. & Ph.D. on Gifted & Talented (one of the most meaningful research on gifted & talented in the world).</p>
                  <p>He is internationally acclaimed <strong className="text-foreground">TRAINER AND ASSESSOR</strong> with Australia's highest qualification as Trainer & Assessor from Central Institute of Technology, Perth.</p>
                  <p>His exposure includes prestigious institutions of USA such as MIT, Harvard, Hawaii & Rice Univ., Australia, England, Singapore, Japan, South Korea, Dubai, IIMs, CBSE, NCERT and Rotary International.</p>
                  <p>For last 30 years Dr. Kaushik is highly sought after educationist for GIFTED & TALENTED and has been passionately working for this noble cause on millions of children, parents & teachers worldwide.</p>
                  <p>Projects like <strong className="text-foreground">Institute for Gifted children (IGC)®</strong>, Child Guidance Clinics (CGC)® and Education Beyond Books® have been successful in total transformation of students and parents.</p>
                  <p>He is a renowned author with 2 India Book of Records for his books ‘Shikshaprayogi’, Legally Upright and Rise & Thrive.</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-section-gray py-12 sm:py-20">
        <div className="container">
          <h2 className="section-heading text-center mx-auto text-2xl sm:text-3xl md:text-4xl">Core Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12">
            {[
              { title: "Authenticity", desc: "Speak your truth and lead by example. Every message must come from lived experience." },
              { title: "Impact", desc: "Measure success not by applause, but by the lasting change you create in people's lives." },
              { title: "Growth", desc: "Never stop learning. The best leaders are perpetual students of human behavior." },
            ].map((v) => (
              <div key={v.title} className="bg-card p-8 rounded-2xl shadow-sm border border-border/50 text-center hover:shadow-md transition-shadow">
                <h3 className="text-xl sm:text-2xl font-bold font-heading">{v.title}</h3>
                <div className="w-12 h-1 bg-secondary mx-auto mt-3 mb-6 rounded-full" />
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Actual Testimonials Section */}
      <section className="bg-background py-16 sm:py-24 border-t border-border">
        <div className="container max-w-6xl">
          <h2 className="section-heading text-2xl sm:text-3xl md:text-4xl text-center mb-16">What People Say</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {actualTestimonials.map((testimonial, i) => (
              <div key={i} className="bg-card p-6 rounded-2xl shadow-sm border border-border flex flex-col items-center text-center group hover:-translate-y-1 transition-transform duration-300 h-full min-h-[400px]">
                <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-secondary shadow-md mb-6 flex-shrink-0">
                  <img src={testimonial.image} alt={testimonial.author} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col flex-1 w-full">
                  <div className="flex text-secondary mb-4 gap-1 justify-center">
                    {[1, 2, 3, 4, 5].map(star => <Star key={star} size={16} fill="currentColor" />)}
                  </div>
                  <div className="flex-1 flex flex-col justify-center mb-6">
                    <p className="text-muted-foreground italic text-sm leading-relaxed">
                      "{testimonial.text.length > 100 ? `${testimonial.text.slice(0, 100)}...` : testimonial.text}"
                    </p>
                    {testimonial.text.length > 100 && (
                      <button
                        onClick={() => setSelectedTestimonial(testimonial)}
                        className="text-secondary text-xs font-bold mt-3 hover:underline cursor-pointer"
                      >
                        Read Full Story
                      </button>
                    )}
                  </div>
                  <div className="mt-auto border-t border-border/50 pt-4 w-full">
                    <h4 className="font-bold text-foreground text-base truncate">{testimonial.author}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{testimonial.role || "Professional"}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Modal */}
      {selectedTestimonial && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedTestimonial(null)}
        >
          <div
            className="bg-card w-full max-w-2xl rounded-2xl p-8 md:p-10 shadow-2xl relative border animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-6 right-6 text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setSelectedTestimonial(null)}
            >
              <X size={24} />
            </button>
            <div className="flex flex-col items-center text-center">
              <img src={selectedTestimonial.image} alt={selectedTestimonial.author} className="w-24 h-24 rounded-full mb-6 object-cover border-4 border-secondary/20 shadow-md" />
              <div className="flex text-secondary mb-4 gap-1">
                {[1, 2, 3, 4, 5].map(star => <Star key={star} size={20} fill="currentColor" />)}
              </div>
              <div className="max-h-[50vh] overflow-y-auto w-full custom-scrollbar pr-4 text-left">
                <p className="text-base md:text-lg italic text-muted-foreground leading-relaxed">"{selectedTestimonial.text}"</p>
              </div>
              <div className="mt-8 border-t border-border/50 pt-6 w-full">
                <h4 className="font-bold text-xl">{selectedTestimonial.author}</h4>
                <p className="text-sm text-muted-foreground">{selectedTestimonial.role || "Professional Reference"}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default About;
