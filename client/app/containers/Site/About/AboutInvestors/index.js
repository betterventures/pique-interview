import React from 'react'
import img from './109-500.jpg'
import css from './style.css'

export const AboutInvestors = props => {
  return (
    <div className={css.root}>
      <div className={css.title}>Our Investors</div>
      <img src={img} />
      <div className={css.copy}>
        <div className={css.text}>Pique is a 500 Startups portfolio company.</div>
        <div className={css.text}>500 Startups is a leading global venture capital seed fund and startup accelerator.</div>
        <div className={css.text}>Based in Silicon Valley, 500 Startups manages $200M in assets.</div>
        <div className={css.text}>And has invested in over 1,300 tech startups.</div>
      </div>
    </div>
  )
}

export default AboutInvestors
