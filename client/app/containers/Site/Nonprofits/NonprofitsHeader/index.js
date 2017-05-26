import React from 'react'
import { connect } from 'react-redux'
import * as Actions from 'api/actions'
import css from './style.css'

export const NonprofitsHeader = props => {
  return (
    <div className={css.root}>
      <div className={css.header}>
        <div className={css.line}>Become a Nonprofit Partner.</div>
        <div className={css.line}>Help Make Scholarships More Accessible.</div>
      </div>
      <div className={css.copy}>Become a Pique Partner and make scholarships more accesible to your students while saving time writing recommednations. It’s quick, easy, and most importantly free.</div>
      <button className={css.btn} onClick={props.launchModal}>Join Pique!</button>
    </div>
  )
}

export default connect(null, Actions)(NonprofitsHeader)
