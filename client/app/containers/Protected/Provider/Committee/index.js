import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from 'components/Button'
import { inviteProvider } from 'api/actions'
import img from './901-av.png'
import css from './style.css'

export class Committee extends Component {
  constructor(props) {
    super(props)
    this.inviteProvider = ::this.inviteProvider
    this.setInviteeEmail = ::this.setInviteeEmail
    this.setInviteeFirstName = ::this.setInviteeFirstName
    this.setInviteeLastName = ::this.setInviteeLastName
    this.state = {
      inviteeFirstName: '',
      inviteeLastName: '',
      inviteeEmail: '',
    }
  }

  inviteProvider(email, firstName, lastName, orgId) {
    // for now, Reviewers are Providers
    // (this may change into an admin/user relationship in the future)
    return this.props.inviteProvider({
      email: email,
      first_name: firstName,
      last_name: lastName,
      role: 'provider',
      admin: false,
      reviewer: true,
      organization_id: orgId,
    })
  }

  setInviteeEmail(e) {
    this.setState({
      inviteeEmail: e.target.value
    })
  }

  setInviteeFirstName(e) {
    this.setState({
      inviteeFirstName: e.target.value
    })
  }

  setInviteeLastName(e) {
    this.setState({
      inviteeLastName: e.target.value
    })
  }

  render() {
    const scholarship = this.props.scholarship
    const currentOrgId = scholarship && scholarship.organization_id

    return (
      <div className={css.root}>
        <div className={css.inner}>
          <div className={css.header}>
            Scholarship Selection Committee
          </div>
          <div className={css.divider} />

          <div className={css.row}>
            <div className={css.comment}>
              Add a New Reviewer to Your Selection Committee
            </div>
          </div>
          <div className={css.borderrow}>
            <div className={css.innerrow}>
              <input className={css.sminput}
                type="text"
                placeholder="Email Address"
                onChange={this.setInviteeEmail}
                value={this.state.inviteeEmail}
              />
              <input className={css.sminput}
                type="text"
                placeholder="First Name"
                onChange={this.setInviteeFirstName}
                value={this.state.inviteeFirstName}
              />
              <input className={css.sminput}
                type="text"
                placeholder="Last Name"
                onChange={this.setInviteeLastName}
                value={this.state.inviteeLastName}
              />
              <Button
                className={css.btn}
                onClick={() => this.inviteProvider(
                  this.state.inviteeEmail,
                  this.state.inviteeFirstName,
                  this.state.inviteeLastName,
                  currentOrgId,
                )}
              >
                Send Invite!
              </Button>
            </div>
          </div>

          <div className={css.row}>
            <div className={css.comment}>
              Current Selection Committee
            </div>
          </div>
          <ul className={css.ul}>
            {
              scholarship.accepted_reviewers.length > 0
                ?
                  scholarship.accepted_reviewers.map((x, i) =>
                    <li key={i} className={css.li}>
                      <div className={css.imgwrapper}>
                        <img className={css.img} src={x.photo_url} />
                      </div>
                      <div className={css.details}>
                        <div className={css.name}>{x.name}</div>
                        <div className={css.info}>{x.job_title || 'No Position Specified'}</div>
                        <div className={css.info}>{x.employer_name || 'No Employer Specified' }</div>
                        <div className={css.remove}>Remove Reviewer</div>
                      </div>
                    </li>
                  )
                :
                  ''
              }
              {
                team.map((x, i) =>
                  <li key={i} className={css.li}>
                    <div className={css.imgwrapper}>
                      <img className={css.img} src={x.img} />
                    </div>
                    <div className={css.details}>
                      <div className={css.name}>{x.name}</div>
                      <div className={css.info}>{x.position}</div>
                      <div className={css.info}>{x.company}</div>
                      <div className={css.remove}>Remove Reviewer</div>
                    </div>
                  </li>
                )
            }
          </ul>
        </div>
      </div>
    )
  }
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

export default connect(
  state => ({
    scholarship: state.app.scholarships.all[0],
  }),
  { inviteProvider }
)(Committee)
