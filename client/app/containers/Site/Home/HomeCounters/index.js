import React from 'react'
import { connect } from 'react-redux'
import DebtCounter from './DebtCounter'
import StatsCounters from './StatsCounters'
import Waves from './waves'
import css from './style.css'

export const HomeCounters = props => {
  return (
    <div>
      <DebtCounter loading={props.loading} />
      <div className={css.row}>
        <Waves animate={props.animate} />
        <StatsCounters animate={props.animate} />
      </div>
    </div>
  )
}

export default connect(
  state => ({
    loading: state.loading,
    animate: state.ui.animate3,
  })
)(HomeCounters)
