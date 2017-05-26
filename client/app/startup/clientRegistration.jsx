import 'babel-polyfill';
import 'es5-shim';

/*
 * clientRegistration.jsx:
 *
 * Anything you want to mount directly -
 * (i.e. via <%= react_component(...) %>) -
 * Must be registered in this file
 * In order to be visible to ReactRailsUJS
 * (what `react_component` calls into)
 */

import ReactOnRails from 'react-on-rails';

// Components
// Logo, progressBar, etc.

// App / Containers
import ProviderUser from '../containers/Protected/Provider'
import Root from '../containers/Root'

// Stores
// Whatever had `applyMiddleware` called on it
// (and usually createStore of a combinedReducer)
// is the Store
import SharedReduxStore from '../stores/SharedReduxStore'


// Other?
//import 'sanitize.css/sanitize.css'

// Set Client-side-only Options
ReactOnRails.setOptions({
  traceTurbolinks: true,
});

ReactOnRails.register({
  ProviderUser,
  Root,
});

ReactOnRails.registerStore({
  SharedReduxStore,
});

