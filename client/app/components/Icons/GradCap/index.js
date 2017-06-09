import React from 'react'
import img from './GradCap.png'

export const GradCap = ({ className, style }) => {
  return (
    <img
      className={className}
      style={style}
      src={img}
    />
  )
}

export default GradCap
