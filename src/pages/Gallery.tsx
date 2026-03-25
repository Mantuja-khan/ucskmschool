import { useEffect, useMemo, useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";
import gallery7 from "@/assets/gallery-7.jpg";
import gallery8 from "@/assets/gallery-8.jpg";
import { getApiUrl, toAbsoluteMediaUrl } from "@/lib/api";
import { X } from "lucide-react";

type GalleryItem = {
  _id?: string;
  image?: string;
  video?: string;
  type?: string;
  createdAt?: string;
};

const fallbackImages = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6, gallery7, gallery8];
const Gallery = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMedia, setSelectedMedia] = useState<{ src: string; type: string } | null>(null);

  useEffect(() => {
    let ignore = false;

    const loadGallery = async () => {
      try {
        const response = await fetch(getApiUrl("/api/gallery"));
        if (!response.ok) throw new Error("Failed");
        const data = await response.json();
  if (!ignore) {
    setItems(Array.isArray(data) ? data.filter((item) => item?.image || item?.video) : []);
  }
      } catch (_error) {
        if (!ignore) setItems([]);
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    void loadGallery();

    return () => {
      ignore = true;
    };
  }, []);

  const galleryImages = useMemo(() => {
    if (items.length) {
      return items.map((item, index) => ({
        id: item._id || `${index}`,
        src: item.image ? toAbsoluteMediaUrl(item.image) : (item.video ? toAbsoluteMediaUrl(item.video) : ""),
        type: item.type || "image",
      }));
    }

    return fallbackImages.map((image, index) => ({
      id: `fallback-${index}`,
      src: image,
      type: "image",
    }));
  }, [items]);

  return (
    <>
      <section className="relative pt-16 pb-12 sm:pt-32 sm:pb-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-[6px] scale-110"
          style={{ backgroundImage: `url('https://i.pinimg.com/1200x/9d/d2/86/9dd28648454a2c26f43472351d521c33.jpg')` }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative container text-center text-white">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold font-heading mb-3 sm:mb-4 animate-fade-up">Gallery</h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg opacity-90 animate-fade-up" style={{ animationDelay: "100ms" }}>
            Event moments, campus highlights, and media captures in one visual wall.
          </p>
        </div>
      </section>

      <section className="py-10 sm:py-14 md:py-20 bg-muted/20">
        <div className="container">
          <ScrollReveal>
            <div className="text-center mb-10 sm:mb-16">
              <span className="bg-secondary/10 text-secondary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                Captured Moments
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold font-heading mt-4">Visual Journey</h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {galleryImages.map((item, index) => (
              <div 
                key={item.id}
                onClick={() => setSelectedMedia({ src: item.src, type: item.type })}
                className="overflow-hidden rounded-3xl bg-card aspect-[4/3] shadow-md group relative cursor-pointer border-4 border-white dark:border-muted/50 transition-all hover:shadow-2xl hover:-translate-y-1"
              >
                {item.type === "video" ? (
                  <video
                    src={item.src}
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                    muted
                    loop
                    playsInline
                    onMouseOver={(e) => e.currentTarget.play()}
                    onMouseOut={(e) => {
                      e.currentTarget.pause();
                      e.currentTarget.currentTime = 0;
                    }}
                  />
                ) : (
                  <img
                    src={item.src}
                    alt={`Gallery item ${index + 1}`}
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                )}
                
                {/* Overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div className="bg-white/20 backdrop-blur-md rounded-full px-4 py-2 text-white text-xs font-bold uppercase tracking-widest border border-white/30">
                    View {item.type === "video" ? "Video" : "Image"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedMedia && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={() => setSelectedMedia(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
            onClick={() => setSelectedMedia(null)}
          >
            <X size={32} />
          </button>
          
          <div 
            className="max-w-6xl w-full max-h-[85vh] flex items-center justify-center animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedMedia.type === "video" ? (
              <video 
                src={selectedMedia.src} 
                className="max-w-full max-h-full rounded-xl shadow-2xl bg-black" 
                controls 
                autoPlay 
              />
            ) : (
              <img 
                src={selectedMedia.src} 
                alt="Enlarged media" 
                className="max-w-full max-h-full rounded-xl shadow-2xl object-contain" 
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;
