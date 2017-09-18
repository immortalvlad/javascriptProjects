import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import { rootReducer } from '../reducers';
import { redirect } from '../middlewares/redirect';

export default function configureStore(initialState) {

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const logger = createLogger();

    const store = createStore(
            rootReducer,
            initialState,
            composeEnhancers(
                    applyMiddleware(redirect,thunkMiddleware, logger)
                    )
            );

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers').rootReducer
            store.replaceReducer(nextRootReducer)
        });
    }

    return store
}