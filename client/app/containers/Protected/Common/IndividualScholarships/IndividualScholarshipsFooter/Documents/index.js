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
      <div>
        <div className={css.fields}>
          <div className={css.row}>
            <div className={css.label}>Parents W2 Form</div>
            <div className={css.field}>
              <select className={css.input}type="text"/>
            </div>
          </div>
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
