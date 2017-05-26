import React from 'react'

const Menu = ({ className, style }) => {
  const size = !className ? {width: '24px', height: '24px'} : style
  return (
    <svg
      className={className}
      style={size}
      viewBox="0 0 24 24"
      fill="#FFFFFF">
      <path d="M0 0h24v24H0z" fill="none"/>
      <path fill="#FFFFFF" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
    </svg>
  )
}

export default Menu