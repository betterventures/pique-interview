import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Match } from 'react-router'
import ApplicantCover from './ApplicantCover'
import ApplicantHeader from './ApplicantHeader'
import ApplicantUploads from './ApplicantUploads'
import ApplicantComments from './ApplicantComments'
import ApplicantCommentInput from './ApplicantCommentInput'
import ApplicantQuestionnaire from './ApplicantQuestionnaire'
import css from './style.css'

export const Applicant = props => {
  return (
    <div className={css.root}>
      <ApplicantCover />
      <div className={css.profile}>
        <ApplicantHeader {...props} />
        <ApplicantUploads {...props} />
        <div className={css.board}>
          <ApplicantQuestionnaire {...props} />
          <ApplicantComments />
        </div>
      </div>
      <ApplicantCommentInput />
    </div>
  )
}

function getProfile(group, id) {
  return group.filter(x => x.id.toString() === id.toString())[0]
}

export default connect(
  (state, ownProps) => {
    return {
      ...getProfile(state.app.applicants.all, ownProps.params.id)
    }
  }
)(Applicant)
