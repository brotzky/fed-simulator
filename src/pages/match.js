import React from "react"
import Match from "../components/match/match"
import Helmet from "react-helmet"
import * as matchActions from "../actions/match"
import { connect } from "react-redux"

export default class MatchPage extends React.Component {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
  }

  displayName = "MatchPage"

  onClearSelection = (event) => {
    event.preventDefault()
    this.props.dispatch(
      matchActions.clearSelectedWrestlers()
    )
  }

  render() {
    return (
      <div>
        <Helmet title="Match Simulator" />
        <ul className="nav nav-pills" role="tablist">
          <li>
            <a
              href="#"
              onKeyPress={this.onClearSelection}
              onClick={this.onClearSelection}>
              Clear selected wrestlers
            </a>
          </li>
        </ul>
        <hr />
        <Match />
      </div>
    )
  }
}
