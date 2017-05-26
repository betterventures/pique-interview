import React from 'react'
import { connect } from 'react-redux'
import SidebarDropdown from './SidebarDropdown'
import css from './style.css'

const AppSidebar = ({ user }) => {
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
  title: 'Applications',
  links: [
    {to: '/dashboard/new', text: 'New'},
    {to: '/dashboard/reviewed', text: 'Reviewed'},
    {to: '/dashboard/interviewees', text: 'Interviewees'},
    {to: '/dashboard/finalists', text: 'Finalists'},
  ],
},{
  title: 'Selection Committee',
  links: [
    {to: '/committee', text: 'Committee Page'},
    {text: 'Invite Members'},
  ],
}]

export default connect(
  state => ({
    user: state.auth.user
  })
)(AppSidebar)