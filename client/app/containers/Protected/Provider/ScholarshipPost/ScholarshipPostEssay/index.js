import React, { Component } from 'react'
import { connect } from 'react-redux'
import ScholarshipPostBtns from '../ScholarshipPostBtns'
import { updateApplication } from 'api/actions'
import css from './style.css'

export class ScholarshipPostEssay extends Component {
  constructor(props) {
    super(props)
    this.onChange = ::this.onChange
    this.createEssay = ::this.createEssay
    this.removePrompt = ::this.removePrompt
    this.addPrompt = ::this.addPrompt
  }

  static defaultProps = {
    essay: {prompts: [], value: ''},
    prompt: {value: ''}
  }

  state = {
    essays: [],
    id: 0,
  }

  componentDidMount() {
    this.createEssay()
  }

  createEssay() {
    const { essays, id } = this.state
    const uniqueId = id + 1
    this.setState({
      id: uniqueId,
      essays: essays.concat([{
        name: `essays${uniqueId}`,
        inputs: [{name: `prompt${uniqueId}`, value: ''}]
      }])
    })
  }

  addPrompt(name) {
    const { essays, id } = this.state
    const uniqueId = id + 1
    this.setState({
      id: uniqueId,
      essays: essays.map(x => x.name === name
        ? {...x, inputs: x.inputs.concat([{name: `prompt${uniqueId}`, value: ''}])}
        : x)
    })
  }

  removePrompt(name) {
    const { essays } = this.state
    this.setState({
      essays: essays.map(x => ({
        ...x,
        inputs: x.inputs.filter(y => y.name !== name)
      }))
    })
  }

  onChange(e) {
    const { essays } = this.state
    const { selectedIndex } = e.target.options
    const requestedVal = selectedIndex + 1
    const currentVal = essays.length

    if (requestedVal === currentVal) {
      return
    } else if (requestedVal > currentVal) {
      Array.from({length: requestedVal - currentVal}).map(this.createEssay)
    } else if (requestedVal < currentVal) {
      this.setState({
        essays: essays.filter((_, i) => i + 1 <= requestedVal)
      })
    }
  }

  render() {
    const { essays } = this.state
    const { onChange } = this.props
    return (
      <div className={css.form}>
        <div className={css.title}>Essay Requirements</div>
        <div className={css.fields}>

          <div className={css.row}>
            <div className={css.label}>Number of Essays</div>
            <div className={css.field}>
              <select
                name="essays"
                onChange={this.onChange}
                className={css.sm}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
            </div>
          </div>

          {essays.map((x, i) =>
            <div key={x.name}>
              {x.inputs.map((y, j) =>
                <div key={y.name}>
                  <div className={css.prompt}>
                    {j > 0
                      ? <div className={css.label} />
                      : <div className={css.req}>{`Essay #${i + 1} Prompt`}</div>}
                    <div className={css.field}>
                      <textarea
                        name={y.name}
                        onChange={onChange}
                        className={css.tall}
                        rows="4"
                        placeholder={`Enter your scholarship's essay #${i + 1} prompt here`}
                        type="text" />
                    </div>
                  </div>
                  {j > 0
                    ? <div className={css.row}>
                        <div className={css.label} />
                        <div className={css.field}>
                          <div
                            onClick={_ => this.removePrompt(y.name)}
                            className={css.link}>Delete</div>
                        </div>
                      </div>
                    : null}
                </div>
              )}

              <div className={css.row}>
                <div className={css.label} />
                <div className={css.field}>
                  <div
                    onClick={_ => this.addPrompt(x.name)}
                    className={css.link}>
                    {`Add Another Prompt for Essay #${i + 1}`}
                  </div>
                </div>
              </div>

              <div className={css.row}>
                <div className={css.req}>{`Essay #${i + 1} Word Limit`}</div>
                <div className={css.field}>
                  <input
                    name="essayWordLimit"
                    onChange={onChange}
                    className={css.sm}
                    placeholder="e.g. 100"
                    type="text"/>
                  <div className={css.comment}>
                    Keep in mind that ~250 words is equivalent to  one typed page, double spaced
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <ScholarshipPostBtns
          back='/scholarship-post/general'
          next='/scholarship-post/intention' />
      </div>
    )
  }
}

const AdditionalEssays = ({ onChange, onClick, name, num }) => (
  <div>
    <div className={css.row}>
      <div className={css.req}>{`Essay #${num} Prompt`}</div>
      <div className={css.field}>
        <textarea
          name={name}
          onChange={onChange}
          className={css.tall}
          rows="4"
          placeholder={`Enter your scholarship's essay #${num} prompt here`}
          type="text" />
      </div>
    </div>
    <div className={css.row}>
      <div className={css.label} />
      <div className={css.field}>
        <div className={css.link}>
          {`Add Another Prompt or Essay #${num}`}
        </div>
      </div>
    </div>


  </div>
)

export default connect(
  state => ({
    ...state
  }),
  { updateApplication }
)(ScholarshipPostEssay)