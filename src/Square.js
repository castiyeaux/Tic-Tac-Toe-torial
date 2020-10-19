import React from 'react';

function Square(props) {
    return (
        <button
            className="square"
            onClick={() => props.onClick()}
            style={{
                color: props.value === 'X' ? 'rgb(134, 2, 2)' : 'rgb(5, 3, 139)',
                backgroundColor: (props.winner && props.winner.winnerCombo.includes(props.index)) ? 'yellow' : 'black'
            }}
        >
            {props.value}
        </button>
    );
}

export default Square;
