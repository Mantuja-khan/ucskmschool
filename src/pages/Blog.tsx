import { useState } from "react";
import { ArrowRight, Play, Youtube, X } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";
import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";
import blog4 from "@/assets/blog-4.jpg";
import blog5 from "@/assets/blog-5.jpg";

const posts: any[] = [];

export { posts };

const Blog = () => {
  const [playingVideo, setPlayingVideo] = useState<{id: string, type: 'youtube' | 'drive'} | null>(null);

  return (
    <>
    <section className="relative pt-16 pb-12 sm:pt-32 sm:pb-24 overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-[6px] scale-110" 
        style={{ backgroundImage: `url('https://i.pinimg.com/1200x/9d/d2/86/9dd28648454a2c26f43472351d521c33.jpg')` }}
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative container text-center text-white">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold font-heading mb-3 sm:mb-4 animate-fade-up">Publication & Videos</h1>
        <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg opacity-90 animate-fade-up" style={{ animationDelay: '100ms' }}>
          Insights, keynotes, and deep dives into leadership.
        </p>
      </div>
    </section>
    <section className="py-10 sm:py-14 md:py-20">
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-none">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row items-center justify-between mb-8 sm:mb-10 gap-4">
            <h2 className="section-heading text-2xl sm:text-3xl md:text-4xl m-0">Latest Articles</h2>
            <a href="#videos" className="btn-speaker-accent text-xs sm:text-sm whitespace-nowrap">
              <Play size={16} /> View Videos
            </a>
          </div>
        </ScrollReveal>
          {posts.length > 0 ? (
            posts.map((post, i) => (
              <ScrollReveal key={post.slug} delay={i * 80}>
                <Link to={`/blog/${post.slug}`} className="group block h-full">
                  <article className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                    <div className="relative overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 bg-secondary text-secondary-foreground px-2.5 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-wider rounded-full">
                        {post.category}
                      </span>
                    </div>
                    <div className="p-4 sm:p-5 flex flex-col flex-1">
                      <span className="text-[10px] sm:text-xs text-muted-foreground mb-2">{post.date}</span>
                      <h2 className="font-heading text-sm sm:text-base font-bold leading-snug group-hover:text-secondary transition-colors duration-200">
                        {post.title}
                      </h2>
                      <p className="mt-2 text-muted-foreground text-xs sm:text-sm leading-relaxed flex-1">
                        {post.excerpt}
                      </p>
                      <span className="inline-flex items-center gap-1.5 mt-3 sm:mt-4 text-xs sm:text-sm font-semibold text-secondary group-hover:gap-2.5 transition-all duration-200">
                        Learn More <ArrowRight size={14} />
                      </span>
                    </div>
                  </article>
                </Link>
              </ScrollReveal>
            ))
          ) : (
            <div className="col-span-full py-16 text-center">
              <div className="bg-card inline-flex flex-col items-center p-8 sm:p-12 rounded-3xl shadow-sm border border-border/50">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-6">
                  <Youtube size={32} className="text-secondary opacity-50" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-heading mb-3">Articles Coming Soon</h3>
                <p className="text-muted-foreground max-w-sm mx-auto text-sm sm:text-base">
                  We are currently curating the most impactful insights and stories for you. Please check back shortly for our latest publications.
                </p>
              </div>
            </div>
          )}
      </div>
    </section>
    <section id="videos" className="bg-section-gray py-10 sm:py-14 md:py-20">
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-none">
        <ScrollReveal>
          <h2 className="section-heading text-2xl sm:text-3xl md:text-4xl text-center mb-8 sm:mb-12">Featured Videos</h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[
            { id: "3ru7WBY4x8E", type: "youtube" },
            { id: "mN7OIZ6Cac4", type: "youtube" },
            { id: "W57V5JrQwNg", type: "youtube" },
            { id: "1_qYCgmyRWfBoJ_k-YpQYOxKuBDKkP3Xr", type: "drive" },
            { id: "1G4aiyJT75g5Lm6ivekpm_SgRFKV6czYc", type: "drive" },
            { id: "13NtSkPsbhVUpXtEr7aCou3NCulpCaMHQ", type: "drive" },
            { id: "1MARkp62CgnYuYa5xfMhJXL_dECKS07kj", type: "drive" },
            { id: "1WLyQYqFE5Ra4BspYqmGyLSOLyMMLvc7k", type: "drive" },
            { id: "1FOOigwml9houj9JoJsTGl25-Ktgill5j", type: "drive" },
            { id: "1TqEFj1W2K4eP6r16bFt4e-8tjzkyZAjE", type: "drive" }
          ].map((v, i) => (
            <ScrollReveal key={v.id} delay={i * 100}>
              <div className="aspect-video rounded-lg overflow-hidden shadow-lg bg-card relative">
                  <div
                    className="absolute inset-0 cursor-pointer group"
                    onClick={() => setPlayingVideo(v as any)}
                  >
                    <img
                      src={v.type === 'youtube' ? `https://img.youtube.com/vi/${v.id}/hqdefault.jpg` : `https://drive.google.com/thumbnail?id=${v.id}&sz=w800`}
                      referrerPolicy="no-referrer"
                      alt="Video thumbnail"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-foreground/30 group-hover:bg-foreground/50 transition-colors duration-300 flex items-center justify-center">
                      <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-full bg-[#FF0000] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Youtube size={24} className="text-white fill-current" />
                      </div>
                    </div>
                  </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

      {playingVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm" onClick={() => setPlayingVideo(null)}>
          <div className="w-full max-w-5xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl relative" onClick={e => e.stopPropagation()}>
            <button className="absolute top-4 right-4 text-white z-10 p-2 rounded-full bg-black/50 hover:bg-black/80 transition flex items-center justify-center cursor-pointer" onClick={() => setPlayingVideo(null)}>
              <X size={24} />
            </button>
            <iframe 
              src={playingVideo.type === 'youtube' ? `https://www.youtube.com/embed/${playingVideo.id}?autoplay=1` : `https://drive.google.com/file/d/${playingVideo.id}/preview`} 
              className="w-full h-full border-0 outline-none"
              allow="autoplay" 
              allowFullScreen>
            </iframe>
          </div>
        </div>
      )}

  </>
  );
};

export default Blog;
