import React, { Component } from 'react'
import ScholarshipPostBtns from '../ScholarshipPostBtns'
import { CurrencyInput } from '../ScholarshipPostInputs'
import FilePicker from 'components/FilePicker'
import css from './style.css'

export class ScholarshipPostGeneral extends Component {
  constructor(props) {
    super(props)
    this.onUploadSuccess = ::this.onUploadSuccess
    this.updateForm = ::this.updateForm
  }

  onUploadSuccess(Blob) {
    this.props.onPhotoUpload(Blob.url)
  }

  updateForm(nextState) {
    this.props.onUpdate(nextState)
  }

  render() {
    const {
      awardAmounts, photoURL, recommendationsAmount,
      onChange, onGroupChange, addField, removeField,
      title, description, minGPA, minSATScore, minACTScore,
      genericRecommendations } = this.props
    return (
      <div className={css.form}>
        <div className={css.title}>
          General Scholarship Details
          <span className={css.caption}>* Required</span>
        </div>

        <div className={css.fields}>
          <div className={css.row}>
            <div className={css.req}>Scholarship Title</div>
            <div className={css.field}>
              <input
                name="title"
                onChange={onChange}
                className={css.input}
                type="text"/>
            </div>
          </div>

          <div className={css.row}>
            <div className={css.req}>Description</div>
            <div className={css.field}>
              <textarea
                name="description"
                className={css.tall}
                rows="4"
                onChange={onChange}
                placeholder="Describe your scholarship"
                type="text" />
            </div>
          </div>

          <div className={css.row}>
            <div className={css.req}>Scholarship Photo</div>
            <div className={css.field}>
              <FilePicker
                className={css.file}
                onSuccess={this.onUploadSuccess} />
              <img src={photoURL} className={css.img} />
            </div>
          </div>

          {awardAmounts.inputs.map((x, i) =>
            <div key={x.name} className={css.row}>
              {i > 0
                ? <div className={css.label} />
                : <div className={css.req}>Award Amount</div>}
              <div className={css.field}>
                <CurrencyInput
                  name={x.name}
                  onChange={e => onGroupChange(e, 'awardAmounts')}
                  value={x.value}
                  className={css.sm} />
              {i > 0
                ? <div
                    onClick={_ => removeField(x.name, 'awardAmounts')}
                    className={css.remove}>X</div>
                : <div
                    onClick={_ => addField('awardAmounts')}
                    className={css.link}>Add Another Award</div>}
              </div>
            </div>
          )}

          <div className={css.row}>
            <div className={css.label}>Minimum GPA</div>
            <div className={css.field}>
              <input
                name='minGPA'
                onChange={onChange}
                className={css.sm}
                type="text"/>
              <div className={css.info}>All GPAs are unweighted</div>
              <div className={css.info}>Skip if you do not have a minimum GPA requirement</div>
            </div>
          </div>

          <div className={css.row}>
            <div className={css.label}>Minimum Composite Test Scores</div>
            <div className={css.field}>
              <input
                name='minSATScore'
                onChange={onChange}
                className={css.sm}
                placeholder="SAT Score"
                type="text"/>
              <input
                name='minACTScore'
                onChange={onChange}
                className={css.sm}
                placeholder="ACT Score"
                type="text"/>
            </div>
          </div>

          <div className={css.row}>
            <div className={css.label}>Accept Standard Recommendations?</div>
            <div className={css.field}>
              <label className={css.radio}>
                <input
                  name="genericRecommendations"
                  value="true"
                  onChange={_ => this.updateForm({genericRecommendations: true})}
                  checked={genericRecommendations === true}
                  type="radio"/>
                  Yes
                </label>
                <label className={css.radio}>
                <input
                  name="genericRecommendations"
                  value="false"
                  onChange={_ => this.updateForm({genericRecommendations: false})}
                  checked={genericRecommendations === false}
                  type="radio"/>
                  No
                </label>
              <div className={css.link}>Why accept a Generic Recommendation?</div>
            </div>
          </div>

          <div className={css.row}>
            <div className={css.label}>Number of Required Recommendations</div>
            <div className={css.field}>
              <input
                name="recommendationsAmount"
                onChange={onChange}
                className={css.sm}
                value={recommendationsAmount}
                placeholder="0"
                type="text"/>
              <div className={css.info}>Skip if you do not require a recommendation</div>
            </div>
          </div>

        <ScholarshipPostBtns next='/scholarship-post/essay' />
        </div>
      </div>
    )
  }
}

export default ScholarshipPostGeneral
