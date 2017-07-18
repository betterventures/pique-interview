import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ButtonFill, ButtonNoFill } from '../IndividualScholarshipsBtns'
import * as Actions from 'api/actions'
import css from './style.css'

export class IndividualScholarshipsMoreQuestions extends Component {
  constructor(props) {
    super(props)
    this.formatWebsite = ::this.formatWebsite
  }

  formatWebsite(url) {
    return (
      /https?:\/\//.test(url)
        ?
          url
        :
          `http://${url}`
    )
  }

  render() {
    const { scholarship } = this.props
    const { organization } = scholarship
    let websiteUrl = organization.website && this.formatWebsite(organization.website)

    return (
      <div className={css.root}>
        {
          typeof organization !== null
            ?
              <div>
                <div className={css.title}>
                  Have More Questions About This Scholarship?
                </div>
                <div className={css.btns}>
                  <ButtonFill
                    text='Visit Website'
                    externalHref={websiteUrl}
                    className={css.btnfill}
                  />
                  <ButtonNoFill
                    text='Send Email'
                    externalHref={ `mailto:${organization.support_email}` }
                    className={css.btnnofill}
                  />
                </div>
              </div>
            :
              ''
        }
      </div>
    )
  }
}

export default connect(
  (state) => {
    return {
      scholarship: (state.app && state.app.scholarships['all'][0]) || {},
    }
  },
  Actions
)(IndividualScholarshipsMoreQuestions)
