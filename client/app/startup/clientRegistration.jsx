import 'babel-polyfill';
import 'es5-shim';

/*
 * clientRegistration.jsx:
 *
 * Register anything you want to mount directly -
 * (i.e. via <%= react_component(...) %>) -
 * In order to make it visible to `ReactOnRails`
 * (what `react_component` calls into).
 */

import ReactOnRails from 'react-on-rails';

// Components
import Logo from 'components/Icons/Logo'

// App / Containers
// Go with NoReduxHeader (LayoutHeader), and add some logic around it
import ReduxlessHeader from '../containers/Protected/Common/ReduxlessHeader'
import Root from '../containers/Root'

// Stores
// (Note: Whatever had `applyMiddleware` called on it
//  (and usually createStore(combinedReducer))
//  is the Store)
import SharedReduxStore from '../stores/SharedReduxStore'

// Other?
import 'sanitize.css/sanitize.css'

// Set Client-side-only Options
ReactOnRails.setOptions({
  traceTurbolinks: true,
});

ReactOnRails.register({
  ReduxlessHeader,
  Logo,
  Root,
});

ReactOnRails.registerStore({
  SharedReduxStore,
});

