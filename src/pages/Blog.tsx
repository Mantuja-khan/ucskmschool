import { useEffect, useState } from "react";
import { ArrowRight, Play, X } from "lucide-react";
import { Link } from "react-router-dom";
import { getApiUrl, toAbsoluteMediaUrl } from "@/lib/api";
import ScrollReveal from "@/components/ScrollReveal";
import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";
import blog4 from "@/assets/blog-4.jpg";
import blog5 from "@/assets/blog-5.jpg";



const Blog = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [videos, setVideos] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsRes, videosRes] = await Promise.all([
          fetch(getApiUrl("/api/blogs")),
          fetch(getApiUrl("/api/videos"))
        ]);
        
        if (postsRes.ok) {
          const postsData = await postsRes.json();
          setPosts(Array.isArray(postsData) ? postsData : []);
        }
        
        if (videosRes.ok) {
          const videosData = await videosRes.json();
          setVideos(Array.isArray(videosData) ? videosData : []);
        }
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };
    fetchData();
  }, []);

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
    <section id="videos" className="bg-section-gray py-10 sm:py-14 md:py-20">
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-none">
        <ScrollReveal>
          <h2 className="section-heading text-2xl sm:text-3xl md:text-4xl text-center mb-8 sm:mb-12">Featured Videos</h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {videos.length > 0 ? (
            videos.map((video, i) => {
              const videoId = video.videoId;
              const videoUrl = videoId 
                ? `https://www.youtube.com/watch?v=${videoId}` 
                : toAbsoluteMediaUrl(video.video);
              const thumbUrl = videoId 
                ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` 
                : "/placeholder.svg";

              return (
                <ScrollReveal key={video._id || i} delay={i * 100}>
                  <div className="aspect-video rounded-lg overflow-hidden shadow-lg bg-card relative">
                    <a
                      href={videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 cursor-pointer group"
                    >
                      <img
                        src={thumbUrl}
                        alt={video.title || "Video thumbnail"}
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
                  </div>
                </ScrollReveal>
              );
            })
          ) : (
            <div className="col-span-full py-12 text-center text-muted-foreground">
              <p>No featured videos available.</p>
            </div>
          )}
        </div>
      </div>
    </section>

    <section className="py-10 sm:py-14 md:py-20">
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-none">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row items-center justify-between mb-8 sm:mb-10 gap-4">
            <h2 className="section-heading text-2xl sm:text-3xl md:text-4xl m-0">Latest Publications</h2>
            <a href="#videos" className="btn-speaker-accent text-xs sm:text-sm whitespace-nowrap">
              <Play size={16} /> View Videos
            </a>
          </div>
        </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {posts.length > 0 ? (
              posts.map((post, i) => (
                <ScrollReveal key={post._id || i} delay={i * 80}>
                  <Link to={`/blog/${post._id}`} className="group block h-full">
                    <article className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                      <div className="relative overflow-hidden">
                        <img
                          src={toAbsoluteMediaUrl(post.image)}
                          alt={post.title}
                          className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-3 left-3 bg-secondary text-secondary-foreground px-2.5 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-wider rounded-full">
                          {post.category}
                        </span>
                      </div>
                      <div className="p-4 sm:p-5 flex flex-col flex-1">
                        <span className="text-[10px] sm:text-xs text-muted-foreground mb-2">
                          {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : ""}
                        </span>
                        <h2 className="font-heading text-sm sm:text-base font-bold leading-snug group-hover:text-secondary transition-colors duration-200">
                          {post.title}
                        </h2>
                        <p className="mt-2 text-muted-foreground text-xs sm:text-sm leading-relaxed flex-1 line-clamp-3">
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
                    <Play size={32} className="text-secondary opacity-50" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-heading mb-3">Publications Coming Soon</h3>
                  <p className="text-muted-foreground max-w-sm mx-auto text-sm sm:text-base">
                    We are currently curating the most impactful insights and stories for you. Please check back shortly for our latest publications.
                  </p>
                </div>
              </div>
            )}
          </div>
      </div>
    </section>


  </>
  );
};

export default Blog;
