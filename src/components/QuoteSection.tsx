import { motion } from "motion/react";
import { Quote } from "lucide-react";

interface QuoteSectionProps {
  quote: string;
  author?: string;
}

export default function QuoteSection({ quote, author }: QuoteSectionProps) {
  return (
    <div className="relative py-24 px-4 overflow-hidden">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative p-10 md:p-14 rounded-3xl bg-black/20 backdrop-blur-xl border border-white/5 shadow-2xl flex flex-col items-center justify-center text-center"
        >
          {/* Aesthetic background soft glow orb */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Quotation icon */}
          <div className="mb-6 text-pink-300/40">
            <Quote size={40} className="stroke-[1.5]" />
          </div>

          {/* Quote quotation text */}
          <blockquote className="font-sans text-xl md:text-2xl font-light text-zinc-100 leading-relaxed tracking-wide mb-6 italic select-text">
            "{quote}"
          </blockquote>

          {/* Small decorative accent line */}
          <div className="h-[2px] w-16 bg-gradient-to-r from-transparent via-pink-400 to-transparent mb-4" />

          {/* Author */}
          {author && (
            <cite className="font-sans text-xs uppercase tracking-widest text-zinc-400 not-italic">
              — {author}
            </cite>
          )}

          {/* Aesthetic corner marks */}
          <div className="absolute top-6 left-6 w-3 h-3 border-t border-l border-white/10 rounded-tl-md" />
          <div className="absolute bottom-6 right-6 w-3 h-3 border-b border-r border-white/10 rounded-br-md" />
        </motion.div>
      </div>
    </div>
  );
}
