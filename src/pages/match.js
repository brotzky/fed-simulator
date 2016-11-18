import React from "react"
import Match from "../components/match/match"
import { connect } from "react-redux"

class MatchPage extends React.Component {

  displayName="MatchPage"

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
  }

  render() {
    return (
      <div>
        <Match />
      </div>
    )
  }
}

export default connect(state => ({}))(MatchPage)
