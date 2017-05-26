import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Match } from 'react-router'
import SettingsNav from './SettingsNav'
import SettingsGeneral from './SettingsGeneral'
import SettingsPassword from './SettingsPassword'
import css from './style.css'

export class Settings extends Component {
  render() {
    return (
      <div className={css.root}>
        <div className='wrap'>
          <SettingsNav />
          <Match
            pattern="/settings"
            component={SettingsGeneral}
            exactly />
          <Match
            pattern="/settings/password"
            component={SettingsPassword} />
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    ...state
  })
)(Settings)
