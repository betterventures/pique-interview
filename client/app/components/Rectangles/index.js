import React from 'react'
import css from './style.css'

export const Rectangles = ({ header, data }) => {
  return (
    <div className={css.root}>
      <div className={header.className} style={header.style}>{header.text}</div>
      {data.map((x, i) =>
        <div key={i} className={i > 0 ? css.over : css.under} style={x.style}>
          {x.component()}
          <div className={css.body}>{x.body}</div>
        </div>
      )}
    </div>
  )
}

export default Rectangles
