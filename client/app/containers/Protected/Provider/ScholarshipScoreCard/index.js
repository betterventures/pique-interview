import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ScoreCard } from './ScoreCard'
import css from './style.css'

export class ScholarshipScoreCard extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={css.root}>
        <div className={css.inner}>
          <div className={css.header}>Scholarship Score Card</div>
          <div className={css.body}>
            <div className={css.comment}>
              A Scholarship Score Card allows you to create criteria by which your selection committee can evaluate all scholarship applicants.
            </div>
            <div className={css.borderrow}>
              <input className={css.lginput} type="text" placeholder="Add Criteria" />
              <input className={css.sminput} type="text" placeholder="Total Possible Score" />
              <button className={css.btn}>Add Criteria</button>
            </div>

            <div>
              <div className={css.comment}>
                Current Score Card
              </div>
              <ScoreCard />
            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    applicants: state.app.applicants,
  })
)(ScholarshipScoreCard)
