import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import MenuIcon from 'components/Icons/Menu'
import CloseIcon from 'components/Icons/Close'
import Logo from 'components/Icons/Logo'
import * as Actions from 'api/actions'
import css from './style.css'

export class SiteHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {open: false}
    this.toggleMenu = ::this.toggleMenu
  }

  componentWillReceiveProps(nextProps) {
    const { open } = this.state
    const { route } = this.props
    if (open && nextProps.route !== route) {
      this.toggleMenu()
    }
  }

  toggleMenu() {
    this.setState({open: !this.state.open})
  }

  render() {
    const { open } = this.state
    const { fill, fixed, launchModal } = this.props

    return (
      <div className={`${css.root} ${fill ? css.fill : ''} ${fixed ? css.fixed : ''}`}>
        <div className={css.brand}>
          <Link to="/">
            <Logo className={css.logo} />
          </Link>
        </div>
        <div className={`${css.dropdown} ${open ? css.open : ''}`}>
          <div className={css.links}>
            <div className={css.nav}>
              <div
                onClick={this.toggleMenu}
                className={css.mobile}>
                {open
                  ? <CloseIcon className={css.icon} />
                  : <MenuIcon className={css.icon} />}
              </div>
              <div className={css.menu}>
                <Link
                  className={css.link}
                  activeClassName={css.active}
                  to="/about">About Us <div className={css.selected}/> </Link>
                <Link
                  className={css.link}
                  activeClassName={css.active}
                  to="/educators">Educators <div className={css.selected}/> </Link>
                <Link
                  className={css.link}
                  activeClassName={css.active}
                  to="/providers">Scholarship Providers <div className={css.selected}/> </Link>
                <Link
                  className={css.link}
                  activeClassName={css.active}
                  to="/students">Students <div className={css.selected}/> </Link>
                <div className={css.btn} onClick={launchModal}>Sign Up</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    route: state.routing.route,
    fixed: state.ui.fixed,
    fill: state.ui.fill || state.routing.route === '/faq',
  }),
  Actions
)(SiteHeader)
