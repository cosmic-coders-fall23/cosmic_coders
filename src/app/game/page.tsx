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
      height: 700,
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
      k.pos(350, 600),
      k.scale(0.5),
      k.area(),
      k.body(),
    ]);

    const moveSpeed = 200;
    const bulletSpeed = 400;

    // Player controls
    k.onKeyDown("left", () => {
      player.move(-moveSpeed, 0);
    });
    k.onKeyDown("right", () => {
      player.move(moveSpeed, 0);
    });
    k.onKeyDown("up", () => {
      player.move(0, -moveSpeed);
    });
    k.onKeyDown("down", () => {
      player.move(0, moveSpeed);
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
    k.onCollide("spaceship", "enemy", (enemy) => {
      // End the game or reduce player's life
      k.destroy(enemy);
      // Game over logic here
    });

    // // When an enemy goes off-screen, destroy it
    // k.on("update", "enemy", (enemy) => {
    //   if (enemy.pos.y > k.height()) {
    //     k.destroy(enemy);
    //   }
    // });
    //
    // // When a bullet goes off-screen, destroy it
    // k.on("update", "bullet", (bullet) => {
    //   if (bullet.pos.y < 0) {
    //     k.destroy(bullet);
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

