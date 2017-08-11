import 'babel-polyfill';
import 'es5-shim';

/*
 * serverRegistration.jsx:
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
import ReduxlessHeader from '../containers/Protected/Common/ReduxlessHeader'
import Root from 'containers/Root'
import StaticRoot from '../containers/StaticRoot'
import ProviderRoot from '../containers/ProviderRoot'

// Stores
// Whatever had `applyMiddleware` called on it
// (and usually createStore of a combinedReducer)
// is the Store
import SharedReduxStore from 'stores/SharedReduxStore'

// Other?
import 'sanitize.css/sanitize.css'

ReactOnRails.register({
  Logo,
  ReduxlessHeader,
  StaticRoot,
  ProviderRoot,
});

ReactOnRails.registerStore({
  SharedReduxStore,
});
