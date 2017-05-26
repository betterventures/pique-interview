import React, { Component } from 'react'
import { connect } from 'react-redux'
import { importDefault } from 'components/LazyLoad'
import LazyLoadRoute from 'components/LazyLoadRoute'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import SiteScroll from './SiteScroll'
import SiteModal from './SiteModal'

export class Site extends Component {
  render() {
    const routes = [
      {pattern: '/',           component: _ => importDefault(import('containers/Site/Home')), exactly: true},
      {pattern: '/about',      component: _ => importDefault(import('containers/Site/About'))},
      {pattern: '/signin',     component: _ => importDefault(import('containers/Auth'))},
      {pattern: '/educators',  component: _ => importDefault(import('containers/Site/Educators'))},
      {pattern: '/providers',  component: _ => importDefault(import('containers/Site/Providers'))},
      {pattern: '/students',   component: _ => importDefault(import('containers/Site/Students'))},
      {pattern: '/faq',        component: _ => importDefault(import('containers/Site/FAQ'))},
      {pattern: '/nonprofits', component: _ => importDefault(import('containers/Site/Nonprofits'))},
    ]

    return (
      <div>
        <SiteScroll />
        <SiteModal />
        <SiteHeader />
        {routes.map((x, i) =>  <LazyLoadRoute key={i} {...x} />)}
        <SiteFooter />
      </div>
    )
  }
}

export default connect(
  state => ({
    route: state.routing.route,
  })
)(Site)
