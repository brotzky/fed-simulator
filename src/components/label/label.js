import "./stylesheets/label.scss"
import React from "react"

export default class Label extends React.Component {

  static propTypes = {
    bgColour: React.PropTypes.string,
    modifier: React.PropTypes.string,
    name: React.PropTypes.string.isRequired,
    textColour: React.PropTypes.string,
  }

  static contextTypes = {
    toSlug: React.PropTypes.func.isRequired,
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
