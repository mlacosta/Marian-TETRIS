const GAME_MATRIX = [[]];


export class State {
    constructor(){
        this.state = 'new block';
    }

    updateMatrix(block,game){
        this.state = 'update matrix';
        let coordinates = game.getCoordinates(block);
        console.log(coordinates)
       /* game.gameMatrix[coordinates.y][coordinates.x] = 1;
        game.gameMatrix[coordinates.y + 1][coordinates.x] = 1;
        game.gameMatrix[coordinates.y + 1][coordinates.x + 1] = 1;
        game.gameMatrix[coordinates.y][coordinates.x + 1] = 1;*/
    }

}   


export class Game{

    constructor(params){
        this.gameWidht = params.gameWidht;
        this.gameHeigth = params.gameHeigth;
        this.gameUnit = params.gameUnit;
        this.speed = params.gameSpeed;
        this.gameMatrix = GAME_MATRIX;
        this.state = new State();
    }

    getCoordinates(block){
        let unitX = Math.floor(block.position.x / this.gameUnit);
        let unitY = Math.floor(block.position.y / this.gameUnit);

        return {x: unitX , y: unitY};
    }

}

