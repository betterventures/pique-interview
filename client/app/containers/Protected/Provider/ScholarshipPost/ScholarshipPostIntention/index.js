import React, { Component } from 'react'
import { connect } from 'react-redux'
import ScholarshipPostBtns from '../ScholarshipPostBtns'
import { CurrencyInput, CheckboxInputGroup, LocationInput } from '../ScholarshipPostInputs'
import { updateApplication } from 'api/actions'
import css from './style.css'

export class ScholarshipPostIntention extends Component {
  constructor(props) {
    super(props)
    this.onCheckboxChange = ::this.onCheckboxChange
    this.updateForm = ::this.updateForm
  }

  state = {
    areas: 1,
  }

  onCheckboxChange(e) {
    const { name, value } = e.target
    const group = this.props[name]
    this.updateForm({[name]: {...group, [value]: !group[value]} })
  }

  updateForm(nextState) {
    this.props.onUpdate(nextState)
  }

  render() {
    const {
      locations, areasOfStudy, schoolYears, genderRequirements,
      genderRequirement, citizenship, ethnicities, degreeTypes,
      communityService, maxFamilyIncome, onChange, onGroupChange, onUpdate,
      addField, removeField
    } = this.props
    return (
      <div className={css.form}>
        <div className={css.title}>
          Who is this scholarship intended for?
          <span className={css.caption}>This helps us determine which students see your scholarship</span>
        </div>

        <div className={css.fields}>

          <div className={css.row}>
            <div className={css.req}>School Year Requirement</div>
            <div className={css.field}>
              <CheckboxInputGroup
                {...schoolYears}
                onChange={onUpdate}
                className={css.checkbox} />
            </div>
          </div>

          <div className={css.row}>
            <div className={css.req}>U.S. Citizenship Requirement</div>
            <div className={css.field}>
              <label className={css.radio}>
                <input
                  name="citizenship"
                  value="true"
                  onChange={_ => this.updateForm({citizenship: true})}
                  checked={citizenship === true}
                  type="radio"/>
                  Yes
                </label>
                <label className={css.radio}>
                <input
                  name="citizenship"
                  value="false"
                  onChange={_ => this.updateForm({citizenship: false})}
                  checked={citizenship === false}
                  type="radio"/>
                  No
              </label>
            </div>
          </div>

          <div className={css.row}>
            <div className={css.label}>Maximum Family Income</div>
            <div className={css.field}>
              <CurrencyInput
                name="maxFamilyIncome"
                onChange={onChange}
                value={maxFamilyIncome}
                className={css.sm} />
            </div>
          </div>

          <div className={css.row}>
            <div className={css.label}>Gender Requirement</div>
            <div className={css.field}>
              <CheckboxInputGroup
                {...genderRequirements}
                onChange={onUpdate}
                className={css.checkbox} />
            </div>
          </div>

          <div className={css.row}>
            <div className={css.label}>Race/Ethnicity Requirements</div>
            <div className={css.field}>
              <CheckboxInputGroup
                {...ethnicities}
                onChange={onUpdate}
                className={css.checkbox} />
            </div>
          </div>

          <div className={css.row}>
            <div className={css.label}>Degree/Program Type Sought</div>
            <div className={css.field}>
              <CheckboxInputGroup
                {...degreeTypes}
                onChange={onUpdate}
                className={css.checkbox} />
            </div>
          </div>

          {areasOfStudy.inputs.map((x, i) =>
            <div key={x.name} className={css.row}>
              {i > 0
                  ? <div className={css.label} />
                  : <div className={css.label}>Areas of Study Requirements</div>}
              <div className={css.field}>
                <select
                  name={x.name}
                  value={x.value}
                  onChange={e => onGroupChange(e, 'areasOfStudy')}
                  className={css.md}>
                  <option value="">Choose area</option>
                  <option value="Microsoft Notepad">Microsoft Notepad</option>
                  <option value="One Annual Push-Up">One Annual Push-Up</option>
                  <option value="Toodles (McBoodles a plus but not required)">Toodles (McBoodles a plus but not required)</option>
                  <option value="Dinner Enjoyment">Dinner Enjoyment</option>
                </select>
                {i > 0
                  ? <div
                      onClick={_ => removeField(x.name, 'areasOfStudy')}
                      className={css.remove}>X</div>
                  : <div
                      onClick={_ => addField('areasOfStudy')}
                      className={css.third}>
                      Add Another Area of Study Requirement
                    </div>}
              </div>
            </div>
          )}

          <div className={css.row}>
            <div className={css.label}>Community Service Requirement</div>
            <div className={css.field}>
              <label className={css.radio}>
                <input
                  name="communityService"
                  value="true"
                  onChange={_ => this.updateForm({communityService: true})}
                  checked={communityService === true}
                  type="radio"/>
                  Yes
                </label>
                <label className={css.radio}>
                <input
                  name="communityService"
                  value="false"
                  onChange={_ => this.updateForm({communityService: false})}
                  checked={communityService === false}
                  type="radio"/>
                  No
              </label>
            </div>
          </div>

          <div className={css.row}>
            <div className={css.label}>Location Scholarship is Limited To?</div>
            <div className={css.field}>
              <LocationInput className={css.sm} />
              <div className={css.info}>Skip if this is a national scholarship</div>
            </div>
          </div>

        </div>

        <ScholarshipPostBtns
          back='/scholarship-post/essay'
          next='/scholarship-post/requirements' />
      </div>
    )
  }
}

const AdditionalLocationLimitations = ({ onChange, onClick, name, value, first, children }) => {
  return (
    <div className={css.row}>
      {first
        ? <div className={css.label}>Location Scholarship is Limited To?</div>
        : <div className={css.label} />}
      <div className={css.field}>
        <input
          name={`${name}.city`}
          onChange={e => onChange(e, 'locations')}
          value={value.city}
          className={css.sm}
          type="text"/>
        <input
          name={`${name}.state`}
          onChange={e => onChange(e, 'locations')}
          value={value.state}
          className={css.sm}
          type="text"/>
        {children}
      </div>
    </div>
  )
}

export default connect(
  state => ({
    ...state
  }),
  { updateApplication }
)(ScholarshipPostIntention)