import React, { Component } from 'react'
import IndividualScholarshipsOverview from './Overview'
import IndividualScholarshipsDetails from './Details'
import css from './style.css'

export class IndividualScholarshipsPrompt extends Component {
  constructor(props) {
    super(props)
  }

  static defaultProps = {
    copy1: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam suscipit mi nec sapien ullamcorper porttitor. Phasellus sed placerat orci. `,
    copy2: `Morbi euismod eros eu dui congue, eu bibendum lectus blandit. Praesent condimentum id tortor pharetra gravida. Etiam sit amet lectus ante. Aliquam non volutpat lacus, sit amet accumsan purus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Cras et molestie metus. Praesent ligula sem, scelerisque vulputate lacus et, fringilla posuere ante.`,
  }

  render() {
    const { number } = this.props
    return (
      <div className={css.root}>
        <div className={css.title}>Eligibility Requirements</div>
        <div className={css.overview}>
          <IndividualScholarshipsOverview  />
          <div className={css.border} />
        <div className={css.title}>Scholarship Prompt #1</div>
          <IndividualScholarshipsOverview  />
        </div>
        <div className={css.details}>
          <IndividualScholarshipsDetails />
        </div>
      </div>
    )
  }
}

export default IndividualScholarshipsPrompt
