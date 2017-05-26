import React, { Component } from 'react'
import { connect } from 'react-redux'
import ScholarshipPostBtns from '../ScholarshipPostBtns'
import { updateApplication, submitApplication } from 'api/actions'
import css from './style.css'

export class ScholarshipPostRequirements extends Component {
  constructor(props) {
    super(props)
    this.onChange = ::this.onChange
    this.addField = ::this.addField
    this.removeField = ::this.removeField
  }

  state = {
    additionalFields: [],
    fieldId: 0,
  }

  onChange(e) {
    const { name, value } = e.target
    this.props.updateApplication({[name]: value})
  }

  addField() {
    const { additionalFields, fieldId } = this.state
    const id = fieldId + 1
    const name = `awardAmount-${id}`
    this.setState({
      fieldId: id,
      additionalFields: additionalFields.concat([name])
    })
    this.props.updateApplication({[name]: ''})
  }

  onSubmit = e => {
    this.props.onSubmit(e)
  }

  removeField(name) {
    const { additionalFields } = this.state
    const nextState = additionalFields.filter(x => x !== name)
    this.setState({additionalFields: nextState})
    this.props.updateApplication({[name]: undefined})
  }

  render() {
    const { additionalFields } = this.state
    return (
      <div className={css.form}>
        <div className={css.title}>
          Supplemental Requirements
          <div className={css.caption}>Please list any supplemental materials and documents you require students to submit</div>
        </div>
        <div className={css.fields}>
          <div className={css.row}>
            <input
              className={css.sm}
              placeholder="Document Title"
              type="text" />
            <div
              onClick={this.addField}
              className={css.link}>Add Another Required Document</div>
            <div className={css.info}>Add supplemental required documents i.e. 'Parents' W-2 Form'</div>
          </div>

          {additionalFields.map(x =>
            <div
              key={x}
              className={css.row}>
              <input
                name={x}
                onChange={this.onChange}
                placeholder="Document Title"
                className={css.sm}
                type="text" />
              <div
                className={css.remove}
                onClick={_ => this.removeField(x)}>X</div>
            </div>
          )}

        </div>

        <ScholarshipPostBtns
          back='/scholarship-post/intention'
          text="Post Scholarship"
          onClick={this.onSubmit}
          submit />
      </div>
    )
  }
}

export default connect(
  state => ({
    ...state
  }),
  { updateApplication, submitApplication }
)(ScholarshipPostRequirements)