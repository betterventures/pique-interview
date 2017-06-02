import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as Actions from 'api/actions'
import css from './style.css'

export class IndividualScholarshipsApply extends Component {
  render() {
    const { scholarship } = this.props
    return (
      <div className={css.root}>
        <div className={css.copy}>{`Select the items from your Pique Proflie you would like to use to apply to the ${scholarship.title} Scholarship. Your ‘cover letter’ and ‘official transcript’ will automatically be sent with your application.`}</div>
        <div className={css.row}>
          <div className={css.label}>Recommendation #1</div>
          <div className={css.field}>
            <select className={css.input}type="text"/>
          </div>
        </div>
        <div className={css.row}>
          <div className={css.label}>Recommendation #2</div>
          <div className={css.field}>
            <select className={css.input}type="text"/>
          </div>
        </div>
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
