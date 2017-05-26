import React, { Component } from 'react'
import { connect } from 'react-redux'
import IndividualScholarshipsApply from './Apply'
import IndividualScholarshipsWord from './Word'
import IndividualScholarshipsDocuments from './Documents'
import IndividualScholarshipsMailingAddress from './MailingAddress'
import css from './style.css'

export class IndividualScholarshipsFooter extends Component {
  render() {
    return (
      <div className={css.root}>
        <div className={css.grid}>
          <div className={css.section}>
            <div className={css.title}>Apply!</div>
            <div className={css.body}>
              <IndividualScholarshipsApply />
            </div>
          </div>
          <div className={css.section}>
            <div className={css.title}>A Word from Pique</div>
            <div className={css.body}>
              <IndividualScholarshipsWord />
            </div>
          </div>
          <div className={css.section}>
            <div className={css.title}>Required Supplemental Documents</div>
            <div className={css.body}>
              <IndividualScholarshipsDocuments />
            </div>
          </div>
          <div className={css.section}>
            <div className={css.title}>Scholarship Provider’s Mailing Address:</div>
            <div className={css.body}>
              <IndividualScholarshipsMailingAddress />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    ...state
  })
)(IndividualScholarshipsFooter)
