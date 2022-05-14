import { useState, useEffect } from 'react';
// useEffect for the effect to be rendered 

import { createStage } from '../gameHelper';

export const useStage = (player, resetPlayer) => {
    const [stage, setStage] = useState(createStage());

    useEffect(() => {
        const updateStage = prevStage => {
            // flush the stage
            const newStage = prevStage.map(row =>
                // grabbing the status of the cell ie [0, 'clear'] or [0, 'merged'] from gameHelper's createStage
                // if a cell has status 'clear', clear it off otherwise ('merged') make the cell stay in the stage
                row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell)),
            );

            // draw a tetromino using player object from tetris, looping through the tetromino property, to get to know which tetromino
            player.tetromino.forEach((row, y) => {
                row.forEach((value, x) => {
                    // if there is a valid tetromino, value != 0
                    if (value !== 0) {
                        // setting up the stage with the tetromino at the position
                        newStage[y + player.pos.y][x + player.pos.x] = [
                            value,
                            // if the tetromino has collided, we set it to merged and do not clear it in newStage
                            `${player.collided ? 'merged' : 'clear'}`,
                        ]
                    }
                });               
            });
            
            return newStage;
        };

        setStage(prev => updateStage(prev));
        // dependencies in []
    }, [player]);

    return [stage, setStage];
}