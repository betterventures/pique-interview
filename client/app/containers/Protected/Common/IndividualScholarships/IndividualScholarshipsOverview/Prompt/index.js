import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ButtonFill, ButtonNoFill } from '../../IndividualScholarshipsBtns'
import * as Actions from 'api/actions'
import css from './style.css'

function scrollToHash(hashAnchor) {
  let namedElements = document.getElementsByName(hashAnchor)
  namedElements[0].scrollIntoView()
}

export class IndividualScholarshipsPrompt extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { essayRequirement, essayRequirementIdx, footerAnchor } = this.props
    return (
      <div className={css.root}>
        <div className={css.copy}>
          <div className={css.text}>{essayRequirement.prompt}</div>
        </div>

        <div className={css.btns}>
          <ButtonNoFill
            className={css.btn}
            text='Save' />
          <ButtonFill
            className={css.btn}
            onClick={ () => {scrollToHash(footerAnchor)} }
            text='Apply Now' />
        </div>
      </div>
    )
  }
}

export default IndividualScholarshipsPrompt
