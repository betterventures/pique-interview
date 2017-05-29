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
      {pattern: '/dashboard/new',          key: 'new'},
      {pattern: '/dashboard/reviewed',     key: 'reviewed'},
      {pattern: '/dashboard/finalists',    key: 'finalists'},
    ],
    links: [
      {to: '/dashboard/new',          key: 'new',          text: 'Unscored'},
      {to: '/dashboard/reviewed',     key: 'reviewed',     text: 'Scored'},
      {to: '/dashboard/finalists',    key: 'finalists',    text: 'Award Recipients'},
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
        <Match pattern='/dashboard' exactly render={props =>
          <Redirect to='/dashboard/new' />
        } />
        <div className='wrap'>
          <Match
            pattern='/dashboard'
            render={props => <DashboardNav {...props} links={links} />} />

          <Match pattern='/dashboard/finalists' component={DashboardSortBy} />

          {routes.map(x =>
            <Match
              pattern={x.pattern}
              key={x.key}
              render={props =>
                <DashboardCards {...props} items={x.items} />} />)}
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
