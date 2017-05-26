import React, { Component } from 'react'
import { connect } from 'react-redux'
import { submitForm, removeModal } from 'api/actions'
import ConfirmationMessage from 'components/ConfirmationMessage'
import css from './style.css'

export class SiteModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedIndex: 0,
      firstname: '',
      lastname: '',
      city: '',
      state: '',
      type: false,
      selected: 'placeholder',
      establishment: '',
      error: '',
      entering: false,
      leaving: false,
    }

    this.handleSelectUpdate = ::this.handleSelectUpdate
    this.handleInputChanges = ::this.handleInputChanges
    this.handleSubmit = ::this.handleSubmit
    this.onLeave = ::this.onLeave
    this.updateVisibilty = ::this.updateVisibilty
  }

  componentDidMount() {
    this.updateVisibilty(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.updateVisibilty(nextProps)
  }

  updateVisibilty(nextProps) {
    if (nextProps.open) {
      this.onEnter()
    } else if (!nextProps.open && this.state.entering) {
      this.onLeave()
    }
  }

  onEnter() {
    setTimeout(_ => this.setState({entering: true}), 200)
  }

  onLeave() {
    this.setState({leaving: true})
    setTimeout(_ => {
      this.setState({entering: false, leaving: false})
      this.props.removeModal()
    }, 200)
  }

  options = [
    { value: 'placeholder', text: 'I am a...', type: 'school' },
    { value: 'student', text: 'Student', type: 'school' },
    { value: 'scholarship foundation', text: 'Scholarship Foundation', type: 'foundation' },
    { value: 'teacher', text: 'Teacher', type: 'school' },
    { value: 'counselor', text: 'Counselor', type: 'school' },
    { value: 'nonprofit', text: 'Nonprofit', type: 'nonprofit' },
    { value: 'supporter', text: 'Supporter', type: 'supporter' },
  ]

  placeholders = {
    school: 'Name of school',
    nonprofit: 'Name of non-profit',
    supporter: 'Name of employer',
    foundation: 'Name of foundation',
  }

  handleSelectUpdate(e) {
    const { selectedIndex } = e.target.options
    if (selectedIndex !== 0) {
      this.setState({
        establishment: '',
        selected: this.options[selectedIndex].value,
        type: this.options[selectedIndex].type
      })
    }
  }

  handleInputChanges(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault()
    const { firstname, lastname, city, state, type, email, establishment } = this.state
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
    const { entering, leaving } = this.state
    const { open, formSubmitted } = this.props

    if (!open) {
      return null
    }

    return (
      <div className={css.root}>
        <div className={`${css.content} ${entering && leaving ? css.leave : entering && !leaving ? css.enter : ''}`}>

          {formSubmitted
            ? <ConfirmationMessage />
            : <div>
                <div className={css.header} />
                <span className={css.caption} />
                <form>
                  <div className={css.row}>
                    <input className={css.firstname} name="firstname" onChange={this.handleInputChanges} value={this.state.firstname} type="text" placeholder="First Name" />
                    <input className={css.lastname} name="lastname" onChange={this.handleInputChanges} value={this.state.lastname} type="text" placeholder="Last Name" />
                  </div>
                  <div className={css.row}>
                    <input className={css.full} name="email" onChange={this.handleInputChanges} value={this.state.email} type="text" placeholder="Enter your email" />
                  </div>
                  <div className={css.row}>
                    <input className={css.city} name="city" onChange={this.handleInputChanges} value={this.state.city} type="text" placeholder="City" />
                    <input className={css.state} name="state" onChange={this.handleInputChanges} value={this.state.state} type="text" placeholder="State" />
                  </div>
                  <select
                    className={css.select}
                    value={this.state.selected}
                    onChange={this.handleSelectUpdate}>
                    {this.options.map((x, i) => <option key={i} value={x.value}>{x.text}</option>)}
                  </select>

                  {this.state.type
                    ? <div className={css.row}>
                        <input className={css.full} name="establishment" onChange={this.handleInputChanges} value={this.state.establishment} type="text" placeholder={this.placeholders[this.state.type]} />
                      </div>
                    : null
                  }

                  <span className={css.notify}>{this.state.error}</span>
                  <button className={css.submit} onClick={this.handleSubmit}>Sign Up</button>
                </form>
              </div>
            }
          </div>
        <div className={`${css.curtain} ${leaving ? css.leave : ''}`} onClick={this.onLeave} />
      </div>
    )
  }
}

export default connect(
  state => ({
    formSubmitted: state.formSubmitted,
    open: state.open,
  }),
  { submitForm, removeModal }
)(SiteModal)
