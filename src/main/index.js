import { blockFactory } from './blocks.js';
import { KEYBOARD } from './constants.js';
import {
  params,
  playfieldContext,
  htmlCanvas,
  gameSettings,
  VERSION,
  DEBUG_MODE,
  nextContext,
} from './settings.js';
import {
  increaseSound,
  displayScore,
  Game,
  levelUpflag,
  scoreCounter,
  setdisplayScore,
  setLevelUpflag,
  setScoreCounter,
} from './game.js';

const game = new Game(params);

let block = blockFactory(params);
let nextBlock = blockFactory(params);

const counters = {
  pause: 0,
  frames: 0,
  levelUp: 10000,
};

let isGamePaused = false;

increaseSound.volume = 0.8;

document.addEventListener('keydown', (event) => {
  const moveSound = new Audio('../assets/sounds/move.wav');
  moveSound.volume = 0.15;

  const KEYBOARD_ACTIONS = {
    [KEYBOARD.LEFT]: function () {
      block.moveLeft();
      increaseSound.pause();
      moveSound.play();
    },
    [KEYBOARD.RIGHT]: function () {
      block.moveRight();
      increaseSound.pause();
      moveSound.play();
    },
    [KEYBOARD.DOWN]: function () {
      increaseSound.play();
      block.increaseSpeed();
    },
    [KEYBOARD.UP]: function () {
      block.rotate();
      increaseSound.pause();
      moveSound.play();
    },
  };

  if (!isGamePaused) KEYBOARD_ACTIONS[event.keyCode]();

  if (event.keyCode === KEYBOARD.SPACEBAR) {
    isGamePaused = !isGamePaused;
    counters.pause = 0;
  }
});

document.addEventListener('keyup', (event) => {
  switch (event.keyCode) {
    case 40:
      block.restoreSpeed();
      increaseSound.pause();
      increaseSound.currentTime = 0;
      break;
  }
});
//----------------------------------------------------

const gameLoop = () => {
  playfieldContext.clearRect(0, 0, params.gameWidth, params.gameHeight); //from start to the entire game screen
  game.drawMatrix(playfieldContext);

  if (gameSettings.showIntro && counters.frames < 120) {
    playfieldContext.fillStyle = '#f0f';
    playfieldContext.font = '25px Orbitron';
    playfieldContext.textAlign = 'center';
    playfieldContext.fillText(
      'Marian TETRIS',
      params.gameWidth * 0.5,
      params.gameHeight * 0.45
    );
    playfieldContext.font = '20px Orbitron';
    playfieldContext.fillStyle = '#000';
    playfieldContext.fillText(
      `Version ${VERSION}`,
      params.gameWidth * 0.5,
      params.gameHeight * 0.5
    );
    counters.frames++;
  } else {
    playfieldContext.textAlign = 'start';
    playfieldContext.font = '10px Arial';
    playfieldContext.fillStyle = game.textColor;

    if (DEBUG_MODE.checked) {
      const axis = block.bodyCoor;
      playfieldContext.fillText(
        `Type: ${block.type}`,
        params.gameWidth * 0.7,
        25
      );
      playfieldContext.fillText(
        `X0: ${axis[0].x}  Y0: ${axis[0].y}`,
        params.gameWidth * 0.7,
        40
      );
      playfieldContext.fillText(
        `X1: ${axis[1].x}  Y1: ${axis[1].y}`,
        params.gameWidth * 0.7,
        55
      );
      playfieldContext.fillText(
        `X2: ${axis[2].x}  Y2: ${axis[2].y}`,
        params.gameWidth * 0.7,
        70
      );
      playfieldContext.fillText(
        `X3: ${axis[3].x}  Y3: ${axis[3].y}`,
        params.gameWidth * 0.7,
        85
      );
      playfieldContext.fillText(
        `Color: ${block.color}`,
        params.gameWidth * 0.7,
        100
      );
      playfieldContext.fillText(
        `Right Crash: ${!block.enableRight}`,
        params.gameWidth * 0.7,
        115
      );
      playfieldContext.fillText(
        `Left Crash: ${!block.enableLeft}`,
        params.gameWidth * 0.7,
        130
      );
      playfieldContext.fillText(
        `Orientation: ${block.orientation}`,
        params.gameWidth * 0.7,
        145
      );
      playfieldContext.fillText(
        `Speed: ${block.speed}`,
        params.gameWidth * 0.7,
        160
      );
    }
    playfieldContext.fillText(
      `Ver ${VERSION}.alpha`,
      params.gameWidth * 0.05,
      25
    );
    playfieldContext.fillText(
      `Level: ${game.level}`,
      params.gameWidth * 0.05,
      40
    );
    playfieldContext.fillText(
      `Score: ${game.score}`,
      params.gameWidth * 0.05,
      55
    );
    playfieldContext.fillText(
      `Bonus: ${block.bonus}`,
      params.gameWidth * 0.05,
      70
    );
    playfieldContext.fillText(
      `Rows Cleared: ${game.rowsCleared}`,
      params.gameWidth * 0.05,
      85
    );

    // next info
    nextContext.fillStyle = game.bgColor;
    nextContext.fillRect(0, 0, 120, 120);
    nextContext.fillStyle = nextBlock.color;
    nextBlock.setBodyAbsolute();
    nextBlock.draw(nextContext, true);
    //Messages

    if (levelUpflag) {
      counters.levelUp = 0;
      setLevelUpflag(false);
    }

    if (counters.levelUp < 90) {
      counters.levelUp++;
      playfieldContext.fillStyle = game.textColor;
      playfieldContext.font = '16px Orbitron';
      playfieldContext.textAlign = 'center';
      playfieldContext.fillText(
        'Level Up!',
        game.gameWidth * 0.5,
        game.gameHeight * 0.5
      );
    }

    if (isGamePaused) {
      if (counters.pause < 30) {
        playfieldContext.fillStyle = game.textColor;
        playfieldContext.font = '16px Orbitron';
        playfieldContext.textAlign = 'center';
        playfieldContext.fillText(
          'Pause',
          game.gameWidth * 0.5,
          game.gameHeight * 0.45
        );
      } else if (counters.pause > 60) {
        counters.pause = 0;
      }

      counters.pause++;
    }

    if (displayScore.display) {
      let displayMessage = '';
      let height = 0;
      let wait = 70;

      if (displayScore.row === 4) {
        displayMessage = 'TETRIS!!';
        wait = 120;
      }

      if (displayScore.row === 2) {
        displayMessage = 'Great!';
        wait = 90;
      }

      if (displayScore.row === 3) {
        displayMessage = 'Superb!';
        wait = 90;
      }

      if (scoreCounter < wait) {
        playfieldContext.fillStyle = game.textColor;
        playfieldContext.font = '16px Orbitron';
        playfieldContext.textAlign = 'center';

        height = ((game.gameHeight * 0.7) / scoreCounter) * 20;
        if (height < game.gameHeight * 0.4) {
          height = game.gameHeight * 0.4;
        }
        if (height > game.gameHeight - 25) {
          height = game.gameHeight - 25;
        }

        playfieldContext.fillText(
          `+ ${displayScore.score}!`,
          game.gameWidth * 0.5,
          height
        );
        playfieldContext.fillText(
          `${displayMessage}`,
          game.gameWidth * 0.5,
          height + 30
        );
      } else {
        setdisplayScore(false);
        setScoreCounter(0);
      }

      setScoreCounter(scoreCounter + 1);
    }

    //

    switch (game.state.state) {
      case 'new block':
        block.draw(playfieldContext);
        if (!isGamePaused) {
          block.update();
        }
        game.checkMovement(block);
        block.collisionDetection(game);
        break;
      case 'update matrix':
        game.checkDestruction();
        game.state.newBlock();
        params.gameSpeed = game.level / 2;
        block = nextBlock;
        nextBlock = blockFactory(params);

        break;
      case 'game over': {
        params.gameSpeed = 0.5;
        block = blockFactory(params);
        nextBlock = blockFactory(params);
        game.state.newBlock();
      }
    }

    htmlCanvas.scoreInfo.innerHTML = `Score: ${game.score + block.addBonus()}`;
    htmlCanvas.levelInfo.innerHTML = `Level: ${game.level}`;
  }

  requestAnimationFrame(gameLoop);
};

requestAnimationFrame(gameLoop);
