import { useState } from "react";
import { motion } from "motion/react";
import { Send, MessageCircle } from "lucide-react";

interface MessageSectionProps {
  whatsappNumber: string;
  recipientName: string;
}

export default function MessageSection({ whatsappNumber, recipientName }: MessageSectionProps) {
  const [message, setMessage] = useState("");
  const maxLength = 1000;

  // Clean the phone number (remove any non-numeric characters except + if present)
  const cleanNumber = whatsappNumber.replace(/[^\d+]/g, "");

  // Pre-generate the URL so we can use a safe HTML link click, bypassing potential popup blocker controls
  const encodedText = encodeURIComponent(
    `Hello ${recipientName},\n\n${message}\n\nSent from your gift website ❤️`
  );
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedText}`;

  return (
    <div className="relative py-20 px-4">
      <div className="max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl p-8 md:p-10 border border-white/10 bg-black/40 backdrop-blur-md shadow-2xl relative overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-2xl bg-pink-500/10 border border-pink-500/20 text-pink-300">
              <MessageCircle size={20} />
            </div>
            <div className="text-left">
              <h3 className="font-sans font-bold text-xl text-white">Leave a Note</h3>
              <p className="font-sans text-xs text-zinc-400">Your message will go directly to {recipientName}'s WhatsApp</p>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-6">
            <div className="relative text-left">
              <label htmlFor="user-message" className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2.5">
                Your Message
              </label>
              <textarea
                id="user-message"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value.slice(0, maxLength))}
                placeholder={`Type your message to ${recipientName} here...`}
                className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-pink-500/40 focus:ring-1 focus:ring-pink-500/40 transition-all duration-300 resize-none font-sans text-sm leading-relaxed"
              />
              {/* Character counter */}
              <div className="flex justify-end text-xs text-zinc-500 mt-2 font-mono">
                {message.length} / {maxLength}
              </div>
            </div>

            {/* iframe-safe link styled as a gorgeous button */}
            <a
              href={message.trim() ? whatsappUrl : "#"}
              target={message.trim() ? "_blank" : undefined}
              rel="noopener noreferrer"
              className={`w-full py-4 px-6 rounded-2xl flex items-center justify-center gap-2 font-sans font-bold text-sm tracking-wide transition-all duration-300 select-none shadow-lg ${
                message.trim()
                  ? "bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white cursor-pointer active:scale-98 shadow-[0_0_20px_rgba(244,63,94,0.3)] hover:shadow-[0_0_30px_rgba(244,63,94,0.45)]"
                  : "bg-white/5 border border-white/5 text-zinc-500 cursor-not-allowed"
              }`}
              style={{
                pointerEvents: message.trim() ? "auto" : "none",
              }}
              id="whatsapp-send-link"
            >
              <Send size={15} />
              <span>Send</span>
            </a>
          </div>

          {/* Abstract visual art lines */}
          <div className="absolute -left-16 -bottom-16 w-32 h-32 bg-gradient-to-tr from-pink-500/10 to-transparent rounded-full blur-2xl pointer-events-none" />
        </motion.div>
      </div>
    </div>
  );
}
