import React, { Component } from 'react'
import { connect } from 'react-redux'
import IndividualScholarshipsApply from './Apply'
import IndividualScholarshipsWord from './Word'
import IndividualScholarshipsDocuments from './Documents'
import IndividualScholarshipsMailingAddress from './MailingAddress'
import css from './style.css'

export class IndividualScholarshipsFooter extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { footerAnchor } = this.props

    return (
      <div className={css.root}>
        <div className={css.sectionanchor} name={footerAnchor}>
        </div>
        <div className={css.grid}>
          <div className={css.section}>
            <div className={css.title}>[Scholarship] Scholarship Application Questions!</div>
            <div className={css.body}>
              <IndividualScholarshipsApply />
            </div>
          </div>
          <div className={css.section}>
            <div className={css.title}>Pique Profile Documents!</div>
            <div className={css.body}>
              <IndividualScholarshipsDocuments />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default IndividualScholarshipsFooter
