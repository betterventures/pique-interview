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
  }

  removeScoreCardField(i) {
    let modifiedScholarship = this.state.scholarship
    modifiedScholarship.score_card.score_card_fields.splice(i,1)

    this.setState({
      scholarship: modifiedScholarship
    })

    console.log("STATE")
    console.log(this.state)
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

        {
          // this form sucks. Please refactor to use redux-form.
        }
        <form
          className="edit_scholarship"
          id={`edit_scholarship_${scholarship.id}`}
          action={`/providers/scholarships/${scholarship.id}`}
          acceptCharset="UTF-8"
          method="post"
        >
          <input name="utf8" type="hidden" value="✓" />
          <input type="hidden" name="_method" value="put" />
          <input type="hidden" name="authenticity_token" value={ReactOnRails.authenticityToken()} />

          {
            scholarship.score_card.id
              ?
                <input
                  required="required"
                  type="hidden"
                  value={scholarship.score_card.id}
                  name="scholarship[score_card_attributes][id]"
                  id="scholarship_score_card_attributes_id"
                />
              :
                ''
          }
          <input
            required="required"
            type="hidden"
            value={scholarship.id}
            name="scholarship[score_card_attributes][scholarship_id]"
            id="scholarship_score_card_attributes_scholarship_id"
          />
          <div className={css.fields}>
            {
              scholarship.score_card.score_card_fields.map((scoreCardField, i) => {
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
                              <span className={css.remove} onClick={i => this.removeScoreCardField(i)}>
                                <i>Remove Criteria</i>
                              </span>
                            </div>
                          :
                            ''
                      }
                    </div>
                    <div className='formFields'>
                      <input
                        required="required"
                        type="hidden"
                        value={scoreCardField.title}
                        name={`scholarship[score_card_attributes][score_card_fields_attributes][${i}][title]`}
                        id={`scholarship_score_card_attributes_score_card_fields_attributes_${i}_title`}
                      />
                      <input
                        required="required"
                        type="hidden"
                        value={scoreCardField.possible_score}
                        name={`scholarship[score_card_attributes][score_card_fields_attributes][${i}][possible_score]`}
                        id={`scholarship_score_card_attributes_score_card_fields_attributes_${i}_possible_score`}
                      />
                      {
                        scoreCardField.id
                          ?
                            <input
                              type="hidden"
                              value={scoreCardField.id}
                              name={`scholarship[score_card_attributes][score_card_fields_attributes][${i}][id]`}
                              id={`scholarship_score_card_attributes_score_card_fields_attributes_${i}_id`}
                            />
                          :
                            ''
                      }
                    </div>
                  </div>
                )
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
              { // <button className={css.btn} onClick={this.saveScholarship}>Save</button>
              }
              <input
                className={css.btn}
                type="submit"
                name="commit"
                value="Save"
                data-disable-with="Save"
              />
            </div>
          </div>
        </form>
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
