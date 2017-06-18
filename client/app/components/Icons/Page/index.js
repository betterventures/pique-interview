import React from 'react'
import png from './page.png'

export const Page = ({ className, style }) => {
  return (
    <img
      className={className}
      style={style}
      src={png}
    />
  )
}

export default Page
