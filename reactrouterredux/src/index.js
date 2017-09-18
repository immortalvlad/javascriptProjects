import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import App from './containers/App'
import createBrowserHistory from 'history/createBrowserHistory';
var history = createBrowserHistory();

import configureStore from './store/configureStore';
import { Provider } from 'react-redux';

import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

const store = configureStore();

render(
  <Provider store={store}>
    <Router history={history} basename='/' >
      <Route path='/' component={App} />
    </Router>
  </Provider>,
  document.getElementById('root')
)