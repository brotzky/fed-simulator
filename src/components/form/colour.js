import React from "react"
import PropTypes from "prop-types"
import Chrome from "react-color"

export default class ColourPicker extends React.Component {

  static propTypes = {
    changeHandler: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    defaultValue: PropTypes.any.isRequired,
    showPreview: PropTypes.bool,
  }

  static defaultProps = {
    changeHandler: () => {},
    name: "",
    defaultValue: "",
    showPreview: true,
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
      <div className="row color">
        <div className="col-xs-12">
          <label htmlFor={this.props.name}>
            {this.props.label}
          </label>
        </div>
        <div className="col-xs-11 col-sm-10 col-md-10 col-lg-10 color__chrome">
          <Chrome disableAlpha
            color={this.state.value}
            onChangeComplete={this.onChange}
          />
        </div>
        <If condition={this.props.showPreview}>
          <div className="col-xs-1 col-sm-2 col-md-2 col-lg-2 color__preview"
            style={style}>
          </div>
        </If>
      </div>
    )
  }
}
