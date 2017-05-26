import React from 'react'
import css from './style.css'

export const SettingsHeader = ({ title }) => {
  return (
    <div className={css.root}>Settings / <span>{title}</span></div>
  )
}

export default SettingsHeader
