import React from 'react'
import ApplicantRating from './ApplicantRating'
import ApplicantRadios from './ApplicantRadios'
import css from './style.css'

export const ApplicantQuestionnaire = ({ firstname }) => {
  return (
    <div className={css.root}>
      <div className={css.header}>Committee Review: General Review</div>
      <div className={css.card}>
        <div className={css.rating}>
          <div className={css.question}>
            {`How would you rate ${firstname}?`}
          </div>
          <ApplicantRating />
        </div>

        <div className={css.radios}>
          <div className={css.question}>
            {`Should ${firstname} be a finalist?`}
          </div>
          <ApplicantRadios />
        </div>
      </div>
    </div>
  )
}

export default ApplicantQuestionnaire
