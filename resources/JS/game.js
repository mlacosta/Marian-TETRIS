import {increaseSound} from './main.js' ;
let destSound = new Audio('./resources/sounds/destruction.wav')

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
        increaseSound.pause();
        alert('GAME OVER!')
        let gameOverSound = new Audio('./resources/sounds/gameOver.wav');
        gameOverSound.play();

        
        game.level = 1;
        game.score = 0;
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
        this.generateMatrix();

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
                this.score += 40*(this.level);
                break;
            case(2):
                this.score += 100*(this.level);
                break;
            case(3):
                this.score += 300*(this.level);
                break;
            case(4):
                this.score += 1200*(this.level);
                break;
        }
    }

    destroyRow(row){

        let dim = [this.gameMatrix.length,this.gameMatrix[0].length];

        for(let x=0; x<dim[0];x++){
            this.gameMatrix[x].splice(row,1);
            this.gameMatrix[x].unshift(this.bgColor);
        }

        this.rowsCleared ++;

        if (this.rowsCleared === 10){
            this.level++;
            this.rowsCleared = 0;
        };


        destSound.play();
    }
    
}

