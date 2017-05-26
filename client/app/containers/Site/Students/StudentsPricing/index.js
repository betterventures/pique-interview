import React from 'react'
import { connect } from 'react-redux'
import Card from 'components/Card'
import * as Actions from 'api/actions'
import css from './style.css'

export const StudentsPricing = props => {
  return (
    <div className={css.root}>
      <div className={css.header}>Ready to Start Winning Scholarships?</div>
      <Card
        price={price}
        btnText={btnText}
        list={list}
        onClick={props.launchModal} />
    </div>
  )
}


const price = `$0.00`
const btnText = `Get Pique. It's Free!`
const list = [
  'Curated List of National Scholarships',
  'Curated List of Local Scholarships',
  'Request Recommendations Once',
  'Request Transcripts Once',
  'Apply to Scholarships In-App',
  'More Easily Reuse Essays',
]

export default connect(null, Actions)(StudentsPricing)
