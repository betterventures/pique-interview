import React, { Component } from 'react'
import AppSidebar from './Sidebar'
import LazyLoad, { importDefault } from 'components/LazyLoad'

import css from './style.css'

export class ProviderUser extends Component {
  render() {
    const routes = [
      {
        pattern: '/dashboard',
        component: _ => importDefault(import('components/Provider/Dashboard/dashboard')),
        sidebar: true
      }
    ]

    console.log("PROVIDER!!")
    console.log("PROPS")
    console.log(this.props)
    console.log(this.props.user)

    return (
      <div className={css.root}>
        {routes.map((x, i) =>
          <LazyLoad modules={{Component:x.component}}>
            {({ Component }) =>
                <div>
                  <Component {...this.props} />
                  {x.sidebar ? <AppSidebar {...this.props} /> : null}
                </div>
            }
          </LazyLoad>
        )}
      </div>
    )
  }
}

export default ProviderUser
