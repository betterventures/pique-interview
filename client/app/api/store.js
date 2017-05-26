/*
 * Commenting out this store for now.
 *    This was the original store used in our standalone React/Firebase app.
 *
 * Prefer client/app/stores/SharedReduxStore for its ability to
 *    take in props and a rails context,
 *    and be inserted by <%= redux_store %>.
 *
import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import rootReducer from './reducers'

export default function configureStore() {
  const middleware = [thunkmasterFlex()]

  if (__DEV__) {
    // middleware.push(logger())
  }

  const enhancers = []

  const store = createStore(
    rootReducer,
    applyMiddleware(...middleware)
  )

  return store
}

function thunkmasterFlex() {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState)
    }

    return next(action)
  }
}

 *
 *
 */
