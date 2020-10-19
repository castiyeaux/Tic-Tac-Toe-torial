import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Board from './Board';

function Game() {
    // Define State Variables
    const [history, setHistory] = useState([{
        squares: Array(9).fill(null),
    }]);
    const [xIsNext, setXIsNext] = useState(true);
    const [stepNumber, setStepNumber] = useState(0);

    function handleClick(i) {
        const history1 = history.slice(0, stepNumber + 1);
        const current1 = history1[history1.length - 1];
        const squares1 = current1.squares.slice();
        if(calculateWinner(squares1) || squares1[i]) {
            return;
        }
        squares1[i] = xIsNext ? 'X' : 'O';

        const column1 = (i % 3) + 1;

        const row1 = Math.floor(i / 3) + 1;

        setHistory((history1.concat([{
            squares: squares1,
            exOh: xIsNext ? 'X' : 'O',
            column: column1,
            row: row1,
            location: ' Move Location: (' + column1 + ',' + row1 + ')'
        }])));
        setXIsNext(!xIsNext);
        setStepNumber(history1.length);
    } // end handleClick()

    function jumpTo(step) {
        setStepNumber(step);
        setXIsNext((step % 2) === 0);
    } // end jumpTo()

    const history2 = history;
    const current = history2[stepNumber];
    const begin = 'Go to start of game';

    const moves = history2.map((step, move) => {
        const desc = move ? 'Go to move #' + move : begin;
        const location1 = step.location;
        return (
            <li key={move} style={{fontWeight: (move === stepNumber) ? 'bold' : 'normal'}}>
                <button onClick={() => jumpTo(move)}>{desc}</button>
                &nbsp;
                <span style={{color: (step.exOh === "X") ? 'red' : 'blue'}}>
                    {step.exOh}
                </span>{location1}
            </li>
        );
    });

    let next = xIsNext ? 'X' : 'O';
    let prev = xIsNext ? 'O' : 'X';
    let last = 'Previous Player: ';
    let first = (stepNumber === 0) ? null : prev;
    const winner = calculateWinner(current.squares);
    const moveNumber = stepNumber;
    let status;
    if (winner) {
        status = 'Winner: ';
        next = null;
        last = null;
        first = null;
    }
    else if(moveNumber === 9) {
        status = 'No Winner: DRAW!'
    }
    else {
        status = 'Next Player: ';
    }

    return (
        <div>
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => handleClick(i)}
                        winner={winner}
                    />
                </div>
                <div className="game-info">
                    <div className={winner ? "winner" : (moveNumber === 9) ? "draw" : "status"}>
                        {status}
                        <span
                            style={{
                                color: (winner && winner.winnerSymbol === 'X') || (next === 'X') ? 'red' : 'blue'
                            }}
                        >
                            {winner ? winner.winnerSymbol : (moveNumber === 9) ? null : next}
                        </span>
                    </div>
                    <p>
                        {last}<span style={{color: (prev === 'X') ? 'red' : 'blue'}}>{first}</span>
                    </p>
                    <p>Current Move #: {stepNumber}</p>
                </div>
                <ol>{moves}</ol>
            </div>
        </div>
    ); // end return()

    function calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && ((squares[a] === squares[b]) && (squares[a] === squares[c]))) {
                return {
                    winnerSymbol: squares[a],
                    winnerCombo: [a, b, c]
                };
            }
        }
        return null;
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
