import { useState, useEffect } from 'react';

interface TypewriterEffectProps {
  texts: string[];
  speed?: number;
  delay?: number;
  className?: string;
}

const TypewriterEffect = ({ texts, speed = 150, delay = 2000, className = "" }: TypewriterEffectProps) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentText = texts[currentTextIndex];
    
    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < currentText.length) {
          setDisplayText(currentText.slice(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          setTimeout(() => setIsDeleting(true), delay);
        }
      } else {
        if (charIndex > 0) {
          setDisplayText(currentText.slice(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          setIsDeleting(false);
          setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }
      }
    }, isDeleting ? speed / 2 : speed);

    return () => clearTimeout(timer);
  }, [charIndex, currentTextIndex, isDeleting, texts, speed, delay]);

  return (
    <span className={`inline-block min-w-[120px] ${className}`}>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

export default TypewriterEffect;