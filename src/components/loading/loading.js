import React, { Component } from "react"
import './stylesheets/loading'

export default class Head extends Component {

  displayName = "Loading"

  render() {
    return (
      <div className="loading text-center">
          <div className="loading__line"></div>
          <div className="loading__line"></div>
          <div className="loading__line"></div>
      </div>
    )
  }
}
