import React from 'react'
import Apple from 'components/Icons/Apple'
import Book from 'components/Icons/Book'
import ApplicantAbout from './About'
import ApplicantDocuments from './Documents'
import css from './style.css'

export const ApplicantUploads = props => {
  return (
    <div className={css.root}>
      <ApplicantAbout {...props} />
      <ApplicantDocuments
        {...props}
        essays={essays}
        recommendations={recommendations}
        documents={transcripts} />
    </div>
  )
}

const image = 'https://get-pique.github.io/images/doc.jpg'

const transcripts = [
  {
    image,
    caption: 'Offical Transcript',
  }
]

const testScores = [
  {
    image,
    caption: 'Test Score',
  }
]

const recommendations = [
  {
    image,
    caption: 'Recommendation #1',
  },{
    image,
    caption: 'Recommendation #2',
  }

]

const essays = [
  {
    image,
    caption: 'Community Service Essay',
  }
]

export default ApplicantUploads
