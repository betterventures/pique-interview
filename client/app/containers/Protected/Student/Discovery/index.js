import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Match, Redirect } from 'react-router'
import DiscoveryNav from './DiscoveryNav'
import DiscoveryCards from './DiscoveryCards'
import DiscoveryFilter from './DiscoveryFilter'
import css from './style.css'

export class Discovery extends Component {
  constructor(props) {
    super(props)
    this.computeRoutingState = ::this.computeRoutingState
  }

  static defaultProps = {
    routes: [
      {pattern: '/all',      key: 'all'},
      {pattern: '/national', key: 'national'},
      {pattern: '/niche',    key: 'niche'},
      {pattern: '/local',    key: 'local'},
      {pattern: '/based',    key: 'based'},
    ],
    links: [
      {to: '/all',      key: 'all',      text: 'All Scholarships'},
      {to: '/national', key: 'national', text: 'National Scholarships'},
      {to: '/niche',    key: 'niche',    text: 'Niche National Scholarships'},
      {to: '/local',    key: 'local',    text: 'Local Scholarships'},
      {to: '/based',    key: 'based',    text: 'Based on Previous Applications'},
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
    if (nextProps.scholarships !== this.props.scholarships
      || nextProps.parentRoute !== this.props.parentRoute) {
      this.computeRoutingState(nextProps)
    }
  }

  computeRoutingState({ links, routes, scholarships, parentRoute }) {
    this.setState({
      links: links.map(x => ({
        ...x,
        to:`/discovery/${parentRoute}${x.to}`,
        count: scholarships[x.key].length,
      })),
      routes: routes.map(x => ({
        ...x,
        pattern:`/discovery/${parentRoute}${x.pattern}`,
        items: scholarships[x.key]
      }))
    })
  }

  render() {
    const { parentRoute } = this.props
    const { links, routes } = this.state
    return !!parentRoute
      ? <div className={css.root}>
          <div className='wrap'>
            <Match
              pattern='/discovery'
              render={props => <DiscoveryNav {...props} links={links} />} />
            <DiscoveryFilter />
            {routes.map(x =>
              <Match
                pattern={x.pattern}
                key={x.key}
                render={props =>
                  <DiscoveryCards {...props} items={x.items} key={x.key} />
                } />)}
          </div>
        </div>
      : <Redirect to='/discovery/recommended/all' />
  }
}

function updateParentRoute(pathname) {
  return ['recommended', 'saved', 'applied']
    .filter(x => pathname.includes(x))[0]
}

export default connect(
  state => {
    return {
      scholarships: state.app.scholarships,
      parentRoute: updateParentRoute(state.routing.route)
    }
  }
)(Discovery)
