"use client"
import kaboom from "kaboom";
import * as React from "react";

const Game: React.FC = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const k = kaboom({
      global: true,
      canvas: canvasRef.current as any,
      background: [0, 0, 20],
      width: 800,
      height: 600,
      scale: 1,
      debug: true,
    });

    // Load the sprites
    k.loadSprite("spaceship", "sprites/starship.png");
    k.loadSprite("alien", "sprites/alien.png"); // Assuming this is already available in your sprites folder
    k.loadSprite("bullet", "sprites/laserBullet.png");

    // Define the player
    const player = k.add([
      k.sprite("spaceship"),
      k.pos(350, 500),
      k.scale(0.5),
      k.area(),
      k.body(),
    ]);

    const moveScale = 100;
    const bulletSpeed = 400;

    // Player controls
    k.onKeyDown("left", () => {
      player.move(k.vec2(-1, 0).scale(moveScale));
    });
    k.onKeyDown("right", () => {
      player.move(k.vec2(1, 0).scale(moveScale));
    });
    k.onKeyDown("up", () => {
      player.move(k.vec2(0, -1).scale(moveScale));
    });
    k.onKeyDown("down", () => {
      player.move(k.vec2(0, 1).scale(moveScale));
    });

    // Function to spawn bullets
    function shoot() {
      k.add([
        k.sprite("bullet"),
        k.pos(player.pos.add(26, -10)),
        k.area(),
        k.scale(0.1),
        k.move(k.UP, bulletSpeed),
        "bullet",
      ]);
    }

    // Shooting with spacebar
    k.onKeyPress("space", () => {
      shoot();
    });

    // Define enemy behavior
    function spawnEnemy() {
      k.add([
        k.sprite("alien"),
        k.scale(0.3),
        k.pos(k.rand(0, k.width()), -30),
        k.area(),
        k.body(),
        k.move(k.DOWN, 120),
        "enemy",
      ]);
    }

    // Check collision of bullet with enemy
    k.onCollide("bullet", "enemy", (bullet: any, enemy: any) => {
      k.destroy(bullet);
      k.destroy(enemy);
    });

    // Spawn an enemy every 2 seconds
    k.loop(2, () => {
      spawnEnemy();
    });

    // Define an action for all bullets to check for out of bounds
    k.onCollide("bullet", "enemy", (bullet: any) => {
      if (bullet.pos.y < 0) {
        k.destroy(bullet);
      }
    });

    // Check for collisions between the player and enemies
    k.onCollide("enemy", "spaceship", (enemy: any) => { 
      // End the game or reduce player's life
      k.destroy(enemy);
      // You can put game over logic or life deduction logic here
    });

    // Remove enemies when they go out of the game bounds
    // k.action("enemy", (enemy: any) => {
    //   if (enemy.pos.y > k.height()) {
    //     k.destroy(enemy);
    //   }
    // });

  }, []);

  return (
    <div className="h-screen flex items-center justify-center p-5">
      <div>
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
};

export default Game;

