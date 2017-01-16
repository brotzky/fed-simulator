import React from "react"
import "./stylesheets/ppvs"
const getRandomHex = () => '#'+('00000'+(Math.random()*(1<<24)|0).toString(16)).slice(-6)

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
            const style = {
              color: getRandomHex(),
            }
            return (
              <li key={key}
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
