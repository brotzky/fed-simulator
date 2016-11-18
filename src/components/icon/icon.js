import React from "react"
import { toSlug } from "../../helpers/slugs"
import "./stylesheets/icon.scss"

export default class Icon extends React.Component {

  static propTypes = {
    onClick: React.PropTypes.func,
    name: React.PropTypes.string.isRequired,
    active: React.PropTypes.bool,
  }

  static defaultProps = {
    onClick: () => {},
    active: false,
  }

  render() {
    const slugName = toSlug(this.props.name)
    return (
      <span
        onClick={this.props.onClick}
        className={`icon icon-${slugName} ${(this.props.active ? "active" : "inactive")}`}
        alt={name}
        title={name}>
      </span>
    )
  }
}
