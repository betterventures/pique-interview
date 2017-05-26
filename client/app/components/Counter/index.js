import React, { Component } from 'react'
import css from './style.css'

export class Counter extends Component {
  constructor(props) {
    super(props)

    this.state = {counter: 0}
    this.increment = ::this.increment
  }

  componentDidMount() {
    const { total } = this.props
    this.increment(total)
  }

  componentWillReceiveProps(nextProps) {
    const { total } = nextProps
    const { counter } = this.state
    if (counter === 0 && total !== 0) {
      this.increment(total)
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  increment(total) {
    const { counter } = this.state
    const { interval, increment } = this.props
    if (counter < total) {
      this.setState({counter: counter + increment})
      this.timeout = setTimeout(_ => this.increment(total), interval)
    } else if (counter >= total) {
      this.setState({counter: total})
    }
  }

  render() {
    const { transform } = this.props
    const { counter } = this.state
    return (
      <span>
        {transform ? transform(counter) : counter}
      </span>
    )
  }
}

export default Counter