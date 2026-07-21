import { motion } from "motion/react";
import TextGenerateEffect from "./TextGenerateEffect";
import { Heart } from "lucide-react";

interface LetterSectionProps {
  recipientName: string;
  senderName: string;
  letterText: string;
}

export default function LetterSection({ recipientName, senderName, letterText }: LetterSectionProps) {
  return (
    <div className="relative py-20 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Soft floating paper sheet card container */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative rounded-3xl p-8 md:p-12 border bg-gradient-to-br from-orange-50/10 to-orange-100/5 border-orange-200/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-xl overflow-hidden"
        >
          {/* Subtle paper lines background accent */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
            backgroundImage: "linear-gradient(#fff 1px, transparent 1px)",
            backgroundSize: "100% 28px",
            lineHeight: "28px"
          }} />

          {/* Letter Header */}
          <div className="mb-6">
            <h4 className="font-sans font-medium text-pink-300 text-sm tracking-widest uppercase mb-1.5">
              Personal Note
            </h4>
            <div className="h-[1px] w-12 bg-gradient-to-r from-pink-400 to-transparent" />
          </div>

          {/* Letter Body using TextGenerateEffect */}
          <div className="prose prose-invert max-w-none">
            <div className="font-sans text-base md:text-lg text-orange-50/90 leading-loose space-y-6 text-left whitespace-pre-line">
              <TextGenerateEffect words={letterText} duration={0.4} delay={0.12} />
            </div>
          </div>

          {/* Signature segment */}
          <div className="mt-12 flex flex-col items-end text-right border-t border-orange-200/5 pt-8">
            <p className="font-sans text-xs uppercase tracking-widest text-zinc-400 mb-2">
              With all my affection,
            </p>
            {/* Elegant cursive hand-drawn style name signature */}
            <motion.p
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              whileInView={{ opacity: 1, scale: 1, rotate: -2 }}
              viewport={{ once: true }}
              transition={{ delay: 1.5, duration: 0.6 }}
              className="font-handwriting text-3xl md:text-4xl text-pink-300 tracking-wide mt-1 h-12"
            >
              {senderName}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 2.0, type: "spring", stiffness: 200 }}
              className="mt-2 text-pink-400"
            >
              <Heart size={16} fill="currentColor" className="animate-pulse" />
            </motion.div>
          </div>

          {/* Decorative watermark */}
          <div className="absolute bottom-6 left-8 text-[9px] font-mono tracking-widest text-white/10 uppercase pointer-events-none select-none">
            Secure Digital Envelope
          </div>
        </motion.div>
      </div>
    </div>
  );
}
