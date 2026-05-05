import { useState } from "react";
import { Send, MapPin, Phone, Mail } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-16 pb-12 sm:pt-24 sm:pb-20 overflow-hidden bg-[#FAF7F2] border-b border-secondary/10">
        <div className="relative container text-center">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold font-heading mb-3 sm:mb-4 animate-fade-up text-[#C26E16]">Connect & Collaborate</h1>
          <div className="w-16 h-1 bg-secondary mx-auto mb-4 rounded-full animate-fade-up" style={{ animationDelay: '50ms' }} />
          <p className="max-w-3xl mx-auto text-sm sm:text-base md:text-lg text-[#8B5E3C] font-medium opacity-90 animate-fade-up" style={{ animationDelay: '100ms' }}>
            Invite Dr. Prabhat Kaushik for global keynotes, leadership audits, institutional workshops, or media appearances.
          </p>
        </div>
      </section>

      <section className="py-10 sm:py-14 md:py-20">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          <ScrollReveal>
            <h2 className="section-heading text-2xl sm:text-3xl md:text-4xl">Get in Touch</h2>
            <p className="mt-4 sm:mt-6 text-muted-foreground leading-relaxed text-sm sm:text-base">
              Whether you're looking to invite Prabhat for a keynote, workshop, media
              appearance, or educational event, we'd love to hear from you.
            </p>
            <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-5">
              {[
                { icon: MapPin, text: "UCSKM Public School, Near Capital Mall, Bhiwadi, Rajasthan 301019" },
                { icon: Phone, text: "+91 90019-97790" },
                { icon: Mail, text: "vidyatree@gmail.com" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <Icon size={18} className="text-secondary shrink-0 sm:w-5 sm:h-5" />
                  <span className="text-xs sm:text-sm">{text}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={120}>
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-full bg-secondary/20 flex items-center justify-center mb-4">
                  <Send size={22} className="text-secondary" />
                </div>
                <h3 className="font-heading text-xl sm:text-2xl font-bold">Message Sent!</h3>
                <p className="text-muted-foreground mt-2 text-sm">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-4 sm:space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <input required type="text" placeholder="First Name" className="border border-border bg-background px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:ring-1 focus:ring-secondary" />
                  <input required type="text" placeholder="Last Name" className="border border-border bg-background px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:ring-1 focus:ring-secondary" />
                </div>
                <input required type="email" placeholder="Email Address" className="w-full border border-border bg-background px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:ring-1 focus:ring-secondary" />
                <input type="text" placeholder="Subject" className="w-full border border-border bg-background px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:ring-1 focus:ring-secondary" />
                <textarea required rows={5} placeholder="Your Message" className="w-full border border-border bg-background px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:ring-1 focus:ring-secondary resize-none" />
                <button type="submit" className="btn-speaker-accent w-full justify-center text-xs sm:text-sm">
                  Send Message <Send size={16} />
                </button>
              </form>
            )}
          </ScrollReveal>
        </div>
      </section>
    </>
  );
};

export default Contact;
