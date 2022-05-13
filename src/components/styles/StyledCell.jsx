import styled from 'styled-components';

export const StyledCell = styled.div`
    width: auto;
    /* getting the rgb values from Cell as prop (from inline function), which in turn is imported from tetrominos (Conditional CSS) */
    background: rgba(${props => props.color}, 0.8);
    /* setting the border, if the tetromino is absent, then no border reqd */
    border: ${props => (props.type === 0 ? '0px' : '4px solid')};
    border-bottom-color: rgba(${props => props.color}, 0.1);
    border-right-color: rgba(${props => props.color}, 1);
    border-top-color: rgba(${props => props.color}, 1);
    border-left-color: rgba(${props => props.color}, 0.3);
`