import React from 'react'
import img from './108-flag.png'
import css from './style.css'

export const AboutMission = props => {
  return (
  <div className={css.root}>
    <div className={css.title}>Our Mission</div>
    <img src={img} />
    <div className={css.text}>
      <div className={css.line}><span>We're millennials, techies, and activists on a mission to make college more accessible for all.</span></div>
      <div className={css.line}>Students and families confront countless barriers when applying to college and we intend to knock each of them down</div>
      <div className={css.line}>but first we need to clean up an inefficient process in need of a little tech love, applying to scholarships.</div>
    </div>
    <div className={css.text}>
      <div className={css.line}>We fundamentally believe that if higher education is to become more accessible on a large scale, it will be due to the work</div>
      <div className={css.line}>carried out by educators and non-profits coupled with tech driven solutions.</div>
    </div>
    <div className={css.text}>
      <div className={css.line}>If you support our mission then join us, spread the word, and help us to help make college more accessible.</div>
    </div>
  </div>
  )
}

export default AboutMission
