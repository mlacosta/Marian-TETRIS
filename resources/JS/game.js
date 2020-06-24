const BG = '#fef'; //background color

export class State {
    constructor(){
        this.state = 'new block';
    }

    updateMatrix(block,game){
        this.state = 'update matrix';
        let coordinates = game.getCoordinates(block);
        
        console.log(coordinates)
        game.setGameMatrix(coordinates.x,coordinates.y,block.color);
        game.setGameMatrix(coordinates.x,coordinates.y+1,block.color);


    }

    newBlock(){
        this.state = 'new block';
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

        let verticalUnits = [];

        for (let i = 0; i<(this.gameHeigth/this.gameUnit); i++){
            verticalUnits.push(BG);
        }

        for (let i = 0; i<(this.gameWidht/this.gameUnit); i++){
            this.gameMatrix.push(verticalUnits);
        }

        console.log(this.gameMatrix.length)
    }

    getCoordinates(block){
        let unitX = Math.floor(block.position.x / this.gameUnit);
        let unitY = Math.floor(block.position.y / this.gameUnit);
        
        return {x: unitX , y: unitY};
    }

    setGameMatrix(x,y,color){
        this.gameMatrix[5][y] = color;
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
}

