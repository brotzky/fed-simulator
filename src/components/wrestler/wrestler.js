import "./stylesheets/wrestler.scss"
import classNames from "classnames"
import React from "react"
const noop = () => {}

export default class Wrestler extends React.PureComponent {

  static defaultProps = {
    id: "",
    name: "",
    animate: true,
    onWrestlerClick: noop,
  }

  shouldComponentUpdate(nextProps) {
    return this.props.name !== nextProps.name
  }

  render() {
    const classes = classNames(
      "wrestler shadow-2",
      {
        "hvr-buzz": this.props.animate,
      },
    )
    return (
      <div className={classes}
        onClick={ () => this.props.onWrestlerClick(this.props.id) }
        data-id={this.props.id}>
        {this.props.name}
      </div>
    )
  }
}
