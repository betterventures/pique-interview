import React from 'react'
import img from './banner.png'
import css from './style.css'

const IndividualScholarshipsBanner = props => {
  return (
    <div
      style={{backgroundImage: `url(${img})`}}
      className={css.root}>
      <div className={css.logo}>
        <div className={css.text}>MLK</div>
      </div>
    </div>
  )
}

export default IndividualScholarshipsBanner
