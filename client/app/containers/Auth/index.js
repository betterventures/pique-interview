import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { firebaseAuth } from 'api'
import { isLoading } from 'api/actions'
import SignIn from './SignIn'
import SignUp from './SignUp'
import css from './style.css'

export class Auth extends Component {
  state = {
    createAccount: false,
    error: '',
    signup: {
      firstname: '',
      lastname: '',
      type: '',
      establishment: '',
      email: '',
      password: '',
    },
    signin: {
      email: '',
      password: '',
    },
  }

  toggleForm = _ => {
    this.setState({createAccount: !this.state.createAccount})
  }

  handleChange = nextState => {
    const { createAccount, signup, signin } = this.state
    if (createAccount) {
      this.setState({signup: { ...signup, ...nextState }})
    } else {
      this.setState({signin: { ...signin, ...nextState }})
    }
  }

  handleSubmit = ({ data, valid }) => {
    const { createAccount, error } = this.state
    if (!!error) {
      this.setState({error: ''})
    }

    this.props.isLoading(true)
    createAccount
      ? this.submitSignUp(data, valid)
      : this.submitSignIn(data)
  }

  submitSignUp = ({ data, valid }) => {
    !valid
      ? this.showErrorMessage({message: 'All fields are required.'})
      : firebaseAuth()
          .createUserWithEmailAndPassword(data.email, data.password)
          .then(this.requestUserAccount)
          .catch(this.showErrorMessage)
  }

  submitSignIn = ({ email, password }) => {
    firebaseAuth()
      .signInWithEmailAndPassword(email, password)
      .catch(this.showErrorMessage)
  }

  showErrorMessage = ({ message }) => {
    this.setState({error: message})
  }

  requestUserAccount = data => {
    axios.post('/api/users/create', data)
  }

  render() {
    const { createAccount, signup, signin, error } = this.state
    return (
      <div className={css.root}>
        {!createAccount
          ? <SignIn
              formData={signin}
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
              toggleForm={this.toggleForm}
              error={error} />
          : <SignUp
              formData={signup}
              handleChange={this.handleChange}
              handleSubmit={this.submitSignUp}
              toggleForm={this.toggleForm}
              error={error} />}
      </div>
    )
  }
}

export default connect(null, { isLoading })(Auth)
