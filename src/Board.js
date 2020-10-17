import React from 'react';
import Square from './Square';

function Board(props) {
    function renderSquare(i) {
        return (
            <Square
                value={props.squares[i]}
                onClick={() => props.onClick(i)}
                winner={props.winner}
                index={i}
            />
        );
    }

    function renderRow(j) {
        let row = [];
        for(let i = j; i <= j + 2; i++) {
            row.push(renderSquare(i));
        }

        return row;
    }

    function renderBoard(k) {
        let board = [];
        for(let m = 0; m < k; m += 3) {
            board.push(<div className="board-row">{renderRow(m)}</div>);
        }
        return board;
    }

    return (
        <div>
            <div className="better-board">
                {renderBoard(9)}
            </div>
        </div>
    );
}

export default Board;
