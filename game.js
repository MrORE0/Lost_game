import { Bullet } from "./bullet.js";
import { Character, makeWorms, Enemy } from "./entity.js";
import { drawBackground, drawEntity } from "./assets.js";
import { objectHitsWall } from "./collisions.js";

// all sounds are from https://mixkit.co/free-sound-effects/game/?page=2
let background_music = document.getElementById("background_music");
let character_gets_hit = document.getElementById("character_gets_hit");
let character_dead = document.getElementById("character_dead");
let creature_dead = document.getElementById("creature_dead");
let won_game = document.getElementById("won_game");

let ctx_hearts; //thats context
let CANVAS_WIDTH_hearts;
let CANVAS_HEIGHT_hearts;
let canvas_hearts;
let hearts = new Image();
hearts.src = "static/hearts.png";
let hearts_width = 130;
let hearts_height = 140;

let coins = new Image();
coins.src = "static/coins.png";
let coin_size = 128;

let gameRunning = false;
let ctx; //thats context
let CANVAS_WIDTH;
let CANVAS_HEIGHT;
let canvas;

let fpsInterval = 1000 / 20; //denominator is fps
let now;
let then = Date.now();

let flashlight;
let character = {
  x: 37,
  y: 725,
  width: 48,
  height: 48,
  frameX: 0,
  frameY: 0,
  speed: 10,
  spritePath: "./static/character.png",
  health: 12,
};
let newCharacter = new Character(character, true, 32);

// defining
let projectiles = [];
let arrowV = new Image();
arrowV.src = "static/arrow_sprite_vertical.png";
let arrowH = new Image();
arrowH.src = "static/arrow_sprite_horizontal.png";
let arrow = {
  x: 0,
  y: 0,
  width: 7,
  height: 16,
  xChange: 0,
  yChange: 0,
  arrayX: 0,
  arrayY: 0,
  speed: 10,
  spriteV: arrowV,
  spriteH: arrowH,
};
let newArrow = new Bullet(arrow, false, 32, newCharacter);

let slimeAttackSprite = new Image();
slimeAttackSprite.src = "./static/slime_attack.png";
let slimeAttack = {
  x: 0,
  y: 0,
  width: 10,
  height: 10,
  xChange: 0,
  yChange: 0,
  arrayX: 0,
  arrayY: 0,
  speed: 10,
  spriteV: slimeAttackSprite,
  spriteH: slimeAttackSprite,
};

// boolean values for keeping track of movement
let moveUp = false;
let moveDown = false;
let moveLeft = false;
let moveRight = false;

// maybe put this in the draw background function
const tileAtlasPath = "static/Dungeon_Tileset_at.png";
let mapArray = [
  [182, 186, 186, 117, 99, 117, 186, 186, 186, 186, 186, 186, 186, 186, 186, 186, 186, 186, 186, 186, 186, 118, 184, 185, 107],
  [198, 153, 153, 153, 153, 143, 105, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 105, 153, 153, 153, 203],
  [198, 153, 104, 104, 103, 104, 104, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 105, 153, 231, 153, 203],
  [198, 153, 105, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 105, 153, 153, 153, 203],
  [198, 153, 105, 153, 105, 104, 104, 104, 104, 104, 104, 153, 153, 153, 153, 153, 153, 153, 153, 153, 105, 153, 153, 153, 203],
  [198, 153, 105, 153, 105, 148, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 104, 104, 104, 104, 105, 104, 104, 153, 203],
  [198, 153, 105, 153, 105, 104, 104, 104, 104, 104, 105, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 105, 153, 203],
  [198, 153, 105, 153, 105, 153, 153, 153, 153, 153, 105, 153, 153, 153, 104, 104, 104, 104, 104, 153, 153, 153, 105, 127, 203],
  [198, 153, 105, 153, 105, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 105, 153, 203],
  [198, 153, 105, 153, 105, 104, 104, 104, 103, 104, 104, 104, 104, 104, 104, 104, 103, 104, 104, 104, 104, 104, 105, 153, 203],
  [198, 153, 105, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 105, 153, 153, 153, 153, 203],
  [198, 153, 105, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 105, 153, 153, 153, 153, 203],
  [198, 153, 105, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 105, 153, 153, 153, 153, 203],
  [198, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 105, 153, 153, 153, 153, 203],
  [198, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 105, 153, 153, 153, 153, 203],
  [198, 153, 153, 104, 104, 104, 104, 153, 104, 104, 104, 103, 104, 104, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 203],
  [198, 153, 153, 105, 126, 153, 105, 153, 153, 153, 153, 153, 153, 105, 153, 104, 104, 104, 104, 104, 104, 104, 104, 104, 203],
  [198, 153, 153, 105, 153, 153, 105, 153, 153, 153, 153, 153, 153, 105, 153, 153, 153, 143, 153, 153, 153, 153, 153, 153, 203],
  [198, 153, 153, 105, 153, 153, 105, 153, 153, 153, 153, 153, 153, 105, 153, 153, 153, 153, 153, 104, 103, 104, 104, 104, 203],
  [198, 153, 153, 105, 153, 153, 105, 153, 153, 153, 153, 153, 153, 105, 153, 153, 153, 153, 153, 105, 153, 153, 105, 153, 203],
  [198, 153, 153, 105, 153, 153, 105, 153, 153, 153, 153, 153, 153, 105, 153, 153, 153, 153, 153, 105, 153, 153, 105, 153, 203],
  [198, 153, 153, 105, 153, 153, 105, 153, 153, 153, 153, 153, 153, 105, 153, 153, 153, 153, 153, 105, 153, 153, 105, 153, 203],
  [198, 153, 231, 105, 153, 153, 105, 153, 148, 104, 104, 104, 104, 105, 153, 153, 153, 153, 153, 105, 153, 153, 105, 153, 203],
  [198, 211, 153, 105, 153, 153, 153, 153, 153, 153, 153, 153, 143, 105, 153, 153, 153, 153, 153, 153, 153, 153, 153, 153, 203],
  [246, 247, 247, 247, 247, 247, 247, 247, 247, 247, 247, 247, 247, 247, 247, 247, 247, 247, 247, 247, 247, 247, 247, 247, 251],
];

function randomY(min, max, height, x) {
  let y, arrayX, arrayY;
  do {
    arrayX = Math.max(0, Math.min(Math.floor((x + 16 / 5) / 32), 24));
    y = Math.floor(Math.random() * (max - min + 1) + min) * 32 - height / 1.5;
    arrayY = Math.max(0, Math.min(Math.floor((y + 32 / 2) / 32), 24));
  } while (objectHitsWall(arrayX, arrayY, mapArray));
  return y;
}

// defining enemies
let slimeL = new Enemy(
  {
    x: 590, // 591 for facing left, 236 for facing right
    y: randomY(23, 1, 32, 590, mapArray), // random between 30, 770, between 250 and 30
    width: 16,
    height: 32,
    frameX: 0,
    frameY: 1,
    speed: -10,
    spritePath: "./static/slime_sprite.png",
  },
  true,
  32
);
let slimeR = new Enemy(
  {
    x: 236,
    y: randomY(5, 9, 32, 236),
    width: 16,
    height: 32,
    frameX: 0,
    frameY: 0,
    speed: 10,
    spritePath: "./static/slime_sprite.png",
  },
  true,
  32
);
let attackSprite = new Image();
attackSprite.src = "static/slime_attack.png";
let enemies = makeWorms(5);
enemies.push(slimeL, slimeR);

document.addEventListener("DOMContentLoaded", startGame, false);

function startGame() {
  canvas_hearts = document.querySelector("#hearts");
  ctx_hearts = canvas_hearts.getContext("2d");
  CANVAS_WIDTH_hearts = canvas_hearts.width;
  CANVAS_HEIGHT_hearts = canvas_hearts.height;

  canvas = document.querySelector("canvas");
  ctx = canvas.getContext("2d");
  CANVAS_WIDTH = canvas.width;
  CANVAS_HEIGHT = canvas.height;

  window.addEventListener("keydown", activate, false);
  window.addEventListener("keyup", deactivate, false);
  slimeL.makeAttack(slimeAttack, attackSprite);
  slimeR.makeAttack(slimeAttack, attackSprite);

  flashlight = document.getElementById("flashlight");
  flashlight.style.setProperty("--Xpos", newCharacter.x + 450 + "px");
  flashlight.style.setProperty("--Ypos", newCharacter.y + 20 + "px");
  gameRunning = true;
  background_music.addEventListener("ended", resetBackgroundMusic);
  background_music.play();
  background_music.volume = 0.5;
  runGame();
}
function resetBackgroundMusic() {
  background_music.currentTime = 0;
  background_music.play();
}
function runGame() {
  if (gameRunning == true) {
    window.requestAnimationFrame(runGame);
    now = Date.now();
    let elapsed = now - then;
    if (elapsed <= fpsInterval) {
      return;
    }
    then = now - (elapsed % fpsInterval);

    //drawing the hearts
    ctx_hearts.clearRect(0, 0, CANVAS_WIDTH_hearts, CANVAS_HEIGHT_hearts);
    ctx_hearts.drawImage(
      hearts,
      0,
      0,
      (hearts_width * newCharacter.health) / 4,
      hearts_height,
      0,
      0,
      (hearts_width * newCharacter.health) / 4,
      hearts_height
    );
    ctx_hearts.drawImage(
      coins,
      0,
      0,
      coin_size * newCharacter.inventory["gold"],
      coin_size,
      0,
      hearts_height,
      coin_size * newCharacter.inventory["gold"],
      coin_size
    );
    // Move character based on movement flags
    newCharacter.move(moveUp, moveDown, moveLeft, moveRight, mapArray, enemies, flashlight);

    // Clear the canvas
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw the background and the walls
    drawBackground(ctx, tileAtlasPath, mapArray);

    // Draw character
    drawEntity(ctx, newCharacter);

    // Draw the enemies
    enemies.forEach((enemy) => {
      if (enemy.alive === true) {
        enemy.frameX = (enemy.frameX + 1) % 6;
        drawEntity(ctx, enemy);
        if (enemy.spritePath === "./static/slime_sprite.png") {
          if (enemy.attack.alive == true) {
            // projectiles.push(enemy.attack);
            enemy.attack.redrawBullet(ctx, mapArray, enemy);
          } else {
            enemy.attack.alive = true;
          }
        }
        // check for character and enemy collision
        if (enemy.arrayX === newCharacter.arrayX && enemy.arrayY === newCharacter.arrayY) {
          newCharacter.health -= 0.2;
          console.log("hit");
          character_gets_hit.play();
        } else if (enemy?.attack?.arrayX === newCharacter.arrayX && enemy?.attack?.arrayY === newCharacter.arrayY) {
          newCharacter.health -= 0.5;
          console.log("hit");
          character_gets_hit.play();
        }
      }
      // check if arrow has hit the enemies
      if (newArrow.arrayX == enemy.arrayX && newArrow.arrayY == enemy.arrayY) {
        creature_dead.play();
        newArrow.alive = false;
        newArrow.resetArrow(arrow.spriteV.src, newCharacter);
        enemy.arrayX = 0;
        enemy.arrayY = 0;
        enemy.alive = false;

        enemy.frameY = 6;
        enemy.frameX = 0;
      }
    });

    // if arrow was shot this will animate it(redraw it)
    if (newArrow.alive == true) {
      newArrow.redrawBullet(ctx, mapArray, newCharacter);
    }
    if (newCharacter.health < 0) {
      endGame("dead");
    }
  }
}

function activate(event) {
  let key = event.key;
  if (key === "ArrowUp") {
    moveUp = true;
  } else if (key === "ArrowDown") {
    moveDown = true;
  } else if (key === "ArrowLeft") {
    moveLeft = true;
  } else if (key === "ArrowRight") {
    moveRight = true;
  }
  if (key === " ") {
    if (newArrow.alive === false) {
      newArrow.shoot(ctx, newCharacter);
      console.log(newCharacter);
    }
  }
  if (key === "f") {
    flashlight.style.setProperty("--range", 90 + "em");
  }
}

function deactivate(event) {
  let key = event.key;
  if (key === "ArrowUp") {
    moveUp = false;
  } else if (key === "ArrowDown") {
    moveDown = false;
  } else if (key === "ArrowLeft") {
    moveLeft = false;
  } else if (key === "ArrowRight") {
    moveRight = false;
  }
  if (key === "f") {
    flashlight.style.setProperty("--range", 9 + "em");
  }
}

export function endGame(reason) {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  window.removeEventListener("keydown", activate);
  window.removeEventListener("keyup", deactivate);
  gameRunning = false;
  background_music.pause();
  // Optionally, display a message or perform other actions indicating the game has ended
  if (reason == "dead") {
    character_dead.play();
    console.log("Game over. You died.");
  } else if (reason == "won") {
    won_game.play();
    console.log("Game over. You won.");
    flashlight.style.display = "none";
  }

  let restartButton = document.createElement("button");
  restartButton.textContent = "Restart Game";
  restartButton.style.display = "block";
  restartButton.style.margin = "20px auto";
  restartButton.onclick = function () {
    // Reload the page to restart the game
    window.location.reload();
  };
  let h1Element = document.createElement("h1");
  h1Element.textContent = "Game Over: " + (reason === "dead" ? "You Died" : "You Won");
  h1Element.style.color = "white";
  h1Element.style.textAlign = "center";
  h1Element.style.fontWeight = "bold";

  document.body.appendChild(h1Element);
  document.body.appendChild(restartButton);
}
