import React from 'react'
import css from './style.css'

const ApplicantPreview = ({ image, caption }) => {
  return (
    <div className={css.root}>
      <div className={css.preview} style={{backgroundImage: `url(${image})`}}/>
      <div className={css.caption}>{caption}</div>
    </div>
  )
}

export default ApplicantPreview