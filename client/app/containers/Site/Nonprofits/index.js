import React from 'react'
import NonprofitsHeader from './NonprofitsHeader'
import NonprofitsCarousel from './NonprofitsCarousel'
import NonprofitsPartners from './NonprofitsPartners'
import NonprofitsReasons from './NonprofitsReasons'

export const Nonprofits = props => {
  return (
    <div>
      <NonprofitsHeader />
      <NonprofitsCarousel />
      <NonprofitsPartners />
      <NonprofitsReasons />
    </div>
  )
}

export default Nonprofits
