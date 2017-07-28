import React from 'react'
import css from './style.css'

const ApplicantPreview = ({ image, caption, href }) => {
  return (
    <div className={css.root}>
      <a
        className={css.preview}
        style={{backgroundImage: `url(${image})`}}
        href={href}
        target="_blank"
      >
      </a>
      <div className={css.caption}>{caption}</div>
    </div>
  )
}

export default ApplicantPreview
