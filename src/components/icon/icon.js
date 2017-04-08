import React from "react"
import PropTypes from "prop-types"
import { toSlug } from "../../helpers/slugs"
import "./stylesheets/icon.scss"

export default class Icon extends React.Component {

  static propTypes = {
    onClick: PropTypes.func,
    name: PropTypes.string.isRequired,
    active: PropTypes.bool,
    image: PropTypes.string,
  }

  static defaultProps = {
    onClick: () => {},
    active: false,
    name: "",
  }

  shouldComponentUpdate(nextProps) {
    return this.props.name !== nextProps.name
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
