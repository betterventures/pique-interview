import React from 'react'
import { connect } from 'react-redux'
import * as Actions from 'api/actions'
import img1 from './005-notepad.png'
import img2 from './008-tablet.png'
import css from './style.css'

export const HomeEducators = props => {
  return (
    <div className={css.root}>
      <div className={css.card}>
        <img className={css.img} src={img1} />
        <div className={css.caption}>One Recommendation For Each Student.</div>
        <div className={css.caption}>Done.</div>
        <div className={css.body}>
          <div className={css.copy}><span>Recommenders,</span> upload one standard recommendation onto Pique for each student.</div>
          <div className={css.copy}>Never write another recommendation for that student again.</div>
          <div className={css.copy}>And do not worry, your students will never be penalized by foundations for a <span>‘generic recommendation’</span>.</div>
        </div>
        <div className={css.copy}>That's the Pique way.</div>

        <button className={css.btn} onClick={props.launchModal}>Sign Up!</button>
        <div className={css.tablet}>
          <img src={img2} />
        </div>
      </div>
    </div>
  )
}

export default connect(null, Actions)(HomeEducators)