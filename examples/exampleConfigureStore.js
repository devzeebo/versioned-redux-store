import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import persistState from 'redux-localstorage';
import { reducer } from '../reducers';
import versionedMerge from './versionedMerge';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line

const configureStore = (initialState = { version: 2 }) => {
  const store = createStore(
    reducer,
    initialState,
    composeEnhancers(
      applyMiddleware(thunk),
      persistState(undefined, {
        key: '{YOUR_APP_KEY}',
        merge: versionedMerge,
      }),
    ),
  );

  return store;
};

export default configureStore;
