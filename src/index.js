import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


// Functional Component - Has no state, and only had a render method
    /*
        class Square extends React.Component {
            render() {
                return(
                    ...
                );
            }
        }
    */
// function Square(props) {
//     return (
//         <button
//             className="square"
//             onClick={props.onClick}
//             style={{color: props.value === 'X' ? 'red' : 'blue'}}
//         >
//             {props.value}
//         </button>
//     );
// }
class Square extends React.Component {
    render() {
        return (
            <button
                className="square"
                onClick={() => this.props.onClick()}
                style={{
                    color: this.props.value === 'X' ? 'red' : 'blue',
                    backgroundColor: (this.props.winner && this.props.winner.winnerCombo.includes(this.props.index)) ? 'yellow' : 'white'
                }}
            >
                {this.props.value}
            </button>
        );
    }
}

class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
                winner={this.props.winner}
                index={i}
            />
        );
    }

    renderRow(j) {
        let row = [];
        for(let i = j; i <= j + 2; i++) {
            row.push(this.renderSquare(i));
        }

        return row;
    }

    renderBoard(k) {
        let board = [];
        for(let m = 0; m < k; m += 3) {
            board.push(<div className="board-row">{this.renderRow(m)}</div>);
        }
        return board;
    }

    render() {
        return (
            <div>
                <div className="better-board">
                    {this.renderBoard(9)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            xIsNext: true,
            stepNumber: 0,
            column: 'column',
            row: 'row',
            location: ' Move Location: (' + this.column + ', ' + this.row + ')'
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if(calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';

        const column = ((i=== 0) || (i === 3) || (i=== 6)) ? '1' : ((i === 1) || (i === 4) || (i === 7)) ? '2' : '3';

        const row = ((i === 0) || (i === 1) || (i === 2)) ? '1' : ((i === 3) || (i === 4) || (i === 5)) ? '2' : '3';

        this.setState({
            history: history.concat([{
                squares: squares,
                exOh: this.state.xIsNext ? 'X' : 'O',
                column: column,
                row: row,
                location: ' Move Location: (' + column + ', ' + row + ')'
            }]),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const begin = 'Go to start of game';

        const moves = history.map((step, move) => {
            const desc = move ? 'Go to move #' + move : begin;
            const location = step.location;
            return (
                <li key={move} style={{fontWeight: (move === this.state.stepNumber) ? 'bold' : 'normal'}}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                    &nbsp;
                    <span style={{color: (step.exOh === "X") ? 'red' : 'blue'}}>
                        {step.exOh}
                    </span>{location}
                </li>
            );
        });

        let next = this.state.xIsNext ? 'X' : 'O';
        let prev = this.state.xIsNext ? 'O' : 'X';
        let last = 'Previous Player: ';
        let first = (this.state.stepNumber === 0) ? null : prev;
        const winner = calculateWinner(current.squares);
        let status;
        if (winner) {
            status = 'Winner: ';
            next = null;
            last = null;
            first = null;
        } else {
            status = 'Next Player: ';
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                        winner={winner}
                    />
                </div>
                <div className="game-info">
                    <div className="status">
                        {status}
                        <span
                            style={{
                                color: (winner && winner.winnerSymbol === 'X') || (next === 'X') ? 'red' : 'blue'
                            }}
                        >
                            {winner ? winner.winnerSymbol : next}
                        </span>
                        <p>{last}<span style={{color: (prev === 'X') ? 'red' : 'blue'}}>{first}</span></p>
                        <p>Current Move #: {this.state.stepNumber}</p>
                    </div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

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

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
