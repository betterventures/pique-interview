import React from 'react'
import css from './style.css'

const DashboardNav = ({ links }) => {
  return (
    <div className={css.root}>
      <ul className={css.ul}>
        {links.map((x, i) =>
          <li key={i} className={css.li}>
            <a
              className={css.link}
              href={x.to}
              activeClassName={css.active}>
              <div className={css.copy}>
                <div className={css.num}>{x.count}</div>
                <div className={css.caption}>{x.text}</div>
              </div>
              <div className={css.selected} />
            </a>
          </li>
        )}
        <li className={css.li}>
          <div className={css.copy}>
            <div className={css.num}>0</div>
            <div className={css.caption}>Days Left</div>
          </div>
          <div className={css.selected} />
        </li>
      </ul>
    </div>
  )
}

export default DashboardNav
