import React from 'react'
import img from './707-check.png'
import css from './style.css'

export const PaymentBenefits = props => {
  return (
    <div className={css.root}>
      <div className={css.header}>
        <div className={css.text}>Start Saving Time and Money in</div>
        <div className={css.text}>The Scholarship Application Process</div>
      </div>

      <div>
        {items.map((x, i) =>
          <div key={i} className={css.item}>
            <div className={css.img}>
              <img src={img} />
            </div>
            <div className={css.text}>{x}</div>
          </div>
        )}
      </div>


      <div className={css.border} />

      <div className={css.footer}>
        <div className={css.text}>Only $99.99/year</div>
        <div className={css.text}>+</div>
        <div className={css.text}>$3.99 processing fee</div>
      </div>

    </div>
  )
}

const items = [
  `Create your scholarship post and let Pique do the heavy-lifting by finding you qualified applicants`,
  `Create a scholarship review team and manage all of your applications in-app`,
  `Collaborate while reviewing applicants by rating applicants and leaving comments on applicants for your review team to see`,
  `Select interviewees, finalists and winners and notify them in-app`,
]

export default PaymentBenefits
