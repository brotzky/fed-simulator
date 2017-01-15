import * as settingsAction from "../../actions/wrestlers"
import React from "react"
import { connect } from "react-redux"

class Resets extends React.Component {

  displayName = "Resets"

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    brands: React.PropTypes.array.isRequired,
    championships: React.PropTypes.array.isRequired,
    wrestlers: React.PropTypes.array.isRequired,
    shows: React.PropTypes.array.isRequired,
    ppvs: React.PropTypes.array.isRequired,
  }

  onReset = () => {
    if (confirm("Are you really sure you want to reset everything?")) {
      this.props.dispatch(
        settingsAction.reset()
      )
    }
  }

  render() {
    const allowed = [
      "shows",
      "ppvs",
      "wrestlers",
      "brands",
      "championships",
    ]
    const filtered = Object.keys(this.props)
      .filter(key => allowed.includes(key))
      .reduce((newProps, key) => {
        newProps[key] = this.props[key]
        return newProps
      }, {})
    return (
      <div className="navigation navigation--secondary">
        <ul className="navigation__list">
          <li className="navigation__item">
            <a onKeyPress={this.onReset}
              onClick={this.onReset}>
              Reset <strong>everything</strong>
            </a>
          </li>
          <li className="navigation__item">
            <a download={`fed-simulator.${Date().toLocaleString()}.json`}
              href={`data:text/jsoncharset=utf-8,${encodeURIComponent(JSON.stringify(filtered))}`}>
              Download an export
            </a>
          </li>
        </ul>
      </div>
    )
  }
}


export default connect(state => ({
  brands: state.brands,
  championships: state.championships,
  wrestlers: state.wrestlers,
  shows: state.shows,
  ppvs: state.ppvs,
}))(Resets)
