import React from 'react'
import ReactOnRails from 'react-on-rails'
import { Provider } from 'react-redux'
import Router from 'react-router/HashRouter'
import { Match } from 'react-router'
import App from 'containers/App'

export default () => {
  // get the existing store
  const store = ReactOnRails.getStore('SharedReduxStore');

  return (
    <Provider store={store}>
      <Router>
        <Match pattern="*" component={App} />
      </Router>
    </Provider>
  )
}
