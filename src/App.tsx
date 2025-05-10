import React from 'react';
import FallingObject from './FallingObject';

const App: React.FC = () => {
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      {/* Background Video */}
      <video
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
        src="/src/assets/background-video.mp4"
      />

      {/* Falling Image */}
      <FallingObject />
    </div>
  );
};

export default App;
