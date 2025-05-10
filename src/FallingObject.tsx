import React, { useEffect, useRef, useState } from 'react';

interface FallingObjectProps {
  src: string;
}
const FallingObject: React.FC<FallingObjectProps> = ({ src }) => {
  const [position, setPosition] = useState<{ left: number; top: number }>({
    left: Math.random() * 100,
    top: -10,
  });
  const requestRef = useRef<number | null>(null);

  const moveSpeed = 0.2; // percentage per frame; tweak for slow falling

  const updatePosition = () => {
    setPosition(prev => {
      const newTop = prev.top + moveSpeed;
      if (newTop > 110) {
        // Reset to top with new left position
        return {
          left: Math.random() * 60,
          top: -10,
        };
      }
      return { ...prev, top: newTop };
    });
    requestRef.current = requestAnimationFrame(updatePosition);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(updatePosition);
    return () => cancelAnimationFrame(requestRef.current!);
  }, []);

  return (
    <img
      src={src}
      style={{
        position: 'absolute',
        left: `${position.left}%`,
        top: `${position.top}%`,
        width: '500px', // adjust size as needed
        opacity: 0.8,
        pointerEvents: 'none',
      }}
      alt="Falling object"
    />
  );
};

export default FallingObject;
