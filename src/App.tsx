import React, { useEffect, useRef, useState } from 'react';
import fallingImage from './assets/falling-image.png';
import FallingObject from './FallingObject';

const App: React.FC = () => {
  const [backgroundVideo, setBackgroundVideo] = useState({ webm: '', mp4: '' });
  const videoRef = useRef<HTMLVideoElement>(null);

  const selectRandomVideo = async () => {
    const webmVideos = import.meta.glob('./assets/videos/*.webm') as Record<string, () => Promise<{ default: string }>>;
    const mp4Videos = import.meta.glob('./assets/videos/*.mp4') as Record<string, () => Promise<{ default: string }>>;

    const webmPaths = Object.keys(webmVideos);
    if (webmPaths.length === 0) return;

    const randomWebmPath = webmPaths[Math.floor(Math.random() * webmPaths.length)];
    const correspondingMp4Path = randomWebmPath.replace('.webm', '.mp4');

    const webmModule = await webmVideos[randomWebmPath]();
    let mp4Module = null;
    if (mp4Videos[correspondingMp4Path]) {
      mp4Module = await mp4Videos[correspondingMp4Path]();
    }

    setBackgroundVideo({
      webm: webmModule.default,
      mp4: mp4Module ? mp4Module.default : '',
    });
  };

  useEffect(() => {
    document.title = "OZ3D";
    selectRandomVideo();
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(error => {
        // Autoplay was prevented.
        console.log("Autoplay prevented: ", error);
      });
    }
  }, [backgroundVideo]);

  const [muted, setMuted] = useState(true);

  const handleAnyUserInteraction = () => {
    if (muted) {
      setMuted(false);
    }
  };

  const handleVideoEnd = () => {
    selectRandomVideo();
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', cursor: 'pointer' }}
      onClick={handleAnyUserInteraction}
      onTouchStart={handleAnyUserInteraction}>

      {/* Video with ref and attributes */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted={muted}
        onEnded={handleVideoEnd}
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
