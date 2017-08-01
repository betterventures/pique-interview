import React from 'react'
import { connect } from 'react-redux'
import Button from 'components/Button'
import * as Actions from 'api/actions'
import img from './901-av.png'
import css from './style.css'

export const Committee = ({ launchModal }) => {
  return (
    <div className={css.root}>
      <div className={`wrap ${css.inner}`}>
        <div className={css.header} />
        <div className={css.divider} />
        <ul className={css.ul}>
        {team.map((x, i) =>
          <li key={i} className={css.li}>
            <img className={css.img} src={x.img} />
            <div className={css.details}>
              <div className={css.name}>{x.name}</div>
              <div className={css.info}>{x.position}</div>
              <div className={css.info}>{x.company}</div>
            </div>
          </li>
        )}
        </ul>
        <div className={css.invite}>
          <Button
            className={css.btn}
            onClick={launchModal}>Invite More Reviewers</Button>
        </div>
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
