export const VERSION = '1.4.0';
export const DEBUG_MODE = document.getElementById('debug-switch');

export const gameSettings = {
  jumboMode: false,
  scale: 10,
  showIntro: true,
};

export const htmlCanvas = {
  playfield: document.getElementById('playfield'),
  next: document.getElementById('next'),
  info: document.getElementById('info'),
  scoreInfo: document.getElementById('score'),
  levelInfo: document.getElementById('level'),
};

export const playfieldContext = htmlCanvas.playfield.getContext('2d');
export const nextContext = htmlCanvas.next.getContext('2d');

if (gameSettings.jumboMode) {
  htmlCanvas.playfield.width = '400';
  htmlCanvas.playfield.height = '640';
  gameSettings.scale = 20;
}

export const GAME_WIDTH = htmlCanvas.playfield.width;
export const GAME_HEIGHT = htmlCanvas.playfield.height;
export const GAME_UNIT = GAME_WIDTH / gameSettings.scale;

export const params = {
  gameWidth: GAME_WIDTH,
  gameHeight: GAME_HEIGHT,
  gameUnit: GAME_UNIT,
  maxSpeed: 10,
  bgColor: '#000',
  level: 1,
  gameSpeed: 1 / 2,
};
