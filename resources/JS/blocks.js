const colors = ['#fcba03','#fc3103','#f8fc03','#adfc03',
                '#03fc03','#03ebfc','#0367fc','#6203fc',
                '#ce03fc','#fc039d'];

export class Block {
    constructor (params){
        this.color = colors[Math.floor(Math.random()*10)];
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
        this.position.x -= this.xSpeed;
        if (this.position.x <0){
            this.position.x = 0;
        } 
    }

    moveRight(){
        this.position.x += this.xSpeed;
        if (this.position.x > (this.gameWidht - 2*this.gameUnit)){
            this.position.x = this.gameWidht - 2*this.gameUnit;
        } 
    }

    increaseSpeed(){
        this.speed = 22;
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

}

export const blockFactory = (params)=>{
    return new Block(params);
}