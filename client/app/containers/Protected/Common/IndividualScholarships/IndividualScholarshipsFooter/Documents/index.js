import React, { Component } from 'react'
import { ButtonFill } from '../../IndividualScholarshipsBtns'
import css from './style.css'

export class IndividualScholarshipsDocuments extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <div className={css.fields}>
          <div className={css.row}>
            <div className={css.label}>Parents W2 Form</div>
            <div className={css.field}>
              <select className={css.input}type="text"/>
            </div>
          </div>
          <div className={css.row}>
            <div className={css.label}>SAT Test Scores*</div>
          </div>
        </div>
          <ButtonFill
            className={css.btn}
            text='Submit Application!' />
      </div>
    )
  }
}

export default IndividualScholarshipsDocuments
