import React from 'react'
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

export const ApplicantAbout = ({ intro, description, activities=[], honors_and_awards=[] }) => {
  let applicantActivities = activities.map(act => JSON.parse(act))
  let applicantHonorsAndAwards = honors_and_awards.map(honor => JSON.parse(honor))

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
          {applicantActivities.length
            ? <div className={css.placeholder}>Add Another Activity</div>
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
          {applicantHonorsAndAwards.length
            ? <div className={css.placeholder}>Add Another Honor or Award</div>
            : <div className={css.placeholder}>{honorsAndAwardsPlaceholder}</div>}
        </div>
      </div>

    </div>
  )
}

const introPlaceholder = `Tell us about yourself. Who are you? What makes you tick? What are your biggest accomplishments and acheivements? What impact do you want to have on your current community, your college and ultimately the world? We know you’re brilliant, be sure to let scholarship providers know how brilliant you are :)`
const activitiesPlaceholder = `What extra-curricular activities are you a part of? What type of community service do you participate in during your free time? Scholarship providers want to know who you are outside the classroom, be sure to let them know!`
const honorsAndAwardsPlaceholder = `What honors and awards have you received? What activities have you committed to and excelled in? Scholarship providers want to know who you are outside the classroom, be sure to let them know!`
export default connect(
  state => ({
    user: state.user,
  })
)(ApplicantAbout)
