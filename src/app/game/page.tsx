"use client"
import kaboom from "kaboom";
import * as React from "react";
import {useState, useEffect, useRef, useContext} from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import {UserContext} from "@/components/usercontext";
import UserService from "@/services/userservice";
import LevelModal from "@/components/levelmodal";


export default function GamePage() {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentLives, setCurrentLives] = useState(3);
  const [currentScore, setCurrentScore] = useState(0);
  const {user, setUser} = useContext(UserContext);
  const [currentHighScore, setCurrentHighScore] = useState(user.score as number);
  const [finalScore, setFinalScore] = useState(0);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isModalVisible, setIsModalVisible] = useState(true);
  const updateHighScore = (scored: number) => {
    UserService.addHighScore(scored).then(response => {
        if (response.status === 200 && response.data.message.includes("Success")) {
          const userData = {
            username: user.username,
            email: user.email,
            score: scored,
          };
          setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData));
          setCurrentHighScore(scored);
        }
    })
  }

  const processScore = (scored: number) => {
    setFinalScore(scored);
    if (scored > currentHighScore && user.username !== "") {
      onOpenChange();
      updateHighScore(scored);
    }
  }

  useEffect(() => {
    const k = kaboom({
      global: true,
      canvas: canvasRef.current as any,
      background: [0, 0, 25],
      width: 800,
      height: 700,
      scale: 1,
      debug: true,
    });

    const moveSpeed = 200;
    const bulletSpeed = 400;
    const GUN_COOLDOWN_TIME = 0.5;
    const baseSpawnTime = 2;

    // Initialize basic game variables
    let lastShootTime = k.time();
    let pause = false;
    let spawnTime = calculateSpawnTime(currentLevel); // Get the initial spawn time
    let specialShootActive = false;
    let specialShootTimeout = 10;
    let MAX_LEVEL = 10;
    let score = currentScore;
    let lives = currentLives;
    let gameActive = false;

    // -----------------------------Environment stuff---------------------------------------
    // load a font from a .ttf file
    k.loadFont("PixelEmulator", "fonts/PixelEmulator.ttf")

    // Display the score on the screen
    const scoreText = k.add([
      k.text(`Score: ${score}`, {font: "PixelEmulator"}),
      k.pos(10, 10), // You can change the position according to your need
      { value: 'scoreText' }, // An identifier for easy access if needed later
    ]);

    // Function to update the score
    function updateScore(value: number) {
      score += value;
      scoreText.text = `Score: ${score}`;
    }

    // Display text on screen
    const livesText = k.add([
      k.text(`Lives: ${lives}`, {font: "PixelEmulator"}),
      k.pos(610, 10), // Position below the score for visibility
    ]);

    const levelText = k.add([
      k.text(`Level: ${currentLevel}`, {font: "PixelEmulator"}),
      k.pos(590, 650), // Position below the score for visibility
          ]);
    // Function to generate stars
    function generateStars(numberOfStars: number) {
      for (let i = 0; i < numberOfStars; i++) {
        const x = Math.random() * k.width();
        const y = Math.random() * k.height();
        k.add([
          k.rect(2, 2), // small rectangle to represent a star; adjust size as needed
          k.pos(x, y),
          k.color(k.rgb(255, 255, 255)), // white color for the star
        ]);
      }
    }

    // Call the function with the desired number of stars
    generateStars(200); // Adjust the number of stars as needed

    // Load the sprites
    k.loadSprite("spaceship", "sprites/starship.png");
    k.loadSprite("alien", "sprites/alien.png"); // Assuming this is already available in your sprites folder
    k.loadSprite("bullet", "sprites/laserBullet.png");
    k.loadSprite("powerUp", "sprites/powerUp.png");

    // ------------------------------------Player stuff------------------------------------------------
    // Define the player
    const player = k.add([
      k.sprite("spaceship"),
      k.pos(350, 600),
      k.scale(0.5),
      k.area(),
      k.body(),
      "spaceship",
    ]);

    // Keep the player within the game boundaries
    player.onUpdate(() => {
      // Get game dimensions
      const gameWidth = k.width();
      const gameHeight = k.height();

      // Constrain the ship's position within the game dimensions
      player.pos.x = Math.max(0, Math.min(player.pos.x, gameWidth-(player.width*.5)));
      player.pos.y = Math.max(0, Math.min(player.pos.y, gameHeight-(player.height*.5)));
    });

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

    // Flicker function to make the player's spaceship blink
    function flicker(player: any) {
      const numFlickers = 10;
      const flickerDuration = 0.1;

      for (let i = 0; i < numFlickers; i++) {
        // Alternate between invisible and visible
        k.wait(i * flickerDuration * 2, () => player.hidden = !player.hidden);
      }
      // Make sure the spaceship is visible after the last flicker
      k.wait(numFlickers * flickerDuration * 2, () => player.hidden = false);
    }

    // ------------------------------------Enemy stuff-------------------------------------------------
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

    // Define a function to calculate spawn time based oncurrentLevel 
    function calculateSpawnTime(currentLevel: number): number {
      // Use a formula that decreases time slowly and approaches a minimum value but never reaches 0
      // This is a logarithmic decrease. Adjust the divisor to control the rate of decrease
      const minSpawnTime = 0.1; // the minimum spawn time you want to approach
      const spawnTimeReduction = (currentLevel + 1) / (10 * currentLevel);
      const newSpawnTime = Math.max(baseSpawnTime - spawnTimeReduction, minSpawnTime);

      return newSpawnTime;
    }

    // Enemy spawn loop
    function startSpawningEnemies() {
      if (gameActive) {
        spawnEnemy();
        // Calculate new spawn time for the current level
        spawnTime;
        // Schedule the next enemy spawn
        k.wait(spawnTime, startSpawningEnemies);
      }
    }

    // When an enemy goes off-screen at the bottom, respawn it at the top
    k.onUpdate("enemy", (enemy) => {
      if (enemy.pos.y > k.height()) {
        // Reset the enemy position to the top of the screen
        // You may want to randomize the x position if needed
        enemy.pos.y = -enemy.height;
        enemy.pos.x = k.rand(0, k.width() - enemy.width); // This assumes you want a random x position within the screen width
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
      const enemies = k.get("enemy");
      if (enemies.length > 0) {
        const shooter = k.choose(enemies);
        if (shooter) {
          spawnAlienBullet(shooter);
        }
      }
    });

    // When an alien bullet goes off-screen, destroy it
    k.onUpdate("alienBullet", (bullet) => {
      if (bullet.pos.y > k.height()) {
        k.destroy(bullet);
      }
    });

    // ------------------------------------Bullet/PowerUp stuff-----------------------------------------------
    // Define player shooting
    k.onKeyPress("space", () => {
      if (pause) return;
      if (!gameActive) return;
      if (k.time() - lastShootTime > GUN_COOLDOWN_TIME) {
        lastShootTime = k.time();
        if (specialShootActive) {
          shootSpecial();
        } else {
          shoot();
        }
      }
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

    // Function to shoot a special bullet
    function shootSpecial() {
      // Center bullet
      k.add([
        k.sprite("bullet"),
        k.pos(player.pos.add(26, -10)),
        k.area(),
        k.scale(0.1),
        k.move(k.UP, bulletSpeed),
        "bullet",
      ]);

      // Left bullet
      k.add([
        k.sprite("bullet"),
        k.pos(player.pos.add(0, 0)),
        k.area(),
        k.scale(0.1),
        k.move(k.vec2(-1, -1).unit(), bulletSpeed), // Move up and to the left
        "bullet",
      ]);

      // Right bullet
      k.add([
        k.sprite("bullet"),
        k.pos(player.pos.add(52, 0)), // Adjust X offset to match spaceship width
        k.area(),
        k.scale(0.1),
        k.move(k.vec2(1, -1).unit(), bulletSpeed), // Move up and to the right
        "bullet",
      ]);
    }

    // Function to create power-ups
    function createPowerUp() {
      const x = k.rand(0, k.width());
      const y = -30; // Start above the screen
      k.add([
        k.sprite("powerUp"), // Assuming you have a sprite for the power-up
        k.pos(x, y),
        k.area(),
        k.move(k.DOWN, 100), // Move downwards
        k.scale(0.1),
        "powerUp", // This tag is used for collision detection
      ]);
    }

    // When a bullet goes off-screen, destroy it
    k.onUpdate("bullet", (bullet) => {
      if (bullet.pos.y < 0) {
        k.destroy(bullet);
      }
    });

    // Function to give the player a special shoot
    function giveSpecialShoot(player: any) {
        if (specialShootActive) {
        clearTimeout(specialShootTimeout); // Reset the timer if power-up is picked up again
        } else {
        specialShootActive = true;
        // Modify the player's shoot function or behavior
        player.shoot = shootSpecial;
        }

        // Set a timeout for the special shoot duration, say 10 seconds
        specialShootTimeout = setTimeout(() => {
        specialShootActive = false;
        player.shoot = shoot; // Revert back to the normal shoot function
        }, 10000) as unknown as number;
    }

    // ------------------------------------Collision stuff----------------------------------------------
    // Collision between spaceship and power-up
    k.onCollide("spaceship", "powerUp", (player, power) => {
      k.destroy(power); // This destroys the power-up
      giveSpecialShoot(player); // This grants the special shooting ability to the player
    });

    // Check collision of bullet with enemy
    k.onCollide("bullet", "enemy", (bullet, enemy) => {
      k.destroy(bullet);
      k.destroy(enemy);
      updateScore(100); // Add 10 points for each enemy destroyed
    });

    // Collision detection for alien bullets and the player's spaceship
    k.onCollide("spaceship", "alienBullet", (player, bullet) => {
      k.destroy(bullet);
      lives -= 1;
      livesText.text = `Lives: ${lives}`;

      if (lives <= 0) {
        k.destroy(player);
        gameOver(); // Call the game over function
      } else {
        // Implement flicker effect
        flicker(player);
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
      } else {
        // Implement flicker effect
        flicker(player);
      }
    });

    // ------------------------------------Game stuff---------------------------------------------------
    // Start the first level
    startLevel();

    // Function to start a level
    function startLevel() {
      showLevelModal(); // Show level start modal
      levelText.text = `Level: ${currentLevel}`;
      k.wait(20, () => {
        if (currentLevel <= MAX_LEVEL) {
          resetPlayerPosition();
          startLevelChallenges(); // Setup level-specific elements
        } else {
          gameComplete(); // Player has completed all levels
        }
      k.wait(30, () => endLevel());
      });
    }

    // Function to start level-specific challenges
    function startLevelChallenges() {
      gameActive = true;
      startSpawningEnemies();
      k.wait(5, () => createPowerUp());
    }

    // Function to end a level
    function endLevel() {
      if (lives > 0) {
        displayLevelCompleteText();
        setCurrentLives(lives);
        setCurrentScore(score);
        gameActive = false;
        clearGameObjects();
        k.wait(5, () => {
          setCurrentLevel(currentLevel => currentLevel + 1);
          startLevel(); // Start next level
        });
      } else {
        gameOver();
      }
    }

    // Function to display level complete text
    function displayLevelCompleteText() {
      const levelCompleteText = createText(`Level ${currentLevel} Complete!`, 24, 235, 300);
      k.wait(5, () => k.destroy(levelCompleteText));
    }

    // Player mechanics
    function resetPlayerPosition() {
      player.pos.x = 350;
      player.pos.y = 600;
    }

    // Function to display game over text
    function gameOver() {
      gameActive = false;
      clearGameObjects();
      displayGameOverText();
      processScore(score);
      k.onKeyPress("enter", restartGame);
    }

    function restartGame() {
      resetGameState();
      startLevel();
    }

    function resetGameState() {
      setCurrentLevel(1);
      score = 0;
      lives = 3;
    }

    // Helper Functions
    function showLevelModal() {
      setIsModalVisible(true);
      k.wait(10, () => setIsModalVisible(false));
    }

    function clearGameObjects() {
      k.destroyAll("bullet");
      k.destroyAll("enemy");
      k.destroyAll("alienBullet");
      k.destroyAll("powerUp");
    }

    function displayGameOverText() {
      k.add([
        k.text("GAME OVER", { size: 55, font: "PixelEmulator" }),
        k.pos(235, 300)
      ]);
      k.add([
        k.text("Press Enter to Restart", { size: 20, font: "PixelEmulator" }),
        k.pos(260, 355)
      ]);
    }

    function createText(text: string, size: number, posX: number, posY: number) {
      return k.add([
        k.text(text, { size: size, font: "PixelEmulator" }),
        k.pos(posX, posY)
      ]);
    }

    // Function to handle game completion
    function gameComplete() {
      displayGameCompleteText();
      offerRestartOrMenuOptions();
    }

    // Function to display game completion text
    function displayGameCompleteText() {
      k.add([
        k.text("CONGRATULATIONS!", { size: 55, font: "PixelEmulator" }),
        k.pos(80, 200)
      ]);
      k.add([
        k.text("You've completed all levels!", { size: 30, font: "PixelEmulator" }),
        k.pos(120, 250)
      ]);
      k.add([
        k.text("Press Enter to Restart", { size: 20, font: "PixelEmulator" }),
        k.pos(235, 300)
      ]);
      k.add([
        k.text("Press Esc to Main Menu", { size: 20, font: "PixelEmulator" }),
        k.pos(235, 350)
      ]);
    }

    // Function to offer restart or return to main menu options
    function offerRestartOrMenuOptions() {
      k.onKeyPress("enter", restartGame);
      // Assuming there's a function to go back to the main menu
      k.onKeyPress("escape", goToMainMenu);
    }

    // Assume there's a function to handle going back to the main menu
    function goToMainMenu() {
      // Implement logic to go to the main menu
    }
  }, [currentLevel]);

  return (
        <div className="h-auto flex items-center justify-center p-5">
          <LevelModal  isModalVisible={isModalVisible} level={currentLevel} setModalVisible={setIsModalVisible} />
          <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">New high score!</ModalHeader>
                  <ModalBody>
                    <p>
                      Congratulations! You just got a new high score:
                    </p>
                    <p className="text-center font-bold text-5xl">
                      {finalScore}
                    </p>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
          <div>
            <canvas ref={canvasRef}></canvas>
          </div>
        </div>
  );
};


