import { FIRST_SAVED_ITEM } from '../constants/constants';

function lastSavedReducer(state = [FIRST_SAVED_ITEM] , action) {
  let newState = state;
  switch (action.type) {
    case 'FETCH_POST_STATE_SUCCESS':
      let newSave = {
        name: action.save_name,
        url: action.state.uri
      };
      newState.push(newSave);
      return newState;
    case 'DELETE_SAVED_GAME':
      let index = newState.indexOf(action.state);
      newState.splice(index,1); 
      return newState;
    default:
      return state;
    }
}

export default lastSavedReducer;
