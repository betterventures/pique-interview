import React, { Component } from 'react'
import filepicker from 'filepicker-js'

export class FilePicker extends Component {
  constructor(props) {
    super(props)
    this.launchFilePicker = ::this.launchFilePicker
  }

  componentDidMount() {
    filepicker.setKey('Aw4WfTTq8QxmplkGIzrYgz')
  }

  launchFilePicker() {
    const { onSuccess } = this.props
    const options = {
      container: 'modal',
      mimetype: 'image/*',
      backgroundUpload: true,
      imageDim: [450,450],
      cropDim: [400,400],
      cropRatio: [1/1],
      cropForce: true
    }
    filepicker.pick(
      options,
      onSuccess,
      e => console.error(`Error: ${e.toString()}`)
    )
  }

  render() {
    const { className } = this.props
    return (
      <button
        className={className}
        onClick={this.launchFilePicker}>Choose file</button>
    )
  }
}

export default FilePicker
