let inputHandler = ( ()=>{



}
)();

export const collisionDetection = (block,game)=>{
    if (block.position.y + block.gameUnit*2 >= block.gameHeigth){ //collision
        block.position.y = block.gameHeigth - block.gameUnit*2;
        game.state.updateMatrix(block,game);
    }
}