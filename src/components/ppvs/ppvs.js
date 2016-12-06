import React from "react"
import Icon from "../icon/icon"
import { toSlug } from "../../helpers/slugs"
import "./stylesheets/main"

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
                className="ppvs_item">
                <Icon name={ppv.name} />
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}
