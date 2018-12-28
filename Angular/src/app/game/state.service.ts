import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export interface State {
    turn: string,
    values: string[][],
    movements: number,
    winner: string,
    winSquares: string[][]
}

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private _state$: BehaviorSubject<State>;

  constructor() { 

	  let initialState = {
	    turn: 'PLAYERX',
	    values: [
	      ['-','-','-'],
	      ['-','-','-'],
	      ['-','-','-']
	    ],
	    movements: 0,
      winner: '',
	    winSquares: [
	      ['-','-','-'],
	      ['-','-','-'],
	      ['-','-','-']
	    ]
	  };

	  this._state$ = new BehaviorSubject(initialState);
  }

  get state$ (): BehaviorSubject<State> {
    return this._state$; 
  }

  get state (): State {
    return this._state$.getValue();
  }

  set state (state: State) {
    this._state$.next(state);
  }
  
  updateValue(row, col) {
    if((this.state.values[row][col] === '-')&&(this.state.winner==='')) {
      let newValue = this.state.turn === 'PLAYERX' ? 'X' : '0';
      let newTurn = this.state.turn === 'PLAYERX' ? 'PLAYER0' : 'PLAYERX';
      this.state.values[row][col] = newValue;
      if(this.checkWinner()){
        console.log("Winner",this.state.turn);
        this.state.winner = this.state.turn;
      }
      else{
        this.state.turn = newTurn;
        this.state.movements++;
        this._state$.next(this.state);
      }
    }
  }
  
  reset() {
    this.state = {
      turn: 'PLAYERX',
      values: [
        ['-','-','-'],
        ['-','-','-'],
        ['-','-','-']
      ],
      movements: 0,
      winner: '',
	    winSquares: [
	      ['-','-','-'],
	      ['-','-','-'],
	      ['-','-','-']
	    ]
    };
  }
  
  checkWinner(): boolean {
	for(var i=0; i<3; i++){
    if((this.state.values[i][0]===this.state.values[i][1])
      &&(this.state.values[i][0]===this.state.values[i][2])
      &&(this.state.values[i][0]!=='-')){
      this.state.winSquares[i][0] = 'W';
      this.state.winSquares[i][1] = 'W';
      this.state.winSquares[i][2] = 'W';
      return true;
    }

	  if((this.state.values[0][i]===this.state.values[1][i])
      &&(this.state.values[0][i]===this.state.values[2][i])
      &&(this.state.values[0][i]!=='-')){
      this.state.winSquares[0][i] = 'W';
      this.state.winSquares[1][i] = 'W';
      this.state.winSquares[2][i] = 'W';
      return true;
    }
  }
	if((this.state.values[0][0]===this.state.values[1][1])
      &&(this.state.values[0][0]===this.state.values[2][2])
      &&(this.state.values[0][0]!=='-')){
        this.state.winSquares[0][0] = 'W';
        this.state.winSquares[1][1] = 'W';
        this.state.winSquares[2][2] = 'W';
        return true;
      }
    
	if((this.state.values[0][2]===this.state.values[1][1])
      &&(this.state.values[0][2]===this.state.values[2][0])
      &&(this.state.values[0][2]!=='-')){
        this.state.winSquares[0][2] = 'W';
        this.state.winSquares[1][1] = 'W';
        this.state.winSquares[2][0] = 'W';
        return true;
      }

    return false;
  }
}
