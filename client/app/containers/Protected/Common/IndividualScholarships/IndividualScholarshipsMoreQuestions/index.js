import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ButtonFill, ButtonNoFill } from '../IndividualScholarshipsBtns'
import * as Actions from 'api/actions'
import css from './style.css'

export class IndividualScholarshipsMoreQuestions extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { scholarship } = this.props
    const { organization } = scholarship

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
                    to={organization.website}
                    className={css.btnfill}
                  />
                  <ButtonNoFill
                    text='Send Email'
                    to={ `mailto:${organization.support_email}` }
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
