import React from 'react'
import Pin from 'components/Icons/Pin'
import GradCap from 'components/Icons/GradCap'
import Book from 'components/Icons/Book'
import css from './style.css'

export const ApplicantHeader = ({ image, name, description, city, state, gpa, highSchool }) => {
  return (
    <div className={css.root}>
      <div className={css.image} style={{backgroundImage: `url(${image})`}} />
      <div className={css.info}>
        <div className={css.name}>{name}</div>
        <div className={css.desc}>{description}</div>
        <div className={css.icons}>
          <span className={css.location}>
            <Pin className={css.pin} /> {city ? `${city}, ${state}` : ''}
          </span>
          <span className={css.highschool}>
            <GradCap className={css.gradcap} />{highSchool ? highSchool : ''}
          </span>
          <span className={css.gpa}>
            <Book className={css.book} />{gpa ? gpa : ''}
          </span>
        </div>
      </div>
    </div>
  )
}

export default ApplicantHeader
