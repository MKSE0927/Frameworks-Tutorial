import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// React.Componentを継承する。ReactのDOM定義を行う。
class Square extends React.Component {
    /*
        stateを利用して値更新を行う。setState()で値を設定できる。
        今回は、クリック時に自身(Squre)のstate.valueに'X'を設定する。
    */
    render() {
      return (
        <button className="square" onClick={() => {this.props.onClick()}}>
          {this.props.value}
        </button>
      );
    }
  }
  
  /**
   * 升目(Square)の状態をstateで持ち、propsで描画する値が〇かXかを返す。
   */
  class Board extends React.Component {
          
    /*  render()関数でReact要素を生成する。
        propsにある、「value」という名称の変数の値を利用する。
        propsは「親コンポーネントから子コンポーネント」に渡す。
    */
    constructor(props) {
        // JavScriptでのコンストラクタは常にsuper()の呼び出しが必要。
        super(props)
        this.state = {  
            squares: Array(9).fill(null)
        };
    }

    // 子コンポーネントに渡すクリック時の処理
    handleClick(i) {
        const squares = this.state.squares.slice()
        squares[i] = 'X'
        this.setState({squares:squares})
    }
  
    // propsを利用したデータの受け渡し。Square関数にvalueという名称のpropsを渡す。
    renderSquare(i) {
      return (
            <Square
                value = {this.state.squares[i]} 
                onClick={() => this.handleClick(i)} />
            );
    }

    render() {
      const status = 'Next player: X';
  
      return (
        <div>
          <div className="status">{status}</div>
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
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
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
  