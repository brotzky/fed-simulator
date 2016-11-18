import React from "react"
import Match from "../components/match/match"
import Helmet from "react-helmet"

export default class MatchPage extends React.Component {

  displayName="MatchPage"

  render() {
    return (
      <div>
        <Helmet title="Match Simulator" />
        <Match />
      </div>
    )
  }
}
