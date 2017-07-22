import React from 'react'
import ImgIconWrapper from 'components/Icons/ImgIconWrapper'
import svg from './icon.svg'
import png from './icon.png'

export const Calendar = ({ className, style }) => {
  return (
    <ImgIconWrapper
      className={className}
      style={style}
      src={svg}
      fallbackSrc={png}
    />
  )
}

export default Calendar
