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
import {collisionDetection, inputHandler} from './utils.js';

const GAME_WIDTH = 400;
const GAME_HEIGHT = 640;
const GAME_UNIT = GAME_WIDTH/20;

let playfield = document.getElementById('playfield');
let context = playfield.getContext('2d');

let params = {
    gameWidht: GAME_WIDTH,
    gameHeigth: GAME_HEIGHT,
    gameUnit: GAME_UNIT,
    gameSpeed: 1
};

let game = new Game(params);

let block = blockFactory(game);

let lastTime = 0;

let count = 0;

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

    //console.log(count);
    //console.log(game.gameMatrix);

    switch (game.state.state){
        case 'new block':
            block.update(game);
            block.draw(context);

            collisionDetection(block,game);
            break;

        case 'update matrix':
            game.state.newBlock();
            block = blockFactory(game);
            break;
    }

    count ++;

    /*if (count === 119){
        return;
    }*/
    requestAnimationFrame(gameLoop)
    
}

requestAnimationFrame(gameLoop);