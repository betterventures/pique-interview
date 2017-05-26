import React from 'react'
import Form from 'components/Form'
import css from './style.css'

export const EducatorsForm = props => {
  const formData = [
    {text: `I'm a Teacher`, type: 'teacher'},
    {text: `I'm a Counselor`, type: 'counselor'},
  ]
  return (
    <div className={css.root}>
      <div className={css.header}>Never Write More than One Recommendation for a Student Again.</div>
      <div className={css.copy}>Between lesson plans, reviewing last night's homework assignments, running an extra-curricular activity, and writing college recommendations there is simply not enough time to write a recommendation to each scholarship your students apply to. We get it.</div>
      <div className={css.form}>
        <Form value={formData} />
      </div>
    </div>
  )
}

export default EducatorsForm
