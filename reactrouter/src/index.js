import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import App from './containers/App'
import createBrowserHistory from 'history/createBrowserHistory'
//import Admin from './components/Admin'
//import Genre from './components/Genre'
//import Home from './components/Home'
const history = createBrowserHistory();
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

render(
  <Router history={history} basename='/' >
    <Route path='/' component={App} />
  </Router>,
  document.getElementById('root')
)