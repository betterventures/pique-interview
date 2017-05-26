import React from 'react'
import { Link } from 'react-router'
import css from './style.css'

export const ScholarshipPostBtns = ({ back, next, submit, text, onClick }) => {
  return (
    <div className={css.root}>
      {back
        ? <Link
          to={back}
          className={css.back}>Back</Link>
        : null}
      {next
        ? <Link
            to={next}
            className={css.next}>Next</Link>
        : null}
      {submit
        ? <div
            onClick={onClick}
            className={css.next}>{text || 'Submit'}</div>
        : null}
    </div>
  )
}

export default ScholarshipPostBtns
