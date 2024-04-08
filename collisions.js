export function objectHitsWall(arrayX, arrayY, mapArray) {
  // this function should be passed the mapArray when called, but don't know how
  let walls = [198, 105, 104, 107, 182, 203, 252, 298, 246, 247, 186, 103];
  if (walls.includes(mapArray[arrayY][arrayX])) {
    return true;
  } else {
    return false;
  }
}

export function checkCollisionWithObjects(object1, object2) {
  // Return true if collision detected, otherwise return false
  // Calculate the boundaries of object1
  let object1Left = object1.x;
  let object1Right = object1.x + object1.width;
  let object1Top = object1.y;
  let object1Bottom = object1.y + object1.height;

  // Calculate the boundaries of object2
  let object2Left = object2.x;
  let object2Right = object2.x + object2.width;
  let object2Top = object2.y;
  let object2Bottom = object2.y + object2.height;

  // Check for intersection
  if (object1Right > object2Left && object1Left < object2Right && object1Bottom > object2Top && object1Top < object2Bottom) {
    return true; // Collided
  } else {
    return false; // Not collided
  }
}