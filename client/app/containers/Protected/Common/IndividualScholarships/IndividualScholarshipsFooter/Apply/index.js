import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as Actions from 'api/actions'
import css from './style.css'

export class IndividualScholarshipsApply extends Component {
  render() {
    const { scholarship } = this.props

    let recommendations = []
    if (scholarship.minimum_recommendations) {
      let i = 0
      while (++i <= scholarship.minimum_recommendations) recommendations.push(i)
    }

    return (
      <div className={css.root}>
        <div className={css.copy}>{`Select the items from your Pique Proflie you would like to use to apply to the ${scholarship.title} Scholarship. Your ‘cover letter’ and ‘official transcript’ will automatically be sent with your application.`}</div>
        {
          recommendations.map((i) => (
            <div className={css.row} key={i}>
              <div className={css.label}>Recommendation #{i}</div>
              <div className={css.field}>
                <select className={css.input}type="text"/>
              </div>
            </div>
            )
          )
        }
        <div className={css.row}>
          <div className={css.label}>Scholarship Essay</div>
          <div className={css.field}>
            <select className={css.input}type="text"/>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  state => {
    return {
      scholarship: (state.app && state.app.scholarships['all'][0]) || {},
    }
  },
  Actions
)(IndividualScholarshipsApply)
