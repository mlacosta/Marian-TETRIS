const colors = ['#fcba03','#fc3103','#f8fc03','#adfc03',
                '#03fc03','#03ebfc','#0367fc','#6203fc',
                '#ce03fc','#fc039d','#800040'];

export class Block {
    constructor (params,position,color){
        this.color = color;
        this.gameWidht = params.gameWidht;
        this.gameHeigth = params.gameHeigth;
        this.gameUnit = params.gameUnit;
        this.speed = params.gameSpeed;
        this.defaultSpeed = params.gameSpeed;
        this.maxSpeed = params.maxSpeed;
        this.xSpeed = this.gameUnit;
        this.position = position;
        this.enableRight = true;
        this.enableLeft = true;
        this.type = 'block';
        this.body = [position,
                     {x:this.position.x + this.gameUnit, y:this.position.y},
                     {x:this.position.x, y:this.position.y  + this.gameUnit},
                     {x:this.position.x  + this.gameUnit, y:this.position.y  + this.gameUnit}]

        this.bodyCoor = [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}];    
    }

    drawUnit(unit,context){
        context.fillStyle = this.color;
        context.fillRect(
            unit.x,
            unit.y,
            this.gameUnit,
            this.gameUnit
            );
    }
    draw (context){
        

        for(let i = 0; i<4;i++){
            this.drawUnit(this.body[i],context);
        }

    }
    
    update(){
     
        for (let i= 0;i<4;i++){
            this.body[i].y+=this.speed;
        }

        for (let i = 0; i<4; i++){
            this.bodyCoor[i].x = Math.floor(this.body[i].x / this.gameUnit);
            this.bodyCoor[i].y = Math.floor(this.body[i].y / this.gameUnit);
        }


    }

    moveLeft(){

        for (let i= 0;i<4;i++){
            if (this.body[i].x - this.gameUnit< 0){
                this.lockLeft();
                break;
            }else{
                this.unlockLeft();
            }
        }

        if (this.enableLeft){
            for (let i= 0;i<4;i++){
                this.body[i].x-=this.gameUnit;
            }
        }

    }

    moveRight(){
        for (let i= 0;i<4;i++){
            if ((this.body[i].x + 2*this.gameUnit) > this.gameWidht){
                this.lockRight();
                break;

            }
            else{
                this.unlockRight();
            }
        }

        if (this.enableRight){
            for (let i= 0;i<4;i++){
                this.body[i].x+=this.gameUnit;
            }
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

        for(let i=0; i<4;i++){
            if(this.body[i].y === 0){
                if (game.gameMatrix[this.body[0].x] !== game.bgColor){
                    game.state.gameOver(game);
                    break;
                }
            }
        }

        for(let i=0; i<4;i++){
            if(this.bodyCoor[i].y + 1 === (this.gameHeigth / this.gameUnit)){
                game.state.updateMatrix(this,game);
                break;
            }
        }

        
        for(let i=0; i<4;i++){
            if(game.gameMatrix[this.bodyCoor[i].x][this.bodyCoor[i].y + 1] !== game.bgColor){
                game.state.updateMatrix(this,game);
                break;
            }
        }
    
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

export class Stick extends Block{
    constructor(params,position,color){
        super(params,position,color);
        this.type = 'stick';
        this.body = [position,
            {x:this.position.x , y:this.position.y + this.gameUnit},
            {x:this.position.x, y:this.position.y  + 2*this.gameUnit},
            {x:this.position.x, y:this.position.y  + 3*this.gameUnit}]
    }

}

export class Stick_H extends Block{
 
    
}

export const blockFactory = (params, stick_h = false)=>{
    let choice = Math.floor(Math.random()*2);
    let color = colors[Math.floor(Math.random()*colors.length)];
    let position;
    position =  {
        x:Math.floor(Math.random()*19)*params.gameUnit,
        y:0
    };

    switch(choice){
        case 0:
            position =  {
                x:Math.floor(Math.random()*19)*params.gameUnit,
                y:0
            };
            return new Block(params,position,color);
        case 1:
            position = {
                x:Math.floor(Math.random()*19)*params.gameUnit,
                y:0
            };
            return new Stick(params,position,color);
        /*case 2:
            position = {
                x:Math.floor(Math.random()*17)*params.gameUnit,
                y:0
            };
            return new Stick_H(params,position,color);
        case 3:
            position = {
                x:Math.floor(Math.random()*18)*params.gameUnit,
                y:0
            };
            return new Lstick(params,position,color);*/
    }
    
}