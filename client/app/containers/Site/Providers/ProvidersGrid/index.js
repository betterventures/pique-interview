import React from 'react'
import img1 from './301-credit-card.png'
import img2 from './302-clock.png'
import img3 from './303-chart.png'
import img4 from './304-student.png'
import css from './style.css'

export const ProvidersGrid = props => {
  return (
    <div className={css.root}>
      <h3 className={css.header}>Simpler. Easier. Cheaper. Better.</h3>

    <ul className={css.ul}>
      {grids.map((x, i) =>
        <li key={i} className={css.item}>
          <img src={x.image} />
          <div className={css.h3}>{x.title}</div>
          <div className={css.h5}>{x.body}{x.extended ? x.extended : ''}</div>
        </li>
      )}
    </ul>
  </div>
  )
}

const grids = [
  {
    title: `Save Money`,
    body: `Never pay a web developer or web hosting platform again. Create an account and post your scholarship in just `,
    extended: <span>two minutes.</span>,
    image: img1,
  },{
    title: `Save Time`,
    body: `Never waste time looking for qualified students. Pique partners with schools, school districts, and nonprofits in the college access space to bring qualified students to you.`,
    image: img2,
  },{
    title: `Increase Efficiency`,
    body: `Never deal with post marked packages, receive incomplete applications or review emailed applications again.`,
    image: img3,
  },{
    title: `Help Students`,
    body: `The scholarship application process is exhaustive. Join Pique and help students save time applying to scholarships so they can spend more time getting into the college of their dreams.`,
    image: img4,
  },
]

export default ProvidersGrid
