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
  {name: 'Carla Piedra', position: 'College Access Director', company: 'College Up', img: img},
  {name: 'Nnamdi Nwaezeapu', position: 'Parallegal ', company: 'The Smith Group', img: img},
  {name: 'Kevin Iraheta', position: 'Pipeline Developer', company: 'Civic Accelerator', img: img},
  {name: 'Laura Middleton', position: 'Academic Counselor', company: 'College Prep', img: img}
]

export default connect(null, Actions)(Committee)
