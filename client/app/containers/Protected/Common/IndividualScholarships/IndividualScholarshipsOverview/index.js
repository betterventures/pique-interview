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
    const { scholarship, footerAnchor } = this.props
    return (
      <div className={css.root}>
        <div className={css.row}>
          <div className={css.rowcontent}>
            <div className={css.eligibility}>
              <div className={css.title}>Eligibility Requirements</div>
              <div className={css.copy}>
                <div className={css.text}>{scholarship.eligibility}</div>
              </div>
            </div>
            <div className={css.providernote}>
              <div className={css.title}>A Note from {( scholarship.organization && scholarship.organization.name ) || 'the Provider' }</div>
              <div className={css.copy}>
                <div className={css.text}>{scholarship.note_from_provider}</div>
              </div>
            </div>
          </div>
        </div>
        <div>
          {
            scholarship.essay_requirements && scholarship.essay_requirements.length > 0
              ?
                scholarship.essay_requirements.map(function (essayRequirement, i) {
                  return (
                    <div className={css.row} key={essayRequirement.id}>
                      <div className={css.border} />
                      <div className={css.rowcontent}>
                        <div className={css.prompt}>
                          <div key={essayRequirement.id}>
                            <div className={css.title}>Scholarship Essay #{i+1}</div>
                            <IndividualScholarshipsPrompt
                              footerAnchor={footerAnchor}
                              essayRequirement={essayRequirement}
                            />
                          </div>
                        </div>
                        <div className={css.details}>
                          <IndividualScholarshipsDetails
                            essayRequirementIdx={i}
                          />
                        </div>
                      </div>
                    </div>
                  )
                })
              :
                ''
          }
        </div>
        <div className={css.border} />
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
)(IndividualScholarshipsOverview)
