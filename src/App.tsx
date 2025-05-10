import React, { useRef, useEffect } from 'react';
import backgroundVideo from './assets/background-video.mp4';
import fallingImage from './assets/falling-image.png';
import FallingObject from './FallingObject';

const App: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Programmatically start playback
    if (videoRef.current) {
      videoRef.current.play().catch((e) => {
        console.log('Play was prevented:', e);
      });
    }
  }, []);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>

      {/* Video with ref and attributes */}
      <video
        ref={videoRef}
        src={backgroundVideo}
        autoPlay
        loop
        playsInline
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
