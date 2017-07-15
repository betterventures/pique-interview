import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as Actions from 'api/actions'
import css from './style.css'

export class IndividualScholarshipsApply extends Component {
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

    let generalApplicationQuestions = (scholarship && scholarship.general_application_questions) || []
    let applicationQuestions = (scholarship && scholarship.application_questions) || []

    let allAppQuestions = generalApplicationQuestions.concat(applicationQuestions)

    return (
      <div className={css.root}>
        <div className={css.copy}>
          {`Answer the following questions and select the items from your Pique Profile you would like to use to apply to the ${scholarship.title} Scholarship. Your ‘cover letter’ and ‘official transcript’ will automatically be sent with your application.`}
        </div>
        {
          allAppQuestions.map((question, i) => (
            <div key={i}>
              <div className={css.tallrow}>
                <div className={css.label}>
                  {question.prompt}
                </div>
                <div className={css.widefield}>
                  <textarea
                    className={css.textarea}
                    placeholder='Enter your answer to this question here'
                  >
                  </textarea>
                </div>
              </div>
            </div>
          ))
        }
        {
          recommendations.map(i => (
            <div className={css.row} key={i}>
              <div className={css.label}>Recommendation #{i}</div>
              <div className={css.field}>
                <select className={css.input} type="text"/>
              </div>
            </div>
          ))
        }
        {
          essayRequirements.map(i => (
            <div className={css.row} key={i}>
              <div className={css.label}>Scholarship Essay #{i}</div>
              <div className={css.field}>
                <select className={css.input} type="text"/>
              </div>
            </div>
          ))
        }
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
)(IndividualScholarshipsApply)
