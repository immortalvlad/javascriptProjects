import React, { Component } from 'react';
import {List} from 'immutable';

import {VotingContainer} from './Voting';
import {ResultsContainer} from './Results';
import {
    BrowserRouter as Router,
        Route,
Switch,
        NavLink,
        Redirect,
        HashRouter
        } from 'react-router-dom';
import {ConnectionStateContainer} from './ConnectionState';
//const pair = List.of('Trainspotting', '28 Days Later');

const App = (prop) => (
        <div >
           <ConnectionStateContainer/>  
          <Switch>
            <Route exact path='/results' render={
                            ()=>{
                                  return   ( <ResultsContainer {...prop} />)
                                    }
                        } />
          <Route  exact  path='/' render={
                            ()=>{
                                  return   ( <VotingContainer {...prop} />)
                                    }
                        }/>
                          </Switch>
        </div>
);

export default App;
//export default class App extends Component {
//    constructor(props) {
//        super(props);
//        this.props = props;
//        console.log(props);
//    }
//    render() {
// 
//        return React.cloneElement(this.props.children, {pair: pair});
//    }
//};