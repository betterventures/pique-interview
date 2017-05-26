import React, { Component } from 'react'
import { connect } from 'react-redux'
import css from './style.css'

export class DiscoveryFilter extends Component {
  render() {
    return (
      <div className={css.root}>
        <div className={css.caption}>Filter Even More for a Better Search</div>

        <div className={css.bar}>
          <div className={css.field}>
            <label className={css.label}>US Citizen</label>
            <select className={css.input}>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className={css.field}>
            <label className={css.label}>Recommendation</label>
            <select className={css.input}>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
            </select>
          </div>
          <div className={css.field}>
            <label className={css.label}>Renewable</label>
            <select className={css.input}>
            <option value="No">No</option>
            </select>
          </div>
          <div className={css.field}>
            <label className={css.label}>Award Size</label>
            <select className={css.input}>
              <option value="$1,000">$1,000</option>
              <option value="$2,000">$2,000</option>
              <option value="$3,000">$3,000</option>
              <option value="$5,000">$5,000</option>
              <option value="$6,000">$6,000</option>
            </select>
          </div>
          <div className={css.field}>
            <label className={css.label}>Word Limit</label>
            <select className={css.input}>
              <option value="250">250</option>
              <option value="250">500</option>
              <option value="250">750</option>
              <option value="250">1000</option>
            </select>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    ...state
  })
)(DiscoveryFilter)
