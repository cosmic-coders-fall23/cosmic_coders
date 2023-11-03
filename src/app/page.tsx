//ap/page.tsx
'use client'
import React, { useEffect } from 'react';

const Home: React.FC = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  
  React.useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    // Load and draw the logo image on the canvas
    const logo = new Image();
    logo.src = "/cosmiccoderslogo.png";
    logo.onload = () => {
      if (context && canvas) {
        context.drawImage(logo, (canvas.width - logo.width)/2, (canvas.height - logo.height)/2);
      }
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
      <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight} />
    </div>
  );
}

export default Home;
