import React from "react"
import Icon from "../icon/icon"
import "./stylesheets/ppvs"

export default class PPVs extends React.Component {

  static propTypes = {
    onPPVClick: React.PropTypes.func,
    ppvs: React.PropTypes.array.isRequired,
  }

  static defaultProps = {
    onPPVClick: () => {},
  }

  displayName = "PPVs"

  render() {
    return (
      <div className="ppvs">
        <ul className="ppvs__list">
          {this.props.ppvs.map((ppv, key) => {
            return (
              <li key={key}
                onClick={this.props.onPPVClick.bind(this, ppv)}
                className="ppvs__item hvr-float-shadow">
                <Icon name={ppv.name} />
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}
