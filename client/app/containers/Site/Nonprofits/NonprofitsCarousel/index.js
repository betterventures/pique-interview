import React from 'react'
import Carousel from 'components/Carousel'
import img1 from './601-slide.png'
import img2 from '../../Providers/ProvidersCarousel/312-slide.png'
import img3 from './602-slide.png'

export const NonprofitsCarousel = props => {
  return (
    <Carousel slides={slides} header={header} />
  )
}

const header = `The New Way to Write Recommendations`
const slides = [
  {
    title: `Create an Account with Your Nonprofit Email`,
    body: `Either create an account on your own or receive a ‘recommendation request’ from a student.`,
    image: img1
  },{
    title: `Be Informed Before Writing a Recommendation`,
    body: `Before writing a recommendation, review a student’s Pique profile. Pique profile’s include students’ essays, cover letters, resumes and official transcripts.`,
    image: img2
  },{
    title: `Track and Manage Recommendations`,
    body: `Easily track which students are waiting for or have received recommendations from you.`,
    image: img3
  }
]

export default NonprofitsCarousel
