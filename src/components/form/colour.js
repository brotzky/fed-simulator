import React from "react"
import Chrome from "react-color"

export default class ColourPicker extends React.Component {

  static propTypes = {
    changeHandler: React.PropTypes.func.isRequired,
    name: React.PropTypes.string.isRequired,
    defaultValue: React.PropTypes.any.isRequired,
  }

  onChange = (colour) => this.props.changeHandler(this.props.name, colour.hex)

  render() {
    return (
      <div>
        <If condition={this.props.defaultValue}>
          <Chrome
            disableAlpha
            color={this.props.defaultValue}
            onChangeComplete={this.onChange}
          />
        </If>
      </div>
    )
  }
}
