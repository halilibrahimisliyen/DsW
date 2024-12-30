import React, { useEffect, useRef, useState } from "react";

interface EdgeAnimationProps {
  isTyping?: boolean;
  intensity?: number;
  color?: string;
}

const EdgeAnimation = ({
  isTyping = false,
  intensity = 0.5,
  color = "rgb(99, 102, 241)",
}: EdgeAnimationProps) => {
  const [particles, setParticles] = useState<Array<{ id: number; y: number }>>(
    [],
  );
  const animationRef = useRef<number>();

  useEffect(() => {
    if (isTyping) {
      // Create new particles when typing
      const createParticle = () => {
        const newParticle = {
          id: Math.random(),
          y: Math.random() * 858, // Full height of component
        };
        setParticles((prev) => [...prev, newParticle]);

        // Remove particle after animation
        setTimeout(() => {
          setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
        }, 2000);
      };

      animationRef.current = window.setInterval(
        createParticle,
        100 / intensity,
      );
    }

    return () => {
      if (animationRef.current) {
        window.clearInterval(animationRef.current);
      }
    };
  }, [isTyping, intensity]);

  return (
    <div className="fixed right-0 top-0 w-[120px] h-[858px] bg-background/50 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute right-0 h-[2px] w-[40px] animate-fade-out"
          style={{
            top: particle.y,
            background: `linear-gradient(to right, transparent, ${color})`,
          }}
        />
      ))}
    </div>
  );
};

export default EdgeAnimation;
