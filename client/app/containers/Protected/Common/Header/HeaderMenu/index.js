import React from 'react'
import { Link } from 'react-router'
import css from './style.css'

export const HeaderMenu = ({ open, onClick, signOut }) => {
  return (
    <div className={`${css.root} ${open ? css.open : ''}`}>
      <div className={css.point} />
      <div className={css.nub} />
      <ul className={css.tooltip}>
        <li
          onClick={onClick}
          className={css.li}>Profile</li>
        <li
          onClick={onClick}
          className={css.li}>
          <Link
            to='/settings'
            className={css.route}>Settings</Link>
          </li>
        <li
          onClick={onClick}
          className={css.li}>Preview Scholarship</li>
        <li
          onClick={signOut}
          className={css.li}>Log Out</li>
      </ul>
    </div>
  )
}

export default HeaderMenu
