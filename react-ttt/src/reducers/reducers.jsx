import { combineReducers } from 'redux';
import gameReducer from './gameReducer';
import turnReducer from './turnReducer';
import fetchReducer from './fetchReducer';
import playerReducer from './playerReducer';
import lastSavedReducer from './lastSavedReducer';
import saveListReducer from './saveListReducer';

const GlobalState = combineReducers({
    turn: turnReducer,
    values: gameReducer,
    fetch: fetchReducer,
    player_name: playerReducer,
    last_saved_game: lastSavedReducer,
    save_list: saveListReducer
});

export default GlobalState;
