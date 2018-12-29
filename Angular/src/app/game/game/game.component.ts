import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { StateService, State } from './../state.service';
import { MyhttpService } from './../../myhttp.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

	private _status: string = 'fetching';

	private _stateService: StateService;

	private _playerName: string;

	private _myhttpservice: MyhttpService;

	_handleSubmitClick() {
		this._stateService.state.player_name = this._playerName;
	}

	_handleSaveClick() {
		this._myhttpservice.postGame(this._stateService.state)
		.subscribe(
			data => {
					console.log("Response: ", data);
					this._stateService.updateLastSavedGame(data['uri']);
			},
			error => {
			  console.error("Error saving game!");
			  return Observable.throw(error);
			}
		 );
	}

  constructor(route: ActivatedRoute, stateService: StateService, myhttpService: MyhttpService) {
	this._stateService = stateService;
	this._myhttpservice = myhttpService;

  	if (route.snapshot.data.continue) {
			this._myhttpservice.getLatestSavedGame().subscribe((state:State) => {
				this._stateService.updateState(state);
				this._status = 'success';
  		}, error => {
  			this._status = error.statusText;
  		});
  	} else {
			this._stateService.reset();
			this._status = 'success';
  	}
  }

  ngOnInit() {
  }
}
