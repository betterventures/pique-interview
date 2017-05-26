import React, { Component } from 'react'
import css from './style.css'

export class IndividualScholarshipsMailingAddress extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={css.root}>
        <div className={css.copy}>
          <span>Please email your official SAT or ACT test scores to:</span>
          1234 Macbook Street, Redwood City, CA
        </div>
      </div>
    )
  }
}

export default IndividualScholarshipsMailingAddress
