import { objectHitsWall, objectGetsItem } from "./collisions.js";
import { Bullet } from "./bullet.js";
import { endGame } from "./game.js";

export class Entity {
  constructor({ x, y, width, height, frameX, frameY, speed, spritePath }, alive = true, tileSize) {
    // future things, make a type attribute(worm, slime... so on)
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.frameX = frameX;
    this.frameY = frameY;
    this.alive = alive;
    this.arrayX;
    this.arrayY;
    this.speed = speed;
    this.spritePath = spritePath;
    this.tileSize = tileSize;
    this.speed = speed; //10
  }
}

export class Character extends Entity {
  constructor({ x, y, width, height, frameX, frameY, speed, spritePath, health }, alive = true, tileSize) {
    super(x, y, width, height, speed, spritePath, health, alive, tileSize);
    this.x = x;
    this.y = y;
    this.health = health;
    this.width = width;
    this.height = height;
    this.frameX = frameX;
    this.frameY = frameY;
    this.alive = alive;
    this.tileSize = tileSize;
    this.arrayX = Math.max(0, Math.min(Math.floor((this.x + this.width / 4.7) / this.tileSize), 24));
    this.arrayY = Math.max(0, Math.min(Math.floor((this.y + this.height / 1.5) / this.tileSize), 24));
    this.speed = speed;
    this.spritePath = spritePath;
    this.speed = speed; //10
    this.inventory = { silver_key: 0, gold: 0 };
  }
  move(moveUp, moveDown, moveLeft, moveRight, mapArray, enemies, flashlight) {
    let character_gets_hit = document.getElementById("character_gets_hit");

    if (moveUp || moveDown || moveLeft || moveRight) {
      let newX = this.x;
      let newY = this.y;
      let newArrayX = this.arrayX;
      let newArrayY = this.arrayY;

      // Calculate diagonal speed using Pythagorean theorem
      let diagonalSpeed = this.speed / Math.sqrt(2);
      [newX, newY] = this.newPosition(diagonalSpeed, moveUp, moveDown, moveLeft, moveRight, newX, newY);

      newArrayX = Math.max(0, Math.min(Math.floor((newX + this.width / 4.7) / this.tileSize), 24)); // divide by 4 instead of 2 so it doesn't go on to of a wall
      newArrayY = Math.max(0, Math.min(Math.floor((newY + this.height / 1.5) / this.tileSize), 24));

      enemies.forEach((enemy) => {
        if (this.arrayX == enemy.arrayX && this.arrayY == enemy.arrayY && enemy.alive) {
          this.health -= 0.2;
          console.log("hit");
          character_gets_hit.play();
        }
      });

      // Checking for arrayX or arrayY for colliding with walls;
      if ((mapArray[newArrayY][newArrayX] === 184 || mapArray[newArrayY][newArrayX] === 185) && this.inventory["silver_key"] != 0) {
        endGame("won");
      }
      if (objectHitsWall(newArrayX, newArrayY, mapArray)) {
        return;
      } else {
        this.arrayX = newArrayX;
        this.arrayY = newArrayY;
      }
      objectGetsItem(this.arrayX, this.arrayY, mapArray, this); //check if it got any items

      // Update character position
      this.x = newX;
      this.y = newY;

      flashlight.style.setProperty("--Xpos", this.x + 450 + "px");
      flashlight.style.setProperty("--Ypos", this.y + 20 + "px");

      // Update character frame based on movement
      if (moveUp) {
        this.frameY = 3;
      } else if (moveDown) {
        this.frameY = 0;
      } else if (moveLeft) {
        this.frameY = 1;
      } else if (moveRight) {
        this.frameY = 2;
      }

      // making sure it stays within 0-4
      this.frameX = (this.frameX + 1) % 4;
    } else {
      this.frameX = 0;
      return;
    }
  }

  newPosition(diagonalSpeed, moveUp, moveDown, moveLeft, moveRight, newX, newY) {
    // Update this's position based on movement flags
    if (moveUp && moveLeft) {
      newX -= diagonalSpeed;
      newY -= diagonalSpeed;
    } else if (moveUp && moveRight) {
      newX += diagonalSpeed;
      newY -= diagonalSpeed;
    } else if (moveDown && moveLeft) {
      newX -= diagonalSpeed;
      newY += diagonalSpeed;
    } else if (moveDown && moveRight) {
      newX += diagonalSpeed;
      newY += diagonalSpeed;
    } else if (moveUp) {
      newY -= this.speed;
    } else if (moveDown) {
      newY += this.speed;
    } else if (moveLeft) {
      newX -= this.speed;
    } else if (moveRight) {
      newX += this.speed;
    }
    return [newX, newY];
  }
}

export class Enemy extends Entity {
  constructor({ x, y, width, height, frameX, frameY, speed, spritePath }, alive = true, tileSize) {
    super(x, y, width, height, frameX, frameY, speed, spritePath, alive, tileSize);
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.frameX = frameX;
    this.frameY = frameY;
    this.alive = alive;
    this.tileSize = tileSize;
    this.arrayX = Math.max(0, Math.min(Math.floor((this.x + this.width / 4.7) / this.tileSize), 24));
    this.arrayY = Math.max(0, Math.min(Math.floor((this.y + this.height / 3) / this.tileSize), 24));
    this.speed = speed; // how often it appears
    this.spritePath = spritePath;
    this.attack;
  }
  makeAttack(attackBluePrint, attackSprite) {
    attackBluePrint.x = this.x;
    attackBluePrint.y = this.y;
    this.attack = new Bullet(attackBluePrint, true, 32, this);
    this.attack.xChange = this.speed;
    this.attack.sprite = attackSprite;
  }
}

export function makeWorms(amount) {
  let worms = [];
  let cords = [
    [40, 50],
    [102, 98],
    [191, 735],
    [365, 735],
    [231, 701],
    [231, 480],
    [101, 281],
    [101, 111],
    [208, 94],
    [272, 170],
    [604, 186],
    [645, 740],
    [609, 480],
    [746, 280],
  ];
  for (let i = 0; i < amount; i++) {
    let index = Math.floor(Math.random() * cords.length);
    let [cordX, cordY] = cords.splice(index, 1)[0];
    let worm = new Enemy(
      {
        x: cordX,
        y: cordY,
        width: 32,
        height: 32,
        frameX: 0,
        frameY: 0,
        speed: 10, // might change it later
        spritePath: "./static/Worm_Sprite.png",
      },
      true,
      32
    );
    worms.push(worm);
  }
  return worms;
}
