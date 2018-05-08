import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './App.css'

/*TODO: implement moves' history
interface Hist{
    id: Number,
    player : String,
    square: number,
}

interface Histprops{
    traces: Hist[];
}
*/
var isButtonVisible = false;

var count = 1;
    
function Square(props) {

  return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
  }


//Board: creates the game board manages the start of the game
class Board extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      squares : Array(9).fill(null),
      xIsNext: true,
    }
  }
  
//handleClick = manages the clicks and the display of X and Os
  handleClick(i){
    const squares = this.state.squares.slice();
    if(calculateWinner(squares) || squares[i]){
      return;
    }
    if(squares[i] == null){
      squares[i] = this.state.xIsNext ? 'X' : 'O'; 
    	this.setState({
      	squares: squares,
      	xIsNext: !this.state.xIsNext,
    	});
    }
  }
  
//renderSquare = manages values of squares and calls handleClick
  renderSquare(i) {
    return( 
      <Square 
        value={this.state.squares[i]} 
        onClick = {() => this.handleClick(i)}   
      />
    );
  }
  
  newGame(){
    count++;
    var i = 0;
    for(i = 0; i < 9; i++){
      this.state.squares[i] = null;
    }
  	this.state.xIsNext = (this.winner === 'X' ? false : true);
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if(winner){
      status = 'Winner: ' + winner;
      isButtonVisible = true;
    } else {
      status = 'Next Player: ' + (this.state.xIsNext ? 'Player 1(X)' : 'Player 2(O)');
    }

    return (
      <div>
        <div id="title">
        	<h1 id="centered">BENVENUTI AL MATCH</h1>
        	<h3 id="centered">Partita {count} di 3</h3>
        </div>
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
        <div>
          <p>     </p>
        </div>
        <div id="newgame">
          { isButtonVisible ? <button onClick={this.newGame}>Clicca per Nuova Partita</button> : null}
        </div>
      </div>
    );
  }
}

//calculateWinner = checks if someone is a winner. If we have a winner, returns a value from the array squares

function calculateWinner(squares){
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
  for (let i=0; i<lines.length; i++){
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return (squares[a] === 'X' ? 'Player 1(X)' : 'Player 2(O)');
    }
  }
  return null;
}

//Game = manages the game and displays the layout

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

export default Game;

/*

#This is the original App.js#

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
*/