import React from 'react';
import ReactDOM from 'react-dom';

import {List, Map} from 'immutable';
import {
BrowserRouter as Router,
        Route,
} from 'react-router-dom';
import App from './components/App';
//import createBrowserHistory from 'history/createHashHistory'
//const history = createBrowserHistory();
import {
Switch,
        NavLink,
        Redirect,
        HashRouter
        } from 'react-router-dom';
//const pair = ['Trainspotting', '28 Days Later'];
import {createStore,applyMiddleware} from 'redux';
import reducer from './reducer';
import {setState,setConnectionState,setClientId} from './action_creators';
import {Provider} from 'react-redux';
import io from 'socket.io-client';
import remoteActionMiddleware from './remote_action_middleware';


//const store = createStore(reducer);

//store.dispatch({
//    type: 'SET_STATE',
//    state: {
//        vote: {
//            pair: ['Sunshine', '28 Days Later'],
//            tally: {Sunshine: 2}
//        }
//    }
//});


const socket = io(`${location.protocol}//${location.hostname}:8090`);
socket.on('state', state =>
//  store.dispatch({type: 'SET_STATE', state})
    store.dispatch(setState(state))
);

[
  'connect',
  'connect_error',
  'connect_timeout',
  'reconnect',
  'reconnecting',
  'reconnect_error',
  'reconnect_failed'
].forEach(ev =>
  socket.on(ev, () => store.dispatch(setConnectionState(ev, socket.connected)))
);
const createStoreWithMiddleware = applyMiddleware(
  remoteActionMiddleware(socket)
)(createStore);
const store = createStoreWithMiddleware(reducer);


const pair = List.of('Trainspotting', '28 Days Later');
const tally = Map({'Trainspotting': 5, '28 Days Later': 4});

ReactDOM.render(
        <Provider store={store}>
            <HashRouter  basename='/'>
                <App  />
            </HashRouter>
        </Provider>,
        document.getElementById('app')
        );
/*
 ReactDOM.render(
 <HashRouter basename='/'>
 <App>
 <Switch>
 <Route exact path='/results' component={Results} />
 <Route  exact  path='/' component={Voting} />
 </Switch>
 </App>
 </HashRouter>,
 document.getElementById('app')
 );*/