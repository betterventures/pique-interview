import React from 'react'
import css from './style.css'

export const ScholarshipsScreenshot = ({ first, src, animate1:two, animate2:one }) => {
  const className = first
    ? one ? `${css.one} ${css.fade1}` : css.one
    : two ? `${css.two} ${css.fade2}` : css.two
  return (
    <div className={className}>
      <img src={src} className={css.img} />
    </div>
  )
}

export default ScholarshipsScreenshot
