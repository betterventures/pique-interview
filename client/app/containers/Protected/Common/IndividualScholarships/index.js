import React, { Component } from 'react'
import IndividualScholarshipsBanner from './IndividualScholarshipsBanner'
import IndividualScholarshipsHeader from './IndividualScholarshipsHeader'
import IndividualScholarshipsOverview from './IndividualScholarshipsOverview'
import IndividualScholarshipsFooter from './IndividualScholarshipsFooter'
import IndividualScholarshipsMoreQuestions from './IndividualScholarshipsMoreQuestions'
import css from './style.css'

// ID reference allowing href scrolling to the Footer section
const FOOTER_ANCHOR = 'footer'

export class IndividualScholarships extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={css.root}>
        <IndividualScholarshipsBanner />
        <IndividualScholarshipsHeader />
        <IndividualScholarshipsOverview footerAnchor={FOOTER_ANCHOR} />
        <IndividualScholarshipsFooter footerAnchor={FOOTER_ANCHOR} />
        <IndividualScholarshipsMoreQuestions />
      </div>

    )
  }
}

export default IndividualScholarships
