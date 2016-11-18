import React from "react"
import Match from "../components/match/match"

class DraftPage extends React.Component {

  displayName="DraftPage"

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
