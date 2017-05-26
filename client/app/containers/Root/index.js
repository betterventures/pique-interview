import React from 'react'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router'
import { Match } from 'react-router'
import App from 'containers/App'

const Root = store => {
  return _ => (
    <Provider store={store}>
      <HashRouter>
        <Match pattern="*" component={App} />
      </HashRouter>
    </Provider>
  )
}

export default Root
