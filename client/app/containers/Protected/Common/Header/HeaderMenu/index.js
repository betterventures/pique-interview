import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import * as Actions from 'api/actions'
import css from './style.css'

export class HeaderMenu extends Component {
  render() {
    const { open, onClick, scholarship, signOut } = this.props

    return (
      <div className={`${css.root} ${open ? css.open : ''}`}>
        <div className={css.point} />
        <div className={css.nub} />
        <ul className={css.tooltip}>
          <li
            onClick={onClick}
            className={css.li}
          >
            <a href={`/providers/scholarships/${scholarship.id}/#/dashboard`}>
              My Dashboard
            </a>
          </li>
          <li
            onClick={onClick}
            className={css.li}
          >
            <a href={`/providers/scholarships/${scholarship.id}/#/preview`}>
              View Scholarship
            </a>
          </li>
          <li
            onClick={onClick}
            className={css.li}>
              <a href={`/providers/scholarships/${scholarship.id}/steps/general`}>
                Edit Scholarship
              </a>
            </li>
          <li
            onClick={onClick}
            className={css.li}>
              <a href="/providers/edit">Settings</a>
            </li>
          <li
            onClick={signOut}
            className={css.li}>
              <a rel="nofollow" data-method="delete" href="/providers/sign_out">Log Out</a>
            </li>
        </ul>
      </div>
    )
  }
}

export default connect(
  state => {
    return {
      scholarship: (state.app && state.app.scholarships['all'][0]) || {},
      user: state.user,
    }
  },
 Actions
)(HeaderMenu)
