import React from 'react'
import css from './style.css'

export const HomeFacts = props => {
  return (
    <div className={css.root}>
      <div className={css.header}>The Process is Broken</div>
      {facts.map((x, i) => <div key={i} className={i > 0 ? css.text : css.bold}>{x}</div>)}
    </div>
  )
}

const facts = [
  `Everyone loses in the current scholarship application process.`,
  `Students spend countless hours looking for and applying to scholarships.`,
  `Educators spend upwards of 8-10 hours a week writing tailored recommendations for each scholarship.`,
  `Local scholarship providers do not have the proper channels to reach students.`,
]

export default HomeFacts
