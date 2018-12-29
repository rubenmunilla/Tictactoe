import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { State } from './game/state.service';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MyhttpService {

  constructor(private httpClient: HttpClient) { }

  getSavedGame () {
  	return this.httpClient.get('https://api.myjson.com/bins/i216a');
  }

  postGame (state:State): Observable<Object> {
    let response = this.httpClient.post('https://api.myjson.com/bins', state, httpOptions);

    return response;
  }
}
