import React from 'react';

function Square(props) {
    return (
        <button
            className="square"
            onClick={() => props.onClick()}
            style={{
                color: props.value === 'X' ? 'red' : 'blue',
                backgroundColor: (props.winner && props.winner.winnerCombo.includes(props.index)) ? 'yellow' : 'white'
            }}
        >
            {props.value}
        </button>
    );
}

export default Square;
