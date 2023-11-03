"use client"
import kaboom from "kaboom";
import * as React from "react";

const Game: React.FC = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const k = kaboom({
      global: true,
      canvas: canvasRef.current as any,
      background: [0, 0, 25],
      width: 800,
      height: 700,
      scale: 1,
      debug: true,
    });

    // Initialize score
    let score = 0;

    // Initialize lives
    let lives = 3;

    let lastShootTime = k.time();
    let pause = false;

    // You may want to display the score on the screen. For that, you can add a text object:
    const scoreText = k.add([
      k.text(`Score: ${score}`),
      k.pos(10, 10), // You can change the position according to your need
      { value: 'scoreText' }, // An identifier for easy access if needed later
    ]);

    // Display lives on screen
    const livesText = k.add([
      k.text(`Lives: ${lives}`),
      k.pos(600, 10), // Position below the score for visibility
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
      "spaceship",
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
    const GUN_COOLDOWN_TIME = 0.5;

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

    function gameOver() {
        k.destroyAll("bullet")
        k.destroyAll("enemy")
        k.destroyAll("spaceship")
        // Display game over text
        k.add([
          k.text("GAME OVER", { size: 40, font: "sink" }),
          k.pos(250, 300)
        ]);
        k.add([
          k.text("press enter to restart", { size: 20, font: "sink" }),
          k.pos(295, 350)
        ]);
        // Optionally, after a delay, offer to restart the game or go back to a main menu
        k.onKeyPress("enter", () => {                
            window.location.reload();
        });
    }

    k.onKeyPress("space", () => {
      if (pause) return;
      if (k.time() - lastShootTime > GUN_COOLDOWN_TIME) {
        lastShootTime = k.time();
         shoot();
      }
    });

    // Define enemy behavior
    function spawnEnemy() {
    // Assuming alien width is about 1/10th of the screen width, adjust as necessary
    const alienWidth = k.width() * 0.1;
    const minX = alienWidth / 2; // Minimum x-position
    const maxX = k.width() - alienWidth / 2; // Maximum x-position

    k.add([
        k.sprite("alien"),
        k.scale(0.3),
        k.pos(k.rand(minX, maxX), -30),
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
      updateScore(100); // Add 10 points for each enemy destroyed
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

    // Function to spawn alien bullets as small red circles
    function spawnAlienBullet(alien: any) {
    const bulletStartPos = alien.pos.add(alien.width * 0.15, alien.height * 0.3);
      k.add([
        k.circle(4), // small circle with a radius of 4
        k.color(255, 0, 0), // red color
        k.pos(bulletStartPos), // start from the middle-bottom of the alien
        k.area(),
        k.move(k.DOWN, 200), // adjust the speed as needed
        "alienBullet",
    ]);
    }

    // Logic to make a random alien shoot
    k.loop(1, () => {
      // Find all enemies currently on screen
      const enemies = k.get("enemy");

      // If there are any enemies, choose a random one to shoot
      if (enemies.length > 0) {
        const shooter = k.choose(enemies);
        if (shooter) {
        spawnAlienBullet(shooter);
        }
    }
    });

    // Collision detection for alien bullets and the player's spaceship
    k.onCollide("spaceship", "alienBullet", (player, bullet) => {
    k.destroy(bullet);
    lives -= 1;
    livesText.text = `Lives: ${lives}`;

    if (lives <= 0) {
        k.destroy(player);
        gameOver(); // Call the game over function
    }
    });

    // When an alien bullet goes off-screen, destroy it
    k.onUpdate("alienBullet", (bullet) => {
            if (bullet.pos.y > k.height()) {
            k.destroy(bullet);
            }
            });

    // Collision logic with enemy ships
    k.onCollide("spaceship", "enemy", (player, enemy) => {
    k.destroy(enemy);
    lives -= 1;
    livesText.text = `Lives: ${lives}`;

    if (lives <= 0) {
        k.destroy(player);
        gameOver(); // Call the game over function
    }
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
    <div className="h-auto flex items-center justify-center p-5">
      <div>
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
};

export default Game;

