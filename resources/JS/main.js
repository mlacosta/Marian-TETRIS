/* Author: Mariano L. Acosta
** github: mlacosta
** mail: marianoacosta.003@gmail.com
**
** Tetris Clone (coded and built from scratch)
**
** In this project I'll use many software patterns, including:
** Module Pattern (self contained code)
** Factory Pattern
** State Pattern
** Observer Pattern
**
*/

import {Block,blockFactory} from './blocks.js';
import {Game} from './game.js';

const GAME_WIDTH = 400;
const GAME_HEIGHT = 640;
const GAME_UNIT = GAME_WIDTH/20;

let playfield = document.getElementById('playfield');
let context = playfield.getContext('2d');

let params = {
    gameWidht: GAME_WIDTH,
    gameHeigth: GAME_HEIGHT,
    gameUnit: GAME_UNIT,
    gameSpeed: 4
};

let game = new  Game(params);

let block = blockFactory(game);

let lastTime = 0;

const gameLoop = (timeStamp)=>{
    let dt = timeStamp - lastTime;
    lastTime = timeStamp;

    context.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT) //from start to the entire game screen
    block.update(game);
    block.draw(context);

    requestAnimationFrame(gameLoop)
    
}

requestAnimationFrame(gameLoop);