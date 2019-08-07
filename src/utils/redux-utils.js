import { createPromise } from 'redux-promise-middleware';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { getRootReducer } from '../components/app';

const reducer = getRootReducer();

export default () => {
  const promise = createPromise({ promiseTypeDelimiter: '/' });
  const middlewares = applyMiddleware(promise);
  return createStore(reducer, composeWithDevTools(middlewares));
};
