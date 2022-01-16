import {createStore, applyMiddleware} from 'redux';
import {createWrapper} from 'next-redux-wrapper';
import logger from 'redux-logger';
import reducers from '../reducers';

const makeConfiguredStore = (reducer) =>
    createStore(reducer, undefined, applyMiddleware(logger));

const makeStore = () => {
  const {persistStore, persistReducer} = require('redux-persist');
  const storage = require('redux-persist/lib/storage').default;

  const persistConfig = {
    key: 'nextjs',
    whitelist: [],
    blacklist: ['cell', 'player'],
    storage
  };

  const persistedReducer = persistReducer(persistConfig, reducers);
  const store = makeConfiguredStore(persistedReducer);
  let persistor = persistStore(store);

  return { persistor, ...store }
  
};

export const wrapper = createWrapper(makeStore, {debug: true});