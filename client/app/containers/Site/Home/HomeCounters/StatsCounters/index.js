import React from 'react'
import Counter from 'components/Counter'
import css from './style.css'

export const StatsCounters = props => {
  return (
    <div className={css.root}>
      {stats.map((x, i) =>
        <div key={i} className={css.item}>
          <div className={x.className}>
          <Counter
            total={props.animate ? x.total : 0}
            increment={x.increment}
            interval={x.interval} />%</div>
          <h6 className={css.caption}>{x.text}</h6>
        </div>
      )}
    </div>
  )
}

const stats = [
  {total: 45, increment: 1, interval: 30, text: `Increase in College Tuition this Decade`, className: css.tuition},
  {total: 74, increment: 1, interval: 30, text: `Increase in Student Loan Size`, className: css.loan},
  {total: 70, increment: 1, interval: 30, text: `Students Graduating in 2016 Took Out a Student Loan`, className: css.graduating},
]

export default StatsCounters