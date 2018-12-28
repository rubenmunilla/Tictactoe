import { Component, OnInit } from '@angular/core';

import { StateService } from './../state.service';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent implements OnInit {

  private _stateService: StateService;

  constructor(stateService: StateService) { 
  	this._stateService = stateService;
  }

  ngOnInit() {
  }
  
  onReset() {
	  console.log("Reset");
	  this._stateService.reset();
  }

}
