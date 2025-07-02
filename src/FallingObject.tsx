import React, { useEffect, useRef, useState } from 'react';

interface FallingObjectProps {
  src: string;
}

const FallingObject: React.FC<FallingObjectProps> = ({ src }) => {
  const [position, setPosition] = useState({ left: 0, top: -10 });
  const objectRef = useRef<HTMLImageElement>(null);

  const moveSpeed = 0.2; // percentage per frame; tweak for slow falling

  const resetPosition = () => {
    if (objectRef.current) {
      const screenWidth = window.innerWidth;
      const objectWidth = objectRef.current.offsetWidth;
      const maxLeft = screenWidth - objectWidth;
      const randomLeft = Math.random() * maxLeft;
      setPosition({ left: randomLeft, top: -10 });
    }
  };

  useEffect(() => {
    resetPosition(); // Initial position

    const handleResize = () => {
      resetPosition(); // Adjust on resize
    };

    window.addEventListener('resize', handleResize);

    const animationFrame = requestAnimationFrame(function move() {
      setPosition(prev => {
        const newTop = prev.top + moveSpeed;
        if (newTop > 110) {
          resetPosition();
          return { ...prev, top: -10 }; // Start from top again
        }
        return { ...prev, top: newTop };
      });
      requestAnimationFrame(move);
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <img
      ref={objectRef}
      src={src}
      style={{
        position: 'absolute',
        left: `${position.left}px`,
        top: `${position.top}%`,
        width: '500px', // adjust size as needed
        opacity: 0.8,
        pointerEvents: 'none',
      }}
      alt="Falling object"
      onLoad={resetPosition} // Ensure position is set after image loads
    />
  );
};

export default FallingObject;
