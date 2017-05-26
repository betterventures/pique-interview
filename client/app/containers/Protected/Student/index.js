import React, { Component } from 'react'
import { Match, Redirect } from 'react-router'
import Sidebar from 'containers/Protected/Student/Sidebar'
import { importDefault } from 'components/LazyLoad'
import LazyLoadRoute from 'components/LazyLoadRoute'

import css from 'containers/Protected/style.css'

export class StudentUser extends Component {
  render() {
    const routes = [
      {
        pattern: '/applicant/:id',
        component: _ => importDefault(import('containers/Protected/Common/Applicant')),
        sidebar: false
      },{
        pattern: '/student-questionnaire',
        component: _ => importDefault(import('containers/Protected/Student/Questionnaire')),
        sidebar: false
      },{
        pattern: '/individual-scholarships',
        component: _ => importDefault(import('containers/Protected/Common/IndividualScholarships')),
        sidebar: false
      },{
        pattern: '/discovery',
        component: _ => importDefault(import('containers/Protected/Student/Discovery')),
        sidebar: true
      },{
        pattern: '/settings',
        component: _ => importDefault(import('containers/Protected/Common/Settings')),
        sidebar: true
      }
    ]
    const NavigateToQuestionnaire = props => <Redirect to='/student-questionnaire' />


    return (
      <div className={css.root}>
        <Match pattern='/' exactly render={NavigateToQuestionnaire} />

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



export default StudentUser
