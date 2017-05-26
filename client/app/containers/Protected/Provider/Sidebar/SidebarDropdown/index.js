import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import CaretIcon from 'components/Icons/Caret'
import * as Actions from 'api/actions'
import css from './style.css'

export class SidebarDropdown extends Component {
  constructor(props) {
    super(props)
    this.state = {open: false}
    this.changeVisibility = ::this.changeVisibility
  }

  changeVisibility() {
    this.setState({open: !this.state.open})
  }

  render() {
    const { open } = this.state
    const { links, title, launchModal } = this.props
    return (
      <div className={`${css.root} ${open ? css.open : ''}`}>
        <div className={css.dropdown} onClick={this.changeVisibility}>
          <div className={css.title}>{title}</div>
          <CaretIcon className={css.caret} />
        </div>
        <div className={css.links}>
          <ul className={css.ul}>
            {links.map((x, i) =>
              <li key={i} className={css.li}>
                {x.to
                  ? <Link
                      className={css.link}
                      to={x.to}
                      activeClassName={css.active}
                      activeOnlyWhenExact={x.activeOnlyWhenExact}>
                      <div className={css.caption}>{x.text}</div>
                    </Link>
                  : <div
                      className={css.link}
                      onClick={launchModal}>
                      <div className={css.caption}>{x.text}</div>
                    </div>}
              </li>
            )}
          </ul>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({

  }),
  Actions
)(SidebarDropdown)
