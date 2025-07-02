import React, { useEffect, useRef, useState } from 'react';
import fallingImage from './assets/falling-image.png';
import FallingObject from './FallingObject';

const App: React.FC = () => {
  const [backgroundVideo, setBackgroundVideo] = useState({ webm: '', mp4: '' });

  useEffect(() => {
    document.title = "OZ3D";

    const webmVideos = import.meta.glob('./assets/videos/*.webm') as Record<string, () => Promise<{ default: string }>>;
    const mp4Videos = import.meta.glob('./assets/videos/*.mp4') as Record<string, () => Promise<{ default: string }>>;

    const webmPaths = Object.keys(webmVideos);
    const randomWebmPath = webmPaths[Math.floor(Math.random() * webmPaths.length)];
    const correspondingMp4Path = randomWebmPath.replace('.webm', '.mp4');

    webmVideos[randomWebmPath]().then(mod => {
      setBackgroundVideo(prev => ({ ...prev, webm: mod.default }));
    });

    if (mp4Videos[correspondingMp4Path]) {
      mp4Videos[correspondingMp4Path]().then(mod => {
        setBackgroundVideo(prev => ({ ...prev, mp4: mod.default }));
      });
    }

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
      >
        <source src={backgroundVideo.webm} type="video/webm" />
        <source src={backgroundVideo.mp4} type="video/mp4" />
      </video>

      <FallingObject src={fallingImage} />

    </div>
  );
};

export default App;
