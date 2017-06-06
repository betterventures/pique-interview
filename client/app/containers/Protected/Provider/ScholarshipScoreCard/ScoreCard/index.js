import React, { Component } from 'react'
import { connect } from 'react-redux'
import { saveAndUpdateScholarship } from 'api/actions'
import css from './style.css'
import ReactOnRails from 'react-on-rails'

export class ScoreCard extends Component {
  constructor(props) {
    super(props)
    this.saveScholarship = ::this.saveScholarship
    this.removeScoreCardField = ::this.removeScoreCardField
    this.toggleEditing = ::this.toggleEditing

    this.state = {
      editing: false,
      scholarship: this.props.scholarship,
    }
  }

  saveScholarship() {
    this.props.saveAndUpdateScholarship({
      scholarship: this.state.scholarship,
      scholarshipIdx: 0,
    })

    // reset non-scholarship state
    this.setState({
      editing: false
    })
  }

  removeScoreCardField(i) {
    let modifiedScholarship = this.state.scholarship
    modifiedScholarship.score_card.score_card_fields[i]['_destroy'] = '1'

    this.setState({
      scholarship: modifiedScholarship
    })
  }

  toggleEditing() {
    this.setState({
      editing: !this.state.editing
    })
  }

  render() {
    const { header } = this.props
    const { scholarship } = this.state
    scholarship.score_card = scholarship.score_card || { scholarship_id: scholarship.id, score_card_fields: [] }
    scholarship.score_card.score_card_fields = scholarship.score_card.score_card_fields || []

    return (
      <div className={css.card}>
        <div className={css.cardheader}>
          { header }
        </div>

        <div className={css.fields}>
          {
            scholarship.score_card.score_card_fields.length < 1
              ?
                <div className={css.field}>
                  <div className={css.cardrow}>
                    <div className={css.cardleft}>
                      Sample Criterion
                    </div>
                    <div className={css.cardright}>
                      <input className={css.xsinput} type="text" />
                      <span className={css.score}>/ 100</span>
                    </div>
                  </div>
                </div>
              :
                ''
          }
          {
            scholarship.score_card.score_card_fields.map((scoreCardField, i) => {
              {
                // hide destroyed fields
                if (scoreCardField['_destroy'] === '1') {
                  return ''
                }

                return (
                  <div className={css.field} key={i}>
                    <div className={css.cardrow}>
                      <div className={css.cardleft}>
                        { scoreCardField.title }
                      </div>
                      <div className={css.cardright}>
                        <input className={css.xsinput} type="text" />
                        <span className={css.score}>/ { scoreCardField.possible_score }</span>
                      </div>
                    </div>
                    <div className={css.shortrow}>
                      {
                        this.state.editing
                          ?
                            <div className={css.cardleft}>
                              <span className={css.remove} onClick={_ => this.removeScoreCardField(i)}>
                                <i>Remove Criteria</i>
                              </span>
                            </div>
                          :
                            ''
                      }
                    </div>
                  </div>
                )
              }
            })
          }
        </div>
        <div className={css.cardfooter}>
          <div className={css.cardleft}>
            <div className={css.comment}>
              <span className={css.a} onClick={this.toggleEditing}>
                {
                  this.state.editing
                    ?
                      <i>Done Editing</i>
                    :
                      <i>Edit Score Card</i>
                }
              </span>
            </div>
          </div>
          <div className={css.cardright}>
            <button className={css.btn} onClick={this.saveScholarship}>Save</button>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  (state, ownProps) => {
    return {
      scholarship: (state.app && state.app.scholarships['all'][0]) || {},
      header: ownProps.header || 'Score Card Preview',
    }
  },
  { saveAndUpdateScholarship }
)(ScoreCard)
