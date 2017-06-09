import React, { Component } from 'react'
import { connect } from 'react-redux'
import { saveAndUpdateScholarship } from 'api/actions'
import css from './style.css'

export class ApplicantQuestionnaire extends Component {
  constructor(props) {
    super(props)
    this.saveScholarship = ::this.saveScholarship
    this.setScoreForRatingField = ::this.setScoreForRatingField
    this.setCommentForRating = ::this.setCommentForRating
    this.getApplicationForStudent = getApplicationForStudent

    this.state = {
      scholarship: this.props.scholarship,
      rating: this.props.rating,
      disabled: false,
    }
  }

  saveScholarship() {
    if (this.state.disabled) {
      return
    }

    // Debounce; component will be rerendered in enabled state
    this.setState({
      disabled: true,
    })

    // if Rating is new (has no id), push it into the Scholarship's `ratings` array
    if (!this.state.rating.id) {
      let appForStudent = getApplicationForStudent(
        this.state.scholarship.scholarship_applications,
        this.props.applicantId
      )
      appForStudent.ratings = appForStudent.ratings || []
      appForStudent.ratings.push(this.state.rating)
    }

    this.props.saveAndUpdateScholarship({
      scholarship: this.state.scholarship,
      scholarshipIdx: 0,
    })
  }

  // Set the Score for the appropriate RatingField
  setScoreForRatingField(e, scoreCardFieldId) {
    let newRating = Object.assign({}, this.state.rating)
    let ratingFieldToUpdate = newRating.fields.filter(field => {
      return field.score_card_field_id === scoreCardFieldId
    })[0]
    ratingFieldToUpdate.score = e.target.value
    this.setState({
      rating: newRating
    })
  }

  setCommentForRating(e) {
    // do not clone this.state.rating, as
    // we want to keep the reference to the same rating
    // in order to keep the reference contained inside Scholarship
    this.state.rating.comment = e.target.value
    this.setState({
      rating: this.state.rating
    })
  }

  render() {
    const { header, applicantId, user } = this.props
    const { scholarship, rating } = this.state

    return (
      <div className={css.root}>
        <div className={css.header}>
          { header }
        </div>
        <div className={css.card}>
          <div className={css.fields}>
            {
              scholarship.score_card.score_card_fields.map((scoreCardField, i) => {
                {
                  return (
                    <div className={css.field} key={i}>
                      <div className={css.cardrow}>
                        <div className={css.cardleft}>
                          { scoreCardField.title }
                        </div>
                        <div className={css.cardright}>
                          <input
                            className={css.xsinput}
                            type="text"
                            value={rating.fields[i].score}
                            onChange={e => this.setScoreForRatingField(e, scoreCardField.id)}
                          />
                          <span className={css.score}>/ { scoreCardField.possible_score }</span>
                        </div>
                      </div>
                    </div>
                  )
                }
              })
            }
            <div className={css.field}>
              <div className={css.cardRow}>
                <textarea
                  className={css.largetext}
                  placeholder="Add a comment!"
                  value={this.state.rating.comment}
                  onChange={this.setCommentForRating}>
                </textarea>
              </div>
            </div>
          </div>

          <div className={css.cardfooter}>
            <div className={css.cardright}>
              <button className={ this.state.disabled ? css.disabledBtn : css.btn } onClick={this.saveScholarship} disabled={this.state.disabled}>Save</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function getRatingForApplicantAndProvider(scholarship, applicantId, user) {
  // get current Rating, or populate if DNE
  scholarship.score_card = scholarship.score_card || { scholarship_id: scholarship.id, score_card_fields: [] }
  scholarship.score_card.score_card_fields = scholarship.score_card.score_card_fields || []

  // Get the current Application
  scholarship.scholarship_applications = scholarship.scholarship_applications || []
  const appForStudent = getApplicationForStudent(
    scholarship.scholarship_applications,
    applicantId
  )
  appForStudent.ratings = appForStudent.ratings || []
  const currentProviderRating = getRatingForRater(
    appForStudent.ratings,
    user.id   // current logged-in Provider's ID
  ) || {}

  // fill in ID values for current rating if not populated
  currentProviderRating.scholarship_application_id =
    currentProviderRating.scholarship_application_id ||
    appForStudent.id
  currentProviderRating.rater_id = currentProviderRating.rater_id || user.id
  currentProviderRating.fields = currentProviderRating.fields || []

  // Need a RatingField for each ScoreCardField:
  // Obtain this by getting the ScoreCardField Ids,
  // then adding Rating Fields for any Score Card Fields that do not yet have a Rating Field.
  let desiredScoreCardFieldIds  = scholarship.score_card.score_card_fields.map(scf => scf.id)
  let existingScoreCardFieldIds = currentProviderRating.fields.map(rf => rf.score_card_field_id)
  let neededScoreCardFieldIds = desiredScoreCardFieldIds.filter(field => existingScoreCardFieldIds.indexOf(field) < 0)

  let neededScoreCardFields = neededScoreCardFieldIds.map(scoreCardFieldId => {
    return {
      application_rating_id: currentProviderRating.id,
      score_card_field_id: scoreCardFieldId,
    }
  })
  currentProviderRating.fields = currentProviderRating.fields.concat(neededScoreCardFields)

  return currentProviderRating
}

function getApplicationForStudent(applications, studentId) {
  return applications.filter(app => (app.student_id && app.student_id.toString()) === studentId.toString())[0]
}

function getRatingForRater(ratings, raterId) {
  return ratings.filter(rating => (rating.rater_id && rating.rater_id.toString()) === raterId.toString())[0]
}

export default connect(
  (state, ownProps) => {
    const scholarship = (state.app && state.app.scholarships['all'][0]) || {}
    return {
      applicantId: ownProps.params.id,
      header: ownProps.header || 'Rate Applicant',
      scholarship: scholarship,
      user: state.user,
      rating: getRatingForApplicantAndProvider(
        scholarship,
        ownProps.params.id,
        state.user
      ),
    }
  },
  { saveAndUpdateScholarship }
)(ApplicantQuestionnaire)
