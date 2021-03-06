import React, { Component } from 'react'
import { connect } from 'react-redux'
import img from './banner.png'
import * as Actions from 'api/actions'
import css from './style.css'

export class IndividualScholarshipsBanner extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { scholarship } = this.props
    let logoStyles = scholarship.organization && scholarship.organization.logo_url
      ?
        {
          'backgroundImage': `url(${scholarship.organization.logo_url})`,
          'backgroundSize': 'contain',
        }
      :
        {}

    return (
      <div
        className={css.root}>
        <div className={css.logo} style={logoStyles}>
          <div className={css.text}></div>
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
)(IndividualScholarshipsBanner)
