import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { StateService, State, SaveItem } from './../state.service';
import { MyhttpService } from './../../myhttp.service';
import { Observable } from 'rxjs/Rx';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

	private _status: string = 'fetching';

	private _stateService: StateService;

	private _playerName: string;

	private _saveName: string;

	private _myhttpservice: MyhttpService;

	private _savesList: SaveItem[];
	
	private _saveIcon: boolean = false;

	_handleSubmitClick() {
		this._stateService.state.player_name = this._playerName;
	}

	_handleSaveClick() {
		this._myhttpservice.postGame(this._stateService.state)
		.subscribe(
			data => {
					console.log("Response: ", data);
					this._stateService.updateLastSavedGame(data['uri']);
					let item: SaveItem = {
						name: this._saveName,
						uri: data['uri']
					}
					this._stateService.addSave(item);
					this._saveIcon = true;
			},
			error => {
			  console.error("Error saving game!");
			  return Observable.throw(error);
			}
		 );
	}

	_restoreItem(index: number) {
		console.log("restore: ", index);
	}

	_removeItem(item: SaveItem) {
		this._stateService.removeSave(item);
	}

  constructor(route: ActivatedRoute, stateService: StateService, myhttpService: MyhttpService) {
	  this._stateService = stateService;
		this._myhttpservice = myhttpService;
		let id: number;
		route.params.subscribe(params => {
			id = +params['index']; // (+) converts string 'id' to a number
	  });
  	if (route.snapshot.data.continue) {
			if(id!>=0) {
				this._myhttpservice.getSavedGame(this._stateService.state.savesList[id].uri).subscribe((state:State) => {
				  this._stateService.updateState(state);
				  this._status = 'success';
  		  }, error => {
  			  this._status = error.statusText;
			  });
			} else {
			  this._myhttpservice.getLatestSavedGame().subscribe((state:State) => {
				  this._stateService.updateState(state);
				  this._status = 'success';
  		  }, error => {
  			  this._status = error.statusText;
			  });
		  }
  	} else {
			if(route.snapshot.data.list) {
				this._status = 'list';
				this._savesList = this._stateService.state.savesList;
			} else {
			  this._stateService.reset();
			  this._status = 'success';
			}
		}
  }

  ngOnInit() {
  }
}
