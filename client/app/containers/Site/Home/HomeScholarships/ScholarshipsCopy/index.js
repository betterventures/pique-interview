import React from 'react'
import css from './style.css'

export const ScholarshipsCopy = ({ title, copy, first }) => {
  return (
    <div className={first ? css.one : css.two}>
      <div className={css.title}>{title}</div>
      <div className={css.copy}>
        {copy.map((x, i) =>
          <div
            key={i}
            className={css.line}>
            {x.lead
              ? <span className={css.lead}>{x.lead} </span>
              : ''}
            {x.text}
          </div>)}
      </div>
    </div>
  )
}

export default ScholarshipsCopy
