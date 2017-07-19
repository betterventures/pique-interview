import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as Actions from 'api/actions'
import css from './style.css'

export class IndividualScholarshipsApply extends Component {
  render() {
    const { scholarship } = this.props

    let generalApplicationQuestions = (scholarship && scholarship.general_application_questions) || []
    let applicationQuestions = (scholarship && scholarship.application_questions) || []

    let allAppQuestions = generalApplicationQuestions.concat(applicationQuestions)

    return (
      <div className={css.root}>
        <div className={css.copy}>
          {`Answer the following questions and select the items from your Pique Profile you would like to use to apply to the ${scholarship.title}. Your ‘cover letter’ and ‘official transcript’ will automatically be sent with your application.`}
        </div>
        {
          allAppQuestions.map((question, i) => (
            <div key={i}>
              <div className={ question.answer_type === 'long' ? css.tallrow : css.medrow }>
                <div className={css.label}>
                  {i+1}. {question.prompt}
                </div>
                <div className={css.widefield}>
                  {
                    question.answer_type === 'long'
                      ?
                        <textarea
                          className={css.textarea}
                          placeholder='Enter your answer to this question here'
                        />
                      :
                        <input
                          className={css.wideinput}
                          placeholder='Enter your answer to this question here'
                        />
                  }
                </div>
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
