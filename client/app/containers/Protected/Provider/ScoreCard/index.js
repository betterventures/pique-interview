import React, { Component } from 'react'
import { connect } from 'react-redux'
import css from './style.css'

export class ScoreCard extends Component {
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
              <div className={css.card}>
                <div className={css.cardheader}>
                  Score Card Preview
                </div>
                <div className={css.cardrow}>
                  <div className={css.cardleft}>
                    Interview
                  </div>
                  <div className={css.cardright}>
                    <input className={css.xsinput} type="text" />
                    <span>/15</span>
                  </div>
                </div>
                <div className={css.cardrow}>
                  <div className={css.cardleft}>
                    General Application
                  </div>
                  <div className={css.cardright}>
                    <input className={css.xsinput} type="text" />
                    <span>/25</span>
                  </div>
                </div>
                <div className={css.cardfooter}>
                  <div className={css.cardleft}>
                    <div className={css.comment}>
                      <i>Edit Score Card</i>
                    </div>
                  </div>
                  <div className={css.cardright}>
                    <button className={css.btn}>Save</button>
                  </div>
                </div>
              </div>
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
)(ScoreCard)
