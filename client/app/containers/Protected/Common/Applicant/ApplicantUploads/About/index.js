import React from 'react'
import { connect } from 'react-redux'
import img1 from './intro.png'
import img2 from './activities.png'
import css from './style.css'

export const ApplicantAbout = ({ intro, description, activities=[] }) => {
  return (
    <div className={css.root}>
      <div className={css.header}>About</div>
      <div className={css.box}>
        <div className={css.section}>
          <div className={css.title}>
            <img className={css.icon} src={img1} />
            <span className={css.text}>Intro</span>
          </div>
          {intro
            ? <div className={css.copy}>{intro}</div>
            : <div className={css.placeholder}>{introPlaceholder}</div>}
        </div>

        <div className={css.section}>
          <div className={css.title}>
            <img className={css.icon} src={img2} />
            <span className={css.text}>Activities</span>
          </div>
          {activities.map((x, i) =>
            <div className={css.activity} key={i}>
              <div className={css.position}>
                <div className={css.strong}>President</div>
                <div className={css.strong}>August 2016 - December 2016</div>
              </div>
              <div className={css.area}>{x}</div>
              <div className={css.copy}>{dummyActivityDesc}</div>
            </div>
          )}
          {activities.length
            ? <div className={css.placeholder}>Add Another Activitiy</div>
            : <div className={css.placeholder}>{activitiesPlaceholder}</div>}
        </div>
      </div>

    </div>
  )
}

const introPlaceholder = `Tell us about yourself. Who are you? What makes you tick? What are your biggest accomplishments and acheivements? What impact do you want to have on your current community, your college and ultimately the world? We know you’re brilliant, be sure to let scholarship providers know how brilliant you are :)`
const activitiesPlaceholder = `What extra-curricular activities are you a part of? What type of community service do you participate in during your free time? Scholarship providers want to know who you are outside the classroom, be sure to let them know!`
const dummyActivityDesc = `As President of the Benjamin Banneker Student Government Association much of my work concerned working with the student body to ensure that every student had a voice in my high school.`
export default connect(
  state => ({
    user: state.auth.user
  })
)(ApplicantAbout)
