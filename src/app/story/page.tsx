"use client"
import React, { useState, useEffect } from "react";
import { Card } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

function StoryPage() {
  const backgroundImageUrl =
    "https://preview.redd.it/lqw1dpdwv7hb1.jpg?width=640&crop=smart&auto=webp&s=7c386c659f48ead0ed7ddd6d7f6e4f192bc0d728";
  
    const backgroundAudio = "/sprites/space-120280.mp3";
  
    const [currentLevel, setCurrentLevel] = useState(1);
  const storyLines = [
    "Level 1: Initiation - In the year 2345, Earth faces a sudden extraterrestrial threat. Mysterious alien ships, known as the Xelarians, have appeared on the horizon, launching a surprise attack on the planet. As a skilled pilot, you are recruited to join Earth's Galactic Guardian squad. In Level 1, your mission is to defend the Earth's major cities, learning to control your advanced starfighter and engage in fierce battles against the initial waves of Xelarian invaders. Your goal is to protect the planet and discover the origins of this hostile invasion.",
    "Level 2: Xelarian Arsenal - As you delve deeper into the Xelarian threat, you uncover that they are harvesting Earth's resources to power their advanced technology. In Level 2, you must infiltrate one of their resource mining facilities on the moon, battling through heavily fortified defenses to sabotage their operation. Along the way, you gain access to a new arsenal of weapons and equipment to enhance your starfighter's capabilities.",
    "Level 3: With your enhanced weaponry, you track the Xelarians to a mysterious nebula where they have set up a formidable base of operations. Level 3 presents you with a challenging dogfight through the colorful but treacherous nebula, requiring precision flying and cunning tactics. Infiltrate their base and uncover a piece of the Xelarian's ultimate plan, hinting at a larger, more sinister scheme.",
    "Level 4: In a desperate race against time, you discover that the Xelarians have been secretly constructing a doomsday device capable of destroying Earth. Level 4 sees you navigating a labyrinthine fortress, disabling security systems, and confronting increasingly powerful Xelarian bosses. The clock is ticking as you approach the doomsday device's control center",
    "Level 5: The Battle for Earth - In the climactic Level 5, you engage in a decisive space battle above Earth. The Xelarian mothership, the source of their power, emerges from a hidden location. As the last line of defense, you must lead an epic assault against the mothership, battling waves of enemies and overcoming formidable challenges. Your mission: destroy the mothership and save Earth from annihilation, all while uncovering the truth behind the Xelarians' motives.The fate of Earth and humanity rests in your hands as you progress through these levels, gradually unveiling the mystery behind the Xelarian invasion and ultimately striving to secure the survival of the planet."
  ];

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
            <p style={storyLineStyle}>{storyLines[currentLevel - 1]}</p>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default StoryPage;

