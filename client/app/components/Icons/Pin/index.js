import React from 'react'

export const Pin = ({ className, style }) => {
  return (
    <svg
      className={className}
      style={style}
      x="0px"
      y="0px"
      viewBox="0 0 52 52"
      enableBackground="new 0 0 52 52">
      <path
        fill="#a0a0a0"
        d="M38.853,5.324L38.853,5.324c-7.098-7.098-18.607-7.098-25.706,0h0 C6.751,11.72,6.031,23.763,11.459,31L26,52l14.541-21C45.969,23.763,45.249,11.72,38.853,5.324z M26.177,24c-3.314,0-6-2.686-6-6 s2.686-6,6-6s6,2.686,6,6S29.491,24,26.177,24z"/>
    </svg>
  )
}

export default Pin
