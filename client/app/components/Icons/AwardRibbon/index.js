import React from 'react'
import ImgIconWrapper from 'components/Icons/ImgIconWrapper'
import svg from './icon.svg'

export const AwardRibbon = ({ className, style }) => {
  return (
    <ImgIconWrapper
      className={className}
      style={style}
      src={svg}
    />
  )
}

export default AwardRibbon
