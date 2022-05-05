import React from 'react';
import Cell from './Cell';

function Stage ({ stage }) {
    // stage is a 2d array passed from gameHelper createStage fxn
    return (
        <div>
        {/* cell is the element in the 2d array and x is its index */}
            {stage.map(row => 
                row.map((cell, x) => 
                    <Cell key={x} type={cell[0]} />
            ))}
        </div>
    );
}

export default Stage;