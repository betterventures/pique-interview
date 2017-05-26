import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Match } from 'react-router'
import HeaderMenu from './HeaderMenu'
import LogoIcon from 'components/Icons/Logo'
import Modal from 'components/Modal'
import * as Actions from 'api/actions'
import css from './style.css'

export class AppHeader extends Component {
  constructor(props) {
    super(props)
    this.signOut = :: this.signOut
    this.toggleDropdown = ::this.toggleDropdown
    this.updateLayoutOnLocationChange = ::this.updateLayoutOnLocationChange
  }

  state = {
    open: false,
    compact: false
  }

  componentDidMount() {
    this.updateLayoutOnLocationChange(this.props.compact)
  }

  componentWillReceiveProps(nextProps) {
    this.updateLayoutOnLocationChange(nextProps.compact)
  }

  updateLayoutOnLocationChange(compact) {
    if (compact !== this.state.compact) {
      this.setState({ compact })
    }
  }

  toggleDropdown() {
    this.setState({open: !this.state.open})
  }

  signOut() {
    if (this.state.open) {
      this.toggleDropdown()
    }
    this.props.signOut()
  }

  render() {
    const { open, compact } = this.state
    const { user, abort } = this.props

    return !abort
      ? <div className={css.root}>
          <div className={`${css.modal} ${open ? css.open : ''}`}>
            <div className={css.curtain} onClick={this.toggleDropdown} />
          </div>

          <div className={`${css.wrap} ${compact ? css.compact : ''}`}>
            <div className={css.brand}>
              <Link className={css.link} to="/dashboard/new">
                <LogoIcon className={css.logo}/>
              </Link>
            </div>

            <div className={css.border} />

            <div className={css.nav}>
              <div
                onClick={this.toggleDropdown}
                className={css.settings}>
                <ul className={css.ul}>
                  <li className={css.li} >
                    <img
                      className={css.avatar}
                      src={user.photoURL}
                      onClick={this.toggleDropdown} />

                    <HeaderMenu
                      open={open}
                      onClick={this.toggleDropdown}
                      signOut={this.signOut} />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      : null
  }
}

function setCompact(pathname) {
  if (pathname) {
    return pathname.startsWith('/applicant/')
  }
}

function shouldBail(pathname) {
  if (pathname) {
    return [
      '/scholarship-post',
      '/student-questionnaire',
      '/payment'
    ].filter(x => pathname.startsWith(x))[0]
  }
}

export default connect(
  state => {
    return {
      user: state.auth.user,
      compact: setCompact(state.routing.route),
      abort: shouldBail(state.routing.route),
    }
  },
 Actions
)(AppHeader)
