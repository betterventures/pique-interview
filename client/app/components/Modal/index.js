import React from 'react'
import css from './style.css'

export const Modal = ({ open, onClick, className, children }) => {
  return open
    ? <div className={css.root}>
        {children}
        <div
          className={`${css.curtain} ${className ? className : ''}`}
          onClick={onClick} />
      </div>
    : null
}

export default Modal
