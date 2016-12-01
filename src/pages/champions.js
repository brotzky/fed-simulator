import React from "react"
import Championships from "../components/championships/championships"
import Helmet from "react-helmet"
import { connect } from "react-redux"

export default class ChampionsPage extends React.Component {

  displayName = "ChampionsPage"

  render() {
    return (
      <div>
        <Helmet title="Championship Management" />
        <Championships />
      </div>
    )
  }
}
