export const inputHandler = (block) =>{

    document.addEventListener('keydown', (event)=>{

        switch(event.keyCode){
            case 37:
                block.moveLeft();
                break;
            case 39:
                block.moveRight();
                break;
            case 40:
                block.increaseSpeed();
                break;
        }
    })
    
    document.addEventListener('keyup', (event)=>{
    
    
        switch(event.keyCode){
            case 40:
                block.restoreSpeed();
                break;
        }
    })

}


export const collisionDetection = (block,game)=>{
    if (block.position.y + block.gameUnit*2 >= block.gameHeigth){ //collision
        block.position.y = block.gameHeigth - block.gameUnit*2;
        game.state.updateMatrix(block,game);
    }

    let lowCoordinates = block.getLowCoordinates()

    if((game.gameMatrix[lowCoordinates.x][lowCoordinates.y] !== game.bgColor) 
        || (game.gameMatrix[lowCoordinates.x+1][lowCoordinates.y] !== game.bgColor)){
        game.state.updateMatrix(block,game);
    }

    console.log(lowCoordinates);



}