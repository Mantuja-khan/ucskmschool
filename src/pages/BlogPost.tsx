import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { posts } from "./Blog";
import ScrollReveal from "@/components/ScrollReveal";

const BlogPost = () => {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <section className="page-hero">
        <div className="container py-12 sm:py-16 md:py-20 text-center">
          <h1 className="font-heading text-2xl sm:text-4xl font-bold">Post Not Found</h1>
          <Link to="/blog" className="btn-speaker-accent mt-6 inline-flex text-xs sm:text-sm">
            <ArrowLeft size={16} /> Back to Publication
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="page-hero">
        <div className="container py-12 sm:py-16 md:py-20">
          <Link to="/blog" className="inline-flex items-center gap-2 text-secondary text-xs sm:text-sm font-semibold mb-4 sm:mb-6 hover:gap-3 transition-all">
            <ArrowLeft size={14} /> Back to Publication
          </Link>
          <div className="flex items-center gap-3 mb-3 sm:mb-4">
            <span className="bg-secondary text-secondary-foreground px-2.5 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-wider rounded-full">
              {post.category}
            </span>
            <span className="text-[10px] sm:text-xs text-section-dark-foreground/60">{post.date}</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-4xl md:text-5xl font-bold animate-fade-up leading-tight max-w-3xl">
            {post.title}
          </h1>
        </div>
      </section>

      <section className="py-10 sm:py-16 md:py-20">
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-none">
          <ScrollReveal>
            <img
              src={post.image}
              alt={post.title}
              className="w-full rounded-lg shadow-lg mb-8 sm:mb-12"
            />
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <p className="text-base sm:text-lg leading-relaxed text-muted-foreground mb-6">
              {post.excerpt}
            </p>
            <div className="prose prose-lg max-w-none text-foreground leading-relaxed text-sm sm:text-base">
              <p>{post.description}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="mt-10 sm:mt-14 pt-8 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <Link to="/blog" className="btn-speaker text-xs sm:text-sm">
                <ArrowLeft size={16} /> All Articles
              </Link>
              <Link to="/contact" className="btn-speaker-accent text-xs sm:text-sm">
                Contact Prabhat for Your Event
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
};

export default BlogPost;
