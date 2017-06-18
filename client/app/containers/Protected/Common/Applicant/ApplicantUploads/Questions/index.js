import React, { Component } from 'react'
import { connect } from 'react-redux'
import Page from 'components/Icons/Page'
import * as Actions from 'api/actions'
import css from './style.css'

export class ApplicantQuestions extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { scholarship } = this.props

    return (
      <div className={css.root}>
        <div className={css.header}>Application Questions</div>
        <div className={css.box}>

        {
          scholarship.application_questions && scholarship.application_questions.length > 0
            ?
              scholarship.application_questions.map((applicationQuestion, i) => {
                return (
                  <div className={css.section} key={i}>
                    <div className={css.title}>
                      <Page className={css.icon} />
                      <span className={css.text}>{ applicationQuestion.prompt }</span>
                    </div>
                    <div className={css.copy}>
                      This is a great question! Here is my answer!
                    </div>
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
      user: state.user
    }
  },
  Actions
)(ApplicantQuestions)
