import { applyMiddleware, createStore } from 'redux';
// use our thunk-middleware over the library
// import middleware from 'redux-thunk';

import combinedReducer from '../api/reducers';

const middleware = [thunkmasterFlex()];

/*
 *  Generator: Export a function that takes the props and returns a Redux store.
 *  This is used so that 2 components can have the same store.
 */
export default (props, railsContext) => {
  const newProps = { ...props, railsContext };
  return applyMiddleware(...middleware)(createStore)(combinedReducer, newProps);
};

function thunkmasterFlex() {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState)
    }

    return next(action)
  }
}
