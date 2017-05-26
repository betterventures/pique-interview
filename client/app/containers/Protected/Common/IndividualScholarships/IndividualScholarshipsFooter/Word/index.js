import React, { Component } from 'react'
import { ButtonNoFill } from '../../IndividualScholarshipsBtns'
import css from './style.css'

export class IndividualScholarshipsWord extends Component {
  constructor(props) {
    super(props)
  }

  static defaultProps = {
    tags: [
      '#DACAStudents',
      '#STEM',
      '#4YearProgram',
      '#CommunityService',
      '#MeritScholarship'
    ]
  }

  render() {
    const { tags } = this.props
    return (
      <div className={css.root}>
        <div className={css.copy}>Proof read your essay before submitting your application and remember, you got this, this scholarship was made for you!</div>
          {tags.map(x =>
            <ButtonNoFill
              text={x}
              key={x}
              className={css.tag} />)}
      </div>
    )
  }
}

export default IndividualScholarshipsWord
