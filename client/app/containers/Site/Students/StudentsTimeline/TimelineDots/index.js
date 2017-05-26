import React from 'react'
import css from './style.css'

export const TimelineDots = props => {
  const dots = Array.from({length: props.value}, (_, i) => i + 1)
  return (
    <div className={css.root}>
      {dots.map((x, i) =>
        <div key={i} className={css.marker}>
          <div className={css.dot} style={i === 7 ? {height: '32px', width: '32px'} : {}} />
        </div>
      )}
    </div>
  )
}

export default TimelineDots
