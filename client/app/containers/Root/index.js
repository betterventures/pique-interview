import React from 'react'
import ReactOnRails from 'react-on-rails'
import { Provider } from 'react-redux'
import Router from 'react-router/HashRouter'
import { Match, Miss } from 'react-router'
import ProviderApp from 'containers/App/Provider'
import SiteApp from 'containers/App/Site'

export default () => {
  // get the existing store
  const store = ReactOnRails.getStore('SharedReduxStore');
  const noMatch = () => (
    <div>
      This is not the page you're looking for...
    </div>
  )

  return (
    <Provider store={store}>
      <Router>
        <div>
          <Match pattern="providers" component={ProviderApp} />
          <Match pattern="site" component={SiteApp} />
          <Miss component={ProviderApp} />
        </div>
      </Router>
    </Provider>
  )
}
