import React from 'react'
import { Link } from 'react-router'
import Rating from 'components/Rating'
import css from './style.css'

const DashboardCards = ({ items }) => {
  return (
    <div className={css.root}>
      {items.map((x, i) =>
        <div key={i} className={css.item}>
          <div className={css.wrap}>
            <Link to={`/applicant/${x.id}`}>
              <div className={css.img} style={{backgroundImage: `url(${x.image})`}} />
              <div className={css.stripe}>
                <div className={css.name}>{x.name}</div>
                <div className={css.desc}>{x.description}</div>
                <div
                  className={css.rating}
                  style={{height: '28px', 'fontWeight': 400}}
                  value={x.rating}>
                  (( Score here ))
                </div>
              </div>
            </Link>
            <div className={css.details}>
              <div className={css.info}>
                <div className={css.title}>GPA</div>
                <div className={css.val}>{x.gpa}</div>
              </div>
              <div className={css.info}>
                <div className={css.title}>Activities</div>
                <div className={css.val}>
                  {x.activities.map((x, i) =>
                    <div key={i} className={css.activity}><strong>{x.position_held}</strong> at {x.title}</div>
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
