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
**
*/

import {Block,blockFactory} from './blocks.js';
import {Game, levelUpflag, setLevelUpflag, displayScore, setdisplayScore,scoreCounter,setScoreCounter} from './game.js';
import {inputHandler} from './utils.js';

let version = '1.1.2';

let playfield = document.getElementById('playfield');
let next = document.getElementById('next');
const info = document.getElementById('info');
const scoreInfo = document.getElementById('score');


let context = playfield.getContext('2d');
let nextCtx = next.getContext('2d');
let debugMode = document.getElementById('debug-switch') ;
let jumboMode = false;
let scale = 10;

if (jumboMode){
    playfield.width = '400';
    playfield.height = '640';
    scale = 20;
}

const GAME_WIDTH = playfield.width;
const GAME_HEIGHT = playfield.height;
const GAME_UNIT = GAME_WIDTH/scale;

let params = {
    gameWidht: GAME_WIDTH,
    gameHeigth: GAME_HEIGHT,
    gameUnit: GAME_UNIT,
    maxSpeed: 10,
    bgColor: '#000',
    level: 1,
    gameSpeed: 1/2,
};

let game = new Game(params);

let block = blockFactory(params);
let nextBlock = blockFactory(params);

let lastTime = 0;

let frameCount = 0;

let pause = false;
let pauseCounter = 0;



//input handler------------------------------
export let increaseSound = new Audio('./resources/sounds/increase.wav');
increaseSound.volume = 0.8;

document.addEventListener('keydown', (event)=>{
    let moveSound = new Audio('./resources/sounds/move.wav');
    moveSound.volume = 0.15;
    if (!pause){
        switch(event.keyCode){
            case 37:
                block.moveLeft();
                increaseSound.pause();
                moveSound.play();
                break;
            case 39:
                block.moveRight();
                increaseSound.pause();
                moveSound.play();
                break;
            case 40:
    
                increaseSound.play();
                block.increaseSpeed();
                break;
            case 38:
                block.rotate();
                increaseSound.pause();
                moveSound.play();
                break;

        }
    }

    if(event.keyCode === 32){
        pause=!pause;
        pauseCounter = 0;

    }

})

document.addEventListener('keyup', (event)=>{

    switch(event.keyCode){
        case 40:
            
            block.restoreSpeed();
            increaseSound.pause();
            increaseSound.currentTime = 0
            break;
    }
})
//----------------------------------------------------

let showIntro = true;
let flagCounter = 10000;

const gameLoop = (timeStamp)=>{
    let dt = timeStamp - lastTime;
    lastTime = timeStamp;


    context.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT) //from start to the entire game screen

    
    game.drawMatrix(context);

    if(showIntro && frameCount<120){
        context.fillStyle = "#f0f";
        context.font = '25px Orbitron';
        context.textAlign = 'center';
        context.fillText('Marian TETRIS',GAME_WIDTH*.5,GAME_HEIGHT*.45);
        context.font = "20px Orbitron";
        context.fillStyle = "#000";
        context.fillText(`Version ${version}`,GAME_WIDTH*.5,GAME_HEIGHT*.50);
        
        
        frameCount++;
    }else{

        context.textAlign = 'start';
        context.font = "10px Arial";
        context.fillStyle = game.textColor;

        if (debugMode.checked){
            let axis = block.bodyCoor;
            context.fillText(`Type: ${block.type}`, GAME_WIDTH*.70, 25);
            context.fillText(`X0: ${axis[0].x}  Y0: ${axis[0].y}`, GAME_WIDTH*.70, 40);
            context.fillText(`X1: ${axis[1].x}  Y1: ${axis[1].y}`, GAME_WIDTH*.70, 55);
            context.fillText(`X2: ${axis[2].x}  Y2: ${axis[2].y}`, GAME_WIDTH*.70, 70);
            context.fillText(`X3: ${axis[3].x}  Y3: ${axis[3].y}`, GAME_WIDTH*.70, 85);
            context.fillText(`Color: ${block.color}`, GAME_WIDTH*.70, 100);
            context.fillText(`Right Crash: ${!block.enableRight}`, GAME_WIDTH*.70, 115);
            context.fillText(`Left Crash: ${!block.enableLeft}`, GAME_WIDTH*.70, 130);
            context.fillText(`Orientation: ${block.orientation}`, GAME_WIDTH*.70, 145);
            context.fillText(`Speed: ${block.speed}`, GAME_WIDTH*.70, 160);
        }
        context.fillText(`Ver ${version}.alpha`, GAME_WIDTH*.05, 25);
        context.fillText(`Level: ${game.level}`, GAME_WIDTH*.05, 40);
        context.fillText(`Score: ${game.score}`, GAME_WIDTH*.05, 55);
        context.fillText(`Bonus: ${block.bonus}`, GAME_WIDTH*.05, 70);
        context.fillText(`Rows Cleared: ${game.rowsCleared}`, GAME_WIDTH*.05, 85);
    

        // next info
        nextCtx.fillStyle = game.bgColor;
        nextCtx.fillRect(0,0,120,120);
        nextCtx.fillStyle = nextBlock.color;
        nextBlock.setBodyAbsolute();
        nextBlock.draw(nextCtx,true);
        info.style.backgroundColor = game.bgColor;

        //

        //Messages

        if(levelUpflag){
            flagCounter = 0;
            setLevelUpflag(false);  
        }

        if(flagCounter <90){
            flagCounter++;
            context.fillStyle = game.textColor;
            context.font = '16px Orbitron';
            context.textAlign = 'center';
            context.fillText('Level Up!',game.gameWidht*.5,game.gameHeigth*.5);
        }

        if(pause){
            
            if (pauseCounter<30){
                context.fillStyle = game.textColor;
                context.font = '16px Orbitron';
                context.textAlign = 'center';
                context.fillText('Pause',game.gameWidht*.5,game.gameHeigth*.45);
            }else if (pauseCounter>60){
                pauseCounter = 0;
            }

            pauseCounter++;
        }

        if(displayScore.display){

            let msg = '';
            let height = 0;
            let wait = 70;

            if (displayScore.row === 4){
                msg = 'TETRIS!!'
                wait = 120;
            }

            if (displayScore.row === 2){
                msg = 'Great!'
                wait = 90;
            }

            if (displayScore.row === 3){
                msg = 'Superb!'
                wait = 90;
            }

            if (scoreCounter<wait){
                context.fillStyle = game.textColor;
                context.font = '16px Orbitron';
                context.textAlign = 'center';

                height = game.gameHeigth*.7/scoreCounter*20
                if (height<game.gameHeigth*.4){
                    height=game.gameHeigth*.4;
                }
                if (height>(game.gameHeigth - 25)){
                    height=game.gameHeigth -25;
                }
                
                context.fillText(`+ ${displayScore.score}!`,game.gameWidht*.5,height);
                context.fillText(`${msg}`,game.gameWidht*.5,height+30);
            }else {
                setdisplayScore(false);
                setScoreCounter(0);
            }

            setScoreCounter(scoreCounter + 1);

        }

        //
        
        switch (game.state.state){
            case 'new block':
                block.draw(context);
                if(!pause){
                    block.update();
                }
                game.checkMovement(block);
                block.collisionDetection(game);
                break;
            case 'update matrix':
                game.checkDestruction();
                game.state.newBlock();
                params.gameSpeed = game.level/2;
                block = nextBlock;
                nextBlock = blockFactory(params);
                
                break;
            case 'game over':{
                params.gameSpeed = 0.5;
                block = blockFactory(params);
                nextBlock = blockFactory(params);
                game.state.newBlock();
            }
            
            
        }


        scoreInfo.innerHTML = `Score: ${game.score + block.addBonus()}`
    }

    requestAnimationFrame(gameLoop)
    
}

requestAnimationFrame(gameLoop);