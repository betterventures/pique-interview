import React from 'react'
import ImgIconWrapper from 'components/Icons/ImgIconWrapper'
import png from './icon.png'

export const User = ({ className, style }) => {
  return (
    <ImgIconWrapper
      className={className}
      style={style}
      src={png}
    />
  )
}

export default User
