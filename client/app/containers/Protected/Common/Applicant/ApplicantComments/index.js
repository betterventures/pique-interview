import React from 'react'
import Rating from 'components/Rating'
import css from './style.css'

export const ApplicantComments = props => {
  return (
    <div className={css.root}>
      <div className={css.header}>Committee Review: Interview Review</div>
      <div className={css.comments}>
      {comments.map((x, i) =>
        <div key={i} className={css.comment}>
          <div className={css.image} style={{backgroundImage: `url(${x.image})`}} />
          <div className={css.info}>
            <div className={css.name}>{x.name}</div>
            <Rating
              className={css.rating}
              style={{width: '14px', height: '14px'}}
              value={x.rating} />
          </div>
          <div className={css.message}>{x.message}</div>
        </div>
      )}
      </div>
    </div>
  )
}

const comments = [
  {
    name: 'Craig Kilborn',
    rating: 4,
    image: `http://img3.bdbphotos.com/images/130x130/c/b/cbq0cn4s1z9f0z4.jpg?skj2io4l`,
    message: `This girl is great! I really like her essay. She seems to really understand what it takes to grind the coffee. I'm going to recommend her to be a finalist!`,
  },{
    name: 'Doug Douglas',
    rating: 3,
    image: `https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAMxAAAAJDJlNTgzNjQxLTY0NDItNDY3My04ZWNmLTQ0NWRhZWVlN2ZkOA.jpg`,
    message: `Her extra curriculars are incredible. Nearly perfect handwriting but I sincerely wonder if I left my stove on. Regardless, I want a cheese sandwich.`,
  },{
    name: 'Jackie Jackson',
    rating: 5,
    image: `http://cdn.goodgallery.com/c0fc0cd1-dcb8-4c11-84f0-7536ee031d43/s/0200/21n3q0eg/wilmington-professional-headshot-photographer.jpg`,
    message: `Definitely going to recommend her and this isn't just the alcohol talking, this is my actual voice. I agree with Doug on all of the above`,
  }, {
    name: `Quentin Richarson`,
    rating: 3,
    image: `http://static.hsw.com.br/gif/jogador-new-york-kinicks-quentin-richardson.jpg`,
    message: `Overall, she's a bright student with all of determination and direction. I wish she had talked about Santa a bit more in her second essay. `
  }
]

export default ApplicantComments
