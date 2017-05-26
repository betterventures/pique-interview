import React, { Component } from 'react'

export class CheckboxInputGroup extends Component {
  constructor(props) {
    super(props)
    this.onChange = ::this.onChange
  }

  onChange(e) {
    const { onChange, name, inputs } = this.props
    onChange({
      [name]: {
        name,
        inputs: inputs.map(x =>
          x.name === e.target.name
            ? {...x, value: !x.value}
            : x)
      }
    })
  }

  render() {
    const { inputs, className } = this.props
    return (
      <div>
        {inputs.map((x, i) =>
          <div key={i} className={className}>
            <label>
              <input
                name={x.name}
                checked={x.value}
                value={x.value}
                onChange={this.onChange}
                type="checkbox" />
              {x.text}
            </label>
          </div>
        )}
      </div>
    )
  }
}

export default CheckboxInputGroup
