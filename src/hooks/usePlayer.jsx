import { useCallback, useState } from 'react';
import { checkCollision, STAGE_WIDTH } from '../gameHelper';

import { TETROMINOS, randomTetromino } from '../tetrominos';

export const usePlayer = () => {
    const [player, setPlayer] = useState({
        // setting initial state for player, using it to Tetris
        pos: {x: 0, y: 0},
        // starts off with an empty [0, 'clear'] tetromino
        tetromino: TETROMINOS[0].shape,
        collided: false
    });

    const rotate = (matrix, dir) => {
        // shifting rows to cols (transposing)
        const rotatedTetro = matrix.map((_, index) =>
            matrix.map(col => col[index])
        );

        // reverse each row
        // clockwise rotation
        if (dir > 0) return rotatedTetro.map(row => row.reverse());
        // anticlockwise rotation
        return rotatedTetro.reverse();
    };

    const playerRotate = (stage, dir) => {
        // deep copy player
        const clonedPlayer = JSON.parse(JSON.stringify(player));
        clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);

        // to check for rotation outside boundaries and also for collision with other tetrominos
        const pos = clonedPlayer.pos.x;
        let offset = 1;
        while (checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
            clonedPlayer.pos.x += offset;
            // checking on both left and right side for collision
            offset = -(offset + (offset > 0 ? 1 : -1));
            // out of boundaries
            if (offset > clonedPlayer.tetromino[0].length) {
                // rotate it back
                rotate(clonedPlayer.tetromino, -dir);
                clonedPlayer.pos.x = pos;
                return ;
            }
        }

        setPlayer(clonedPlayer);
    };

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

    return [player, updatePlayerPos, resetPlayer, playerRotate];
}