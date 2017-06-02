import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ButtonFill, ButtonNoFill } from '../../IndividualScholarshipsBtns'
import * as Actions from 'api/actions'
import css from './style.css'

export class IndividualScholarshipsPrompt extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { essayRequirement, essayRequirementIdx } = this.props
    return (
      <div className={css.root}>
        <div className={css.subtitle}>Choose 1 of the following Prompts:</div>

        {
          essayRequirement.essay_prompts && essayRequirement.essay_prompts.length > 0
            ?
              essayRequirement.essay_prompts.map(function(essayPrompt, i) {
                return (
                  <div className={css.copy} key={essayPrompt.id}>
                    <div className={css.text}>{essayPrompt.prompt}</div>
                  </div>
                )
              })
            :
              ''
        }

        <div className={css.btns}>
          <ButtonNoFill
            className={css.btn}
            text='Save' />
          <ButtonFill
            className={css.btn}
            text='Apply Now' />
        </div>
      </div>
    )
  }
}

export default IndividualScholarshipsPrompt
