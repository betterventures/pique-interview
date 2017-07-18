import React from 'react'
import { Link } from 'react-router'
import css from './style.css'

export const ButtonFill = ({ text, to, onClick, className, externalHref }) => {
  return (
    <div className={css.root}>
      <div
        className={`${css.fill} ${className ? className : ''}`}
        onClick={onClick}
      >
      {to
        ? <Link to={to} className={css.link}>{text}</Link>
        : <a href={externalHref} className={css.link}>{text}</a>}
      </div>
    </div>
  )
}

export const ButtonNoFill = ({ text, to, className, externalHref }) => {
  return (
    <div className={css.root}>
      <div className={`${css.nofill} ${className ? className : ''}`}>
      {to
        ? <Link to={to} className={className}>{text}</Link>
        : <a href={externalHref} className={css.link}>{text}</a>}
      </div>
    </div>
  )
}
