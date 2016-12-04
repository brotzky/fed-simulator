import React from "react"
import { Link } from "react-router"
import Helmet from "react-helmet"

export default class LandingPage extends React.Component {

  displayName = "LandingPage"

  render() {
    return (
      <div className="page landing">
        <Helmet title="Welcome to WWE Universe SIM" />
        <div className="row">
          <div className="col-xs-12">
            <h2>Welcome to the WWE Universe SIM</h2>
          </div>
        </div>
      </div>
    )
  }
}
