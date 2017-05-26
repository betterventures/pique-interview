import React, { Component } from 'react'
import img from './201-tablet-screens.png'
import css from './style.css'

export class ProvidersHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      image: new Image(),
      loaded: false
    }
  }

  componentDidMount() {
    this.state.image.src = img
    this.listener = this.state.image.addEventListener('load', _ => this.setState({loaded: true}))
  }

  componentWillUnmount() {
    this.state.image.removeEventListener('onload', this.listener)
  }

  render() {
    return (
      <div className={css.root}>
        <div className={css.hero}>
          <div className={css.checklist}>

            <div className={css.h1}>Manage the Entire Scholarship Application</div>
            <div className={css.h1}>Process in One Platform.</div>

            <div className={css.h6}>
              <span className={css.subtitle}>One platform to help at every stage of the application process from</span>
              <span className={css.subtitle}>finding qualified students to reviewing applications</span>
            </div>

          </div>
          <div className={css.screens}>
            <img className={this.state.loaded ? css.loaded : css.loading} src={this.state.image.src} />
          </div>
        </div>
      </div>
    )
  }
}


export default ProvidersHeader