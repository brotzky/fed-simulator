import React from "react"
import { toSlug } from "../../helpers/slugs"
import "./stylesheets/icon.scss"

export default class Icon extends React.Component {

  static propTypes = {
    onClick: React.PropTypes.func,
    name: React.PropTypes.string.isRequired,
    active: React.PropTypes.bool,
    image: React.PropTypes.string,
  }

  static defaultProps = {
    onClick: () => {},
    active: false,
    name: "",
  }

  render() {
    const slugName = toSlug(this.props.name)
    const active = this.props.active ? "active" : "inactive"
    return (
      <span onClick={() => this.props.onClick(this.props.name)}
        className={`icon icon-${slugName} ${active}`}
        title={name}>
        <If condition={this.props.image}>
          <img src={this.props.image}
            className="icon__image" />
        </If>
      </span>
    )
  }
}
