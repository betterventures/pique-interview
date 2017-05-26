import React from 'react'
import Form from 'components/Form'
import css from './style.css'

export const StudentsForm = props => {
  const formData = [{text: 'Sign Up!', type: 'student'}]
  return (
    <div className={css.root}>
      <div className={css.header}>
        <div className={css.line}>Save Time. Submit More Applications.</div>
        <div className={css.line}>Increase Your Chances of Winning Scholarships.</div>
      </div>
      <div className={css.copy}>We get it, there's not enough time in the day to study for the SAT/ACTs, research and apply to colleges, keep up your grades, do community service, participate in extra-curriculars, and apply to scholarships. That is why, we made Pique. Sign up and see how easy it is to find and apply to scholarships!</div>
      <div className={css.form}>
        <Form value={formData} />
      </div>
    </div>
  )
}

export default StudentsForm
