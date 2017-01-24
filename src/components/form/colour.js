import React from "react"
import Chrome from "react-color"

export default class ColourPicker extends React.Component {

  static propTypes = {
    changeHandler: React.PropTypes.func.isRequired,
    name: React.PropTypes.string.isRequired,
    defaultValue: React.PropTypes.any.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      value: props.defaultValue,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.defaultValue
    })
  }

  onChange = (colour) => {
    this.props.changeHandler(
      this.props.name,
      colour.hex,
    )
    this.setState({
      value: colour.hex,
    })
  }

  render() {
    const style = {
      backgroundColor: this.state.value,
      border: "0.1rem solid black"
    }
    return (
      <div className="row">
        <div className="col-xs-12">
          <label htmlFor={this.props.name}>
            {this.props.label}
          </label>
        </div>
        <div className="col-xs-11 col-sm-10 col-md-10 col-lg-10">
          <Chrome disableAlpha
            color={this.state.value}
            onChangeComplete={this.onChange}
          />
        </div>
        <div className="col-xs-1 col-sm-2 col-md-2 col-lg-2"
          style={style}>
        </div>
      </div>
    )
  }
}
