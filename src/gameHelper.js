export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export const createStage = () => 
    // for each element created by Array(STAGE_HEIGHT) add a new array of STAGE_WIDTH by filling each entry
    // 2d array created
    Array.from(Array(STAGE_HEIGHT), () =>
    // fill method adds element values to the 2d array
        new Array(STAGE_WIDTH).fill([0, 'clear'])
    );
    // exported to Tetris, which is then used in Stage Component passed as a prop

export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {
    // looping through the stage
    for (let y = 0; y < player.tetromino.length; y += 1) {
        for (let x = 0; x < player.tetromino[y].length; x += 1) {
            
            // check for tetromino
            if (player.tetromino[y][x] !== 0) {
                if (
                // check if the move is inside the stage
                // also shouldnt move below the bottom
                !stage[y + player.pos.y + moveY] || 

                // check if move is within width (x)
                !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||

                // check if the cell we move isnt set on 'clear'
                stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] 
                !== 'clear'
            ) {
                return true;
                }
            }
        }
    }
};