import React, { Component } from 'react'
import { ButtonFill, ButtonNoFill } from '../../IndividualScholarshipsBtns'
import css from './style.css'

export class IndividualScholarshipsOverview extends Component {
  constructor(props) {
    super(props)
  }

  static defaultProps = {
    copy1: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam suscipit mi nec sapien ullamcorper porttitor. Phasellus sed placerat orci. `,
    copy2: `Morbi euismod eros eu dui congue, eu bibendum lectus blandit. Praesent condimentum id tortor pharetra gravida. Etiam sit amet lectus ante. Aliquam non volutpat lacus, sit amet accumsan purus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Cras et molestie metus. Praesent ligula sem, scelerisque vulputate lacus et, fringilla posuere ante.`,
  }

  render() {
    const { copy1, copy2 } = this.props
    return (
      <div className={css.root}>
        <div className={css.copy}>
          <div className={css.text}>{copy1}</div>
          <div className={css.text}>{copy2}</div>
        </div>

        <div className={css.btns}>
          <ButtonNoFill
            className={css.btn}
            text='Save' />
          <ButtonFill
            className={css.btn}
            text='Apply Now' />
        </div>
      </div>
    )
  }
}

export default IndividualScholarshipsOverview
