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