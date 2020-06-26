export class State {
    constructor(){
        this.state = 'new block';
    }

    updateMatrix(block,game){
        this.state = 'update matrix';
        let coordinates = block.bodyCoor;
        
        game.setGameMatrix(coordinates[0].x,coordinates[0].y,block.color);
        game.setGameMatrix(coordinates[1].x,coordinates[1].y,block.color);
        game.setGameMatrix(coordinates[2].x ,coordinates[2].y,block.color);
        game.setGameMatrix(coordinates[3].x ,coordinates[3].y ,block.color);



    }

    newBlock(){
        this.state = 'new block';
    }

    gameOver(game){
        //alert('GAME OVER!')
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
            }
        }
    }

    destroyRow(row){

        let dim = [this.gameMatrix.length,this.gameMatrix[0].length];

        for(let x=0; x<dim[0];x++){
            this.gameMatrix[x].splice(row,1);
            this.gameMatrix[x].unshift(this.bgColor);
        }
    }
    
}

