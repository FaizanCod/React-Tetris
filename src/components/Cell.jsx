import React from 'react';
import { StyledCell } from './styles/StyledCell';
import { TETROMINOS } from '../tetrominos';

function Cell({ type }) {
    return (
        <StyledCell type={type} color={TETROMINOS[type].color} >{console.log('re-render')}</StyledCell>
    );
}

// memoisation of rendering the number of cells
// only re-renders the cells that change
export default React.memo(Cell);