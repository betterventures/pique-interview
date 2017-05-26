import React from 'react'
import { connect } from 'react-redux'
import ApplicantPreview from '../Preview'
import essaysImg from './essays.png'
import recommendationsImg from './recommendations.png'
import documentsImg from './documents.png'
import add from './add.png'
import css from './style.css'

export const ApplicantDocuments = ({ description, essays, recommendations, documents }) => {
  return (
    <div className={css.root}>
      <div className={css.header}>Application Documents</div>
      <div className={css.box}>

        <div className={css.section}>
          <div className={css.title}>
            <img className={css.icon} src={essaysImg} />
            <span className={css.text}>Essays</span>
          </div>
          {essays
            ? <div className={css.grids}>
                {essays.map((x, i) =>
                  <ApplicantPreview key={i} image={x.image} caption={x.caption} />
                )}
              </div>
            : null}
          <img className={css.add} src={add} />

        </div>

        <div className={css.section}>
          <div className={css.title}>
            <img className={css.icon} src={recommendationsImg} />
            <span className={css.text}>Recommendations</span>
          </div>
          {recommendations
            ? <div className={css.grids}>
                {recommendations.map((x, i) =>
                  <ApplicantPreview key={i} image={x.image} caption={x.caption} />
                )}
              </div>
            : <div className={css.placeholder}>Request a Recommendation</div>}
        </div>

        <div className={css.section}>
          <div className={css.title}>
            <img className={css.icon} src={documentsImg} />
            <span className={css.text}>Supplemental Documents</span>
          </div>
          {documents
            ? <div className={css.grids}>
                {documents.map((x, i) =>
                  <ApplicantPreview key={i} image={x.image} caption={x.caption} />
                )}
              </div>
            : null}
          <img className={css.add} src={add} />
        </div>

      </div>

    </div>
  )
}

export default connect(
  state => ({
    user: state.auth.user
  })
)(ApplicantDocuments)
