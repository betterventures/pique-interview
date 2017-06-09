import React, { Component } from 'react'
import { connect } from 'react-redux'
import Rating from 'components/Rating'
import { saveAndUpdateScholarship } from 'api/actions'
import css from './style.css'

export class ApplicantComments extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={css.root}>
        <div className={css.header}>Committee Review</div>
        <div className={css.comments}>
        {comments.map((x, i) =>
          <div key={i} className={css.comment}>
            <div className={css.image} style={{backgroundImage: `url(${x.image})`}} />
            <div className={css.info}>
              <div className={css.name}>{x.name}</div>
            </div>
            <div className={css.message}>{x.message}</div>
          </div>
        )}
        {this.props.ratings.map((x, i) =>
          <div key={i} className={css.comment}>
            <div className={css.image} style={{backgroundImage: `url(${x.rater.photo_url || '/assets/blank_figure.png'})`}} />
            <div className={css.info}>
              <div className={css.name}>{x.rater.first_name} {x.rater.last_name}</div>
            </div>
            <div className={css.message}>{x.comment}</div>
          </div>
        )}
        </div>
      </div>
    )
  }
}

const comments = [
  {
    name: 'Craig Kilborn',
    rating: 4,
    image: `http://img3.bdbphotos.com/images/130x130/c/b/cbq0cn4s1z9f0z4.jpg?skj2io4l`,
    message: `This girl is great! I really like her essay. She seems to really understand what it takes to grind the coffee. I'm going to recommend her to be a finalist!`,
  },{
    name: 'Doug Douglas',
    rating: 3,
    image: `https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAMxAAAAJDJlNTgzNjQxLTY0NDItNDY3My04ZWNmLTQ0NWRhZWVlN2ZkOA.jpg`,
    message: `Her extra curriculars are incredible. Nearly perfect handwriting but I sincerely wonder if I left my stove on. Regardless, I want a cheese sandwich.`,
  },{
    name: 'Jackie Jackson',
    rating: 5,
    image: `http://cdn.goodgallery.com/c0fc0cd1-dcb8-4c11-84f0-7536ee031d43/s/0200/21n3q0eg/wilmington-professional-headshot-photographer.jpg`,
    message: `Definitely going to recommend her and this isn't just the alcohol talking, this is my actual voice. I agree with Doug on all of the above`,
  }, {
    name: `Quentin Richarson`,
    rating: 3,
    image: `http://static.hsw.com.br/gif/jogador-new-york-kinicks-quentin-richardson.jpg`,
    message: `Overall, she's a bright student with all of determination and direction. I wish she had talked about Santa a bit more in her second essay. `
  }
]

function getApplicationForStudent(applications, studentId) {
  return applications.filter(app => (app.student_id && app.student_id.toString()) === studentId.toString())[0]
}

export default connect(
  (state, ownProps) => {
    const scholarship = (state.app && state.app.scholarships['all'][0]) || {}
    let application = getApplicationForStudent(
      scholarship.scholarship_applications,
      ownProps.params.id
    )
    return {
      applicantId: ownProps.params.id,
      scholarship: scholarship,
      ratings: application.ratings,
      user: state.user,
    }
  },
  { saveAndUpdateScholarship }
)(ApplicantComments)
