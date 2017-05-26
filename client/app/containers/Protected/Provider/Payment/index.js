import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout'
import { firebaseAuth } from 'api'
import PaymentBenefits from './PaymentBenefits'
import PaymentForm from './PaymentForm'
import logo from './logo.png'
import css from './style.css'

export class Payment extends Component {

  onToken = token => {
    const url = '/api/stripe/create-scholarship-provider'
    const body = { token, uid: firebaseAuth().currentUser.uid }
    axios.post(url, body).then(x => console.log(x))
  }

  render() {
    return (
      <div className={css.root}>
        <div className={css.content}>
          <PaymentBenefits />

          <div className={css.stripe}>
            <StripeCheckout
              token={this.onToken}
              amount={15500}
              image={logo}
              name='Pique'
              description='Scholarship Provider'
              currency='USD'
              stripeKey='pk_live_SycH4swdyUp3M32ZCSkQ0Afy'>
              <div className={css.submit}>
                <button className={css.btn}>Get Started With Pique!</button>
              </div>
            </StripeCheckout>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    ...state
  })
)(Payment)
