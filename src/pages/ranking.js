import React from "react"
import Match from "../components/match/match"
import Helmet from "react-helmet"
import { connect } from "react-redux"
import "./stylesheets/match"

export default class RankingPage extends React.Component {

  displayName = "RankingPage"

  render() {
    return (
      <div className="page match">
        <Helmet title="Universe Ranking" />
        <Match />
      </div>
    )
  }
}
