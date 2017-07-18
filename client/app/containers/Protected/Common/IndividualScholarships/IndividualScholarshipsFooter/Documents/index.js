import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ButtonFill } from '../../IndividualScholarshipsBtns'
import IndividualScholarshipsOrgProvidedDocuments from '../OrgProvidedDocuments'
import * as Actions from 'api/actions'
import css from './style.css'

export class IndividualScholarshipsDocuments extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { scholarship } = this.props

    let recommendations = []
    if (scholarship.minimum_recommendations) {
      let i = 0
      while (++i <= scholarship.minimum_recommendations) recommendations.push(i)
    }

    let essayRequirements = []
    if (scholarship.essay_requirements.length > 0) {
      let i = 0
      while (++i <= scholarship.essay_requirements.length) essayRequirements.push(i)
    }

    let finAidRequirements            = (scholarship && scholarship.acceptable_proof_of_financial_need) || []
    let finAidReqsStr = `Proof of Financial Need (` +
                        `${finAidRequirements.slice(0,-1).join(', ')}` +
                        `${ finAidRequirements.length > 2 ? ', ' : ''}` +
                        `${ finAidRequirements.length > 1 ? ' or ' : ''}` +
                        `${finAidRequirements[finAidRequirements.length-1]}` +
      `)`

    let supplementalRequirements      = (scholarship && scholarship.supplemental_requirements) || []
    let generalSupplementalDocuments  = (scholarship && scholarship.general_supplemental_documents) || []
    let allSuppRequirements           = supplementalRequirements.concat(generalSupplementalDocuments)

    return (
      <div className={css.root}>
        <div className={css.fields}>
          {
            recommendations.map(i => (
              <div className={css.row} key={i}>
                <div className={css.inlinelabel}>Recommendation #{i}</div>
                <div className={css.field}>
                  <select className={css.input} type="text"/>
                </div>
              </div>
            ))
          }
          {
            essayRequirements.map(i => (
              <div className={css.row} key={i}>
                <div className={css.inlinelabel}>Scholarship Essay #{i}</div>
                <div className={css.field}>
                  <select className={css.input} type="text"/>
                </div>
              </div>
            ))
          }
          {
            finAidRequirements.length > 0
              ?
                <div className={css.row}>
                  <div className={css.inlinelabel}>{ finAidReqsStr }</div>
                  <div className={css.field}>
                    <select className={css.input} type="text"/>
                  </div>
                </div>
              :
                ''
          }
          {
            allSuppRequirements.map((suppReq, i) => (
              <div className={css.row} key={i}>
                <div className={css.inlinelabel}>{suppReq.title}</div>
                <div className={css.field}>
                  <select className={css.input} type="text"/>
                </div>
              </div>
            ))
          }
          {
            scholarship.minimum_sat_score
              ?
                <div className={css.row}>
                  <div className={css.inlinelabel}>SAT Test Scores*</div>
                </div>
              :
                ''
          }
          {
            scholarship.minimum_act_score
              ?
                <div className={css.row}>
                  <div className={css.inlinelabel}>ACT Test Scores*</div>
                </div>
              :
                ''
          }
        </div>
          <div className={css.title}>{scholarship.title} Docs:</div>
          <div className={css.body}>
            <IndividualScholarshipsOrgProvidedDocuments />
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
)(IndividualScholarshipsDocuments)
