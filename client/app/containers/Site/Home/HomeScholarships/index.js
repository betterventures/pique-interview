import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import ScholarshipsCopy from './ScholarshipsCopy'
import ScholarshipsScreenshot from './ScholarshipsScreenshot'
import ScholarshipsButtons from './ScholarshipsButtons'
import * as Actions from 'api/actions'
import img1 from './003-scholarships.png'
import img2 from './004-scholarships.png'
import mask from './mask.png'
import css from './style.css'

export class HomeScholarships extends Component {

  render() {
    const { animate1, animate2 } = this.props.ui
    return (
      <div className={css.root}>
        <div className={css.mask} />

        <div className={css.wrap}>
          {halves.map((x, i) =>
            <div
              key={i}
              className={i === 0 ? css.one : css.two}>
              <ScholarshipsCopy
                first={i === 0}
                title={x.title}
                copy={x.copy} />

              <ScholarshipsButtons
                first={i === 0}
                onClick={this.props.launchModal}
                text={x.button} />

              <ScholarshipsScreenshot
                first={i === 0}
                src={x.image}
                animate1={animate1}
                animate2={animate2} />
            </div>)}
        </div>
      </div>
    )
  }
}

const halves = [{
    title: `One Application. Unlimited Scholarships.`,
    image: img1,
    button: `Learn More`,
    copy: [
      {text: `fill one scholarship application and apply to unlimited scholarships.`, lead: `High School Seniors,`},
      {text: `That means never request more than one recommendation or official transcript again.`},
      {text: `That's the Pique way.`}
    ],
  },{
    title: `Find Applicants. Review Applications in One Place.`,
    image: img2,
    button: `How Does It Work?`,
    copy: [
      {text: `should never have to pay a premium to find applicants.`, lead: `Scholarship Providers`},
      {text: `We bring qualified students to you for just $99.99/year.`},
      {text: `Review applications, rate applicants, select interviewees, finalists and notify winners all in-app.`}
    ],
}]

export default connect(
  state => ({
    ui: state.ui
  }),
  Actions
)(HomeScholarships)
