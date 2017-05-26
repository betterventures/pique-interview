import React, { Component } from 'react'
import { connect } from 'react-redux'
import img1 from './502-student.png'
import img2 from './503-connections.png'
import img3 from './504-screenshot.png'
import TimelineDots from './TimelineDots'
import css from './style.css'

export const StudentsTimeline = ({ position, animate1, animate2, animate3 })=> {
  const animate = position !== 'top'
  return (
    <div className={css.root}>
      <div className={css.wrap}>
        <div className={css.header}>The Pique Way</div>
        <div className={css.content}>

          <div className={css.column}>
            <div className={animate1 ? `${css.left} ${css.in}` : css.left}>
              <div className={css.text}>
                <div className={css.title}>Request and  Save All Your Documents in One Place</div>
                <div className={css.copy}>Through Pique you can send a request to your teachers and counselors to upload your recommendations and official transcript. When each document is uploaded, it is saved onto your Pique account and can then be reused to apply to any scholarship on Pique.</div>
              </div>
            </div>
            <div className={animate1 ? `${css.right} ${css.in}` : css.right}>
              <img className={css.img} src={img2} />
            </div>
          </div>

          <div className={css.column}>
            <div className={animate2 ? `${css.left} ${css.in}` : css.left}>
              <img className={css.img} src={img3} />
            </div>
            <div className={animate2 ? `${css.right} ${css.in}` : css.right}>
              <div className={css.text}>
                <div className={css.title}>Find Scholarships You Can Actually Win</div>
                <div className={css.copy}>All platforms give you access to a curated list of scholarships. Scholarships hosted on Pique are categorized into 4 categories; <span>‘local scholarships’</span>, ‘national scholarships’, ‘niche national scholarships’, and ‘based on previous scholarships you’ve applied to’.</div>
              </div>
            </div>
          </div>

          <div className={css.column}>
            <div className={animate3 ? `${css.left} ${css.in}` : css.left}>
              <div className={css.text}>
                <div className={css.title}>More Easily Reuse Essays </div>
                <div className={css.copy}>You do not have time to write a new essay for each new scholarship, we get it. Our recommendation feature recommends scholarships to you based on previous scholarships you’ve applied to.</div>
              </div>
            </div>
            <div className={animate3 ? `${css.right} ${css.in}` : css.right}>
              <div className={css.card}>
                <div className={css.example}>Example</div>
                <div className={css.copy}>If you applied to a 'Women in STEM' scholarship with a 1,000 word limit. Your 'Based on Scholarships You've Previously Applied to' section would be updated with scholarships for Women going into STEM programs with a 1,000 word limit.</div>
                <div className={css.comment}>Cool, huh?</div>
              </div>
            </div>
          </div>

          <div className={css.timeline}>
            <img src={img1} className={css[position]} />
            <TimelineDots value={10} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default connect(
  state => ({
    position: state.ui.position,
    animate1: state.ui.animate1,
    animate2: state.ui.animate2,
    animate3: state.ui.animate3,
  })
)(StudentsTimeline)
