import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ButtonFill } from '../IndividualScholarshipsBtns'
import * as Actions from 'api/actions'
import clamp from 'line-clamp'
import css from './style.css'

const CLAMPABLE_HEADER_ID = 'headerToClamp'

export class IndividualScholarshipsHeader extends Component {

  constructor(props) {
    super(props)
    this.toggleHeaderClamp = ::this.toggleHeaderClamp
    this.clampHeaderInDOM = ::this.clampHeaderInDOM

    this.state = {
      shouldClampHeader: true
    }
  }

  toggleHeaderClamp() {
    this.setState({
      shouldClampHeader: !this.state.shouldClampHeader
    })
  }

  readMoreLessHTML() {
    return `<a style="color: #599CD9; cursor: pointer;">Read ${this.state.shouldClampHeader ? 'More' : 'Less'}</a>`
  }

  /* Note on DIRECTLY CLAMPING THE DOM:
   * This is a little wonky because we set state here,
   * then expect an update directly to the DOM,
   * that is not reflected in React.
   *
   * We deal with this by expecting state: shouldClampHeader
   * to correlate exactly with the DOM state.
   *
   * Ideally, however, we would truncate ('clamp') the text in
   * the React, then preferentially render that based on state.
   *
   * Because this requires knowing line length dynamically
   * (see: [https://github.com/yuanqing/line-clamp/blob/master/src/index.js](line-clamp)),
   * we skip this for now.
   *
   * The key issue is that it is difficult to know the length
   * of the line in characters, which would allow us to truncate it.
   */
  clampHeaderInDOM(linesToClamp=4) {
    let textToClamp = document.getElementById(CLAMPABLE_HEADER_ID)
    clamp(textToClamp, {
      lineCount: linesToClamp,
      ellipsisCharacter: `... ${this.readMoreLessHTML()}`
    })
  }

  componentDidMount() {
    /* Default to clamped state */
    this.clampHeaderInDOM()
  }

  componentDidUpdate() {
    /* Clamp header in DOM if should be clamped */
    this.state.shouldClampHeader
      ?
        /* Clamp text */
        this.clampHeaderInDOM(4)
      :
        /* Clamp text to the maximum */
        ''
  }

  render() {
    const { scholarship } = this.props
    return (
      <div className={css.root}>
        <div className={css.header}>{scholarship.title}</div>
        {
          scholarship.organization && scholarship.organization.name
            ?
              <div className={css.subtitle}>
                Provided By: { scholarship.organization.name }
              </div>
            :
              ''
        }
        <div className={css.copy}>
          {
            /* Slightly unnecessary but we need this to rerender
             * in order to remove clamping.
             */
            this.state.shouldClampHeader
              ?
                <p id={CLAMPABLE_HEADER_ID}
                  onClick={() => this.toggleHeaderClamp()}
                  className={css.clampabletext}>
                   { scholarship.description }
                </p>
              :
                <div>
                  <p onClick={() => this.toggleHeaderClamp()}
                    className={css.clampabletext}>
                    { scholarship.description }
                  </p>
                </div>
          }
        </div>

        <div className={css.btns}>
          <ButtonFill
            className={css.btn}
            text='Save' />
        </div>
      </div>
    )
  }
}

export default connect(
  state => {
    return {
      scholarship: (state.app && state.app.scholarships['all'][0]) || {},
    }
  },
  Actions
)(IndividualScholarshipsHeader)
