import React, { Component } from 'react'
import CheckmarkBlue from './CheckmarkBlue'
import CheckmarkRed from './CheckmarkRed'
import Heart from './Heart'
import Timer from './Timer'
import PaperPlane from './PaperPlane'
import Reward from './Reward'
import css from './style.css'

export class IndividualScholarshipsDetails extends Component {
  static defaultProps = {
    details:[{
        component: Timer,
        color: '#F69423',
        text: 'Due',
        accent: 'jan 18th',
      },{
        component: Reward,
        color: '#44D378',
        text: 'Reward',
        accent: '$ 1000',
      },{
        component: Heart,
        color: '#50ADE3',
        text: 'Recommendation',
        accent: '2 Needed',
      },{
        component: PaperPlane,
        color: '#E8B50C',
        text: 'Word Limit',
        accent: '500 Words',
      },{
        component: CheckmarkBlue,
        color: '#000BFF',
        text: 'Applied',
        accent: 'Pending',
      },{
        component: CheckmarkRed,
        color: '#FF0000',
        text: 'Standardized Test Scores',
        accent: 'SAT or ACT Scores',
      },{
        color: '#FF0000',
        text: 'Minimum Composite SAT Score:',
        accent: '1050',
      },{
        color: '#FF0000',
        text: 'Minimum Composite ACT Score:',
        accent: '28',
    }]
  }
  render() {
    const { details } = this.props
    return (
      <div className={css.root}>
        {details.map(({ component:Component, text, color, accent }, i) =>
          <div key={i} className={css.line}>
            <span className={css.icon}>{Component ? <Component /> : null}</span>
            <span className={css.small}>{text}</span>
            <span className={css.accent} style={{ color }}>{accent}</span>
          </div>
        )}
      </div>
    )
  }
}

export default IndividualScholarshipsDetails
