import React, { Component } from 'react'
import { connect } from 'react-redux'
import IndividualScholarshipsApply from './Apply'
import IndividualScholarshipsWord from './Word'
import IndividualScholarshipsDocuments from './Documents'
import * as Actions from 'api/actions'
import css from './style.css'

export class IndividualScholarshipsFooter extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { scholarship, footerAnchor } = this.props

    return (
      <div className={css.root}>
        <div className={css.sectionanchor} name={footerAnchor}>
        </div>
        <div className={css.grid}>
          <div className={css.section}>
            <div className={css.title}>{scholarship.title} Scholarship Application Questions!</div>
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

export default connect(
  (state, ownProps) => {
    return {
      scholarship: (state.app && state.app.scholarships['all'][0]) || {},
      footerAnchor: ownProps.footerAnchor,
    }
  },
  Actions
)(IndividualScholarshipsFooter)
