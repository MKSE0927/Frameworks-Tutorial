import React from 'react';
import ReactDOM, { render } from 'react-dom';
import './index.css';

// render()のみを実装し、stateを持たないコンポーネントを関数コンポーネントとできる。
function Square(props) {
    return(
        <button className='square' onClick={props.onClick} >
            {props.value}
        </button>
    )
}
  /**
   * マス目(Square)の状態をstateで持ち、propsで描画する値が〇かXかを返す。
   */
  class Board extends React.Component {

    // propsを利用したデータの受け渡し。Square関数にvalueという名称のpropsを渡す。
    renderSquare(i) {
      return (
            <Square
                value = {this.props.squares[i]} 
                onClick={() => this.props.onClick(i)} />
            );
    }

    render() {
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  // ゲームの判定、Boradの状態を管理する。
  class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            history : [{
                squares: Array(9).fill(),
            }],
            stepNumber: 0,
            xIsNext: true,
        }
    }
    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber +1);
        const current = history[history.length -1]
        const squares = current.squares.slice()

        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext? 'X' : '〇'

        this.setState({
            history: history.concat([{
              squares: squares
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
          });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        })
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber]
        const winner = calculateWinner(current.squares)

        const moves = history.map((step, move)=>{
            const desc = move ? 'Go to move #'.concat(move) :
                                'Go to game start!' 
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });
      
       let status;
       if(winner) {
           status = 'Winner :'.concat(winner)
       } else {
           status = 'Next player'+(this.state.xIsNext?'X':'〇')
       }
      
      return (
        <div className="game">
          <div className="game-board">
            <Board 
              squares= {current.squares}
              onClick= {i => this.handleClick(i)}/>
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
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
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }