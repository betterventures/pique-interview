import React from 'react'
import css from './style.css'

export const FAQHeader = props => {
  return (
    <div className={css.root}>
      <div className={css.title} />
      <div className={css.divider} />
    </div>
  )
}

export default FAQHeader