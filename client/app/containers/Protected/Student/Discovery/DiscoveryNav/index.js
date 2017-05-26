import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import css from './style.css'

const DashboardNav = ({ links }) => {
  return (
    <div className={css.root}>
      <ul className={css.ul}>
        {links.map((x, i) =>
          <li key={i} className={css.li}>
            <Link
              className={css.link}
              to={x.to}
              activeClassName={css.active}
              activeOnlyWhenExact>
              <div className={css.copy}>
                <div className={css.num}>{x.count}</div>
                <div className={css.caption}>{x.text}</div>
              </div>
              <div className={css.selected} />
            </Link>
          </li>
        )}
      </ul>
    </div>
  )
}

export default DashboardNav
