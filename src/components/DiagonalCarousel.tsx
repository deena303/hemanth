import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { GalleryImage } from "../data";

interface DiagonalCarouselProps {
  images: GalleryImage[];
}

export default function DiagonalCarousel({ images }: DiagonalCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [images.length]);

  if (!images || images.length === 0) return null;

  return (
    <div className="relative w-full overflow-hidden py-16 px-4 md:px-12 select-none" ref={containerRef}>
      {/* Skewed background design element */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-72 bg-gradient-to-r from-purple-950/20 via-pink-950/10 to-transparent -skew-y-3 pointer-events-none" />

      {/* Primary Carousel Container */}
      <div className="max-w-5xl mx-auto relative h-[480px] md:h-[540px] flex items-center justify-center">
        {/* Carousel Track with AnimatePresence for Active Card transitions */}
        <div className="relative w-full h-full flex items-center justify-center">
          <AnimatePresence mode="popLayout">
            {images.map((item, index) => {
              // Calculate offset relative to active index
              let offset = index - activeIndex;
              // Wrap around for circular carousel positioning
              if (offset < -images.length / 2) offset += images.length;
              if (offset > images.length / 2) offset -= images.length;

              const isActive = index === activeIndex;
              const isVisible = Math.abs(offset) <= 2; // only show 5 cards at once max for performance

              if (!isVisible) return null;

              // Diagonal calculations
              // As cards move further away, they tilt, shift down/up and depth-scale
              const rotate = offset * 12 - 4; // Add a constant -4deg base tilt for that "diagonal" organic feeling
              const x = offset * 280; // horizontal spacing
              const y = offset * 35;  // vertical diagonal offset (diagonal axis)
              const scale = isActive ? 1.05 : 0.85 - Math.abs(offset) * 0.08;
              const zIndex = 10 - Math.abs(offset);
              const opacity = isActive ? 1 : 0.45 - Math.abs(offset) * 0.1;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.6, y: 100, rotate: -20 }}
                  animate={{
                    x,
                    y,
                    rotate,
                    scale,
                    opacity,
                    zIndex,
                  }}
                  exit={{ opacity: 0, scale: 0.5, y: -100, rotate: 20 }}
                  transition={{
                    type: "spring",
                    stiffness: 280,
                    damping: 26,
                  }}
                  onClick={() => setActiveIndex(index)}
                  className={`absolute w-[260px] md:w-[320px] aspect-[4/5] rounded-2xl cursor-pointer select-none origin-center ${
                    isActive ? "cursor-default" : "cursor-pointer hover:opacity-80"
                  }`}
                  style={{
                    perspective: 1000,
                  }}
                >
                  {/* Polaroid-style glass card with luxury tilt */}
                  <div
                    className={`w-full h-full p-4 rounded-2xl border bg-black/40 backdrop-blur-xl transition-colors duration-500 overflow-hidden flex flex-col justify-between ${
                      isActive
                        ? "border-pink-500/40 shadow-[0_0_40px_-5px_rgba(244,63,94,0.25)]"
                        : "border-white/10"
                    }`}
                  >
                    {/* Image frame */}
                    <div className="relative w-full h-[65%] rounded-xl overflow-hidden bg-zinc-900 border border-white/5">
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover select-none transition-transform duration-700 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                      
                      {/* Interactive visual location indicator */}
                      <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-pink-300 text-[10px] font-mono tracking-wider uppercase bg-black/60 backdrop-blur-md py-1 px-2 rounded-full border border-white/10">
                        <MapPin size={10} className="animate-pulse" />
                        Memory Captured
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="h-[30%] flex flex-col justify-end gap-1.5">
                      <h3 className="font-sans font-semibold text-lg text-white tracking-tight text-left leading-none">
                        {item.title}
                      </h3>
                      <p className="font-sans text-xs text-zinc-300 leading-relaxed text-left line-clamp-3">
                        {item.memoryCaption}
                      </p>
                    </div>

                    {/* Aesthetic diagonal linear accent inside the card */}
                    <div className="absolute -right-4 top-1/4 w-12 h-[1px] bg-gradient-to-r from-pink-500/0 to-pink-500/30 rotate-45 pointer-events-none" />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Custom Premium Controls */}
      <div className="flex flex-col items-center gap-6 mt-12 relative z-10">
        {/* Navigation buttons with hover glow */}
        <div className="flex items-center gap-6">
          <button
            id="carousel-prev"
            onClick={handlePrev}
            className="p-3.5 rounded-full border border-white/10 bg-black/30 text-white backdrop-blur-md hover:bg-white/10 hover:border-pink-500/40 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(244,63,94,0.15)] group"
            aria-label="Previous Memory"
          >
            <ChevronLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
          </button>

          {/* Indicators container */}
          <div className="flex items-center gap-2 bg-black/30 px-4 py-2.5 rounded-full border border-white/5 backdrop-blur-md">
            {images.map((_, idx) => (
              <button
                key={idx}
                id={`carousel-indicator-${idx}`}
                onClick={() => setActiveIndex(idx)}
                className={`h-2 rounded-full transition-all duration-500 ${
                  idx === activeIndex
                    ? "w-6 bg-gradient-to-r from-pink-400 to-purple-400"
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            id="carousel-next"
            onClick={handleNext}
            className="p-3.5 rounded-full border border-white/10 bg-black/30 text-white backdrop-blur-md hover:bg-white/10 hover:border-pink-500/40 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(244,63,94,0.15)] group"
            aria-label="Next Memory"
          >
            <ChevronRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
