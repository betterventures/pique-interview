import React, { Component } from 'react'
import StarFill from 'components/Icons/StarFill'
import StarNoFill from 'components/Icons/StarNoFill'
import css from './style.css'

export class ApplicantRating extends Component {
  constructor(props) {
    super(props)
    this.state = {rating: 0, saved: 0}
    this.onMouseOver = ::this.onMouseOver
    this.onMouseOut = ::this.onMouseOut
    this.onClick = ::this.onClick
  }

  static defaultProps = {
    ratingValues: [1,2,3,4,5]
  }

  onMouseOut() {
    this.setState({rating: this.state.saved})
  }

  onMouseOver(num) {
    return _ => this.setState({rating: num})
  }

  onClick(num) {
    return _ => this.setState({saved: num})
  }

  render() {
    const { rating } = this.state
    const { ratingValues } = this.props
    return (
      <div
        className={css.root}
        onMouseOut={this.onMouseOut}>
        {ratingValues.map(x =>
          <div
            key={x}
            className={css.target}
            onClick={this.onClick(x)}
            onMouseOver={this.onMouseOver(x)}>
            {rating >= x
              ? <StarFill className={css.star} />
              : <StarNoFill className={css.star} />
            }
          </div>
        )}
      </div>
    )
  }
}

export default ApplicantRating