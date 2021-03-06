import React, { Component } from 'react'
import { connect } from 'react-redux'
import CheckmarkBlue from './CheckmarkBlue'
import CheckmarkRed from './CheckmarkRed'
import Heart from './Heart'
import Timer from './Timer'
import PaperPlane from './PaperPlane'
import Reward from './Reward'
import Book from 'components/Icons/Book'
import * as Actions from 'api/actions'
import css from './style.css'
import moment from 'moment'

export class IndividualScholarshipsDetails extends Component {
  constructor(props) {
    super(props)
    this.detailsFor = ::this.detailsFor
  }

  detailsFor(scholarship, essayRequirementIdx) {
    let details = []

    // Minimum GPA
    if (scholarship.gpa) {
      details.push(
        {
          component: Book,
          color: 'blue',
          text: 'Minimum GPA',
          accent: `${scholarship.gpa} Unweighted`,
          componentStyle: {height: '22px',},
          componentColor: 'blue',
        }
      )
    }
    // Scholarship Due Date
    if (scholarship.cycle_end) {
      details.push(
        {
          component: Timer,
          color: '#F69423',
          text: 'Due',
          accent: moment(scholarship.cycle_end).format('dddd, MMMM D, Y'),
        }
      )
    }
    // Award Amounts
    if (scholarship.awards && scholarship.awards.length > 0) {
      details.push(
        {
          component: Reward,
          color: '#44D378',
          text: 'Reward',
          accent: `$ ${scholarship.awards[0].amount.toLocaleString()}`,
        }
      )
    }
    // Minimum Recs
    if (scholarship.minimum_recommendations) {
      details.push(
        {
          component: Heart,
          color: '#50ADE3',
          text: 'Recommendation',
          accent: `${scholarship.minimum_recommendations} Needed`,
        }
      )
    }
    // Essay Requirements
    if (scholarship.essay_requirements && scholarship.essay_requirements.length > 0) {
      details.push(
        {
          component: PaperPlane,
          color: '#E8B50C',
          text: 'Word Limit',
          accent: `${scholarship.essay_requirements[essayRequirementIdx].word_limit} Words`,
        }
      )
    }
    // Has-Applied
    if (scholarship.applied_scholarships && scholarships.applied_scholarships[scholarship.id] && scholarships[scholarship.id].status) {
      details.push(
        {
          component: CheckmarkBlue,
          color: '#000BFF',
          text: 'Applied',
          accent: 'Pending',
          //accent: `${user.applied_scholarships[scholarship.id].status}`,
        }
      )
    }
    // Test Scores
    if (scholarship.minimum_sat_score || scholarship.minimum_act_score) {
      details.push(
        {
          component: CheckmarkRed,
          color: '#FF0000',
          text: 'Standardized Test Scores',
          accent: `${scholarship.minimum_sat_score ? 'SAT' : ''}${scholarship.minimum_sat_score && scholarship.minimum_act_score ? ' or ' : ''}${scholarship.minimum_act_score ? 'ACT' : ''} Scores`,
        }
      )
    } else {
      details.push(
        {
          component: CheckmarkRed,
          color: '#FF0000',
          text: 'Standardized Test Scores',
          accent: 'No Score Required',
        }
      )
    }
    if (scholarship.minimum_sat_score) {
      details.push(
        {
          color: '#FF0000',
          text: 'Minimum Composite SAT Score:',
          accent: scholarship.minimum_sat_score,
        }
      )
    }
    if (scholarship.minimum_act_score) {
      details.push(
        {
          color: '#FF0000',
          text: 'Minimum Composite ACT Score:',
          accent: scholarship.minimum_act_score,
        }
      )
    }

    return details
  }

  render() {
    const { scholarship, essayRequirementIdx } = this.props
    const details = this.detailsFor(scholarship, essayRequirementIdx)

    return (
      <div className={css.root}>
        {details.map(({ component:Component, text, color, accent, componentStyle, componentColor }, i) =>
          <div key={i} className={css.line}>
            <span className={css.icon}>{Component ? <Component style={componentStyle} color={componentColor} /> : null}</span>
            <span className={css.small}>{text}</span>
            <span className={css.accent} style={{ color }}>{accent}</span>
          </div>
        )}
      </div>
    )
  }
}

export default connect(
  (state, ownProps) => {
    return {
      scholarship: (state.app && state.app.scholarships['all'][0]) || {},
      essayRequirementIdx: ownProps.essayRequirementIdx,
    }
  },
  Actions
)(IndividualScholarshipsDetails)
