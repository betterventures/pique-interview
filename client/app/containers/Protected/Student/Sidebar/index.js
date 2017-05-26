import React from 'react'
import { connect } from 'react-redux'
import SidebarDropdown from './SidebarDropdown'
import css from './style.css'

const StudentSidebar = ({ user }) => {
  return (
    <div className={css.root}>
      <div className={css.backdrop} />
      <div className={css.student}>
        <div className={css.border}>
          <img className={css.img} src={user.photoURL}/>
        </div>
        <div className={css.name}>{user.displayName}</div>
      </div>

      {links.map((x, i) => <SidebarDropdown key={i} {...x} />)}

    </div>
  )
}

const links = [{
  title: 'Scholarships',
  links: [
    {to: '/discovery/recommended/all', key: 'recommended', text: 'Recommended'},
    {to: '/discovery/saved/all',       key: 'saved',       text: 'Saved'},
    {to: '/discovery/applied/all',     key: 'applied',     text: 'Applied'},
  ],
},{
  title: 'Request Documents',
  links: [
    {text: 'Official Transcript'},
    {text: 'Recommendation'},
  ],
}]

export default connect(
  state => ({
    user: state.auth.user
  })
)(StudentSidebar)