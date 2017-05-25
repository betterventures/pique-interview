import React, { Component } from 'react'
import DashboardCards from './DashboardCards'
import DashboardNav from './DashboardNav'
import css from './style.css'

export default class Dashboard extends Component {
  constructor(props) {
    super(props)
    console.log("CONSTRUCT");
    this.computeRoutingState = ::this.computeRoutingState
  }

  static defaultProps = {
    routes: [
      {pattern: '/dashboard/new',          key: 'new'},
      {pattern: '/dashboard/reviewed',     key: 'reviewed'},
      {pattern: '/dashboard/interviewees', key: 'interviewees'},
      {pattern: '/dashboard/finalists',    key: 'finalists'},
    ],
    links: [
      {to: '/dashboard/new',          key: 'new',          text: 'New Applicants'},
      {to: '/dashboard/reviewed',     key: 'reviewed',     text: 'Reviewed Applicants'},
      {to: '/dashboard/interviewees', key: 'interviewees', text: 'Interviewees'},
      {to: '/dashboard/finalists',    key: 'finalists',    text: 'Finalists'},
    ],
    applicants: {
      new: [],
      reviewed: [],
      interviewees: [],
      finalists: []
    }
  }

  state = {
    links: [],
    routes: [],
  }

  componentDidMount() {
    console.log("PROPS");
    console.log(this.props);
    this.computeRoutingState(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.applicants !== this.props.applicants) {
      this.computeRoutingState(nextProps)
    }
  }

  computeRoutingState({ links, routes, applicants }) {
    console.log("ROUTING STATE");
    console.log(links);
    console.log(routes);
    console.log(applicants);
    links.map(x => (console.log(`LINK: ${x.toString()}: ${applicants[x.key].toString()}`)));
    this.setState({
      links: links.map(x => ({...x, count: applicants[x.key].length})),
      routes: routes.map(x => ({...x, items: applicants[x.key]}))
    })
  }

  render() {
    const { links, routes } = this.state
    console.log("RENDER");
    console.log("ROUTE MAPS of ITEMS");
    routes.map(x => (x.items.map(i => (console.log(i)))))
    return (
      <div className='thisIsDumb'>
	<a href='/dashboard/new'>Dashboard</a>
	<div className='wrap'>
	  WHAOAAAAA

	  {
	    routes.map(x =>
	      <DashboardCards {...this.props} items={x.items} />
	    )
	  }
	</div>
      </div>
    )
  }
}

