import React from 'react'
import { Link } from 'react-router'
import Button from 'components/Button'
import css from './style.css'

export const SettingsNav = props => {
  return (
    <div className={css.root}>
      <div className={css.option}>
        <Link to='/settings'>
          <Button className={css.btn}>General</Button>
        </Link>
      </div>
      <div className={css.option}>
        <Link to='/settings/password'>
          <Button className={css.btn}>Password</Button>
        </Link>
      </div>
    </div>
  )
}

export default SettingsNav
