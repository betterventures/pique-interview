import React, { Component } from 'react'
import { connect } from 'react-redux'
import SettingsHeader from '../SettingsHeader'
import SettingsFormRow from '../SettingsFormRow'
import css from './style.css'

export class SettingsPassword extends Component {
  render() {
    return (
      <div className={css.root}>
        <SettingsHeader title='Password' />
        <div className={css.form}>
          <SettingsFormRow label='Current password'>
            <input
              className={css.input}
              type="password"/>
          </SettingsFormRow>
          <SettingsFormRow label='New password'>
            <input
              className={css.input}
              placeholder='Must be at least 8 characters'
              type="password"/>
          </SettingsFormRow>
          <SettingsFormRow label='Confirm new password'>
            <input
              placeholder='Must match the new password'
              className={css.input}
              type="password"/>
          </SettingsFormRow>
          <SettingsFormRow label=''>
            <div className={css.save}>Save New Password</div>
          </SettingsFormRow>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    ...state
  })
)(SettingsPassword)
