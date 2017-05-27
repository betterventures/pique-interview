import React, { Component } from 'react'
import Match from 'react-router/Match'
import Redirect from 'react-router/Redirect'
import Sidebar from 'containers/Protected/Provider/Sidebar'
import LazyLoad, { importDefault } from 'components/LazyLoad'

import css from 'containers/Protected/style.css'

export class ProviderUser extends Component {
  render() {
    const routes = [
      {
        pattern: '/applicant/:id',
        component: _ => importDefault(import('containers/Protected/Common/Applicant')),
        sidebar: false
      },{
        pattern: '/scholarship-post',
        component: _ => importDefault(import('containers/Protected/Provider/ScholarshipPost')),
        sidebar: false
      },{
        pattern: '/payment',
        component: _ => importDefault(import('containers/Protected/Provider/Payment')),
        sidebar: false
      },{
        pattern: '/individual-scholarships',
        component: _ => importDefault(import('containers/Protected/Common/IndividualScholarships')),
        sidebar: false
      },{
        pattern: '/dashboard',
        component: _ => importDefault(import('containers/Protected/Provider/Dashboard')),
        sidebar: true
      },{
        pattern: '/settings',
        component: _ => importDefault(import('containers/Protected/Common/Settings')),
        sidebar: true
      },{
        pattern: '/committee',
        component: _ => importDefault(import('containers/Protected/Provider/Committee')),
        sidebar: true
      },
    ]
    const NavigateToPayment = props => <Redirect to='/payment' />

    return (
      <div className={css.root}>
        <Match pattern='/' exactly render={NavigateToPayment} />

        {routes.map((x, i) =>
          <Match key={i} pattern={x.pattern} render={props =>
            <LazyLoad modules={{Component:x.component}}>
              {({ Component }) =>
                <div>
                  <Component {...props} />
                  {x.sidebar ? <Sidebar /> : null}
                </div>
              }
            </LazyLoad>
          } />)}
      </div>
    )
  }
}

export default ProviderUser
