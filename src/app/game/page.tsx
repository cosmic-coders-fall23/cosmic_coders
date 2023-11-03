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

    // Initialize score
    let score = 0;

    // You may want to display the score on the screen. For that, you can add a text object:
    const scoreText = k.add([
      k.text(`Score: ${score}`),
      k.pos(10, 10), // You can change the position according to your need
      { value: 'scoreText' }, // An identifier for easy access if needed later
    ]);

    // Function to update the score
    function updateScore(value: any) {
      score += value;
      scoreText.text = `Score: ${score}`;
    }

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

    player.onUpdate(() => {
    // Get game dimensions
    const gameWidth = k.width();
    const gameHeight = k.height();

    // Constrain the ship's position within the game dimensions
    player.pos.x = Math.max(0, Math.min(player.pos.x, gameWidth-(player.width*.5)));
    player.pos.y = Math.max(0, Math.min(player.pos.y, gameHeight-(player.height*.5)));
});

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
    k.onCollide("bullet", "enemy", (bullet, enemy) => {
      k.destroy(bullet);
      k.destroy(enemy);
      updateScore(10); // Add 10 points for each enemy destroyed
    });

    // Spawn an enemy every 2 seconds
    k.loop(2, () => {
      spawnEnemy();
    });

    // When a bullet goes off-screen, destroy it
    k.onUpdate("bullet", (bullet) => {
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

    // When an enemy goes off-screen at the bottom, respawn it at the top
    k.onUpdate("enemy", (enemy) => {
      if (enemy.pos.y > k.height()) {
        // Reset the enemy position to the top of the screen
        // You may want to randomize the x position if needed
        enemy.pos.y = -enemy.height;
        enemy.pos.x = k.rand(0, k.width() - enemy.width); // This assumes you want a random x position within the screen width
      }
    });

    // When a bullet goes off-screen, destroy it
    k.onUpdate("bullet", (bullet) => {
      if (bullet.pos.y < 0) {
        k.destroy(bullet);
      }
    });

 


  },
[]);

  return (
    <div className="h-screen flex items-center justify-center p-5">
      <div>
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
};

export default Game;

