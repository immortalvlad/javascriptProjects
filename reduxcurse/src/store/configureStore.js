import { createStore, applyMiddleware, compose} from 'redux';
import rootReducer from '../reducers';
import { createLogger }  from 'redux-logger';
import thunk from 'redux-thunk';

export default function configureStore(initialState) {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const logger = createLogger();
    const store = createStore(
            rootReducer,
            initialState,
            composeEnhancers(
                    applyMiddleware(thunk,logger)
                    )
            );
    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers')
            store.replaceReducer(nextRootReducer)
        })
    }
    return store
}