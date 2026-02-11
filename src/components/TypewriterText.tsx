import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TypewriterTextProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
}

const TypewriterText = ({
  texts,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000,
  className = "",
}: TypewriterTextProps) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[currentIndex] ?? "";

    const timeoutId = window.setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1));
          return;
        }

        setIsDeleting(true);
        return;
      }

      if (displayText.length > 0) {
        setDisplayText(displayText.slice(0, -1));
        return;
      }

      setIsDeleting(false);
      setCurrentIndex((prev) => (prev + 1) % texts.length);
    }, (() => {
      if (!isDeleting && displayText.length === currentText.length) return pauseDuration;
      if (isDeleting && displayText.length === 0) return 150;
      return isDeleting ? deletingSpeed : typingSpeed;
    })());

    return () => window.clearTimeout(timeoutId);
  }, [displayText, currentIndex, isDeleting, texts, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span className={className}>
      {displayText}
      <motion.span
        className="inline-block w-0.5 h-[1em] bg-primary ml-1 align-middle"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
      />
    </span>
  );
};

export default TypewriterText;
