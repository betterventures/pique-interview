import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Match, Redirect } from 'react-router'
import DashboardNav from './DashboardNav'
import DashboardCards from './DashboardCards'
import DashboardSortBy from './DashboardSortBy'
import css from './style.css'

export class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.computeRoutingState = ::this.computeRoutingState
  }

  static defaultProps = {
    routes: [
      {pattern: '/dashboard/unscored',   key: 'unscored'},
      {pattern: '/dashboard/scored',     key: 'scored'},
      {pattern: '/dashboard/awarded',    key: 'awarded'},
    ],
    links: [
      {to: '/dashboard/unscored',   key: 'unscored',  text: 'Unscored'},
      {to: '/dashboard/scored',     key: 'scored',    text: 'Scored'},
      {to: '/dashboard/awarded',    key: 'awarded',   text: 'Award Recipients'},
    ]
  }

  state = {
    links: [],
    routes: [],
  }

  componentDidMount() {
    this.computeRoutingState(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.applicants !== this.props.applicants) {
      this.computeRoutingState(nextProps)
    }
  }

  computeRoutingState({ links, routes, applicants }) {
    this.setState({
      links: links.map(x => ({...x, count: applicants[x.key].length})),
      routes: routes.map(x => ({...x, items: applicants[x.key]}))
    })
  }

  render() {
    const { links, routes } = this.state
    return (
      <div className={css.root}>
        <Match pattern='/dashboard'
          exactly
          render={props =>
            <Redirect to='/dashboard/unscored' />
          }
        />
        <Match pattern='/dashboard/'
          exactly
          render={props =>
            <Redirect to='/dashboard/unscored' />
          }
        />
        <div className='wrap'>
          <Match
            pattern='/dashboard'
            render={props => <DashboardNav {...props} links={links} />}
          />

          <Match pattern='/dashboard/awarded' component={DashboardSortBy} />

          {
            routes.map(x =>
              <Match
                pattern={x.pattern}
                key={x.key}
                render={props =>
                  <DashboardCards {...props} items={x.items} />
                }
              />
            )
          }
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    applicants: state.app.applicants,
  })
)(Dashboard)
