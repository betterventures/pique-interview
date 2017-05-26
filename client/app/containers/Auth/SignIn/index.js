import React, { Component, PropTypes } from 'react'
import css from './style.css'

export class SignIn extends Component {
  static propTypes = {
    email: PropTypes.string,
    password: PropTypes.string
  }

  handleKeyPress = e => {
    if (e.charCode == 13) {
      e.preventDefault()
      this.props.handleSubmit({data: this.props.formData})
    }
  }

  handleClick = e => {
    e.preventDefault()
    this.props.handleSubmit({data: this.props.formData})
  }

  handleChange = ({ target }) => {
    this.props.handleChange({[target.name]: target.value})
  }

  render() {
    const { formData, toggleForm, error } = this.props
    return (
      <div className={css.root}>
        <div className={css.header} />
        <form onKeyPress={this.handleKeyPress}>

          <div className={css.row}>
            <input
              className={css.full}
              ref={i => this.autoFocus = i}
              name="email"
              onChange={this.handleChange}
              value={formData.email}
              onKeyPress={this.handleKeyPress}
              type="email"
              placeholder="Enter your email" />
          </div>

          <div className={css.row}>
            <input
              className={css.full}
              name="password"
              onChange={this.handleChange}
              value={formData.password}
              onKeyPress={this.handleKeyPress}
              type="password"
              placeholder="Password" />
          </div>

          <div className={css.btns}>
            <span className={css.notify}>{error}</span>
            <button
              onClick={this.handleClick}
              className={css.submit}>
              Log In
            </button>
            <button
              className={css.switch}
              type="button"
              onClick={toggleForm}>
              Need an account
            </button>
          </div>
          <div className={css.caption} />
        </form>
      </div>
    )
  }
}

export default SignIn
