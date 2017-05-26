import React from 'react'
import Carousel from 'components/Carousel'
import img1 from './310-slide.png'
import img2 from './311-slide.png'
import img3 from './312-slide.png'
import css from './style.css'

export const ProvidersCarousel = props => {
  return (
    <Carousel
      className={css.root}
      slides={slides}
      header={header} />
  )
}

const header =`The Scholarship Application Process Just Got Easier.`
const slides = [
  {
    title: `Create an Account and Post Your Scholarship`,
    body: `First, fill out our common application and add supplemental requirements specific to your scholarship.`,
    image: img1,
  },{
    title: `Create a Team. Review Applications In-App`,
    body: `Next, invite your board to assist in reviewing applications. You can leave comments on applications and rate them on a scale from 1 - 5 stars.`,
    image: img2,
  },{
    title: `Select and Notify Winners In-App`,
    body: `Lastly, notify students if they will receive an interview, are finalists or even winners of your scholarship.`,
    image: img3,
  }
]

export default ProvidersCarousel
