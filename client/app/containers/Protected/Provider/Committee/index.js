import React from 'react'
import { connect } from 'react-redux'
import Button from 'components/Button'
import * as Actions from 'api/actions'
import img from './901-av.png'
import css from './style.css'

export const Committee = ({ launchModal }) => {
  return (
    <div className={css.root}>
      <div className={css.inner}>
        <div className={css.header}>
          Scholarship Selection Committee
        </div>
        <div className={css.divider} />

        <div className={css.row}>
          <div className={css.comment}>
            Add a New Reviewer to Your Selection Committee
          </div>
        </div>
        <div className={css.borderrow}>
          <div className={css.innerrow}>
            <input className={css.sminput}
              type="text"
              placeholder="Email Address"
              onChange=''
            />
            <input className={css.sminput}
              type="text"
              placeholder="First Name"
              onChange=''
            />
            <input className={css.sminput}
              type="text"
              placeholder="Last Name"
              onChange=''
            />
            <Button
              className={css.btn}
              onClick=''
            >
              Send Invite!
            </Button>
          </div>
        </div>

        <div className={css.row}>
          <div className={css.comment}>
            Current Selection Committee
          </div>
        </div>
        <ul className={css.ul}>
        {team.map((x, i) =>
          <li key={i} className={css.li}>
            <div className={css.imgwrapper}>
              <img className={css.img} src={x.img} />
            </div>
            <div className={css.details}>
              <div className={css.name}>{x.name}</div>
              <div className={css.info}>{x.position}</div>
              <div className={css.info}>{x.company}</div>
              <div className={css.remove}>Remove Reviewer</div>
            </div>
          </li>
        )}
        </ul>
      </div>
    </div>
  )
}

const team = [
  {
    name: 'Craig Kilborn',
    position: 'College Access Director',
    company: 'College Up',
    img: `http://img3.bdbphotos.com/images/130x130/c/b/cbq0cn4s1z9f0z4.jpg?skj2io4l`,
  },
  {
    name: 'Doug Douglas',
    position: 'Parallegal',
    company: 'The Smith Group',
    img: `https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAMxAAAAJDJlNTgzNjQxLTY0NDItNDY3My04ZWNmLTQ0NWRhZWVlN2ZkOA.jpg`,
  },
  {
    name: 'Jackie Jackson',
    position: 'Pipeline Developer',
    company: 'Civic Accelerator',
    img: `http://cdn.goodgallery.com/c0fc0cd1-dcb8-4c11-84f0-7536ee031d43/s/0200/21n3q0eg/wilmington-professional-headshot-photographer.jpg`,
  },
  {
    name: 'Quentin Richardson',
    position: 'Academic Counselor',
    company: 'College Prep',
    img: img
  },
]

export default connect(null, Actions)(Committee)
