import React, { Component } from 'react'
import css from './style.css'

export default class ReduxlessHeaderMenu extends Component {
  render() {
    const { open, onClick, scholarship, signOut } = this.props

    return (
      <div className={`${css.root} ${open ? css.open : ''}`}>
        <div className={css.point} />
        <div className={css.nub} />
        <ul className={css.tooltip}>
          {
            scholarship.id
              ?
                <li
                  onClick={onClick}
                  className={css.li}
                >
                  <a href={`/providers/scholarships/${scholarship.id}/#/dashboard`}>
                    My Dashboard
                  </a>
                </li>
              :
                ''
          }
          <li
            onClick={onClick}
            className={css.li}>
            {
              scholarship.id
                ?
                  <a href={`/providers/scholarships/${scholarship.id}/#/preview`}>
                    View Scholarship
                  </a>
                :
                  <a href={`/providers/scholarships/new`}>
                    New Scholarship
                  </a>
            }
          </li>
          {
            scholarship.id
              ?
                <li
                  onClick={onClick}
                  className={css.li}>
                    <a href={`/providers/scholarships/${scholarship.id}/steps/general`}>
                      Edit Scholarship</a>
                  </li>
              :
                ''
          }
          <li
            onClick={onClick}
            className={css.li}>
              <a href="/providers/account_info">My Account</a>
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
