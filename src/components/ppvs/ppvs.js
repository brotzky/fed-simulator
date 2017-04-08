import React from "react"
import PropTypes from "prop-types"
import "./stylesheets/ppvs.scss"
const getRandomHex = () => '#'+('00000'+(Math.random()*(1<<24)|0).toString(16)).slice(-6)

export default class PPVs extends React.Component {

  static propTypes = {
    onPPVClick: PropTypes.func,
    ppvs: PropTypes.array.isRequired,
  }

  static defaultProps = {
    onPPVClick: () => {},
  }

  displayName = "PPVs"

  render() {
    return (
      <div className="ppvs">
        <ul className="ppvs__list">
          {this.props.ppvs.map((ppv) => {
            const style = {
              color: getRandomHex(),
            }
            return (
              <li key={ppv.id}
                style={style}
                onClick={this.props.onPPVClick.bind(this, ppv)}
                className="ppvs__item hvr-float-shadow">
                {ppv.name}
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}
