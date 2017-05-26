import React, { Component } from 'react'
import { connect } from 'react-redux'
import FilePicker from 'components/FilePicker'
import ScholarshipPostBtns from 'containers/Protected/Provider/ScholarshipPost/ScholarshipPostBtns'
import { CheckboxInputGroup } from 'containers/Protected/Provider/ScholarshipPost/ScholarshipPostInputs'
import { submitApplication, onboardingRoute } from 'api/actions'
import css from './style.css'

export class StudentQuestionnaire extends Component {
  constructor(props) {
    super(props)
    this.onUploadSuccess = ::this.onUploadSuccess
  }

  state = {
    photoURL: '',
    communityService: '',
    communityServiceHours: '',
    citizenStatus: {
      name: 'citizenStatus',
      inputs: [
        {name: 'us', value: false, text: 'US Citizen'},
        {name: 'international', value: false, text: 'International Citizen'},
        {name: 'daca',   value: false, text: 'DACA'},
      ]
    },
    scholarshipTypes: {
      name: 'scholarshipTypes',
      inputs: [
        {name: 'meritedBased', value: false, text: 'Merit Based'},
        {name: 'needBased', value: false, text: 'Need Based'},
      ]
    },
    genderRequirements: {
      name: 'genderRequirements',
      inputs: [
        {name: 'male',   value: false, text: 'Male'},
        {name: 'female', value: false, text: 'Female'},
        {noAnswer: 'noAnswer', value: false, text: `I'd prefer not to answer`},
      ]
    },
    ethnicities: {
      name: 'ethnicities',
      inputs: [
        {name: 'blackAfricanAmerican', value: false, text: 'Black/African American'},
        {name: 'whiteCaucasian',       value: false, text: 'White/Caucasian'},
        {name: 'asianPacificIslander', value: false, text: 'Asian/Pacific Islander'},
        {name: 'hispanicLatino',       value: false, text: 'Hispanic/Latino'},
        {name: 'nativeAmerican',       value: false, text: 'Native American'},
      ]
    },
    degreeTypes: {
      name: 'degreeTypes',
      inputs: [
        {name: 'twoYear',  value: false, text: ' 2 Year Program'},
        {name: 'fourYear', value: false, text: ' 4 Year Program'},
      ]
    },
    areasOfStudy: {
      name: 'areasOfStudy',
      inputs: [{name: 'areasOfStudy0', value: ''}],
    },
    communityService: {
      name: 'communityService',
      inputs: [
        {name: 'male',   value: false, text: 'Male'},
        {name: 'female', value: false, text: 'Female'},
        {noAnswer: 'noAnswer', value: false, text: `I'd prefer not to answer`},
      ]
    },
  }

  componentDidMount() {
    this.props.onboardingRoute()
  }

  onUploadSuccess(Blob) {
    this.setState({photoURL: Blob.url})
  }

  render() {
    const {
      photoURL, citizenStatus, scholarshipTypes, genderRequirements,
      ethnicities, degreeTypes, areasOfStudy, communityService
    } = this.state
    return (
      <div className={css.root}>
        <div className={css.header}>Student Questionnaire</div>
        <div className={css.form}>
          <div className={css.title}>
            General Scholarship Details
            <span className={css.caption}>* Required</span>
          </div>

          <div className={css.fields}>
            <div className={css.row}>
              <div className={css.req}>Intro</div>
              <div className={css.field}>
                <input
                  name="intro"
                  className={css.input}
                  type="text"/>
              </div>
            </div>

            <div className={css.row}>
              <div className={css.req}>About Me</div>
              <div className={css.field}>
                <textarea
                  name="about"
                  className={css.tall}
                  rows="4"
                  placeholder="Describe yourself in 100 words. This is your chance to show scholarship providers what makes you different. Have fun and give it your all!"
                  type="text" />
              </div>
            </div>

            <div className={css.row}>
              <div className={css.req}>Profile Picture</div>
              <div className={css.field}>
                <FilePicker
                  className={css.file}
                  onSuccess={this.onUploadSuccess} />
                <img src={photoURL} className={css.img} />
              </div>
            </div>
          </div>

          <div className={css.row}>
            <div className={css.label}>GPA</div>
            <div className={css.field}>
              <input
                name='minGPA'
                className={css.sm}
                placeholder='0.0'
                type="text"/>
            </div>
          </div>

          <div className={css.row}>
            <div className={css.label}>Standardized Test Scores</div>
            <div className={css.field}>
              <input
                name='minSATScore'
                className={css.sm}
                placeholder="SAT Score"
                type="text"/>
              <input
                name='minACTScore'
                className={css.sm}
                placeholder="ACT Score"
                type="text"/>
            </div>
          </div>

          <div className={css.row}>
            <div className={css.label}>US Citizen Status</div>
            <div className={css.field}>
              <CheckboxInputGroup
                {...citizenStatus}
                className={css.checkbox} />
            </div>
          </div>

          <div className={css.row}>
            <div className={css.label}>Scholarship Types</div>
            <div className={css.field}>
              <CheckboxInputGroup
                {...scholarshipTypes}
                className={css.checkbox} />
            </div>
          </div>

          <div className={css.row}>
            <div className={css.label}>Degree/Program Type Sought</div>
            <div className={css.field}>
              <CheckboxInputGroup
                {...degreeTypes}
                className={css.checkbox} />
            </div>
          </div>

          <div className={css.row}>
            <div className={css.label}>Gender Requirement</div>
            <div className={css.field}>
              <CheckboxInputGroup
                {...genderRequirements}
                className={css.checkbox} />
            </div>
          </div>

          <div className={css.row}>
            <div className={css.label}>Race/Ethnicity Requirements</div>
            <div className={css.field}>
              <CheckboxInputGroup
                {...ethnicities}
                className={css.checkbox} />
            </div>
          </div>

          {areasOfStudy.inputs.map((x, i) =>
            <div key={i} className={css.row}>
              {i > 0
                ? <div className={css.label} />
                : <div className={css.label}>Intended Field of Study</div>}
              <div className={css.field}>
                <input
                  name='fieldOfStudy'
                  className={css.sm}
                  type="text"/>
                {i > 0
                  ? <div
                      onClick={_ => _}
                      className={css.remove}>X</div>
                  : <div
                      onClick={_ => _}
                      className={css.link}>Add Another Intended Area of Study Requirement</div>}
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
            <div className={css.label}>Number of Community Service Hours</div>
            <div className={css.field}>
              <input
                name='communityServiceHours'
                className={css.sm}
                type="text"/>
            </div>
          </div>

          <div className={css.row}>
            <div className={css.label}>Enter Your Location</div>
            <div className={css.field}>
              <input
                name='city'
                placeholder="City"
                className={css.sm}
                type="text"/>
              <input
                name='state'
                placeholder="State"
                className={css.sm}
                type="text"/>
            </div>
          </div>


          <ScholarshipPostBtns
            text="Get Started!"
            onClick={this.props.submitApplication}
            submit='/dashboard/new' />
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    user: state.user
  }),
  { submitApplication, onboardingRoute }
)(StudentQuestionnaire)
