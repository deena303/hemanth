import { useRef } from "react";
import { motion } from "motion/react";
import { Heart, ChevronDown, Sparkles } from "lucide-react";
import { giftConfig } from "./data";

// Component imports
import PrismaticBurst from "./components/PrismaticBurst";
import TextGenerateEffect from "./components/TextGenerateEffect";
import DiagonalCarousel from "./components/DiagonalCarousel";
import QuoteSection from "./components/QuoteSection";
import LetterSection from "./components/LetterSection";
import TimelineSection from "./components/TimelineSection";
import MessageSection from "./components/MessageSection";

export default function App() {
  const nextSectionRef = useRef<HTMLDivElement | null>(null);

  const handleScrollToNext = () => {
    nextSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen bg-[#0c0a0f] text-zinc-100 overflow-hidden font-sans">
      
      {/* 1. Animated PrismaticBurst Background */}
      <PrismaticBurst
        animationType="rotate3d"
        intensity={2}
        speed={0.8}
        distort={1}
        hoverDampness={0.25}
        rayCount={24}
        mixBlendMode="lighten"
      />

      {/* Decorative overall vignette overlay to darken borders and direct eyes inward */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#09070a_95%)] pointer-events-none z-10" />

      {/* Content wrapper */}
      <div className="relative z-20 w-full flex flex-col min-h-screen">
        
        {/* ================= HERO SECTION ================= */}
        <section className="relative min-h-screen w-full flex flex-col justify-center items-center px-4 text-center">
          {/* Subtle floating glow in background */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Sparkles tag */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-pink-300 text-xs tracking-widest uppercase mb-6 backdrop-blur-md"
          >
            <Sparkles size={12} className="animate-pulse" />
            <span>Dedicated to {giftConfig.recipientName}</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-100 to-zinc-400 max-w-4xl mb-6 drop-shadow-sm leading-tight"
          >
            {giftConfig.heroTitle}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
            className="font-sans text-zinc-300 text-sm md:text-lg max-w-xl mx-auto mb-12 leading-relaxed font-light"
          >
            {giftConfig.heroSubtitle}
          </motion.p>

          {/* Premium CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6, type: "spring" }}
          >
            <button
              onClick={handleScrollToNext}
              className="px-8 py-4 rounded-full font-sans font-semibold text-sm tracking-widest uppercase bg-white text-black hover:bg-pink-100 transition-all duration-300 shadow-[0_4px_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(244,63,94,0.3)] hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
              id="hero-scroll-btn"
            >
              <span>Begin Journey</span>
              <Heart size={14} fill="currentColor" className="text-pink-600 animate-pulse" />
            </button>
          </motion.div>

          {/* Scrolling prompt indicator */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
            onClick={handleScrollToNext}
          >
            <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-400">Scroll Down</span>
            <ChevronDown size={14} className="text-pink-300" />
          </motion.div>
        </section>

        {/* ================= PERSONALIZED MESSAGE ================= */}
        <section
          ref={nextSectionRef}
          className="relative py-28 px-4 w-full flex flex-col justify-center items-center text-center"
          id="personalized-msg-section"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl mx-auto space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center gap-1.5"
            >
              <div className="h-[1px] w-8 bg-pink-500/50" />
              <span className="font-serif text-sm tracking-widest text-pink-300 uppercase italic">A message for you</span>
              <div className="h-[1px] w-8 bg-pink-500/50" />
            </motion.div>

            {/* Word by word blur reveal effect message */}
            <div className="font-serif text-xl md:text-2xl text-zinc-200 leading-loose italic max-w-2xl mx-auto select-text pt-4">
              <TextGenerateEffect words={giftConfig.personalizedMessage} duration={0.5} delay={0.14} />
            </div>
          </div>
        </section>

        {/* ================= MEMORY GALLERY (DIAGONAL CAROUSEL) ================= */}
        <section className="relative py-20 w-full" id="gallery-section">
          <div className="max-w-6xl mx-auto text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-white mb-3">
                Our Memory Lane
              </h2>
              <p className="font-sans text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
                A canvas of quiet sunsets, warm laughter, and the simple moments that define our story.
              </p>
            </motion.div>

            {/* Diagonal Carousel with spring animation */}
            <DiagonalCarousel images={giftConfig.galleryImages} />
          </div>
        </section>

        {/* ================= QUOTE SECTION ================= */}
        <section className="relative w-full" id="quote-section">
          <QuoteSection quote={giftConfig.quote} author={giftConfig.quoteAuthor} />
        </section>

        {/* ================= HANDWRITTEN LETTER ================= */}
        <section className="relative w-full" id="letter-section">
          <LetterSection
            recipientName={giftConfig.recipientName}
            senderName={giftConfig.senderName}
            letterText={giftConfig.personalizedLetter}
          />
        </section>

        {/* ================= TIMELINE SECTION ================= */}
        <section className="relative py-20 w-full" id="timeline-section">
          <div className="max-w-6xl mx-auto text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-white mb-3">
                How We Blossomed
              </h2>
              <p className="font-sans text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
                Tracing the stars and milestones that marked our beautiful shared adventure.
              </p>
            </motion.div>

            {/* Beautiful scroll-animated timeline */}
            <TimelineSection events={giftConfig.timeline} />
          </div>
        </section>

        {/* ================= FINAL GIFT SECTION ================= */}
        <section
          className="relative py-28 px-4 w-full flex flex-col justify-center items-center text-center overflow-hidden"
          id="final-gift-section"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-pink-950/10 via-transparent to-transparent pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl mx-auto relative z-10"
          >
            {/* Elegant heart pulse animation */}
            <div className="flex justify-center mb-8">
              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                  rotate: [0, 2, -2, 0],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="text-pink-500 drop-shadow-[0_0_20px_rgba(244,63,94,0.65)] hover:text-pink-400 transition-colors cursor-pointer"
              >
                <Heart size={56} fill="currentColor" className="stroke-[1.5]" />
              </motion.div>
            </div>

            <h2 className="font-serif text-4xl md:text-6xl font-bold text-white tracking-tight mb-6">
              Thank You for Being You
            </h2>

            <p className="font-sans text-zinc-300 text-sm md:text-base max-w-md mx-auto leading-relaxed mb-8 font-light">
              This little corner of the digital universe was built specifically to remind you how much you are cherished. May your day be filled with all the light and joy you deserve.
            </p>

            <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-white/25 to-transparent mx-auto mb-4" />
            <p className="font-serif text-sm tracking-widest text-pink-300 italic">An elegant digital envelope for your soul.</p>
          </motion.div>
        </section>

        {/* ================= MESSAGE SECTION ================= */}
        <section className="relative w-full" id="message-section">
          <MessageSection
            whatsappNumber={giftConfig.whatsappNumber}
            recipientName={giftConfig.recipientName}
          />
        </section>

        {/* ================= FOOTER ================= */}
        <footer className="w-full py-12 px-4 border-t border-white/5 bg-black/40 backdrop-blur-md text-center mt-auto relative z-20">
          <div className="max-w-xl mx-auto flex flex-col items-center gap-3">
            <p className="font-sans text-xs text-zinc-500 tracking-wider">
              Made with ❤️ by {giftConfig.recipientName}
            </p>
            <p className="font-mono text-[9px] text-zinc-600 uppercase tracking-widest">
              Digital Premium Keepsake • 2026
            </p>
          </div>
        </footer>

      </div>
    </div>
  );
}
