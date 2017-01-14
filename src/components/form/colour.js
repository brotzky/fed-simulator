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
    console.log(this.state)
    return (
      <div>
        <Chrome disableAlpha
          color={this.state.value}
          onChangeComplete={this.onChange}
        />
      </div>
    )
  }
}
