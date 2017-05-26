import React from 'react'
import { connect } from 'react-redux'
import * as Actions from 'api/actions'
import img1 from './603-icon.png'
import img2 from './604-icon.png'
import css from './style.css'

export const NonprofitsPartners = props => {
  return (
    <div className={css.root}>
      <div className={css.header}>Become a Partner: It's Really Easy!</div>
      <div className={css.items}>
        {sections.map((x, i) =>
          <div key={i} className={css.item}>
            <div className={css.icon}>
              <div className={css.num}>{i + 1}</div>
              <img className={css.img} src={x.image} />
            </div>
            <div className={css.title}>{x.title}</div>
            <div className={css.body}>{x.body}</div>
          </div>
        )}
      </div>
      <button className={css.btn} onClick={props.launchModal}>Make Me a Partner!</button>
    </div>
  )
}

const sections = [
  {
    title: `Agree to Share Pique with Your Students`,
    body: `Receive a notification via email when your students request a recommendation.`,
    image: img1,
  },{
    title: `Send a Warm Email to Scholarship Providers in Your Network`,
    body: `Create a Pique account and then upload your recommendation onto a student’s profile.`,
    image: img2,
  }
]

export default connect(null, Actions)(NonprofitsPartners)
