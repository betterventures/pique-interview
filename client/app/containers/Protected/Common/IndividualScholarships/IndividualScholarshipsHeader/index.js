import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ButtonFill } from '../IndividualScholarshipsBtns'
import * as Actions from 'api/actions'
import css from './style.css'

const SHORT_HEADER_LENGTH = 60

export class IndividualScholarshipsHeader extends Component {

  constructor(props) {
    super(props)
    this.toggleHeaderExpansion = ::this.toggleHeaderExpansion

    this.state = {
      headerExpanded: this.props.scholarship.description &&
                    this.props.scholarship.description.length <= SHORT_HEADER_LENGTH
    }
  }

  toggleHeaderExpansion() {
    this.setState({
      headerExpanded: !this.state.headerExpanded
    })
  }

  render() {
    const { scholarship } = this.props
    return (
      <div className={css.root}>
        <div className={css.header}>{scholarship.title}</div>
        <div className={css.copy}>
          {
            this.state.headerExpanded
              ?
                scholarship.description
              :
                scholarship.description.substr(0, SHORT_HEADER_LENGTH)
          }
          {
            this.state.headerExpanded
              ?
                <span
                  className={css.less}
                  onClick={this.toggleHeaderExpansion}
                >
                  Read Less
                </span>
              :
                <span
                  className={css.more}
                  onClick={this.toggleHeaderExpansion}
                >
                  Read More
                </span>
          }
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
