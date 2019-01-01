
function lastSavedReducer(state = "https://api.myjson.com/bins/i216a", action) {
    switch (action.type) {
    case 'FETCH_POST_STATE_SUCCESS':
      return action.state.uri;
    default:
      return state;
    }
}

export default lastSavedReducer;
