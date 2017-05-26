import React, { Component } from 'react'
import { connect } from 'react-redux'
import ConfirmationMessage from 'components/ConfirmationMessage'
import { submitForm } from 'api/actions'
import css from './style.css'

export class Form extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: props.value,
      firstname: '',
      lastname: '',
      city: '',
      state: '',
      type: props.value[0].type,
      establishment: '',
      error: '',
    }
    this.handleInputChanges = ::this.handleInputChanges
    this.handleSubmit = ::this.handleSubmit
  }

  selectType(type) {
    this.setState({ type })
  }

  handleInputChanges(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault()
    const { firstname, type, lastname, city, state, email, establishment } = this.state
    if (
      !!firstname
      && !!lastname
      && !!city
      && !!state
      && !!email
      && !!type
      && !!establishment
    ) {
      this.props.submitForm({
        firstname,
        lastname,
        city,
        state,
        email,
        type,
        establishment,
      })
    } else {
      this.setState({error: 'All fields are required'})
    }
  }

  render() {
    const { type } = this.state
    const { formSubmitted, value } = this.props

    return (
      <div className={css.root}>
      {formSubmitted
        ? <ConfirmationMessage />
        : <form>
            <div className={css.type}>
              {value.map((x, i) =>
                <div
                  key={i}
                  className={css.option}
                  onClick={_ => this.selectType(x.type)}>
                  <div className={css.divider} />
                  {x.text}
                  <div className={type === x.type ? css.selected : css.other} />
                </div>
              )}
            </div>
            <div className={css.row}>
              <input className={css.firstname} name="firstname" onChange={this.handleInputChanges} value={this.state.firstname} type="text" placeholder="First Name" />
              <input className={css.lastname} name="lastname" onChange={this.handleInputChanges} value={this.state.lastname} type="text" placeholder="Last Name" />
            </div>
            <div className={css.row}>
              <input className={css.full} name="email" onChange={this.handleInputChanges} value={this.state.email} type="text" placeholder="Enter your email" />
            </div>
            <div className={css.row}>
              <input className={css.full} name="establishment" onChange={this.handleInputChanges} value={this.state.establishment} type="text" placeholder="Name of school" />
            </div>
            <div className={css.row}>
              <input className={css.city} name="city" onChange={this.handleInputChanges} value={this.state.city} type="text" placeholder="City" />
              <input className={css.state} name="state" onChange={this.handleInputChanges} value={this.state.state} type="text" placeholder="State" />
            </div>

            <span className={css.notify}>{this.state.error}</span>
            <button className={css.submit} onClick={this.handleSubmit}>Submit</button>
          </form>
      }
      </div>
    )
  }
}

export default connect(
  state => ({
    formSubmitted: state.formSubmitted
  }),
  { submitForm }
)(Form)
