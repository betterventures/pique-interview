import React from 'react'
import Apple from 'components/Icons/Apple'
import Book from 'components/Icons/Book'
import ApplicantAbout from './About'
import ApplicantQuestions from './Questions'
import ApplicantDocuments from './Documents'
import ApplicantContact from './Contact'
import css from './style.css'

export const ApplicantUploads = props => {
  return (
    <div className={css.root}>
      <ApplicantAbout {...props} />
      <ApplicantQuestions {...props} />
      <ApplicantDocuments
        {...props}
        essays={essays}
        recommendations={recommendations}
        documents={supplementalDocs} />
      <ApplicantContact {...props} />
    </div>
  )
}

const image = 'https://get-pique.github.io/images/doc.jpg'

const supplementalDocs = [
  {
    image,
    caption: 'Official Transcript',
    link: 'https://drive.google.com/open?id=0B0kpu74vK0eqRU1iUWt6Y0pYNG8',
  },
  {
    image,
    caption: 'College Acceptance Letter',
    link: 'https://drive.google.com/open?id=0B0kpu74vK0eqVXBvOGZ3UkFSOGc',
  },
  {
    image,
    caption: 'Copy of Birth Certificate',
    link: 'https://drive.google.com/open?id=0B0kpu74vK0eqdXVvUnFWNjN4WWM',
  },
  {
    image,
    caption: 'Proof of Financial Need',
    link: 'https://drive.google.com/open?id=0B0kpu74vK0eqNG5GVnpEZzEzaEU',
  },
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
    link: 'https://drive.google.com/open?id=0B0kpu74vK0eqX1dINEpCMW9NWm8',
  },
  {
    image,
    caption: 'Recommendation #2',
    link: 'https://drive.google.com/open?id=0B0kpu74vK0eqdmwtQ1h1MmR0dDQ',
  },
  {
    image,
    caption: 'Recommendation #3',
    link: 'https://drive.google.com/open?id=0B0kpu74vK0eqT1JMNmJJQkdNMms',
  },
]

const essays = [
  {
    image,
    caption: 'Scholarship Essay #1',
    link: 'https://drive.google.com/open?id=0B0kpu74vK0eqSEhRSFdyRnlmUEk',
  },
  {
    image,
    caption: 'Scholarship Essay #2',
    link: 'https://drive.google.com/open?id=0B0kpu74vK0eqRlRkUElOZUx0U00',
  },
  {
    image,
    caption: 'Scholarship Essay #3',
    link: 'https://drive.google.com/open?id=0B0kpu74vK0eqQ2hJYkdFdlJGbTA',
  },
  {
    image,
    caption: 'Scholarship Essay #4',
    link: 'https://drive.google.com/open?id=0B0kpu74vK0eqUzkwVlhYU3lVcmM',
  },
]

export default ApplicantUploads
