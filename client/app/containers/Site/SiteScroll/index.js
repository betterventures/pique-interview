import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as Actions from 'api/actions'

export class SiteScroll extends Component {
  constructor(props) {
    super(props)
    this.resetStyles = ::this.resetStyles
    this.resetScroll = ::this.resetScroll
    this.applyStyles = ::this.applyStyles
    this.switchView = ::this.switchView
    this.handleHeaderUI = ::this.handleHeaderUI
    this.handleStudentsUI = ::this.handleStudentsUI
    this.handleLandingUI = ::this.handleLandingUI
  }

  initialUI = {
    position: 'top',
    opacityInc: 0,
    opacityDec: 1,
    fill: false,
    fixed: false,
    animate1: false,
    animate2: false,
    animate3: false,
  }

  componentDidMount() {
    window.addEventListener('scroll', this.switchView)
    window.addEventListener('touchmove', this.switchView)
    this.resetScroll(!!this.props.hash)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.route !== this.props.route) {
      this.resetStyles()
      this.resetScroll(!!nextProps.hash)
    }
  }

  resetStyles() {
    this.props.styleUpdate(this.initialUI)
  }

  resetScroll(hash) {
    window.scrollTo(0, hash ? 900 : 0)
  }

  applyStyles(styles) {
    this.props.styleUpdate(styles)
  }

  switchView() {
    const scrollTop = window.scrollY
    const { route, ui } = this.props
    if (route !== '/' || route !== '/about') {
      if (ui.fixed)  { this.applyStyles({fixed: false}); }
      if (ui.fill)   { this.applyStyles({fill: false}); }
    }

    if (route === '/' || route === '/about') {
      this.handleHeaderUI(scrollTop)
      if (route === '/') {
        this.handleLandingUI(scrollTop)
      }
    } else if (route === '/students') {
      this.handleStudentsUI(scrollTop)
    }
  }

  handleHeaderUI(scrollTop) {
    const { ui, route } = this.props
    const threshold = route === '/' ? 450 : 280

    if (!ui.fixed && scrollTop) {
      this.applyStyles({fixed: true})
    }

    if (scrollTop > threshold + 30 && !ui.fill) {
      this.applyStyles({fill: true})
    } else if (scrollTop <= threshold + 30 && ui.fill) {
      this.applyStyles({fill: false})
    }

    if (scrollTop < threshold) {
      const opacity = scrollTop / threshold
      this.applyStyles({
        opacityInc: opacity,
        opacityDec: 1 - opacity || 1
      })
    }
  }

  handleStudentsUI(scrollTop) {
    const { fixed, fill, position, animate1, animate2, animate3 } = this.props.ui
    const windowWidth = window.innerWidth
    const mobile = windowWidth < 1024
    if (mobile) { return }

    const small = windowWidth < 1280
    const positionFixed = small ? 1490 : 1580
    const positionBottom = small ? 2835 : 2925
    if (scrollTop <= positionFixed && position !== 'top') {
      this.applyStyles({position: 'top'})
    } else if (scrollTop > positionFixed && scrollTop < positionBottom  && position !== 'fixed') {
      this.applyStyles({position: 'fixed'})
    } else if (scrollTop >= positionBottom && position !== 'bottom') {
      this.applyStyles({position: 'bottom'})
    }

    if (scrollTop >= 1500 && !animate1) {
      this.applyStyles({animate1: true})
    } else if (scrollTop < 1500 && animate1) {
      this.applyStyles({animate1: false})
    }
    if (scrollTop >= 1840 && !animate2) {
      this.applyStyles({animate2: true})
    } else if (scrollTop < 1840 && animate2) {
      this.applyStyles({animate2: false})
    }
    if (scrollTop >= 2450 && !animate3) {
      this.applyStyles({animate3: true})
    } else if (scrollTop < 2450 && animate3) {
      this.applyStyles({animate3: false})
    }
  }

  handleLandingUI(scrollTop) {
    const { animate1, animate2, animate3 } = this.props.ui
    if (scrollTop > 1421 && !animate1) {
      this.applyStyles({animate1: true})
    }

    if (scrollTop > 921 && !animate2) {
      this.applyStyles({animate2: true})
    }

    if (scrollTop >= 95 && !animate3) {
      this.applyStyles({animate3: true})
    }
  }

  render() {
    return null
  }
}

export default connect(
  state => ({
    route: state.routing.route,
    hash: state.routing.hash,
    ui: state.ui,
  }),
  Actions
)(SiteScroll)