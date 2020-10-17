import React from 'react';

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

export default Square;
