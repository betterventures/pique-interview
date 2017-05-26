import React from 'react'
import { Match } from 'react-router'
import LazyLoad from 'components/LazyLoad'

export const LazyLoadRoute = ({component:Component, ...rest}) => {
  return (
    <Match {...rest} render={props =>
      <LazyLoad modules={{ Component }}>
        {({ Component }) => <Component {...props} />}
      </LazyLoad>
    } />
  )
}

export default LazyLoadRoute
