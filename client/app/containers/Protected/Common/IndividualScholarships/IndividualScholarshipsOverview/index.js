import React, { Component } from 'react'
import { connect } from 'react-redux'
import IndividualScholarshipsPrompt from './Prompt'
import IndividualScholarshipsDetails from './Details'
import * as Actions from 'api/actions'
import css from './style.css'

export class IndividualScholarshipsOverview extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { scholarship } = this.props
    return (
      <div className={css.root}>
        <div className={css.prompt}>
          <div className={css.title}>Eligibility Requirements</div>
          <div className={css.copy}>
            <div className={css.text}>{scholarship.eligibility}</div>
          </div>
        </div>
        <div className={css.details}>
          <IndividualScholarshipsDetails />
        </div>
        <div className={css.prompt}>
          {
            scholarship.essay_requirements && scholarship.essay_requirements.length > 0
              ?
                scholarship.essay_requirements.map(function (essayRequirement, i) {
                  return (
                    <div key={essayRequirement.id}>
                      <div className={css.border} />
                      <div className={css.title}>Scholarship Essay #{i+1}</div>
                      <IndividualScholarshipsPrompt essayRequirement={essayRequirement} key={essayRequirement.id} />
                    </div>
                  )
                })
              :
                ''
          }
        </div>
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
)(IndividualScholarshipsOverview)
