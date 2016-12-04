import React from "react"
import Match from "../components/match/match"
import Helmet from "react-helmet"
import * as matchActions from "../actions/match"
import { connect } from "react-redux"
import "./stylesheets/match"

class MatchPage extends React.Component {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
  }

  displayName = "MatchPage"

  onReset = (event) => {
    event.preventDefault()
    this.props.dispatch(
      matchActions.clearSelectedWrestlers()
    )
  }

  render() {
    return (
      <div className="page match">
        <Helmet title="Match Simulator" />
        <div className="navigation navigation--secondary">
          <div className="navigation__item">
            <a
              href="#"
              onKeyPress={this.onReset}
              onClick={this.onReset}>
              Clear selected wrestlers
            </a>
          </div>
        </div>
        <Match />
      </div>
    )
  }
}

export default connect(state => ({}))(MatchPage)
