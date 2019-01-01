import React from 'react';
import { Route } from 'react-router-dom';
import Game from './Tictactoe/Game';
import Home from './Home';
import SavedGames from './SavedGames';

export default class Main extends React.Component {
    render() {
        return (
          <section>
            <Route exact path='/' component={Home}/>
            <Route path='/new' component={Game}/>
            <Route exact path='/continue' render={()=> <Game continue={true}/>}/>
            <Route path='/continue/:index' render={(props)=> <Game continue={true} index={props.match.params.index}/>}/>
            <Route path='/saved' component={SavedGames}/>
          </section>
        );
    }

}
