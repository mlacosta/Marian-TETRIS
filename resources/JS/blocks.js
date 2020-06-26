const colors = ['#fcba03','#fc3103','#f8fc03','#adfc03',
                '#03fc03','#03ebfc','#0367fc','#6203fc',
                '#ce03fc','#fc039d','#800040'];

export class Block {
    constructor (params){
        this.color = colors[Math.floor(Math.random()*colors.length)];
        this.gameWidht = params.gameWidht;
        this.gameHeigth = params.gameHeigth;
        this.gameUnit = params.gameUnit;
        this.speed = params.speed;
        this.defaultSpeed = params.speed;
        this.maxSpeed = params.maxSpeed;
        this.xSpeed = this.gameUnit;
        this.position = {
            x:Math.floor(Math.random()*19)*this.gameUnit,
            y:0
        }
        this.enableRight = true;
        this.enableLeft = true;
        this.type = 'block';

    }

    draw (context){
        context.fillStyle = this.color;
        context.fillRect(
                        this.position.x,
                        this.position.y,
                        this.gameUnit*2,
                        this.gameUnit*2
                        );
    }
    
    update(game){
        this.position.y += this.speed;

    }

    moveLeft(){

        if (this.enableLeft){
            this.position.x -= this.xSpeed;
        }
        
        if (this.position.x <= 0){
            this.position.x = 0;
        } 
    }

    moveRight(){
        if (this.enableRight){
            this.position.x += this.xSpeed;
            
        }
        
        if (this.position.x >= (this.gameWidht - 2*this.gameUnit)){
            this.lockRight();
            this.position.x = this.gameWidht - 2*this.gameUnit;
            
        } 
    }

    increaseSpeed(){
        this.speed = 15;
    }

    restoreSpeed(){
        this.speed = this.defaultSpeed;
    }

    getCoordinates(){
        let unitX = Math.floor(this.position.x / this.gameUnit);
        let unitY = Math.floor(this.position.y / this.gameUnit);
        
        return {x: unitX , y: unitY};
    }

    getLowCoordinates(){
        let unitX = Math.floor(this.position.x / this.gameUnit);
        let unitY = Math.floor((this.position.y + 2*this.gameUnit)/ this.gameUnit);
    
        return {x: unitX , y: unitY};
    }

    getBorders(){
        let x1 = Math.floor(this.position.x / this.gameUnit);
        let x2 = x1 + 1;
        let y1 = Math.floor(this.position.y / this.gameUnit);
        let y2 = y1 + 1;

        return {x1,x2,y1,y2};
    }

    collisionDetection = (game)=>{
        let lowCoordinates = this.getLowCoordinates();
        let highCoordinates = this.getCoordinates();
        
        if (game.gameMatrix[highCoordinates.x][0] !== game.bgColor){
            game.state.gameOver(game);
            
        }
        
        if (this.position.y + this.gameUnit*2 >= this.gameHeigth){ //collision with the ground
            this.position.y = this.gameHeigth - this.gameUnit*2;
            game.state.updateMatrix(this,game);
        }
    

        if((game.gameMatrix[lowCoordinates.x][lowCoordinates.y] !== game.bgColor) 
            || (game.gameMatrix[lowCoordinates.x+1][lowCoordinates.y] !== game.bgColor)){
            game.state.updateMatrix(this,game);
        }
    
        //console.log(lowCoordinates);

    }

    lockRight(){
        this.enableRight = false;
    }

    lockLeft(){
        this.enableLeft =  false;
    }

    unlockRight(){
        this.enableRight = true;
    }

    unlockLeft(){
        this.enableLeft =  true;
    }

}

class Stick extends Block{
    constructor(params){
        super(params);
        this.type = 'stick';
    }

    draw (context){
        context.fillStyle = this.color;
        context.fillRect(
                        this.position.x,
                        this.position.y,
                        this.gameUnit*1,
                        this.gameUnit*4
                        );
    }

    getLowCoordinates(){
        let unitX = Math.floor(this.position.x / this.gameUnit);
        let unitY = Math.floor((this.position.y + 4*this.gameUnit)/ this.gameUnit);
    
        return {x: unitX , y: unitY};
    }

    getBorders(){
        let x1 = Math.floor(this.position.x / this.gameUnit);
        let x2 = x1;
        let y1 = Math.floor(this.position.y / this.gameUnit);
        let y2 = y1 + 3;

        return {x1,x2,y1,y2};
    }

    collisionDetection = (game)=>{
        let lowCoordinates = this.getLowCoordinates();
        let highCoordinates = this.getCoordinates();
        
        if (game.gameMatrix[highCoordinates.x][0] !== game.bgColor){
            game.state.gameOver(game);
            
        }
        
        if (this.position.y + this.gameUnit*3 >= this.gameHeigth){ //collision with the ground
            this.position.y = this.gameHeigth - this.gameUnit*4;
            game.state.updateMatrix(this,game);
        }
    

        if((game.gameMatrix[lowCoordinates.x][lowCoordinates.y] !== game.bgColor)){
            game.state.updateMatrix(this,game);
        }

    }

    moveRight(){
        if (this.enableRight){
            this.position.x += this.xSpeed;
            
        }
        
        if (this.position.x >= (this.gameWidht)){
            this.lockRight();
            this.position.x = this.gameWidht-this.gameUnit;
            
        } 
    }

}

class Stick_H extends Block{
    constructor(params){
        super(params);
        this.position = {
            x:Math.floor(Math.random()*17)*this.gameUnit,
            y:0
        }
        this.type = 'stick_h';
    }

    draw (context){
        context.fillStyle = this.color;
        context.fillRect(
                        this.position.x,
                        this.position.y,
                        this.gameUnit*4,
                        this.gameUnit*1
                        );
    }


    getBorders(){
        let x1 = Math.floor(this.position.x / this.gameUnit);
        let x2 = x1 + 3;
        let y1 = Math.floor(this.position.y / this.gameUnit);
        let y2 = y1;

        return {x1,x2,y1,y2};
    }

    collisionDetection = (game)=>{

        let highCoordinates = this.getCoordinates();
        
        if (game.gameMatrix[highCoordinates.x][0] !== game.bgColor){
            game.state.gameOver(game);
            
        }
        
        if (this.position.y>= this.gameHeigth){ //collision with the ground
            this.position.y = this.gameHeigth;
            game.state.updateMatrix(this,game);
        }
    

        if((game.gameMatrix[highCoordinates.x][highCoordinates.y + 1] !== game.bgColor)
            ||(game.gameMatrix[highCoordinates.x + 1][highCoordinates.y + 1] !== game.bgColor)
            ||(game.gameMatrix[highCoordinates.x + 2][highCoordinates.y + 1] !== game.bgColor)
            ||(game.gameMatrix[highCoordinates.x + 3][highCoordinates.y + 1] !== game.bgColor)){
            //alert();
            game.state.updateMatrix(this,game);
        }

    }

    moveRight(){
        if (this.enableRight){
            this.position.x += this.xSpeed;
            
        }
        
        if (this.position.x + 3*this.gameUnit>= (this.gameWidht)){
            this.lockRight();
            this.position.x = this.gameWidht-4*this.gameUnit;
            
        } 
    }

}

class Lstick extends Block{
    constructor(params){
        super(params);
        this.type = 'L-stick';
        this.position = {
            x:Math.floor(Math.random()*18)*this.gameUnit,
            y:0
        }
    }

    draw (context){
        context.fillStyle = this.color;
        context.fillRect(
                        this.position.x,
                        this.position.y,
                        this.gameUnit*3,
                        this.gameUnit*1
                        );
        context.fillRect(
            this.position.x,
            this.position.y+this.gameUnit,
            this.gameUnit,
            this.gameUnit
            );
    }

    getLowCoordinates(){
        let unitX = Math.floor(this.position.x / this.gameUnit);
        let unitY = Math.floor((this.position.y + 2*this.gameUnit)/ this.gameUnit);
    
        return {x: unitX , y: unitY};
    }

    getBorders(){
        let x1 = Math.floor(this.position.x / this.gameUnit);
        let x2 = x1 + 2;
        let y1 = Math.floor(this.position.y / this.gameUnit);
        let y2 = y1 + 3;

        return {x1,x2,y1,y2};
    }

    collisionDetection = (game)=>{
        let lowCoordinates = this.getLowCoordinates();
        let highCoordinates = this.getCoordinates();
        
        if ((game.gameMatrix[highCoordinates.x][0] !== game.bgColor)){
            game.state.gameOver(game);
            
        }
        
        if (this.position.y + this.gameUnit >= this.gameHeigth){ //collision with the ground
            this.position.y = this.gameHeigth - this.gameUnit;
            game.state.updateMatrix(this,game);
        }
    

        if((game.gameMatrix[lowCoordinates.x][lowCoordinates.y] !== game.bgColor)){
            game.state.updateMatrix(this,game);
        }

        
        if((game.gameMatrix[highCoordinates.x + 1][highCoordinates.y + 1] !== game.bgColor)
            ||(game.gameMatrix[highCoordinates.x + 2][highCoordinates.y + 1] !== game.bgColor)){
            game.state.updateMatrix(this,game);
        }

    }

    moveRight(){
        if (this.enableRight){
            this.position.x += this.xSpeed;
            
        }
        
        if (this.position.x + 3*this.gameUnit>= (this.gameWidht)){
            this.lockRight();
            this.position.x = this.gameWidht-3*this.gameUnit;
            
        } 
    }

}

export const blockFactory = (params)=>{
    let choice = Math.floor(Math.random()*4);

    switch(choice){
        case 0:
            return new Block(params);
            break;
        case 1:
            return new Stick(params);
            break;
        case 2:
            return new Stick_H(params);
            break;
        case 3:
            return new Lstick(params);
            break;
    }
    
}