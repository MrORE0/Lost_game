import { objectHitsWall } from "./collisions.js";

export class Entity {
  constructor({ x, y, width, height, frameX, frameY, arrayX, arrayY, speed, spritePath }, alive = true, tileSize) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.frameX = frameX;
    this.frameY = frameY;
    this.alive = alive;
    this.arrayX = arrayX;
    this.arrayY = arrayY;
    this.speed = speed;
    this.spritePath = spritePath;
    this.tileSize = tileSize;
    this.speed = speed; //10
  }
}

export class Character extends Entity {
  constructor({ x, y, width, height, frameX, frameY, arrayX, arrayY, speed, spritePath }, alive = true, tileSize) {
    super(x, y, width, height, arrayX, arrayY, speed, spritePath, alive, tileSize);
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.frameX = frameX;
    this.frameY = frameY;
    this.alive = alive;
    this.arrayX = arrayX;
    this.arrayY = arrayY;
    this.speed = speed;
    this.spritePath = spritePath;
    this.tileSize = tileSize;
    this.speed = speed; //10
  }
  move(moveUp, moveDown, moveLeft, moveRight, mapArray) {
    if (moveUp || moveDown || moveLeft || moveRight) {
      let newX = this.x;
      let newY = this.y;

      // Calculate diagonal speed using Pythagorean theorem
      let diagonalSpeed = this.speed / Math.sqrt(2);
      this.newPosition(diagonalSpeed, moveUp, moveDown, moveLeft, moveRight, newX, newY);

      // character's x and y position to array indices (1 to 24) so we can check for wall or item collision
      if (moveLeft || moveDown) {
        // Subtract 1 from the calculated array index to collide with walls before being on top of them
        this.arrayX = Math.max(0, Math.min(Math.floor((newX + this.width / 4) / this.tileSize), 24)); // divide by 4 instead of 2 so it doesn't go on to of a wall
        this.arrayY = Math.max(1, Math.min(Math.floor((newY + this.height) / this.tileSize), 24));
      } else {
        this.arrayX = Math.max(1, Math.min(Math.floor(newX / this.tileSize) + 1, 24));
        this.arrayY = Math.max(1, Math.min(Math.floor(newY / this.tileSize) + 1, 24));
      }

      // Checking for arrayX or arrayY for colliding with walls;
      if (objectHitsWall(this.arrayX, this.arrayY, mapArray)) {
        return;
      }

      // Update character position
      this.x = newX;
      this.y = newY;

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
  }
}