import React, { Component } from 'react'
import { connect } from 'react-redux'
import { saveAndUpdateScholarship } from 'api/actions'
import css from './style.css'

export class ApplicantQuestionnaire extends Component {
  constructor(props) {
    super(props)
    this.saveScholarship = ::this.saveScholarship

    this.state = {
      scholarship: this.props.scholarship,
    }
  }

  saveScholarship() {
    this.props.saveAndUpdateScholarship({
      scholarship: this.state.scholarship,
      scholarshipIdx: 0,
    })
  }

  render() {
    const { header } = this.props
    const { scholarship } = this.state
    scholarship.score_card = scholarship.score_card || { scholarship_id: scholarship.id, score_card_fields: [] }
    scholarship.score_card.score_card_fields = scholarship.score_card.score_card_fields || []

    return (
      <div className={css.root}>
        <div className={css.header}>
          { header }
        </div>
        <div className={css.card}>
          <div className={css.fields}>
            {
              scholarship.score_card.score_card_fields.map((scoreCardField, i) => {
                {
                  return (
                    <div className={css.field} key={i}>
                      <div className={css.cardrow}>
                        <div className={css.cardleft}>
                          { scoreCardField.title }
                        </div>
                        <div className={css.cardright}>
                          <input className={css.xsinput} type="text" />
                          <span className={css.score}>/ { scoreCardField.possible_score }</span>
                        </div>
                      </div>
                    </div>
                  )
                }
              })
            }
            <div className={css.field}>
              <div className={css.cardRow}>
                <textarea className={css.largetext} placeholder="Add a comment!">
                </textarea>
              </div>
            </div>
          </div>

          <div className={css.cardfooter}>
            <div className={css.cardright}>
              <button className={css.btn} onClick={this.saveScholarship}>Save</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  (state, ownProps) => {
    return {
      scholarship: (state.app && state.app.scholarships['all'][0]) || {},
      header: ownProps.header || 'Rate Applicant',
    }
  },
  { saveAndUpdateScholarship }
)(ApplicantQuestionnaire)
