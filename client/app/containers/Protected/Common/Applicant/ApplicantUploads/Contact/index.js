import React from 'react'
import { connect } from 'react-redux'
import css from './style.css'

function capitalize(word) {
  if (typeof word !== "string" || word.length < 0) {
    return word
  }

  return word.charAt(0).toUpperCase() + word.substring(1)
}

function capitalizeEmail(email) {
  if (typeof email !== "string" || email.length < 0) {
    return email
  }

  let [ address, host ] = email.split('@')
  let capitalizedAddress = address.split('.').map(word => capitalize(word)).join('.')
  return capitalizedAddress + '@' + host
}

export const ApplicantContact = ({ email, phone, street, city, state, parent_or_guardian_relationships, counselor_relationships, school }) => {
  let parentOrGuardianRelationships = parent_or_guardian_relationships.map(rel => JSON.parse(rel))
  let counselorRelationships = counselor_relationships.map(rel => JSON.parse(rel))

  return (
    <div className={css.root}>
      <div className={css.header}>Application Documents</div>
      <div className={css.box}>

        <div className={css.section}>
          <div className={css.title}>
            <img className={css.icon} src="" />
            <span className={css.text}>Applicant's Contact Info</span>
          </div>
          <div className={css.flexrow}>
            <div className={css.flexitem}>
              <span className={css.icon}>
                A
              </span>
              <span className={css.lineitem}>
                { capitalizeEmail(email) }
              </span>
            </div>
            <div className={css.flexitem}>
              <span className={css.icon}>
                B
              </span>
              <span className={css.lineitem}>
                { phone }
              </span>
            </div>
            <div className={css.flexitem}>
              <span className={css.icon}>
                C
              </span>
              <span className={css.lineitem}>
                { street }
              </span>
            </div>
          </div>

        </div>

        <div className={css.section}>
          <div className={css.title}>
            <img className={css.icon} src="" />
            <span className={css.text}>Parent(s)'/Guardian's Contact Info</span>
          </div>
          <div className={css.flexcolwrapper}>
            {
              parentOrGuardianRelationships.map((rel, i) =>
                <div className={css.flexcol} key={i}>
                  <div className={css.flexitem}>
                    <span className={css.icon}>
                      { rel.id }
                    </span>
                    <span className={css.lineitem}>
                      { rel.parent_or_guardian && (rel.parent_or_guardian.first_name + ' ' + rel.parent_or_guardian.last_name) }
                    </span>
                  </div>
                  <div className={css.flexitem}>
                    <span className={css.icon}>
                      { rel.id }
                    </span>
                    <span className={css.lineitem}>
                      { capitalize(rel.relationship_type) }
                    </span>
                  </div>
                  <div className={css.flexitem}>
                    <span className={css.icon}>
                      { rel.id }
                    </span>
                    <span className={css.lineitem}>
                      { rel.parent_or_guardian && rel.parent_or_guardian.phone }
                    </span>
                  </div>
                  <div className={css.flexitem}>
                    <span className={css.icon}>
                      { rel.id }
                    </span>
                    <span className={css.lineitem}>
                      { capitalizeEmail(rel.parent_or_guardian && rel.parent_or_guardian.email) }
                    </span>
                  </div>
                </div>
              )
            }
          </div>
        </div>

        <div className={css.section}>
          <div className={css.title}>
            <img className={css.icon} src="" />
            <span className={css.text}>High School Contact Info</span>
          </div>
          <div className={css.flexcolwrapper}>
            { school
                ?
                  <div className={css.flexcol}>
                    <div className={css.flexitem}>
                      <span className={css.icon}>
                        { school.id }
                      </span>
                      <span className={css.lineitem}>
                        { school.name }
                      </span>
                    </div>
                    <div className={css.flexitem}>
                      <span className={css.icon}>
                        { school.id }
                      </span>
                      <span className={css.lineitem}>
                        { school.phone }
                      </span>
                    </div>
                    <div className={css.flexitem}>
                      <span className={css.icon}>
                        { school.id }
                      </span>
                      <span className={css.lineitem}>
                        { school.fax }
                      </span>
                    </div>
                  </div>
                :
                  <div className={css.flexcol}>
                    <div className={css.flexitem}>
                      <span className={css.lineitem}>
                        No school info provided!
                      </span>
                    </div>
                  </div>
            }
            {
              counselorRelationships.map((rel, i) =>
                <div className={css.flexcol} key={i}>
                  <div className={css.flexitem}>
                    <span className={css.icon}>
                      { rel.id }
                    </span>
                    <span className={css.lineitem}>
                      { rel.counselor && (rel.counselor.first_name + ' ' + rel.counselor.last_name) }
                    </span>
                  </div>
                  <div className={css.flexitem}>
                    <span className={css.icon}>
                      { rel.id }
                    </span>
                    <span className={css.lineitem}>
                      { capitalize(rel.relationship_type) }
                    </span>
                  </div>
                  <div className={css.flexitem}>
                    <span className={css.icon}>
                      { rel.id }
                    </span>
                    <span className={css.lineitem}>
                      { capitalizeEmail(rel.counselor && rel.counselor.email) }
                    </span>
                  </div>
                </div>
              )
            }
          </div>
        </div>

      </div>

    </div>
  )
}

export default connect(
  state => {
    return {
      scholarship: (state.app && state.app.scholarships['all'][0]) || {},
      user: state.user,
    }
  }
)(ApplicantContact)
