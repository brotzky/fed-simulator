import React from "react"
import { Link } from "react-router"
import PropTypes from "prop-types"

import HeaderOne from "../../components/h1/h1"

import "../stylesheets/welcome.scss"

const noop = () => {}

const WelcomePage = ({ generateFederation = noop, }) => {
  return (
    <section className="page welcome">
      <HeaderOne>Welcome to Fed Simulator</HeaderOne>
      <div className="row">
        <div className="col-xs-12 highlight pulse">
          <div className="box">
            <Link to="/name">
              I'll build this company from the ground up, dammit!
            </Link>
          </div>
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-xs-12 highlight pulse">
          <div className="box" onClick={generateFederation}>
            This is an invasion, I bought the company
          </div>
        </div>
      </div>
    </section>
  )
}

WelcomePage.propTypes = {
  generateFederation: PropTypes.func.isRequired,
}

export default WelcomePage
