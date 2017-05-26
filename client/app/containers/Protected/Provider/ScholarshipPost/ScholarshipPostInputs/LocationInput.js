import React, { Component } from 'react'
// import css from './style.css'

export class LocationInput extends Component {
  constructor(props) {
    super(props)
    this.onChange = ::this.onChange
  }

  onChange(e) {
    this.props.onChange(e)
  }

  render() {
    const { className } = this.props
    return (
      <input
        name="location"
        className={className}
        onChange={this.onChange}
        type="text"  />
    )
  }
}

export default LocationInput
