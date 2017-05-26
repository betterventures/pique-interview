import React, { Component } from 'react'
import { connect } from 'react-redux'
import Header from 'containers/Protected/Common/Header'
import InviteModal from 'containers/Protected/Common/InviteModal'
import LazyLoad, { importDefault } from 'components/LazyLoad'
import * as API from 'api'
import { fetchSuccess, fetchError, clearState } from 'api/actions'
import css from './style.css'

export class MembersRoutes extends Component {
  componentDidMount() {
    const { fetchSuccess, fetchError, clearState } = this.props
    clearState()
    API.fetchData({
      next: fetchSuccess,
      error: error => fetchError({ error }),
    })
  }

  render() {
    const { type } = this.props.user
    const Component = type === 'provider'
                    ? _ => importDefault(import('containers/Protected/Provider'))
                    : _ => importDefault(import('containers/Protected/Student'))
    return (
      <div>
        <InviteModal />
        <Header />
        <LazyLoad modules={{ Component }}>
          {({ Component }) => <Component />}
        </LazyLoad>
      </div>
    )
  }
}

export default connect(
  state => {
    const { user } = state.auth
    return {
      applicants: state.app.applicants,
      scholarships: state.app.scholarships,
      user: {...user, type: user.type || 'provider'},
      isNew: state.auth.isNew,
      removeNav: state.ui.removeNav,
    }
  },
  { fetchSuccess, fetchError, clearState }
)(MembersRoutes)