import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ButtonFill } from '../IndividualScholarshipsBtns'
import * as Actions from 'api/actions'
import css from './style.css'

export class IndividualScholarshipsHeader extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { scholarship } = this.props
    return (
      <div className={css.root}>
        <div className={css.header}>{scholarship.title}</div>
        <div className={css.copy}>
          {scholarship.description} <span className={css.more}>Read More</span>
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

export default connect(
  state => {
    return {
      scholarship: (state.app && state.app.scholarships['all'][0]) || {},
    }
  },
  Actions
)(IndividualScholarshipsHeader)
