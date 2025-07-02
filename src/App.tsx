import React, { useEffect, useRef, useState } from 'react';
import fallingImage from './assets/falling-image.png';
import FallingObject from './FallingObject';

const App: React.FC = () => {
  const [backgroundVideo, setBackgroundVideo] = useState({ webm: '', mp4: '' });
  const videoRef = useRef<HTMLVideoElement>(null);

  const selectRandomVideo = async () => {
    console.log('Selecting random video...');
    const webmVideos = import.meta.glob('./assets/videos/*.webm') as Record<string, () => Promise<{ default: string }>>;
    const mp4Videos = import.meta.glob('./assets/videos/*.mp4') as Record<string, () => Promise<{ default: string }>>;

    const webmPaths = Object.keys(webmVideos);
    console.log('Available webm videos:', webmPaths);
    if (webmPaths.length === 0) {
      console.log('No webm videos found.');
      return;
    }

    const randomWebmPath = webmPaths[Math.floor(Math.random() * webmPaths.length)];
    const correspondingMp4Path = randomWebmPath.replace('.webm', '.mp4');
    console.log('Selected webm video:', randomWebmPath);
    console.log('Corresponding mp4 video:', correspondingMp4Path);

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
    console.log('Background video state updated:', backgroundVideo);
    if (videoRef.current && backgroundVideo.webm) {
      console.log('Loading and playing video...');
      videoRef.current.load();
      videoRef.current.play().catch(error => {
        console.log("Autoplay prevented: ", error);
      });
    }
  }, [backgroundVideo]);

  const [muted, setMuted] = useState(true);

  const handleAnyUserInteraction = () => {
    if (muted) {
      console.log('User interaction detected, unmuting video.');
      setMuted(false);
    }
  };

  const handleVideoEnd = () => {
    console.log('Video ended, selecting new video.');
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
          width: '100vw',
          height: '100vh',
          objectFit: 'fill',
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
