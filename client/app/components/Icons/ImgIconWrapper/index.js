import React, { Component } from 'react'
import css from './style.css'

export class ImgIconWrapper extends Component {
  constructor(props) {
    super(props)
    this.state = {
      src: this.props.src
    }
    this.replaceWithFallbackSrc = ::this.replaceWithFallbackSrc
  }

  replaceWithFallbackSrc() {
    this.setState({
      src: this.props.fallbackSrc
    })
  }

  render() {
    const { className, style, src, fallbackSrc } = this.props
    return (
      <span className={css.wrapper}>
        <img
          className={className}
          style={style}
          src={this.state.src}
          onError={ this.replaceWithFallbackSrc }
        />
      </span>
    )
  }
}

export default ImgIconWrapper
