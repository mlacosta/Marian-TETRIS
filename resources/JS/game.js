const GAME_MATRIX = [[0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
                    [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
                    [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
                    [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
                    [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
                    [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
                    [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
                    [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
                    [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
                    [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
                    [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
                    [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
                    [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
                    [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
                    [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
                    [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ]];

export class Game{

    constructor(params){
        this.gameWidht = params.gameWidht;
        this.gameHeigth = params.gameHeigth;
        this.gameUnit = params.gameUnit;
        this.speed = params.gameSpeed;
        this.gameMatrix = GAME_MATRIX;
    }

}