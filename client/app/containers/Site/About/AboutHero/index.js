import React from 'react'
import { connect } from 'react-redux'
import hero from './101-hero.png'
import css from './style.css'

export const AboutHero = ({ opacityInc, opacityDec, onClick }) => {
  return (
    <div className={css.hero} style={{backgroundImage: `url(${hero})`}}>
      <div style={{opacity: opacityInc}} className={css.overlay} />
      <div style={{opacity: opacityDec}} className={css.text}>
        <h1 className={css.h1} />
      </div>
    </div>
  )
}

export default connect(
  state => ({
    opacityInc: state.ui.opacityInc,
    opacityDec: state.ui.opacityDec,
  })
)(AboutHero)
