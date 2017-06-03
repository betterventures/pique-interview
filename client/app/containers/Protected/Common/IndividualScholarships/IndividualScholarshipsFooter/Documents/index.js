import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ButtonFill } from '../../IndividualScholarshipsBtns'
import * as Actions from 'api/actions'
import css from './style.css'

export class IndividualScholarshipsDocuments extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { scholarship } = this.props
    return (
      <div className={css.root}>
        <div className={css.fields}>
          {
            scholarship.supplemental_requirements && scholarship.supplemental_requirements.length > 0
              ?
                scholarship.supplemental_requirements.map((suppRec, i) => (
                  <div className={css.row} key={suppRec.id}>
                    <div className={css.label}>{suppRec.title}</div>
                    <div className={css.field}>
                      <select className={css.input}type="text"/>
                    </div>
                  </div>
                  )
                )
              :
                ''
          }
          {scholarship.minimum_sat_score
              ?
                <div className={css.row}>
                  <div className={css.label}>SAT Test Scores*</div>
                </div>
              :
                ''
          }
          {scholarship.minimum_act_score
              ?
                <div className={css.row}>
                  <div className={css.label}>ACT Test Scores*</div>
                </div>
              :
                ''
          }
          {
            (!scholarship.supplemental_requirements.length &&
              !scholarship.minimum_sat_score &&
              !scholarship.minimum_act_score
                ?
                  <span className={css.copy}>None!</span>
                :
                  ''
            )
          }
        </div>
          <ButtonFill
            className={css.btn}
            text='Submit Application!' />
      </div>
    )
  }
}


export default connect(
  state => {
    return {
      scholarship: (state.app && state.app.scholarships['all'][0]) || {},
    }
  },
  Actions
)(IndividualScholarshipsDocuments)
