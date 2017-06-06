import React, { Component } from 'react'
import { connect } from 'react-redux'
import ScoreCard from './ScoreCard'
import { addScoreCardField } from 'api/actions'
import css from './style.css'

export class ScholarshipScoreCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      possible_score: '',
    }
    this.setNextFieldTitle = ::this.setNextFieldTitle
    this.setNextFieldScore = ::this.setNextFieldScore
    this.addScoreCardField = ::this.addScoreCardField
  }

  setNextFieldTitle(e) {
    this.setState({
      title: e.target.value,
    })
  }

  setNextFieldScore(e) {
    this.setState({
      possible_score: e.target.value,
    })
  }

  addScoreCardField() {
    // Call into reducer - Reducer modifies global state, triggers rerender
    this.props.addScoreCardField({
      title: this.state.title,
      possible_score: this.state.possible_score,
    })

    this.setState({
      title: '',
      possible_score: '',
    })
  }

  render() {
    return (
      <div className={css.root}>
        <div className={css.inner}>
          <div className={css.header}>Scholarship Score Card</div>
          <div className={css.body}>
            <div className={css.comment}>
              A Scholarship Score Card allows you to create criteria by which your selection committee can evaluate all scholarship applicants.
            </div>
            <div className={css.borderrow}>
              <input className={css.lginput} type="text" placeholder="Add Criteria" onChange={this.setNextFieldTitle} value={this.state.title} />
              <input className={css.sminput} type="text" placeholder="Total Possible Score" onChange={this.setNextFieldScore} value={this.state.possible_score} />
              <button className={css.btn} onClick={this.addScoreCardField}>Add Criteria</button>
            </div>

            <div>
              <div className={css.comment}>
                Current Score Card
                <br />
                <br />
              </div>
              <ScoreCard />
            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    scholarship: state.app.scholarships['all'][0],
  }),
  { addScoreCardField }
)(ScholarshipScoreCard)
