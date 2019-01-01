
function lastSavedReducer(state = "https://api.myjson.com/bins/i216a", action) {
    switch (action.type) {
    case 'FETCH_POST_STATE_SUCCESS':
      console.log("change last", action.state.uri)
      return action.state.uri;
    default:
      console.log("no change", state);
      return state;
    }
}

export default lastSavedReducer;
