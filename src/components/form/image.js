import React from "react"
import Dropzone from "react-dropzone"

export default class Input extends React.Component {

  static propTypes = {
    changeHandler: React.PropTypes.func.isRequired,
    name: React.PropTypes.string.isRequired,
    maxImageWidth: React.PropTypes.number.isRequired,
    maxImageHeight: React.PropTypes.number.isRequired,
    label: React.PropTypes.string.isRequired,
    defaultValue: React.PropTypes.any.isRequired,
  }

  static defaultProps = {
    maxImageHeight: 200,
    maxImageWidth: 200,
  }

  constructor(props) {
    super(props)

    this.state = {
      value: props.defaultValue,
    }
  }

  getBase64 = (file) => {
    const reader = new FileReader()
    reader.onload = (evt) => {
       this.setState({
         value: evt.target.result,
       })
    }
    reader.readAsDataURL(file)
  }

  onChange = (event) => {
    this.props.changeHandler(
      this.props.name,
      event.target.value,
    )
    this.setState({
      value: event.target.value,
    })
  }

  onDrop = (files) => {
    this.getBase64(files[0])
  }

  render() {
    return (
      <div>
        <label htmlFor={this.props.name}>
          {this.props.label}
        </label>
        <Dropzone multiple={false}
          accept={"image/*"}
          onDrop={this.onDrop}>
          <div className="droparea">
            <h3>Drop An Image Here</h3>
            <img src={this.state.value} />
          </div>
        </Dropzone>
        <div>

        </div>
      </div>
    )
  }
}
