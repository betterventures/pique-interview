import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ButtonFill } from '../IndividualScholarshipsBtns'
import * as Actions from 'api/actions'
import css from './style.css'

export class IndividualScholarshipsHeader extends Component {
  constructor(props) {
    super(props)
    this.expandHeaderText = ::this.expandHeaderText

    this.state = {
      expandHeader: this.props.scholarship.description &&
                    this.props.scholarship.description.length <= 100
    }
  }

  expandHeaderText() {
    this.setState({
      expandHeader: true
    })
  }

  render() {
    const { scholarship } = this.props
    return (
      <div className={css.root}>
        <div className={css.header}>{scholarship.title}</div>
        <div className={css.copy}>
          {
            this.state.expandHeader
              ?
                scholarship.description
              :
                scholarship.description.substr(0, 100)
          }
          <span
            className={this.state.expandHeader ? css.hidden : css.more}
            onClick={this.expandHeaderText}
          >
            Read More
          </span>
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
