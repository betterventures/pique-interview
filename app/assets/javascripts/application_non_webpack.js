// All webpack assets in development will be loaded via webpack dev server
// It's important to include them in layout view above this asset
// b/c it exposes jQuery for turbolinks and another non-webpack JS (if any)

// NOTE: We've got this in the /spec/dummy app because our CI supports testing with and
// without Turbolinks.
//
// *****************************************************************************
// NOTE: This is the 'standard' Rails application.js (it is the manifest).
//  - We use this in the react_on_rails 7.* workflow to require all JS files
//    that are not compiled with Webpack.
//    (ie, any assets that are precompiled via the regular asset pipeline go in here).
// *****************************************************************************
//
//
//= require jquery
//= require jquery.turbolinks
//= require jquery_ujs
//= require cocoon
//= require moment
//= require bootstrap-sprockets
//= require bootstrap-datetimepicker
//= require turbolinks

/*
 * Require React stack _after_ Turbolinks in order to not turn off component mounting.
 */

//= require_tree .
