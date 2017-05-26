import React from 'react'
import img1 from './401-envelope.png'
import img2 from './403-notepad.png'
import img3 from './402-medal.png'
import css from './style.css'

export const EducatorsProcess = props => {
  return (
  <div className={css.root}>
    <div className={css.header}>How It Works</div>
    <div className={css.ul}>
      {items.map((x, i) =>
        <li key={i} className={css.item}>
          <div className={css.icon}>
            <div className={css.num}>{i + 1}</div>
            <img src={x.image} />
          </div>
          <div className={css.title}>{x.title}</div>
          <div className={css.copy}>{x.body}</div>
        </li>
      )}
    </div>
  </div>
  )
}

const items = [
  {
    title: `Receive a Request from a Student`,
    body: `Receive a notification via email when your students request a recommendation.`,
    image: img1,
  },{
    title: `Upload Your Recommendation`,
    body: `Create a Pique account and then upload your recommendation onto a student's profile.`,
    image: img2,
  },{
    title: `Your Students Are Notified and You're Done!`,
    body: `Your recommendation is saved and can now be reused. That means no last minute messages from students asking for recommendations.`,
    image: img3,
  },
]

export default EducatorsProcess
