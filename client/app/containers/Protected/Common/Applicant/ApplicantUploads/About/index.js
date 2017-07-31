import React, { Component } from 'react'
import { connect } from 'react-redux'
import Page from 'components/Icons/Page'
import DocumentStarLines from 'components/Icons/DocumentStarLines'
import DocumentStarAward from 'components/Icons/DocumentStarAward'
import moment from 'moment'
import css from './style.css'

const AWARD_DATE_FORMAT = 'MMMM YYYY'

function formatDate(awardDate) {
  return moment(awardDate).format(AWARD_DATE_FORMAT)
}

export class ApplicantAbout extends Component {
  constructor(props) {
    super(props)
    this.toggleActivitiesClosed = ::this.toggleActivitiesClosed
    this.toggleAwardsClosed = ::this.toggleAwardsClosed

    this.state = {
      activitiesClosed: true,
      honorsAndAwardsClosed: true,
    }
  }

  toggleActivitiesClosed() {
    this.setState({
      activitiesClosed: !this.state.activitiesClosed
    })
  }

  toggleAwardsClosed() {
    this.setState({
      honorsAndAwardsClosed: !this.state.honorsAndAwardsClosed
    })
  }

  render() {
    const { intro, description, activities=[], honors_and_awards=[] } = this.props
    let applicantActivities = activities.map(act => JSON.parse(act))
    let applicantHonorsAndAwards = honors_and_awards.map(honor => JSON.parse(honor))

    if (this.state.activitiesClosed) {
      applicantActivities = applicantActivities.slice(0,3)
    }

    if (this.state.honorsAndAwardsClosed) {
      applicantHonorsAndAwards = applicantHonorsAndAwards.slice(0,3)
    }

    return (
      <div className={css.root}>
        <div className={css.header}>About</div>
        <div className={css.box}>
          <div className={css.section}>
            <div className={css.title}>
              <Page className={css.icon} />
              <span className={css.text}>Intro</span>
            </div>
            {intro
              ? <div className={css.copy}>{intro}</div>
              : <div className={css.placeholder}>{introPlaceholder}</div>}
          </div>

          <div className={css.section}>
            <div className={css.title}>
              <DocumentStarLines className={css.icon} />
              <span className={css.text}>Activities</span>
            </div>
            {applicantActivities.map((x, i) =>
              <div className={css.activity} key={i}>
                <div className={css.position}>
                  <div className={css.strong}>{x.position_held}</div>
                  <div className={css.strong}>{ formatDate(x.start_date) } - { formatDate(x.end_date) }</div>
                </div>
                <div className={css.area}>{x.title}</div>
                <div className={css.copy}>{x.description}</div>
              </div>
            )}
            {
              activities.length > 3
                ?
                  <a
                    className={css.link}
                    onClick={this.toggleActivitiesClosed}
                  >
                    <i>{ this.state.activitiesClosed ? 'Show More' : 'Show Less' }</i>
                  </a>
                :
                  ''
            }
            {applicantActivities.length
              ? ''
              : <div className={css.placeholder}>{activitiesPlaceholder}</div>}
          </div>

          <div className={css.section}>
            <div className={css.title}>
              <DocumentStarAward className={css.icon} />
              <span className={css.text}>Honors & Awards</span>
            </div>
            {applicantHonorsAndAwards.map((x, i) =>
              <div className={css.activity} key={i}>
                <div className={css.position}>
                  <div className={css.strong}>{x.title}</div>
                  <div className={css.strong}>{ formatDate(x.awarded_at) }</div>
                </div>
                <div className={css.area}>{x.provider_name}</div>
              </div>
            )}
            {
              honors_and_awards.length > 3
                ?
                  <a
                    className={css.link}
                    onClick={this.toggleAwardsClosed}
                  >
                    <i>{ this.state.honorsAndAwardsClosed ? 'Show More' : 'Show Less' }</i>
                  </a>
                :
                  ''
            }
            {applicantHonorsAndAwards.length
              ? ''
              : <div className={css.placeholder}>{honorsAndAwardsPlaceholder}</div>}
          </div>
        </div>

      </div>
    )
  }
}

const introPlaceholder = `Tell us about yourself. Who are you? What makes you tick? What are your biggest accomplishments and acheivements? What impact do you want to have on your current community, your college and ultimately the world? We know you’re brilliant, be sure to let scholarship providers know how brilliant you are :)`
const activitiesPlaceholder = `What extra-curricular activities are you a part of? What type of community service do you participate in during your free time? Scholarship providers want to know who you are outside the classroom, be sure to let them know!`
const honorsAndAwardsPlaceholder = `What honors and awards have you received? What activities have you committed to and excelled in? Scholarship providers want to know who you are outside the classroom, be sure to let them know!`
export default connect(
  state => ({
    user: state.user,
  })
)(ApplicantAbout)
