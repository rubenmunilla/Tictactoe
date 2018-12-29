import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export interface State {
    turn: string,
    values: string[][],
    player_name: string,
    last_saved_game: string
}

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private _state$: BehaviorSubject<State>;

  constructor() { 
	  this._state$ = new BehaviorSubject({
      turn: 'PLAYERX',
      values: [
        ['-','-','-'],
        ['-','-','-'],
        ['-','-','-']
      ],
      player_name: '',
      last_saved_game: 'https://api.myjson.com/bins/i216a' 
    });
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
    if(this.state.values[row][col] === '-') {
      let newValue = this.state.turn === 'PLAYERX' ? 'X' : '0';
      let newTurn = this.state.turn === 'PLAYERX' ? 'PLAYER0' : 'PLAYERX';
      this.state.values[row][col] = newValue;
      this.state.turn = newTurn;
      this.state = this.state;
    }
  }

  reset() {
    let uri = this.state.last_saved_game;
    this.state = {
      turn: 'PLAYERX',
      values: [
        ['-','-','-'],
        ['-','-','-'],
        ['-','-','-']
      ],
      player_name: '',
      last_saved_game: uri
    };
  }

  updateLastSavedGame (url: string) {
    this.state.last_saved_game = url;
  }

  updateState (newstate: State) {
    this.state.turn = newstate!.turn;
    this.state.player_name = newstate!.player_name;
    this.state.values = newstate!.values;
  }
}
