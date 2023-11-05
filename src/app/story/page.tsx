"use client"
import React, { useState, useEffect } from "react";
import { Card } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
type StoryLines = {level: number, title: string, body: string}

function StoryPage() {
  const backgroundImageUrl =
    "https://preview.redd.it/lqw1dpdwv7hb1.jpg?width=640&crop=smart&auto=webp&s=7c386c659f48ead0ed7ddd6d7f6e4f192bc0d728";
  
    const backgroundAudio = "/sprites/space-120280.mp3";
  
    const [currentLevel, setCurrentLevel] = useState(1);


  useEffect(() => {
    if (currentLevel <= 5) {
      const audio = document.getElementById(backgroundAudio) as HTMLAudioElement;
      if (audio) {
        audio.play(); // Start playing background music

        setTimeout(() => {
          audio.pause(); // Pause background music
          setCurrentLevel(currentLevel + 1);
        }, 30000); // 30 seconds
      }
    }
  }, [currentLevel]);

  const blackBoxStyle = {
    backgroundColor: "black",
    color: "white",
    padding: "20px",
    borderRadius: "10px",
  };

  const storyLineStyle = {
    fontSize: "18px",
    lineHeight: "1.5",
  };

  return (
    <div>
    <div
        className="h-screen flex items-center justify-center p-5"
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          imageRendering: "pixelated", // Add this line for image rendering
        }}
      >
        <Card>
          <div style={blackBoxStyle}>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default StoryPage;

