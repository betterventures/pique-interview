import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router'
import css from './style.css'

export class DashboardSortBy extends Component {
  static defaultProps = {
    filters: [
      {value: 'unscored', text: 'Unscored by Me'},
      {value: 'scored', text: 'Scored by Me'},
      {value: 'all', text: 'All Interviewees'},
    ]
  }

  state = {open: false}

  componentDidMount() {
    const { filter, query } = this.props
    const sortBy = query && query.sort
                 ? query.sort
                 : filter ? filter
                 : /* otherwise */ 'unscored'
    this.applyFilter(sortBy)
  }

  toggleFilters = _ => {
    this.setState({open: !this.state.open})
  }

  applyFilter = filter => {
    this.setState({ filter })
  }

  render() {
    const { open, filter } = this.state
    const { filters, pathname } = this.props

    return (
      <div className={`${css.root} ${open ? css.open : ''}`}>
        <div className={css.menu}>
          <div className={css.sort}>
            <div onClick={this.toggleFilters} className={css.btn}>
            {filters.map(x =>
              x.value === filter
                ? <div key={x.text} className={css.text}>{`Sort By: ${x.text}`}</div>
                : null)}

              <svg width="14px" height="8px" viewBox="1406 294 14 8">
                <polygon
                  id="Triangle"
                  stroke="#979797"
                  strokeWidth="1"
                  fill="#979797"
                  fillRule="evenodd"
                  transform="translate(1413.000000, 298.000000) scale(1, -1) translate(-1413.000000, -298.000000) "
                  points="1413 295 1418 301 1408 301" />
              </svg>
            </div>
          </div>

          <div className={css.filters}>
            <div className={css.wrap}>
              <div className={css.header} />
              {filters.map(x =>
                <div
                  className={`${css.filter} ${x.value === filter ? css.on : '' }`}
                  key={x.value}>
                  <Link
                    onClick={_ => this.applyFilter(x.value)}
                    to={{ pathname, query: {sort: x.value} }}>
                    <div className={css.name}>{x.text}</div>
                    <div className={css.input}></div>
                  </Link>
                </div>)}
            </div>
          </div>

          <div onClick={this.toggleFilters} className={css.curtain} />
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    pathname: state.routing.route,
    query: state.routing.query,
  })
)(DashboardSortBy)
