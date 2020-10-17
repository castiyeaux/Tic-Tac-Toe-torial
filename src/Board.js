import React from 'react';
import Square from './Square';

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

export default Board;
