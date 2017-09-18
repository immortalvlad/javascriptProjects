import createBrowserHistory from 'history/createBrowserHistory';
//let browserHistory = createBrowserHistory({forceRefresh:true});
let browserHistory = createBrowserHistory();
import {
  ROUTING
} from '../constants/Routing'

export const redirect = store => next => action => { //eslint-disable-line no-unused-vars
  if (action.type === ROUTING) {
    browserHistory[action.payload.method](action.payload.nextUrl);
  }

  return next(action)
}