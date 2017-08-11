import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import LoadingIndicator from 'components/LoadingIndicator'
import LazyLoad, { importDefault } from 'components/LazyLoad'
import * as API from 'api'
import * as Actions from 'api/actions'
import css from './style.css'

export class SiteApp extends Component {
  state = {redirect: false}
  updateRouteState = props => {
    const { pathname, location, locationChange } = props
    locationChange({ route: pathname, hash: location.hash })
  }

  componentWillMount() {
  }

  componentDidMount() {
    this.updateRouteState(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.pathname !== this.props.pathname) {
      this.updateRouteState(nextProps)
    }

    if (nextProps.isAuthed !== this.props.isAuthed) {
      this.setState({redirect: true})
    } else {
      this.setState({redirect: false})
    }
  }

  render() {
    const site = _ => importDefault(import('containers/Site'))
    const { redirect } = this.state
    const { user, loading, open } = this.props

    if (redirect) {
      return <Redirect to='/' />
    }
    return (
      <div className={`${css.root} ${open ? css.open : ''}`}>
        <div className={`${css.router} ${loading ? '' : css.ready}`}>
          <LazyLoad modules={{Component: site}}>
            {({ Component }) => <Component />}
          </LazyLoad>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    route: state.route,
    loading: state.loading,
    open: state.open,
    user: state.user,  // formerly state.auth.user
    initialized: true, // formerly state.auth.initialized
    isAuthed: true     // formerly states.auth.isAuthed
  }),
  Actions
)(SiteApp)
