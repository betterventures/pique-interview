import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Match, Link } from 'react-router'
import Rating from 'components/Rating'
import AwardRibbon from 'components/Icons/AwardRibbon'
import { saveAndUpdateScholarship } from 'api/actions'
import css from './style.css'

export class DashboardCards extends Component {
  constructor(props) {
    super(props)
    this.showAwardModal = ::this.showAwardModal
    this.closeAwardModal = ::this.closeAwardModal
    this.selectAwardIndex = ::this.selectAwardIndex
    this.saveAwardToApplication = ::this.saveAwardToApplication
    this.state = {
      showAwardModal: false,
      student: null,
      selectedAwardIndex: null
    }
  }

  closeAwardModal() {
    this.setState({
      showAwardModal: false,
      student: null,
    })
  }

  showAwardModal(student) {
    this.setState({
      showAwardModal: true,
      student: student,
    })
  }

  selectAwardIndex(i=null) {
    this.setState({
      selectedAwardIndex: i
    })
  }

  applicationForStudent(scholarship, student) {
    let applications = scholarship.scholarship_applications
    let appsForStudent = applications.filter((app) => app.student_id === student.id)
    return (appsForStudent.length > 0 ? appsForStudent[0] : {})
  }

  remainingAwards(scholarship) {
    return scholarship
      .awards
      .filter((a) => !a.scholarship_application_id)
      .sort((a,b) => b.amount - a.amount)
  }

  saveAwardToApplication(scholarship, student, award) {
    const scholarshipApplicationId = this.applicationForStudent(scholarship, student).id
    if (!scholarshipApplicationId) {
      return false
    }

    // update the Award with that ID;
    // Award is still bound to the Scholarship by reference,
    // and so will be updated
    award.scholarship_application_id = scholarshipApplicationId

    this.props.saveAndUpdateScholarship({
      scholarship: scholarship,
      scholarshipIdx: 0,
    })
  }

  render() {
    const { items, scholarship } = this.props
    const { student } = this.state
    const awards = this.remainingAwards(scholarship)
    const studentFirstName = student && student.name.split(' ')[0]

    return (
      <div className={css.root}>
        {
          this.state.showAwardModal
            ?
              <div>
                <div className={css.overlay} onClick={() => this.closeAwardModal()}></div>
                <div className={css.awardmodal}>
                  <div className={css.awardmodalcontent}>
                    <div className={css.header}>
                      Award {studentFirstName || this.state.student.name}!
                    </div>
                    <div className={css.underline}>
                    </div>
                    {
                      awards
                        ?
                          <div>
                            <div className={css.subheader}>
                              Select the scholarship award you wish for this student to receive.
                            </div>
                            <ul className={css.awarddropdown}>
                              {
                                awards.map((a, i) => {
                                  return (!a.scholarship_application_id
                                    ?
                                      <li
                                        className={`${css.award} ${ i === this.state.selectedAwardIndex ? css.selectedaward : '' }`}
                                        key={i}
                                        onClick={() => this.selectAwardIndex(i)}
                                      >
                                        Award #{i+1} - ${a.amount.toLocaleString()}
                                      </li>
                                    :
                                      ''
                                  )
                                })
                              }
                            </ul>
                          </div>
                      :
                        `No awards found for ${scholarship.title}!`
                    }
                    <button
                      className={css.awardbtn}
                      onClick={ () => this.saveAwardToApplication(
                        scholarship,
                        student,
                        awards[this.state.selectedAwardIndex]
                      )}
                    >
                      Award!
                    </button>
                  </div>
                </div>
              </div>
            :
              ''
        }
        <div>
          {items.map((x, i) =>
            <div key={i} className={css.item}>
              <div className={css.wrap}>
                <Link to={`/applicant/${x.id}`}>
                  <div className={css.img} style={{backgroundImage: `url(${x.image})`}} />
                  <div className={css.stripe}>
                    <div className={css.name}>{x.name}</div>
                    <div className={css.desc}>
                      {
                        x.description && x.description.length > 105
                          ?
                            // Hacky multiline ellipsis: add ellipsis after n chars,
                            // and if n+1-th char is a \s, then add a space before the ellipsis.
                            // This preserves appearance when last char is \s as well as \w.
                            `${x.description.substr(0,105)}${x.description[105] === ' ' ? ' ' : ''}...`
                          :
                            x.description
                      }
                    </div>
                    <div
                      className={css.rating}
                      style={{height: '28px', 'fontWeight': 400}}
                      value={x.rating}>
                    </div>
                  </div>
                </Link>
                <Match
                  pattern='/dashboard/scored'
                  render={() =>
                    <span
                      onClick={() => this.showAwardModal(x) }
                    >
                      <AwardRibbon
                        className={css.awardicon}
                      />
                    </span>
                  }
                />
                <div className={css.details}>
                  <div className={css.info}>
                    <div className={css.title}>GPA</div>
                    <div className={css.val}>{x.gpa}</div>
                  </div>
                  <div className={css.info}>
                    <div className={css.title}>Activities</div>
                    <div className={css.val}>
                      {
                        x.activities
                          .map((x, _) => JSON.parse(x))
                          .map((x, i) =>
                            <div key={i} className={css.activity}><strong>{x.position_held}</strong> at {x.title}</div>
                          )
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    scholarship: state.app.scholarships.all[0]
  }),
  { saveAndUpdateScholarship }
)(DashboardCards)
