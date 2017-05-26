import React, { Component } from 'react'

export class CurrencyInput extends Component {
  constructor(props) {
    super(props)
    this.onChange = ::this.onChange
  }

  onChange(e) {
    const { value } = e.target
    const { onChange } = this.props
    e.target.value = `$${value.replace(/\D/g, '')}`
    onChange(e)
  }

  render() {
    const { name, value, className } = this.props
    return (
      <input
        name={name}
        value={value || '$'}
        className={className}
        onChange={this.onChange}
        type="text" />
    )
  }
}

export default CurrencyInput
