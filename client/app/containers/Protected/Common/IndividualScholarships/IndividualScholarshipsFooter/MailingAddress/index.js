import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as Actions from 'api/actions'
import css from './style.css'

export class IndividualScholarshipsMailingAddress extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { scholarship } = this.props
    return (
      <div className={css.root}>
        <div className={css.copy}>
          <div>Please email your official SAT or ACT test scores to:</div>
          <div className={css.address}>
            <div>{scholarship.organization && scholarship.organization.name}</div>
            <div>{scholarship.organization && scholarship.organization.address}</div>
            <div>{scholarship.organization && `${scholarship.organization.city}, ${scholarship.organization.state}`}</div>
          </div>
        </div>
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
)(IndividualScholarshipsMailingAddress)
