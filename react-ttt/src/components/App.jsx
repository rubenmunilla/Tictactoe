import React from 'react';
import Header from './Header.jsx';
import Board from './Board.jsx';
import Footer from './Footer.jsx';
import Buttons from './Buttons.jsx';
import { PageHeader, Alert } from 'react-bootstrap';

const PLAYERX = "Player 1 - Xs";
const PLAYER0 = "Player 2 - 0s";

const appStyle = {
  textAlign: 'center'
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        turn: PLAYERX,
        values: [
        ['-', '-', '-'],
        ['-', '-', '-'],
        ['-', '-', '-'],
        ],
        movements: 0,
        winner: '',
        winSquares: [
          ['-', '-', '-'],
          ['-', '-', '-'],
          ['-', '-', '-'],
          ],
    };
    this.appClick = this.appClick.bind(this);
    this.appReset = this.appReset.bind(this);
    }

    appClick(rowNumber, columnNumber) {
      if(this.state.winner === '') {
        let valuesCopy = JSON.parse(JSON.stringify(this.state.values));
        let newMovement = this.state.turn === PLAYERX ? 'X' : '0';
        let movements = this.state.movements + 1;
        valuesCopy[rowNumber][columnNumber] = newMovement;
        this.setState({
          turn: this.state.turn === PLAYERX ? PLAYER0 : PLAYERX,
          values: valuesCopy,
          movements: movements,
        });
        if(this.checkWinner(valuesCopy)){
          console.log("Winner",this.state.turn);
            this.setState({
              winner: this.state.turn,
            });
        }
      }
    }

    appReset() {
      this.setState({
        turn: PLAYERX,
        values: [
          ['-', '-', '-'],
          ['-', '-', '-'],
          ['-', '-', '-'],
          ],
        movements: 0,
        winner: '',
        winSquares: [
          ['-', '-', '-'],
          ['-', '-', '-'],
          ['-', '-', '-'],
          ],
      });
    }

    checkWinner(valuesCopy) {
      let winSquares = [
        ['-', '-', '-'],
        ['-', '-', '-'],
        ['-', '-', '-'],
        ];
      for(var i=0; i<3; i++){
        if((valuesCopy[i][0]===valuesCopy[i][1])
          &&(valuesCopy[i][0]===valuesCopy[i][2])
          &&(valuesCopy[i][0]!=='-')){
            winSquares[i][0] = 'W';
            winSquares[i][1] = 'W';
            winSquares[i][2] = 'W';
            this.setState({
              winSquares: winSquares,
            });
          
          return true;
        }
    
        if((valuesCopy[0][i]===valuesCopy[1][i])
          &&(valuesCopy[0][i]===valuesCopy[2][i])
          &&(valuesCopy[0][i]!=='-')){
          winSquares[0][i] = 'W';
          winSquares[1][i] = 'W';
          winSquares[2][i] = 'W';
          this.setState({
            winSquares: winSquares,
          });
          return true;
        }
      }
      if((valuesCopy[0][0]===valuesCopy[1][1])
          &&(valuesCopy[0][0]===valuesCopy[2][2])
          &&(valuesCopy[0][0]!=='-')){
            winSquares[0][0] = 'W';
            winSquares[1][1] = 'W';
            winSquares[2][2] = 'W';
            this.setState({
              winSquares: winSquares,
            });
            return true;
          }
    
      if((valuesCopy[0][2]===valuesCopy[1][1])
          &&(valuesCopy[0][2]===valuesCopy[2][0])
          &&(valuesCopy[0][2]!=='-')){
            winSquares[0][2] = 'W';
            winSquares[1][1] = 'W';
            winSquares[2][0] = 'W';
            this.setState({
              winSquares: winSquares,
            });
            return true;
          }
    
        return false;
      }

  render() {
    let text = "Turn of " + this.state.turn;
    let movements = "Number of movements: " + this.state.movements;
    let winner = this.state.winner;

    if(winner === '')
    {
      return (
        <div style={appStyle}>
          <PageHeader>
            Welcome to Tic Tac Toe! <small>by rubenmunilla</small>
          </PageHeader>
          <Header text={text}/>
          <Board values={this.state.values}  appClick={this.appClick}/>
          <Footer text={movements}/>
          <Buttons appReset={this.appReset}/>
        </div>
      );
    } else {
      return (
        <div style={appStyle}>
          <PageHeader>
            Welcome to Tic Tac Toe! <small>by rubenmunilla</small>
          </PageHeader>
          <Alert bsStyle="warning">
            <strong>We have a winner!</strong> Congratulations to {winner}!
          </Alert>
          <Header text={text}/>
          <Board values={this.state.values}  appClick={this.appClick}/>
          <Footer text={movements}/>
          <Buttons appReset={this.appReset}/>
        </div>
      );
    }
  }

}
