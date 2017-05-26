import React from 'react'
import { Link } from 'react-router'
import css from './style.css'

export const ScholarshipsButtons = ({ first, onClick, text }) => {
  return (
    <div className={first ? css.one : css.two}>
      <button
        onClick={onClick}
        className={css.btn}>
        Sign Up!
      </button>
      <Link
        className={css.btn}
        to={!first ? '/providers' : '/students'}>
        {text}
      </Link>
    </div>
  )
}

export default ScholarshipsButtons
