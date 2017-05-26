import React, { Component } from 'react'
import Select from 'components/Select'
import css from './style.css'

export class SignUp extends Component {
  static defaultProps = {
    userTypes: [
      {text: 'I am a...'},
      {type: 'school', value: 'student', text: 'Student', placeholder: 'Name of school'},
      {type: 'foundation', value: 'scholarship foundation', text: 'Scholarship Foundation', placeholder: 'Name of foundation'},
      {type: 'school', value: 'teacher', text: 'Teacher', placeholder: 'Name of school'},
      {type: 'school', value: 'counselor', text: 'Counselor', placeholder: 'Name of school'},
      {type: 'nonprofit', value: 'nonprofit', text: 'Nonprofit', placeholder: 'Name of non-profit'},
      {type: 'employer', value: 'supporter', text: 'Supporter', placeholder: 'Name of employer'},
    ],
  }

  state = {userType: ''}

  handleChange = ({ target }) => {
    this.props.handleChange({[target.name]: target.value})
  }

  handleSelect = ({ target }) => {
    const { selectedIndex } = target.options
    const { userTypes, handleChange } = this.props
    const type = userTypes[selectedIndex].type
    const userType = userTypes[selectedIndex]
    this.setState({ userType })
    handleChange({ type })
  }

  handleKeyPress = e => {
    if (e.charCode == 13) {
      e.preventDefault()
      this.handleSubmit()
    }
  }

  handleClick = e => {
    e.preventDefault()
    this.handleSubmit()
  }

  handleSubmit = _ => {
    const { data, valid } = Object.keys(this.props.formData)
      .reduce(this.formReducer, {})
    this.props.handleSubmit({ data, valid })
  }

  formReducer = (acc, x) => {
    const { formData } = this.props
    if (!acc.data) {
      acc.data = {}
      acc.valid = true
    }
    if (acc.valid && !!formData[x]) {
      acc.data[x] = formData[x]
      return acc
    }
    acc.valid = false
    return acc
  }

  render() {
    const { userType } = this.state
    const { formData, userTypes, error, toggleForm } = this.props

    return (
      <div className={css.root}>
        <div className={css.header} />
        <form onKeyPress={this.handleKeyPress}>
          <div className={css.row}>
            <input
              autoFocus
              onChange={this.handleChange}
              value={formData.firstname}
              name="firstname"
              type="text"
              className={css.firstname}
              placeholder="First Name" />

            <input
              className={css.lastname}
              value={formData.lastname}
              onChange={this.handleChange}
              name="lastname"
              type="text"
              placeholder="Last Name" />
          </div>

          <div className={css.row}>
            <input
              onChange={this.handleChange}
              value={formData.email}
              name="email"
              type="email"
              className={css.full}
              placeholder="Enter your email" />
          </div>

          <Select
            options={userTypes}
            value={formData.type}
            onChange={this.handleSelect} />

          {userType.placeholder
            ? <div className={css.row}>
                <input
                  value={formData.establishment}
                  onChange={this.handleChange}
                  className={css.full}
                  placeholder={userType.placeholder}
                  name="establishment"
                  type="text" />
              </div>
            : null}

          <div className={css.row}>
            <input
              name="password"
              value={formData.password}
              onChange={this.handleChange}
              className={css.full}
              type="password"
              placeholder="Password" />
          </div>

          <div className={css.caption} />

          <div className={css.btns}>
            <span className={css.notify}>{error}</span>
            <button
              onClick={this.handleClick}
              className={css.submit}>
              Sign Up
            </button>
            <button
              onClick={toggleForm}
              type="button"
              className={css.switch}>
              Have an account?
            </button>
          </div>
        </form>
      </div>
    )
  }
}

export default SignUp
