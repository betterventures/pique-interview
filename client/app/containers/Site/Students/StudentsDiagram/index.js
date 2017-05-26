import React from 'react'
import img from './501-diagram.png'
import css from './style.css'

export const StudentsDiagram = props => {
  return (
  <div className={css.root}>
    <div className={css.header}>The Current Way</div>
    <div className={css.directions}>
      <img src={img} />
    </div>
  </div>
  )
}

export default StudentsDiagram
