import React from 'react'
import { Link } from 'react-router'
import css from './style.css'

export const ButtonFill = ({ text, to, className }) => {
  return (
    <div className={css.root}>
      <div className={`${css.fill} ${className ? className : ''}`}>
      {to
        ? <Link to={to} className={css.link}>{text}</Link>
        : <a className={css.link}>{text}</a>}
      </div>
    </div>
  )
}

export const ButtonNoFill = ({ text, to, className }) => {
  return (
    <div className={css.root}>
      <div className={`${css.nofill} ${className ? className : ''}`}>
      {to
        ? <Link to={to} className={className}>{text}</Link>
        : <a className={css.link}>{text}</a>}
      </div>
    </div>
  )
}
