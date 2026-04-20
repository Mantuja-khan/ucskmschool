import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { Star, X } from "lucide-react";
import gaurav from "../assets/gaurav.jpg"
import gopal from "../assets/gopal.jpg"
import madhu from "../assets/madhu.jpg"
import pratima from "../assets/pratima_singh.png"
import mamta from "../assets/mamta.jpg"
import naresh from "../assets/naresh.jpg"
import pinki from "../assets/pinki.jpg"
import poonam from "../assets/poonam.jpg"
import rajkumar from "../assets/rajkumar.jpg"
import ramkishan from "../assets/ramkishan.jpg"
import depshikha from "../assets/deepshikha.jpg"
type TestimonialType = {
  text: string;
  author: string;
  role: string;
  image: string;
};
const testimonials = [
  { text: "I am privileged to grab the opportunity to work under the guidance of Dr. Prabhat Kaushik, which is always a great source of inspiration for everyone. You are really a potential factor in my life for providing me a positive outlook. I am really impressed by your motto of ‘busy bee pleasure’ which has always encouraged me to engage myself to do innovative work. The positive vibrant coming out of your motivational speeches inspired us to step ahead in our future. Thank you for being there for us as a guide, mentor and an advisor.", author: "Deepika Aggarwal", role: "", image: depshikha },
  { text: "I had a chance to meet Dr. Kaushik in our school a few years back. Dr Prabhat, a well known educationist, he seemed to be like any other ordinary person . But has he introduce himself and begin to share his views with us , he emerged as a man of deep knowledge, sincerity and hard working. He has devoted his life to the strengthening of education system in our country. His work on gifted children and slow learner is commendable. His passion or his work is evident by the time he puts his efforts. He has ventured into various aspects of of educational development, applying his global experiences and knowledge to give solution for problems like bullying and suggesting next generation teaching method. People like him are the pillars on which the foundation of a society is based", author: "Pratima Singh", role: "Royal Oak International School", image: pratima },
  { text: "Dr. Prabhat Kaushik -  An Educationist with a vision.  Dr. Prabhat Kaushik, Principal has emerged as well known Academic. With vast experience as a teacher and principal and administrator , he has dedicated himself to the cause of quality education. According to him, Education is the only means by which the civilisation can be relieved of the drugery and slavery which has been handed down the ages to the present era.  For him education should act as a catalyst to trigger off and stimulate the process of thinking and not the one to block it.He has  carved out a niche for himself by sheer dint of his hard work, discipline  and dedication. His sessions are highly effective and life changing.", author: "Dr.Sanjay Kulshrestha ", role: "T&D Department, HCST, SGI,AGRA ", image: "https://placehold.co/150x150/e2e8f0/64748b?text=User" },
  { text: "Dr.Prabhat kaushik exhibits great leadership qualities. He always takes responsibility for the success of the people associated with him. He is visionary, fair and consistent in his judgment. He is a patient listener and helps everyone to solve their problem. I am happy to work with him.", author: "Gaurav Sharma ", role: "", image: gaurav },
  { text: "Seek the excellence and success will follow you.” This is a great saying that should really be followed but how, that is implemented under the guidance of Dr.Prabhat Kaushik. Thank you, Sir.", author: "Gopal Verma", role: "", image: gopal },
  { text: "It has rightly been said that a man can achieve anything through hard work and dedication. “Who dare, there is whole world to win.”And this has been proved by respected Dr. Prabhat Kaushik. This has helped me to accept all the challenges in my life. He has always polished and trained people to perfections and match with the demand of time.", author: "Madhu Singh", role: "Educator", image: madhu },
  { text: "It is said that “The heart that rocks the cradle rules the world.”We working with Dr. Prabhat Kaushik often feel and experience the mystical touch of a magical power rocking us gently, not to put us to sleep but to awake and arise the challenges that lie ahead. To keep everyone abreast with what is happening in the field of education. He provides various opportunities to develop their knowledge constantly. He is our constant source of inspiration. I am thankful to him.", author: "Mamta hariyal", role: "", image: mamta },
  { text: "Dr. Kaushik you always motivate everyone and have a magical power to develop a negative personality into positive one. You are a great speaker and your speeches are full of positive motivations which can turn even a coal into a shining gold coin. Thank you for all your support", author: "Naresh Bala", role: "", image: naresh },
  { text: "Dr. Prabhat Kaushik is a prominent innovative educationalist who is constantly trying to bring about a marked improvement and development in the field of education. His vast innovative and motivational ideas have contributed immensely to the development of education both in India and globally. He is a pillar of strength to all educational bodies he has been associated with. We wish him success in his Endeavour’s and I am fortunate to work with him", author: "Pinki Manchanda", role: "", image: pinki },
  { text: "Ideals are the stars we never reach them, but like the mariners of the sea we chart our course by them” Respected Dr. Prabhat Kaushik is that famous personality whose dedication and devotion is glowing like the sun. Whose inspirations and instructions are like couplets for us. He is a person who always gives us a message of stop following and start exploring. Thank you Dr. Prabhat Kaushik for encouraging us to venture in the new fields of life", author: "Poonam Sharma", role: "", image: poonam },
  { text: "Sir you are the force who has helped me in grooming my personality. I have always respected your idea of ‘Being Happy by providing comfort and happiness to others’I follow the path of simple living, high thinking, don’t compare, don’t criticize and always work for progress as these are golden guiding directions given by you. Thank you Dr. Kaushik for your positive guidance", author: "Raj Kumar Singh", role: "", image: rajkumar },
  { text: "I firmly believe that, Dr. Prabhat Kaushik, your guidance can change the lives of people connected with you. I can feel a great difference in me after coming in contact with you. You have provided me a positive outlook for life. I have learned to move ahead fearlessly. Thank you sir for everything", author: "Ram Kishan", role: "", image: ramkishan },

];

// Image Testimonials IDs in order 1 to 23 (provided by user)
const imageTestimonialIds = [
  "1r3Wvfr5rHnknndkKpVR4gwzIBlekJkIW", // 1
  "1LX9N3ii3C-WTZ3Gte-yTKX57rEbcQQ_n", // 2
  "14rXV_zxxyv7olTMLyDnVQ4sQTTD3Ki4u", // 3
  "1ECi4i1lB5Jv8EEcWKLeejtW0qhHxrT84", // 4
  "1HFUIdGknqaw-VYLdXLHdsXq-07mFZ3Ck", // 5
  "1a5yI-F9hiGfIOzy2SuAikeh-9lKL-vks", // 6
  "1Os0ytuXLgE1GicO5VTDfMacAEBvX_zw6", // 7
  "1iNzD_SLi0D2Aka25rU5DFXcaDjrG6FMd", // 8
  "1mCszh8PqqIx_wptxd0fijDAQIJe53T-H", // 9
  "169X-_pKSXp5g4mDig0ZbkZ_ucG1s-bV7", // 10
  "1qzmw9GLNSxfSMRQGEyR2AceAzMiQFfgR", // 11
  "1Bom1dBC0KJvIa6Brdc2qwrCkEW44-r79", // 12
  "1yfYwSc8gTmQBwCIkWqn48NrwSsMqpUGy", // 13
  "1K5dvRpSpYtFaeU17IhaFgbcA24OU3A00", // 14
  "1jVBYzS9u_igSRmSuezrQr61TzZuoza0_", // 15
  "1n1bWSMZJqCTdLtbaNBohpRWaZZHnfU6Z", // 16
  "1FNDwDUjpVTbtFEoOzrT26Oegkl9aXTLo", // 17
  "1NbGm-rw77w7_OOTjvJWnh0ZXp_zybNEE", // 18
  "1bEfuDYI8BYFqObJbi4t_NsYmz8lSxHUh", // 19
  "1KC0aaVmp0w87F1KC2xSsoIlFOMBO-A82", // 20
  "10Nx2VN-koCXIP1VkxH73WJsuDDb35TZI", // 21
  "1mqqpQCpuVRNnlCALrBpcyGnBt3H6xBIQ", // 22
  "1o6kK9hXEV_ywI_Q29Ji0-Yrv7kXgsdVp", // 23
];

// Display order: 23 down to 1
const imageTestimonials = [...imageTestimonialIds].reverse();

const getDriveImageUrl = (id: string) => `https://lh3.googleusercontent.com/d/${id}`;

const Testimonials = () => {
  const [selectedTestimonial, setSelectedTestimonial] = useState<TestimonialType | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <section className="relative pt-16 pb-12 sm:pt-32 sm:pb-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-[6px] scale-110"
          style={{ backgroundImage: `url('https://i.pinimg.com/1200x/9d/d2/86/9dd28648454a2c26f43472351d521c33.jpg')` }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative container text-center text-white">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold font-heading mb-3 sm:mb-4 animate-fade-up">Testimonials</h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg opacity-90 animate-fade-up" style={{ animationDelay: '100ms' }}>
            Hear from the educators, leaders, and organizers who have experienced the transformation.
          </p>
        </div>
      </section>
      <section className="bg-background py-16 sm:py-20 border-t border-border">
        <div className="container max-w-7xl">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="section-heading text-2xl sm:text-2xl md:text-4xl text-center">More Applause</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-sm sm:text-base">
              Snapshots of feedback from organizers and attendees.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 sm:gap-8">
            {imageTestimonials.map((imgId, i) => (
              <ScrollReveal key={i} delay={i * 50}>
                <div 
                  className="bg-card rounded-xl shadow-lg border border-border overflow-hidden hover:scale-105 transition-transform duration-300 aspect-[3/4] cursor-pointer"
                  onClick={() => setSelectedImage(getDriveImageUrl(imgId))}
                >
                  <img src={getDriveImageUrl(imgId)} alt={`Testimonial Snapshot ${i + 1}`} className="w-full h-full object-contain bg-white/5" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-section-gray py-16 sm:py-20 border-t border-border">
        <div className="container max-w-7xl">
          <h2 className="section-heading text-2xl sm:text-3xl md:text-4xl text-center mb-10 sm:mb-12">What People Say</h2>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 sm:gap-8 space-y-6 sm:space-y-8">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="break-inside-avoid mb-6 sm:mb-8">
                <ScrollReveal delay={i * 100}>
                  <div className="bg-card p-6 sm:p-8 rounded-xl shadow-md border border-border flex flex-col items-center text-center group hover:-translate-y-1 transition-transform duration-300">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border-[3px] border-secondary shadow-md flex-shrink-0 mb-4">
                      <img src={testimonial.image} alt={testimonial.author} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col flex-1 min-w-0 items-center">
                      <div className="flex text-secondary mb-3 gap-1 justify-center">
                        {[1, 2, 3, 4, 5].map(star => <Star key={star} size={14} fill="currentColor" />)}
                      </div>
                      <p className="text-muted-foreground italic text-xs sm:text-sm leading-relaxed mb-6">
                        "{testimonial.text}"
                      </p>
                      <div className="mt-auto border-t border-border/50 pt-4 w-full">
                        <h4 className="font-bold text-foreground text-sm sm:text-base truncate">{testimonial.author}</h4>
                        <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
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
          <div
            className="w-full max-w-[95vw] max-h-[95vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
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

export default Testimonials;
