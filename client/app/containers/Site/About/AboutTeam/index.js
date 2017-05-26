import React, { Component } from 'react'
import img1 from './102-brian-min.png'
import img2 from './103-ev-min.png'
import img3 from './104-adam-min.png'
import img4 from './105-nnamdi-min.png'
import img5 from './106-kevin-min.png'
import img6 from './107-kyle-min.png'
import css from './style.css'

export class AboutTeam extends Component {
  state = {detail: false}

  showDetails = index => {
    this.setState({ detail: team[index] })
  }

  hideDetails = _ => {
    this.setState({detail: false})
  }

  render() {
    const { detail} = this.state
    return (
      <div className={css.root} id="team">
        <div className={css.header}>Our Team</div>
        <ul className={css.ul}>
          {team.map((x, i) =>
            <li
              onClick={_ => this.showDetails(i)}
              className={css.item}
              style={x.style}
              key={i} >
              <img className={css.img} src={x.image} />
              <div className={css.overlay}>
                <div className={css.copy}>
                  <div className={css.name}>{x.name}</div>
                  <div className={css.position}>{x.position}</div>
                  <div className={css.education}>{x.education}</div>
                </div>
              </div>
            </li>
          )}
          {detail
            ? <div
                onClick={this.hideDetails}
                className={css.detail}>
                <div className={css.card}>
                  <img className={css.thumb} src={detail.image} />
                  <div className={css.info}>
                    <div className={css.name}>{detail.name}</div>
                    <div>Position: <span>{detail.position}</span></div>
                    <div>School: <span>{detail.education}</span></div>
                    <div>Fun Fact: <span>Tends to go by the name '{detail.name}'</span></div>
                  </div>
                </div>
                </div>
            : null}
        </ul>
      </div>
    )
}
}

const team = [
  {name: 'Brian', position: 'Founder', education: 'Haverford College', image: img1, style: {backgroundColor: `#31D26C`}},
  {name: 'Evan', position: 'Software Engineer', education: 'Hunter College', image: img2, style: {backgroundColor: `#51BBF1`}},
  {name: 'Adam', position: 'Scholarship Pipeline Developer', education: 'George Washington University', image: img3, style: {backgroundColor: `#E1D113`}},
  {name: 'Nnamdi', position: 'Scholarship Pipeline Developer', education: 'Columbia University', image: img4, style: {backgroundColor: `#2BDBB4`}},
  {name: 'Kevin', position: 'Scholarship Pipeline Developer', education: 'Lafayette College', image: img5, style: {backgroundColor: `#E1D113`}},
  {name: 'Kyle', position: 'Data Engineer', education: 'Carleton College', image: img6, style: {backgroundColor: `#DB2BD4`}},
]

export default AboutTeam
