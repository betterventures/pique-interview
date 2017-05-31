import React, { Component } from 'react'
import ReduxlessHeaderMenu from './ReduxlessHeaderMenu'
import LogoIcon from 'components/Icons/Logo'
import Modal from 'components/Modal'
import css from './style.css'

export default class ReduxlessHeader extends Component {
  constructor(props) {
    super(props)
    this.signOut = ::this.signOut
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
    const { user, scholarships, abort } = this.props

    return !abort
      ? <div className={css.root}>
          <div className={`${css.modal} ${open ? css.open : ''}`}>
            <div className={css.curtain} onClick={this.toggleDropdown} />
          </div>

          <div className={`${css.wrap} ${compact ? css.compact : ''}`}>
            <div className={css.brand}>
              <a className={css.link} href="/dashboard">
                <LogoIcon className={css.logo} />
              </a>
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

                    <ReduxlessHeaderMenu
                      scholarship={scholarships.all['0']}
                      user={user}
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
