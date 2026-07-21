import { motion } from "motion/react";
import { TimelineEvent } from "../data";
import { Calendar, Compass } from "lucide-react";

interface TimelineSectionProps {
  events: TimelineEvent[];
}

export default function TimelineSection({ events }: TimelineSectionProps) {
  if (!events || events.length === 0) return null;

  return (
    <div className="relative py-24 px-4 overflow-hidden">
      {/* Decorative center grid line background */}
      <div className="absolute inset-y-0 left-1/2 w-[1px] bg-gradient-to-b from-transparent via-zinc-800 to-transparent -translate-x-1/2 pointer-events-none" />

      <div className="max-w-4xl mx-auto relative">
        {/* Glowing floating top node for the timeline */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 w-9 h-9 rounded-full bg-black/60 border border-pink-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(244,63,94,0.3)] z-10 backdrop-blur-md">
          <Compass size={14} className="text-pink-400 animate-spin-slow" />
        </div>

        {/* Timeline Events Track */}
        <div className="space-y-16 md:space-y-24 mt-8">
          {events.map((event, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div
                key={index}
                className={`flex flex-col md:flex-row items-center justify-between relative w-full ${
                  isLeft ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Center dot/indicator node */}
                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 border border-black shadow-[0_0_10px_rgba(244,63,94,0.5)] z-10" />

                {/* Event Card Content */}
                <motion.div
                  initial={{ opacity: 0, x: isLeft ? -50 : 50, y: 30 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 20,
                    delay: 0.1,
                  }}
                  className={`w-full md:w-[45%] ${
                    isLeft ? "text-left md:text-right" : "text-left"
                  }`}
                >
                  {/* Glass card envelope */}
                  <div className="p-6 md:p-8 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md hover:border-pink-500/20 hover:bg-black/50 transition-all duration-300 shadow-xl group">
                    {/* Event Date badge */}
                    <div
                      className={`flex items-center gap-2 text-pink-300 font-mono text-xs mb-3 ${
                        isLeft ? "justify-start md:justify-end" : "justify-start"
                      }`}
                    >
                      <Calendar size={12} className="opacity-85" />
                      <span>{event.date}</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-sans text-xl font-bold text-white mb-3 group-hover:text-pink-200 transition-colors">
                      {event.title}
                    </h3>

                    {/* Description Text */}
                    <p className="font-sans text-sm text-zinc-300 leading-relaxed">
                      {event.memory}
                    </p>

                    {/* Aesthetic visual accent */}
                    <div
                      className={`h-[1px] w-12 bg-gradient-to-r from-pink-500 to-transparent mt-4 ${
                        isLeft ? "mr-0 md:ml-auto md:mr-0 md:from-transparent md:to-pink-500" : "mr-auto"
                      }`}
                    />
                  </div>
                </motion.div>

                {/* Empty matching spacer on other side for desktop grid alignment */}
                <div className="hidden md:block w-[45%]" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
