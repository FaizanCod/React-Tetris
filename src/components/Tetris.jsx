import React, { useState } from 'react';

// creating a clean new stage
import { createStage } from '../gameHelper';

import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

// Styled components
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';

// Custom hooks
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';

function Tetris () {
    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    const [player, updatePlayerPos, resetPlayer] = usePlayer();
    // sending player to useStage
    const [stage, setStage] = useStage(player);

    console.log('re-render');

    // moving left or right
    const movePlayer = dir => {
        updatePlayerPos({x: dir, y: 0});
    }

    const startGame = () => {
        // Resetting everything
        setStage(createStage());
        resetPlayer();
    }

    // dropping tetromino down
    const drop = () => {
        updatePlayerPos({ x: 0, y: 1, collided: false });
    }

    const dropPlayer = () => {
        drop();
    }

    // handling keypresses
    const move = ({ keyCode }) => {
        if (!gameOver) {
            // left
            if (keyCode === 37) {
                movePlayer(-1);
            // right
            } else if (keyCode === 39) {
                movePlayer(1);
            // down
            } else if (keyCode === 40) {
                dropPlayer();
            }
        }
    }

    return (
        // TetrisWrapper to respond to key evenets
        <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)}>
            <StyledTetris>
                <Stage stage={stage} />
                <aside>
                { gameOver ? (
                    <Display gameOver={gameOver} text="Game Over" />
                ) : (
                    <div>
                        <Display text="Score" />
                        <Display text="Rows" />
                        <Display text="Level" />
                    </div>
                )}
                    {/* calling startGame each time button is clicked */}
                    <StartButton callback={startGame}/>
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    )
}

export default Tetris;