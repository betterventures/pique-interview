import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Match, Redirect } from 'react-router'
import ScholarshipPostGeneral from './ScholarshipPostGeneral'
import ScholarshipPostEssay from './ScholarshipPostEssay'
import ScholarshipPostIntention from './ScholarshipPostIntention'
import ScholarshipPostRequirements from './ScholarshipPostRequirements'
import { updateApplication, updateUserInfo, onboardingRoute } from 'api/actions'
import css from './style.css'

export class ScholarshipPost extends Component {
  constructor(props) {
    super(props)
    this.onChange = ::this.onChange
    this.onGroupChange = ::this.onGroupChange
    this.addField = ::this.addField
    this.removeField = ::this.removeField
    this.onPhotoUpload = ::this.onPhotoUpload
    this.onUpdate = ::this.onUpdate
  }

  static defaultProps = {
    awardAmounts: {value: ''},
    essayPrompts: {value: ''},
    essays: {prompts: [''], wordLimit: ''},
    locations: { value: {city: '', state: ''} },
    areasOfStudy: {value: ''},
    documents: {value: ''},
  }

  state = {
    id: 0,
    citizenship: '',
    communityService: '',
    description: '',
    genericRecommendations: '',
    maxFamilyIncome: '',
    minGPA: '',
    minSATScore: '',
    minACTScore: '',
    photoURL: '',
    recommendationsAmount: '',
    title: '',
    documents: [this.props.documents],
    essays: {
      name: 'essays',
      inputs: [
        {name: 'essays0', value: ''},
      ]
    },
    awardAmounts: {
      name: 'awardAmounts',
      inputs: [{name: 'awardAmounts0', value: ''}],
    },
    schoolYears: {
      name: 'schoolYears',
      inputs: [
        {name: 'freshman', value: false, text: 'High School Freshman'},
        {name: 'sophmore', value: false, text: 'High School Sophmore'},
        {name: 'junior',   value: false, text: 'High School Junior'},
        {name: 'senior',   value: false, text: 'High School Senior'},
      ]
    },
    genderRequirements: {
      name: 'genderRequirements',
      inputs: [
        {name: 'male',   value: false, text: 'Male'},
        {name: 'female', value: false, text: 'Female'}
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
    locations: {
      name: 'locations',
      inputs: [{name: 'locations0', value: {city: '', state: ''}}],
    },
  }

  onPhotoUpload(url) {
    this.setState({photoURL: url})
    this.props.updateUserInfo({photoURL: url})
  }

  onUpdate(data) {
    this.setState(data)
  }

  onChange(e) {
    const { name, value } = e.target
    const inputs = this.state[name].inputs
    if (inputs) {
      this.setState({[name]: {name, value, inputs: this.state[name].inputs }})
    } else {
      this.setState({[name]: value})
    }
  }

  onSubmit = e => {
    e.preventDefault()
    const { id, ...rest } = this.state
    axios.post('/api/providers/scholarship-post', rest)
  }

  onGroupChange(e, prefix) {
    const { name, value } = e.target
    const items = this.state[prefix].inputs
    if (prefix === 'locations') {
      const [targetName, valueName] = name.split('.')
      this.setState({
        [prefix]: {
          ...this.state[prefix],
          inputs: items.map(x =>
            x.name === targetName
              ? { ...x, value: { ...x.value, [valueName]: value }}
              : x)
        }
      })
    } else {
      this.setState({
        [prefix]: {
          ...this.state[prefix],
          inputs: items.map(x =>
            x.name === name
              ? { ...x, value}
              : x)
        }
      })
    }
  }

  addField(prefix) {
    const { id } = this.state
    const items = this.state[prefix].inputs
    const props = this.props[prefix]
    const uniqueId = id + 1
    this.setState({
      id: uniqueId,
      [prefix]: {
        ...this.state[prefix],
        inputs: items.concat([{name: `${prefix}${uniqueId}`, ...props}])
      }
    })
  }

  removeField(name, prefix) {
    const items = this.state[prefix].inputs
    const nextState = items.filter(x => x.name !== name)
    this.setState({
      [prefix]: {
        ...this.state[prefix],
        inputs: nextState
      }
    })
  }

  render() {
    const { pathname } = this.props.location


    return (
      <div className={css.root}>
        <Match pattern='/scholarship-post' exactly render={props =>
          <Redirect to='/scholarship-post/general' />
        } />
        <div className={css.header}>Scholarship Application Post</div>
        <div className={css.breadcrumbs}>
          {routes.map(x =>
            <div
              className={pathname === x.pattern ? css.active : css.page}
              key={x.name}>{x.name}</div>
          )}
        </div>
        {routes.map(({ component:Component, pattern }) =>
          <Match
            key={pattern}
            pattern={pattern}
            render={props =>
              <Component
                {...props}
                {...this.state}
                onChange={this.onChange}
                onUpdate={this.onUpdate}
                onPhotoUpload={this.onPhotoUpload}
                onGroupChange={this.onGroupChange}
                addField={this.addField}
                onSubmit={this.onSubmit}
                removeField={this.removeField} />} />
        )}
      </div>
    )
  }
}

const routes = [
  {
    pattern: '/scholarship-post/general',
    component: ScholarshipPostGeneral,
    name: 'General Scholarship Details',
  },{
    pattern: '/scholarship-post/essay',
    component: ScholarshipPostEssay,
    name: 'Essay Requirements',
  },{
    pattern: '/scholarship-post/intention',
    component: ScholarshipPostIntention,
    name: 'Who is this scholarship intended for?',
  },{
    pattern: '/scholarship-post/requirements',
    component: ScholarshipPostRequirements,
    name: 'Supplemental Requirements',
  }
]

export default connect(
  state => ({
    ...state,
    removeNav: state.ui.removeNav,
  }),
  { updateApplication, updateUserInfo, onboardingRoute }
)(ScholarshipPost)
