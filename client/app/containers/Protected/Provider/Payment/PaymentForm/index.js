import React, { Component } from 'react'
import img1 from './701-cc.png'
import img2 from './702-cc.png'
import img3 from './703-cc.png'
import img4 from './704-cc.png'
import img5 from './705-cc-lock.png'
import img6 from './706-lock.png'
import css from './style.css'

export class PaymentForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      year: '',
      card: '',
      month: '',
      csc: '',
      zip: '',
      number: '',
      error: '',
    }
    this.handleCardSelection = ::this.handleCardSelection
    this.handleInputChanges = ::this.handleInputChanges
    this.handleSelectUpdates = ::this.handleSelectUpdates
    this.handleSubmit = ::this.handleSubmit
  }

  cards = [
    {type: 'visa', image: img1},
    {type: 'master card', image: img2},
    {type: 'amex', image: img3},
    {type: 'discover', image: img4},
  ]

  options = {
    month: ['Month', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
    year:  ['Year', '2016', '2017', '2018', '2019', '2020', '2021', '2022']
  }

  handleCardSelection(card) {
    this.setState({ card })
  }

  handleSelectUpdates(e) {
    const { options, name } = e.target
    if (options.selectedIndex !== 0) {
      this.setState({
        [name]: this.options[name][options.selectedIndex].value,
      })
    }
  }

  handleInputChanges(e) {
    const { name, value } = e.target
    switch (name) {
      case 'number':
      case 'zip':
      case 'csc':
        this.setState({[name]: value.replace(/\D/g, '')})
    }
  }

  handleSubmit(e) {
    e.preventDefault()
  }

  render() {
    const { number, month, year, csc, zip, card, error } = this.state
    return (
      <div className={css.root}>
        <form>
          <div className={css.cc}>
            <div className={css.cards}>
              {this.cards.map((x, i) =>
                <div key={i} className={css.img} onClick={_ => this.handleCardSelection(x.type)}>
                  <img className={card === x.type ? css.card : css.disabled} src={x.image} />
                </div>
              )}
            </div>
          </div>

          <div className={css.label}>
            <label>Card Number</label>
            <img src={img6} />
          </div>

          <div className={css.row}>
            <div className={css.full}>
              <img className={css.lock} src={img5} />
              <input name="number" onChange={this.handleInputChanges} value={number} type="text"/>
            </div>
          </div>

          <div className={css.label}>
            <label>Expiry Date</label>
          </div>

          <div className={css.row}>
            <select className={css.month} name="month" onChange={this.handleInputChanges} value={month}>
              {this.options.month.map((x, i) => <option key={i} value={x}>{x}</option>)}
            </select>
            <select className={css.year} name="year" onChange={this.handleInputChanges} value={year}>
              {this.options.year.map((x, i) => <option key={i} value={x}>{x}</option>)}
            </select>
          </div>

          <div className={css.label}>
            <label className={css.csc}>
              <div className={css.tip}>
                The security code is the last 3 numbers on the back of your card. (4 numbers in the front if Amex)
                <div className={css.arrow} />
              </div>
              Security Code <span>?</span>
            </label>
            <label className={css.zip}>Zip Code</label>
          </div>
          <div className={css.row}>

            <div className={css.csc}>
              <img className={css.lock} src={img5} />
              <input name="csc" onChange={this.handleInputChanges} value={csc} type="text"/>
            </div>

            <input className={css.zip} name="zip" onChange={this.handleInputChanges} value={zip} type="text"/>
          </div>

          <span className={css.notify}>{error}</span>
          <button className={css.submit} onClick={this.handleSubmit}>Get Started With Pique!</button>
        </form>
      </div>
    )
  }
}

export default PaymentForm
