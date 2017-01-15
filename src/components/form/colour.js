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
        <div className="col-xs-8">
          <Chrome disableAlpha
            color={this.state.value}
            onChangeComplete={this.onChange}
          />
        </div>
        <div className="col-xs-4"
          style={style}>
        </div>
      </div>
    )
  }
}
