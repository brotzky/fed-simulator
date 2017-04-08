import React from "react"
import PropTypes from "prop-types"
import Dropzone from "react-dropzone"
import "./stylesheets/image.scss"

export default class Input extends React.Component {

  static propTypes = {
    changeHandler: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    maxImageWidth: PropTypes.number.isRequired,
    maxImageHeight: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    defaultValue: PropTypes.any.isRequired,
  }

  static defaultProps = {
    maxImageHeight: 250,
    maxImageWidth: 100,
  }

  constructor(props) {
    super(props)

    this.state = {
      value: props.defaultValue,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.defaultValue,
    })
  }

  getBase64 = (file) => {
    const reader = new FileReader()
    reader.onload = (evt) => {
       this.setState({
         value: evt.target.result,
       })
       this.props.changeHandler(
         this.props.name,
         evt.target.result,
       )
    }
    reader.readAsDataURL(file)
  }

  onDrop = (files) => {
    this.getBase64(files[0])
  }

  onClear = (event) => {
    event.preventDefault

    this.setState({
      value: "",
    })
  }

  render() {
    return (
      <div className="formImage">
        <div className="row">
          <div className="col-xs-12">
            <label htmlFor={this.props.name}>
              {this.props.label} (
                <a onClick={this.onClear}>Clear</a>
              )
            </label>
          </div>
          <div className="col-xs-12">
            <Dropzone multiple={false}
              accept={"image/*"}
              onDrop={this.onDrop}
              style={{}}>
              <div className="row formImage__droparea">
                <h3>Drop An Image Here</h3>
                <img className="formImage__src"
                  src={this.state.value} />
              </div>
            </Dropzone>
          </div>
        </div>
      </div>
    )
  }
}
