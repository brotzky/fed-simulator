import React from "react"
import "./stylesheets/label.scss"

export default class Label extends React.Component {

  static propTypes = {
    modifier: React.PropTypes.string,
    name: React.PropTypes.string.isRequired,
  }

  static contextTypes = {
    toSlug: React.PropTypes.func.isRequired,
  }

  render() {
    return (
      <span className={`label label-${this.context.toSlug(this.props.modifier)}`}>
        {this.props.name}
      </span>
    )
  }
}
