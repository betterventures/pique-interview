import React from 'react'
import { connect } from 'react-redux'
import SidebarDropdown from './SidebarDropdown'
import css from './style.css'

const AppSidebar = ({ user, scholarship }) => {
  return (
    <div className={css.root}>
      <div className={css.backdrop} />
      <div className={css.student}>
        <div className={css.border}>
          <img className={css.img} src={user.photoURL}/>
        </div>
        <div className={css.name}>{user.displayName}</div>
      </div>

      {
        links(scholarship)
          .map((x, i) => <SidebarDropdown key={i} {...x} />)
      }

    </div>
  )
}

function links(scholarship) {
  return [
    {
      title: 'Set Up Scholarship',
      links: [
        {
          to: `/providers/scholarships/${scholarship.id}/steps/general`,
          text: 'Edit Scholarship',
          external: true
        },
        {to: '/preview', text: 'Preview Scholarship'},
        {to: '/scorecard', text: 'Score Card'},
        {to: '/committee',  text: 'Selection Committee'},
      ],
    },
    {
      title: 'Applications',
      links: [
        {to: '/dashboard/unscored', text: 'Unscored By Me'},
        {to: '/dashboard/scored',   text: 'Scored By Me'},
        {to: '/dashboard/awarded',  text: 'Award Recipients'},
      ],
    },
  ]
}

export default connect(
  state => ({
    user: state.user,
    scholarship: state.app.scholarships && state.app.scholarships.all[0]
  })
)(AppSidebar)
