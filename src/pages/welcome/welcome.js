import React from "react"
import { Link } from "react-router"
import PropTypes from "prop-types"

import HeaderOne from "../../components/h1/h1"
import { Icon } from "../../components/icons"

import "./welcome.scss"

const NOOP = () => {}

const WelcomePage = ({ generateFederation = NOOP, }) => {
  return (
    <section className="page welcome">
      <HeaderOne>Welcome to Federation Simulator</HeaderOne>
      <div className="row">
        <div className="col-xs-12 highlight shrink">
          <div className="box">
            <Icon icon="plus" />{" "}
            <Link tabIndex="0" to="/name">
              I'll build this company from the ground up, dammit
            </Link>
          </div>
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-xs-12 highlight shrink">
          <div className="box" tabIndex="0" onClick={generateFederation}>
            <Icon icon="play" /> This is an invasion, create everything for me
          </div>
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-xs-12 highlight shrink">
          <div className="box">
            <Icon icon="info-circle" />
            <ul tabIndex="0">
              <li tabIndex="0">Create and manage your roster</li>
              <li tabIndex="0">Manage your own touring schedule</li>
              <li tabIndex="0">Simulate random or created matches</li>
            </ul>
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
