import React from 'react'

const Caret = ({ className, style }) => {
  const size = !className ? {width: '20px', height: '21px'} : style
  return (
    <svg
      className={className}
      style={size}
      viewBox="1379 25 21 15">
      <defs></defs>
      <path d="M1389.3608,37.9077942 L1389.8221,38.3690985 L1399.7216,28.4696036 L1398.25199,27 L1389.3608,35.8911957 L1380.4696,27 L1379,28.4696036 L1388.89949,38.3690985 L1389.3608,37.9077942 Z" id="arrow" stroke="none" fill="#E2E2E2" fillRule="evenodd"></path>
    </svg>
  )
}

export default Caret