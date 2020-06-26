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
import {inputHandler} from './utils.js';

const GAME_WIDTH = 400;
const GAME_HEIGHT = 640;
const GAME_UNIT = GAME_WIDTH/20;

let playfield = document.getElementById('playfield');
let context = playfield.getContext('2d');
let debugMode = true;

let params = {
    gameWidht: GAME_WIDTH,
    gameHeigth: GAME_HEIGHT,
    gameUnit: GAME_UNIT,
    gameSpeed: 1,
    maxSpeed: 10,
    bgColor: '#000'
};

let game = new Game(params);

let block = blockFactory(params);

let lastTime = 0;

let frameCount = 0;

//input handler------------------------------

document.addEventListener('keydown', (event)=>{

    switch(event.keyCode){
        case 37:
            block.moveLeft();
            break;
        case 39:
            block.moveRight();
            break;
        case 40:
            block.increaseSpeed();
            break;
        case 38:
            block.rotate();
            break;
    }
})

document.addEventListener('keyup', (event)=>{

    switch(event.keyCode){
        case 40:
            block.restoreSpeed();
            break;
    }
})
//----------------------------------------------------
const gameLoop = (timeStamp)=>{
    let dt = timeStamp - lastTime;
    lastTime = timeStamp;

    context.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT) //from start to the entire game screen
    game.drawMatrix(context);

    if (debugMode){
        context.fillStyle = '#fff';
        let axis = block.bodyCoor;
        context.fillText(`Type: ${block.type}`, 300, 25);
        context.fillText(`X0: ${axis[0].x}  Y0: ${axis[0].y}`, 300, 40);
        context.fillText(`X1: ${axis[1].x}  Y1: ${axis[1].y}`, 300, 55);
        context.fillText(`X2: ${axis[2].x}  Y2: ${axis[2].y}`, 300, 70);
        context.fillText(`X3: ${axis[3].x}  Y3: ${axis[3].y}`, 300, 85);
        context.fillText(`Color: ${block.color}`, 300, 100);
        context.fillText(`Right Crash: ${!block.enableRight}`, 300, 115);
        context.fillText(`Left Crash: ${!block.enableLeft}`, 300, 130);
        context.fillText(`Orientation: ${block.orientation}`, 300, 145);
        context.fillText(`Speed: ${params.gameSpeed}`, 300, 160);
    }

    switch (game.state.state){
        case 'new block':
            block.draw(context);
            block.update();
            game.checkMovement(block);
            block.collisionDetection(game);
            break;
        case 'update matrix':
            game.checkDestruction();
            game.state.newBlock();
            block = blockFactory(params);
            break;
        
    }

    requestAnimationFrame(gameLoop)
    
}

requestAnimationFrame(gameLoop);