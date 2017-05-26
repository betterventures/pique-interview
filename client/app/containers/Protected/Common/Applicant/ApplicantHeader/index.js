import React from 'react'
import Pin from 'components/Icons/Pin'
import css from './style.css'

export const ApplicantHeader = ({ image, name, description, city, state }) => {
  return (
    <div className={css.root}>
      <div className={css.image} style={{backgroundImage: `url(${image})`}} />
      <div className={css.info}>
        <div className={css.name}>{name}</div>
        <div className={css.desc}>{description}</div>
        <div className={css.location}>
          <Pin className={css.pin} /> {city ? `${city}, ${state}` : ''}
        </div>
      </div>
    </div>
  )
}

export default ApplicantHeader
