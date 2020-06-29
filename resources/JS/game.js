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

import {increaseSound} from './main.js' ;
let levelUp = new Audio('./resources/sounds/levelUp.wav');
const infoText = document.getElementById('info');
const socialMedia = document.getElementById('social');

export let levelUpflag = false;
export const setLevelUpflag = (value)=>{
    levelUpflag = value;
}

export const displayScore = {row:1,score:0,display:false};
export const setdisplayScore = (value)=>{
    displayScore.display = value;
}

export let scoreCounter = 0;
export const setScoreCounter = (value)=>{
    scoreCounter = value;
}

export class State {
    constructor(){
        this.state = 'new block';
    }

    updateMatrix(block,game){
        this.state = 'update matrix';
        let coordinates = block.bodyCoor;

        for(let i=0;i<4;i++){
            game.setGameMatrix(coordinates[i].x,coordinates[i].y,block.color);
        }
        
    }

    newBlock(){
        this.state = 'new block';
    }

    gameOver(game){
        this.state = 'game over';
        increaseSound.pause();
        alert(`GAME OVER! \n\nYOUR SCORE: ${game.score}`);
        let gameOverSound = new Audio('./resources/sounds/gameOver.wav');
        gameOverSound.play();

        game.speed = 0.5;
        game.level = 1;
        game.score = 0;
        game.rowsCleared = 0;
        game.changeBg()
        game.generateMatrix();
    }

}   

export class Game{

    constructor(params){
        this.gameWidht = params.gameWidht;
        this.gameHeigth = params.gameHeigth;
        this.gameUnit = params.gameUnit;
        this.speed = params.gameSpeed;
        this.gameMatrix = [];
        this.state = new State();
        this.bgColor = params.bgColor;
        this.level = params.level;
        this.score = 0;
        this.rowsDestroyed = 0;
        this.rowsCleared = 0;
        this.textColor = "#fff";
        this.generateMatrix();
        this.changeBg();
        this.frameCount = 0;

    }

    generateMatrix(){
        this.gameMatrix = [];

        for (let i = 0; i<(this.gameWidht/this.gameUnit); i++){
            let verticalUnits = [];

            for (let i = 0; i<(this.gameHeigth/this.gameUnit); i++){
                verticalUnits.push(this.bgColor);
            }

            this.gameMatrix.push(verticalUnits);
        }
    }

    setGameMatrix(x,y,color){
        this.gameMatrix[x][y] = color;
    }

    drawMatrix(context){

        let dim = [ this.gameMatrix.length, this.gameMatrix[0].length ];

        for (let i = 0 ; i< dim[0]; i++){
            for(let j = 0; j< dim[1]; j++){
                context.fillStyle = this.gameMatrix[i][j];
                context.fillRect(i*this.gameUnit,j*this.gameUnit,this.gameUnit,this.gameUnit);
            }
        }    
    }

    checkMovement(block){
        let count = 0;

        for(let i=0;i<4;i++){
            if(block.bodyCoor[i].x-1>0){
                if(this.gameMatrix[block.bodyCoor[i].x-1][block.bodyCoor[i].y] !== this.bgColor){
                    block.lockLeft();
                    break;
                }else{
                    count++;
                }

             }

             if(count === 4){
                block.unlockLeft();
            }
        }

        count = 0;

        for(let i=0;i<4;i++){
            if(block.bodyCoor[i].x+1<this.gameWidht / this.gameUnit){
                if(this.gameMatrix[block.bodyCoor[i].x+1][block.bodyCoor[i].y] !== this.bgColor){
                    block.lockRight();
                    break;
                }else{
                    count++;
                }
             }

             if(count === 4){
                block.unlockRight();
            }
        }
    }

    checkDestruction(){
        let currentScore = 0;
        this.frameCount ++;
        let dim = [this.gameMatrix.length,this.gameMatrix[0].length];

        this.rowsDestroyed = 0; 

        for (let j=0;j<dim[1];j++){
            let counter = 0;
            while (counter<dim[0]){
                if (this.gameMatrix[counter][j] !== this.bgColor){
                    counter++;
                }else{
                    break;
                }
            }

            if (counter === dim[0]){
                this.destroyRow(j);
                this.rowsDestroyed++; 
            }
        }

        switch (this.rowsDestroyed){
            case(0):
                break;
            case(1):
                currentScore = 40*(this.level);
                break;
            case(2):
                currentScore = 100*(this.level);
                break;
            case(3):
                currentScore = 300*(this.level);
                break;
            case(4):
                currentScore = 1200*(this.level);
                break;
        }

        if(this.rowsDestroyed){
            displayScore.row = this.rowsDestroyed;
            displayScore.score = currentScore;
            displayScore.display = true;
            this.score+= currentScore;
            scoreCounter = 0;
        }

        if(this.rowsCleared>=10){
            this.level++;
            this.rowsCleared = 0;
            levelUp.play();
            this.changeBg();
            levelUpflag = true;
        }

    }

    destroyRow(row){

        let destSound = new Audio('./resources/sounds/destruction.wav');
        destSound.volume = 0.5;
        this.frameCount = 0;

        let dim = [this.gameMatrix.length,this.gameMatrix[0].length];

        for(let x=0; x<dim[0];x++){
            this.gameMatrix[x].splice(row,1);
            this.gameMatrix[x].unshift(this.bgColor);
        }

        this.rowsCleared ++;

        if (this.rowsCleared < 10){
            destSound.play();
            }
        }

    changeBg(){
        let color;
        switch(this.level){
            case(1):
                this.textColor = "#000";
                color = "#fff";
                break;
            case(3):
                this.textColor = "#000";
                color ="#cfc";
                break;
            
            case(4):
                this.textColor = "#000";
                color ="#ffe6b3";
                break;
            case(5):
                this.textColor = "#000";
                color ="#9cf";
                break;
            case(6):
                this.textColor = "#fff";
                color = "#c68a53";
                break;
            case(7):
                this.textColor = "#e60000";
                color = "#c2c2d6";
                break;
            case(8):
                color = "#ff80bf"
                this.textColor = "#e60000";
                break;
            case(9):
                color = "#ffff80";
                this.textColor = "#e60000";
                break;
            case(10):
                color = "#000";
                this.textColor = "#00e63d";
                break;
            default:
                this.textColor = "#fff";
                color = "#072d69";
                break;
        }

        this.replaceBg(this.bgColor,color);
        this.bgColor = color;
        infoText.style.color = this.textColor;
        socialMedia.color = this.textColor;
        
    }

    replaceBg(oldColor,newColor){
        let dim = [ this.gameMatrix.length, this.gameMatrix[0].length ];

        for (let i = 0 ; i< dim[0]; i++){
            for(let j = 0; j< dim[1]; j++){
                if(this.gameMatrix[i][j] === oldColor){
                    this.gameMatrix[i][j] = newColor;
                }
                
            }
        }    
    }
    
}

