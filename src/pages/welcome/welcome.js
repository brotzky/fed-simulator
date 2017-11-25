import React from "react"
import { Link } from "react-router"
import PropTypes from "prop-types"

import HeaderOne from "../../components/header/header"
import { Icon } from "../../components/icons"

import "./welcome.scss"

const NOOP = () => {}

const WelcomePage = ({ generateFederation = NOOP, }) => (
  <section className="page welcome">
    <HeaderOne>Welcome to Federation Simulator</HeaderOne>
    <div className="row">
      <div className="col-xs-12 highlight">
        <Link tabIndex="0" to="/name">
          <div className="box">
            <Icon icon="plus" /> I'll build this company from the ground up, dammit
          </div>
        </Link>
      </div>
    </div>
    <br />
    <div className="row">
      <div className="col-xs-12 highlight" onClick={generateFederation}>
        <div className="box" tabIndex="0">
          <Icon icon="play" /> This is an invasion, create everything for me
        </div>
      </div>
    </div>
    <br />
    <div className="row">
      <div className="col-xs-12 highlight middle-xs center-xs lower">
        <div className="box">
          <a target="_blank" href="https://twitter.com/UniverseSimMan">
            <i className="fa fa-twitter" aria-hidden="true" /> Twitter
          </a>
          &nbsp;&nbsp;&nbsp;
          <i className="fa fa-ellipsis-v" aria-hidden="true" />
          &nbsp;&nbsp;&nbsp;
          <a target="_blank" href="https://github.com/azz0r/fed-simulator">
            <i className="fa fa-github" aria-hidden="true" /> Github
          </a>
        </div>
      </div>
    </div>
    <br />
    <div className="row">
      <div className="col-xs-12 highlight middle-xs center-xs lower">
        <div className="box">
          {" "}
          With thanks to <br />
          <a target="_blank" href="http://fontawesome.io/icons/">
            Font Awesome
          </a>
          &nbsp;
          <i className="fa fa-ellipsis-v" aria-hidden="true" />
          &nbsp;
          <a target="_blank" href="https://www.npmjs.com/package/react-drag-and-drop">
            React Drag and drop
          </a>
          &nbsp;
          <i className="fa fa-ellipsis-v" aria-hidden="true" />
          &nbsp;
          <a target="_blank" href="https://reactjs.org/">
            ReactJS
          </a>
        </div>
      </div>
    </div>
  </section>
)

WelcomePage.propTypes = {
  generateFederation: PropTypes.func.isRequired,
}

export default WelcomePage
