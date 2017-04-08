import "./stylesheets/label.scss"
import React from "react"
import PropTypes from "prop-types"

export default class Label extends React.Component {

  static propTypes = {
    bgColour: PropTypes.string,
    name: PropTypes.string.isRequired,
    textColour: PropTypes.string,
  }

  static contextTypes = {
    toSlug: PropTypes.func.isRequired,
  }

  shouldComponentUpdate(nextProps) {
    return this.props.name !== nextProps.name
      || this.props.bgColour !== nextProps.bgColour
      || this.props.textColour !== nextProps.textColour
  }

  render() {
    const style = this.props.bgColour !== "" ?
      {
        backgroundColor: this.props.bgColour,
        color: this.props.textColour,
      }
      : {}
    return (
      <span style={style}
        className="label">
        {this.props.name}
      </span>
    )
  }
}
