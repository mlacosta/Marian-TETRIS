const colors = ['#fcba03','#fc3103','#f8fc03','#adfc03',
                '#03fc03','#03ebfc','#0367fc','#6203fc',
                '#ce03fc','#fc039d'];

export class Block {
    constructor (params){
        this.color = colors[Math.floor(Math.random()*10)];
        this.gameWidht = params.gameWidht;
        this.gameHeigth = params.gameHeigth;
        this.gameUnit = params.gameUnit;
        this.speed = params.gameSpeed;
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
    
    update(){
        this.position.y += this.speed;

        if (this.position.y + this.gameUnit*2 >= this.gameHeigth){
            this.position.y = this.gameHeigth - this.gameUnit*2
        }
    }

}