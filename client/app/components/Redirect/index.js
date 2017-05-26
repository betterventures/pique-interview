import React from 'react'
import { connect } from 'react-redux'
import { R } from 'react-router'

export const Redirect = ({ to, not, any, route, children }) => {
  return not && !not.filter(x => x === route)[0]
    || any && any.filter(x => x === route)[0]
      ? <R to={to} />
      : <div>{children}</div>
}

export default connect(
  state => ({
    route: state.routing.route,
  })
)(Redirect)
