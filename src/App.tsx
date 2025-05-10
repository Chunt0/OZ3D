import React, { useEffect, useRef, useState } from 'react';
import backgroundVideo from './assets/background-video.mp4';
import fallingImage from './assets/falling-image.png';
import FallingObject from './FallingObject';

const App: React.FC = () => {
  useEffect(() => {
    document.title = "OZ3D";
  }, []);

  const videoRef = useRef<HTMLVideoElement>(null);


  const [muted, setMuted] = useState(true);

  const handleAnyUserInteraction = () => {
    if (muted) {
      setMuted(false);
      if (videoRef.current) {
        videoRef.current.play().catch(() => {

        });
      }
    }
  }

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', cursor: 'pointer' }}
      onClick={handleAnyUserInteraction}
      onTouchStart={handleAnyUserInteraction}>

      {/* Video with ref and attributes */}
      <video
        ref={videoRef}
        src={backgroundVideo}
        autoPlay
        loop
        playsInline
        muted={muted}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1,
        }}
      />

      <FallingObject src={fallingImage} />

    </div>
  );
};

export default App;
