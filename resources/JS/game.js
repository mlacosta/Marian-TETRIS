export class State {
    constructor(){
        this.state = 'new block';
    }

    updateMatrix(block,game){
        this.state = 'update matrix';
        let coordinates = block.getCoordinates();
        
        game.setGameMatrix(coordinates.x,coordinates.y,block.color);
        game.setGameMatrix(coordinates.x,coordinates.y + 1,block.color);
        game.setGameMatrix(coordinates.x + 1,coordinates.y,block.color);
        game.setGameMatrix(coordinates.x + 1,coordinates.y + 1,block.color);


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
        let coor = block.getBorders();

        if ((coor.x1-1)>0){
            if((this.gameMatrix[coor.x1-1][coor.y1] !== this.bgColor)||(this.gameMatrix[coor.x1-1][coor.y2] !== this.bgColor)){
                block.lockLeft();
            }
            else{
                block.unlockLeft();
            }
        }

        if ((coor.x2+1)<this.gameMatrix.length){
            if((this.gameMatrix[coor.x2+1][coor.y1] !== this.bgColor)||(this.gameMatrix[coor.x2+1][coor.y2] !== this.bgColor)){
                block.lockRight();
            }
            else{
                block.unlockRight();
            }
        }


    }
}

