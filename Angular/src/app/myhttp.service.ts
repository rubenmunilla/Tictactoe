import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { State , StateService } from './game/state.service';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MyhttpService {

  private _stateService: StateService;

  constructor(private httpClient: HttpClient, stateService: StateService) {
    this._stateService = stateService;
   }

   getLatestSavedGame () {
    console.log("Last save: ",this._stateService.state.last_saved_game);
  	return this.httpClient.get(this._stateService.state.last_saved_game);
  }

  postGame (state:State): Observable<Object> {
    let response = this.httpClient.post('https://api.myjson.com/bins', state, httpOptions);

    return response;
  }

  getSavedGame(uri: string): Observable<Object> {
    let response = this.httpClient.get(uri);

    return response;
  }
}
