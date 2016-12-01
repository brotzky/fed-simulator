import React from "react"
import { connect } from "react-redux"
import { toSlug } from "../../helpers/slugs"
import "./stylesheets/main"

class Championships extends React.Component {

  static propTypes = {
    championships: React.PropTypes.array.isRequired,
  }

  displayName = "Championships"

  render() {
    return (
      <div className="championships text-center">
        <div className="championships__championship">
          {this.props.championships.map((championship, key) => {
            return (
              <span
                key={key}
                title={championship.name}
                className={`icon-${toSlug(championship.name)}`}>
              </span>
            )
          })}
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  championships: state.championships,
}))(Championships)
