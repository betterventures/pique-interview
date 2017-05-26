import React from 'react'
import css from './style.css'

const Button = ({ className, children, onClick }) => {
  return (
    <button
      className={`${css.root} ${className ? className : ''}`}
      onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
