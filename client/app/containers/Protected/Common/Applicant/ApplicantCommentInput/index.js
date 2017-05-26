import React, { Component } from 'react'
import css from './style.css'

export class ApplicantCommentInput extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={css.root}>
        <input
          className={css.input}
          placeholder="Be sure to leave a comment!" />
      </div>
    )
  }
}

export default ApplicantCommentInput
