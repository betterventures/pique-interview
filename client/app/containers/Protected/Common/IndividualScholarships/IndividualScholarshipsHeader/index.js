import React, { Component } from 'react'
import { ButtonFill } from '../IndividualScholarshipsBtns'
import css from './style.css'

export class IndividualScholarshipsHeader extends Component {
  constructor(props) {
    super(props)
  }

  static defaultProps = {
    description: `Pique sets out to tackle one the most commonly experienced pains of the millennial demographic, student debt. At Pique, we're creating the common application for scholarships to simplify the scholarship application process for students across America.`

  }

  render() {
    const { description } = this.props
    return (
      <div className={css.root}>
        <div className={css.header}>MLK Scholarships</div>
        <div className={css.copy}>
          {description} <span className={css.more}>Read More</span>
        </div>

        <div className={css.btns}>
          <ButtonFill
            className={css.btn}
            text='Save' />
        </div>
      </div>
    )
  }
}

export default IndividualScholarshipsHeader
