import React from 'react'
import css from './style.css'

export const ApplicantRadios = props => {
  return (
    <div className={css.root}>
      <label className={css.label}>
        <input className={css.radio} type="radio" />
        Yes
      </label>
      <label className={css.label}>
        <input className={css.radio} type="radio" />
        No
      </label>
    </div>
  )
}

export default ApplicantRadios
