import { Card } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import PropTypes from "prop-types"; // Import PropTypes for prop validation

function StoryPage() {
  const backgroundImageUrl =
    "https://preview.redd.it/lqw1dpdwv7hb1.jpg?width=640&crop=smart&auto=webp&s=7c386c659f48ead0ed7ddd6d7f6e4f192bc0d728";

// probably just use a large if statement or case statement 
// to determine what level the player is on and then render the 
// right story page for that level

  return (
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

    </div>
  );
};

export default StoryPage;


