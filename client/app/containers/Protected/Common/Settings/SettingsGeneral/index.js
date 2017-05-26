import React, { Component } from 'react'
import { connect } from 'react-redux'
import SettingsHeader from '../SettingsHeader'
import SettingsFormRow from '../SettingsFormRow'
import css from './style.css'

export class SettingsGeneral extends Component {
  render() {
    const { user } = this.props
    return (
      <div className={css.root}>
        <SettingsHeader title='General' />

        <div className={css.form}>
          <SettingsFormRow label='Name'>
            <input
              value={user.displayName}
              className={css.input}
              type="text"/>
          </SettingsFormRow>
          <SettingsFormRow label='Email'>
            <input
              value={user.email}
              className={css.input}
              type="email"/>
          </SettingsFormRow>
          <SettingsFormRow label='Photo'>
            <img src={user.photoURL} className={css.img} />
            <div className={css.upload}>
              <label>
                Change
                <input type="file" accept="image/*" className={css.file} />
              </label>
            </div>
          </SettingsFormRow>
        </div>

        <div className={css.footer}>
          <SettingsFormRow label=''>
            <div className={css.save}>Save Changes</div>
          </SettingsFormRow>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    user: state.auth.user
  })
)(SettingsGeneral)
