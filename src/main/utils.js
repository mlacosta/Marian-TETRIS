export const inputHandler = (block) => {
  document.addEventListener("keydown", (event) => {
    switch (event.keyCode) {
      case 37:
        block.moveLeft();
        break;
      case 39:
        block.moveRight();
        break;
      case 40:
        block.increaseSpeed();
        break;
    }
  });

  document.addEventListener("keyup", (event) => {
    switch (event.keyCode) {
      case 40:
        block.restoreSpeed();
        break;
    }
  });
};

export class Debug {}

export const canRotate = (game, position) => {};
