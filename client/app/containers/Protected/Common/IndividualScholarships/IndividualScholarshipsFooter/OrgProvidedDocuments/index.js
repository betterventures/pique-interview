import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { ButtonFill } from '../../IndividualScholarshipsBtns'
import * as Actions from 'api/actions'
import css from './style.css'

export class IndividualScholarshipsOrgProvidedDocuments extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { scholarship } = this.props

    let orgProvidedDocuments = (scholarship && scholarship.org_provided_documents) || []

    return (
      <div className={css.root}>
        <div className={css.fields}>
          {
            orgProvidedDocuments.map((orgProvidedDoc, i) => (
              <div className={css.row} key={i}>
                <a href={orgProvidedDoc.filepicker_url} className={css.link} target='_blank'>
                  {orgProvidedDoc.title}
                </a>
              </div>
            ))
          }
          {
            orgProvidedDocuments.length === 0
              ?
                <div className={css.row}>
                  The scholarship provider did not list any additional documents for applicants to use.
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
)(IndividualScholarshipsOrgProvidedDocuments)
