import React from 'react'
import css from './style.css'

export const SettingsFormRow = ({ label, children }) => {
  return (
    <div className={css.root}>
      <div className={css.label}>{label}</div>
      <div className={css.field}>
        {children}
      </div>
    </div>
  )
}

export default SettingsFormRow
