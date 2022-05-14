import { useCallback, useState } from 'react';
import { STAGE_WIDTH } from '../gameHelper';

import { TETROMINOS, randomTetromino } from '../tetrominos';

export const usePlayer = () => {
    const [player, setPlayer] = useState({
        // setting initial state for player, using it to Tetris
        pos: {x: 0, y: 0},
        // starts off with an empty [0, 'clear'] tetromino
        tetromino: TETROMINOS[0].shape,
        collided: false
    });

    const updatePlayerPos = ({ x, y, collided }) => {
        // setting player coordinates
        setPlayer(prev => ({
            ...prev,
            pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
            collided,
        }));
    };

    // useCallback to prevent infinite loop
    const resetPlayer = useCallback(() => {
        setPlayer({
            // setting position at the top middle and assigning a randomTetromino
            pos: { x: STAGE_WIDTH / 2 - 2, y: 0},
            tetromino: randomTetromino().shape,
            collided: false
        })
    }, []);

    return [player, updatePlayerPos, resetPlayer];
}