import React from 'react'

const Close = ({ className, style }) => {
  const size = !className ? {width: '24px', height: '24px'} : style
  return (
    <svg
      className={className}
      style={size}
      viewBox="0 0 24 24"
      fill="#FFFFFF">
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
      <path d="M0 0h24v24H0z" fill="none"/>
    </svg>
  )
}

export default Close