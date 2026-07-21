import { useEffect } from "react";
import { motion, stagger, useAnimate } from "motion/react";

interface TextGenerateEffectProps {
  words: string;
  className?: string;
  duration?: number;
  delay?: number;
}

export default function TextGenerateEffect({
  words,
  className = "",
  duration = 0.5,
  delay = 0.15,
}: TextGenerateEffectProps) {
  const [scope, animate] = useAnimate();
  const wordsArray = words.split(" ");

  useEffect(() => {
    if (!scope.current) return;

    animate(
      "span",
      {
        opacity: 1,
        filter: "blur(0px)",
      },
      {
        duration: duration,
        delay: stagger(delay),
      }
    );
  }, [scope.current, words, duration, delay]);

  return (
    <div className={`leading-relaxed ${className}`}>
      <motion.div ref={scope} className="inline">
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + "-" + idx}
              className="inline-block opacity-0 text-gray-100 mr-[0.25em]"
              style={{
                filter: "blur(8px)",
                willChange: "opacity, filter",
              }}
            >
              {word}
            </motion.span>
          );
        })}
      </motion.div>
    </div>
  );
}
