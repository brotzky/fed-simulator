import React from "react"
import PropTypes from "prop-types"
import { GithubPicker } from "react-color"
import Colors from "./colors"

export default class ColorPalette extends React.Component {

  static propTypes = {
    changeHandler: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    defaultValue: PropTypes.string,
    showPreview: PropTypes.bool,
  }

  constructor(props) {
    super(props)

    this.state = {
      value: props.defaultValue,
    }
  }

  static defaultProps = {
    defaultValue: "#000000",
    showPreview: true,
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
      border: ".1rem solid black",
    }
    return (
      <div className="row">
        <div className="col-xs-12">
          <label htmlFor={this.props.name}>
            {this.props.label}
          </label>
        </div>
        <div className="col-xs-11 col-sm-10 col-md-10 col-lg-10">
          <GithubPicker onChange={this.onChange}
            color={this.state.value}
            colors={Colors} />
        </div>
        <If condition={this.props.showPreview}>
          <div className="col-xs-1 col-sm-2 col-md-2 col-lg-2"
            style={style}>
          </div>
        </If>
      </div>
    )
  }
}
