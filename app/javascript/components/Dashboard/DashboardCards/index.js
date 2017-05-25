import React from 'react'
import Rating from '../../Rating'
import css from './style.css'

const DashboardCards = ({ items }) => {
  return (
    <div className={css.root}>
      {items.map((x, i) =>
        <div key={i} className={css.item}>
          <div className={css.wrap}>
            <a href={`/applicant/${x.id}`}>
              <div className={css.img} style={{backgroundImage: `url(${x.image})`}} />
              <div className={css.stripe}>
                <div className={css.name}>{x.name}</div>
                <div className={css.desc}>{x.description}</div>
                <Rating
                  className={css.rating}
                  style={{width: '28px', height: '28px'}}
                  value={x.rating} />
              </div>
            </a>
            <div className={css.details}>
              <div className={css.info}>
                <div className={css.title}>GPA</div>
                <div className={css.val}>{x.gpa}</div>
              </div>
              <div className={css.info}>
                <div className={css.title}>Activities</div>
                <div className={css.val}>
                  {x.activities.map((x, i) =>
                    <div key={i} className={css.activity}>{x}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DashboardCards
