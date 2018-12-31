import React from 'react';
import Header from './Header.jsx';
import Board from './Board.jsx';
import Footer from './Footer.jsx';
import { PageHeader } from 'react-bootstrap';

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
    };
    this.appClick = this.appClick.bind(this);
    }

    appClick(rowNumber, columnNumber) {
        let valuesCopy = JSON.parse(JSON.stringify(this.state.values));
        let newMovement = this.state.turn === PLAYERX ? 'X' : '0';
        let movements = this.state.movements + 1;
        valuesCopy[rowNumber][columnNumber] = newMovement;
        this.setState({
            turn: this.state.turn === PLAYERX ? PLAYER0 : PLAYERX,
            values: valuesCopy,
            movements: movements,
        });
    }

  render() {
    let text = "Turn of " + this.state.turn;
    let movements = "Number of movements: " + this.state.movements;

    return (
      <div style={appStyle}>
        <PageHeader>
          Welcome to Tic Tac Toe! <small>by rubenmunilla</small>
        </PageHeader> 
        <Header text={text}/>
        <Board values={this.state.values}  appClick={this.appClick}/>
        <Footer text={movements}/>
      </div>
    );
}

}
