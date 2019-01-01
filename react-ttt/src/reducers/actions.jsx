import {API_POST} from '../constants/constants';

export function playPosition(x, y, turn, values) {
    return{
        type: 'PLAY_POSITION',
        x: x,
        y: y,
        turn: turn,
        values: values
    };
}

export function fetchState(last_saved) {
  console.log(last_saved);
  return dispatch => {
    dispatch(fetchStateBegin());
    return fetch(last_saved)
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        console.log("JSON Received: ", json);
        dispatch(fetchStateSuccess(json));
        return json;
      })
      .catch(error => {
        console.log(error);
        return dispatch(fetchStateFailure(error))
      });
  };
}

export function fetchStateBegin() {
  return {  type: 'FETCH_STATE_BEGIN' };
}

export function fetchStateSuccess(json_received) {
  return {
    type: 'FETCH_STATE_SUCCESS',
    state: json_received
  };
}

export function fetchStateFailure(error) {
  return {
    type: 'FETCH_STATE_FAILURE',
    error: error
  };
}

export function newPlayer(player_name) {
  return {
    type: 'NEW_PLAYER',
    player_name: player_name
  };
}

export function resetPlayer() {
  return {
    type: 'RESET_PLAYER',
    player_name : ''
  };
}

export function saveGame(state, props) {
  return dispatch => {
    let state_to_send = {
      turn: props.turn,
      values: props.values,
      player_name: state.player_name
    };
    dispatch(fetchStateBegin());
    return fetch(API_POST,
      {
        method: 'POST',
        body: JSON.stringify(state_to_send),
        headers:{
          'Content-Type': 'application/json'
        }
      })
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        console.log("Response Received: ", json);
        dispatch(fetchPOSTStateSuccess(json, state.save_name));
        return json;
      })
      .catch(error => {
        console.log(error);
        return dispatch(fetchStateFailure(error))
      });
  };
}

export function fetchPOSTStateSuccess(json_received, save_name) {
  return {
    type: 'FETCH_POST_STATE_SUCCESS',
    state: json_received,
    save_name: save_name
  };
}

export function deleteSavedGame(savedGame) {
  return {
    type: 'DELETE_SAVED_GAME',
    state: savedGame
  };
}



// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    console.log("ERROR! " + response.statusText);
    throw Error(response.statusText);
  }
  return response;
}
