import { Provider } from 'react-redux';
import GlobalState from './../reducers/reducers';
import React from 'react';
import { PLAYERX, VALUES, FIRST_SAVED_ITEM } from '../constants/constants';
import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { connectRouter, routerMiddleware, ConnectedRouter } from 'connected-react-router';
import thunk from 'redux-thunk';
import Header from './Header';
import Main from './Main';

const history = createBrowserHistory();

export default class ReduxProvider extends React.Component {
    constructor(props) {
        super(props);
        this.initialState = {values: VALUES, turn: PLAYERX, last_saved_game: "https://api.myjson.com/bins/i216a", save_list: [FIRST_SAVED_ITEM]};
        this.store = createStore(
          connectRouter(history)(GlobalState), // new root reducer with router state
          this.initialState,
          compose(applyMiddleware(routerMiddleware(history), thunk)) // for dispatching history actions
        );
    }
    render() {
        return (
           <Provider store={ this.store }>
             <ConnectedRouter history={history}>
               <div style={{ height: '100%', textAlign: 'center' }}>
                 <Header />
                 <Main />
               </div>
             </ConnectedRouter>
           </Provider>
        );
    }
}
