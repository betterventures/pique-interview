import React from 'react'
import { connect } from 'react-redux'
import * as Actions from 'api/actions'
import hero from './002-hero.png'
import css from './style.css'

export const HomeHero = ({ opacityInc, opacityDec, launchModal }) => {
  return (
    <div className={css.hero} style={{backgroundImage: `url(${hero})`}}>
      <div className={css.overlay} style={{opacity: opacityInc}} />
      <div className={css.text} style={{opacity: opacityDec}}>
        <h1  className={css.h1} />
        <div className={css.sub}>Discover, save & apply to scholarships with just one application.</div>
        <div className={css.sub}>Yeah, it is that simple.</div>
      </div>
      <button
        style={{opacity: opacityDec}}
        className={css.btn}
        onClick={launchModal}>
        Sign Up for Free!
      </button>
    </div>
  )
}

export default connect(
  state => ({
    opacityInc: state.ui.opacityInc,
    opacityDec: state.ui.opacityDec,
  }),
  Actions
)(HomeHero)