const colors = ['#fcba03','#fc3103','#f8fc03','#adfc03',
                '#03fc03','#03ebfc','#0367fc','#6203fc',
                '#ce03fc','#fc039d'];

export class Block {
    constructor (game){
        this.color = colors[Math.floor(Math.random()*10)];
        this.gameWidht = game.gameWidht;
        this.gameHeigth = game.gameHeigth;
        this.gameUnit = game.gameUnit;
        this.speed = game.speed;
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
}

export const blockFactory = (game)=>{
    return new Block(game);
}