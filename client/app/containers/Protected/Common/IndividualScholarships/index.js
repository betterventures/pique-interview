import React, { Component } from 'react'
import IndividualScholarshipsBanner from './IndividualScholarshipsBanner'
import IndividualScholarshipsHeader from './IndividualScholarshipsHeader'
import IndividualScholarshipsOverview from './IndividualScholarshipsOverview'
import IndividualScholarshipsFooter from './IndividualScholarshipsFooter'
import css from './style.css'

export class IndividualScholarships extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={css.root}>
        <IndividualScholarshipsBanner />
        <IndividualScholarshipsHeader />
        <IndividualScholarshipsOverview />
        <IndividualScholarshipsFooter />
      </div>

    )
  }
}

export default IndividualScholarships
