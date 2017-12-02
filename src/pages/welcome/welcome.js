import React from "react"
import { Link } from "react-router"
import PropTypes from "prop-types"

import { Icon } from "../../components/icons"
import { schema as defaultStyle } from "../../models/style.model"

import "./welcome.scss"
import "./pulse.scss"

const NOOP = () => {}

const WelcomePage = ({ generateFederation = NOOP, style = defaultStyle, }) => (
  <section className="page welcome">
    <div className="items collection">
      <Link tabIndex="0" to="/name">
        <div className="item highlight">
          <Icon icon="plus" /> I'll build this company from the ground up, dammit
      </div>
      </Link>
      <div className="item highlight pulse" onClick={generateFederation}>
        <Icon icon="play" /> This is an invasion, create everything for me
      </div>
    </div>
    <footer>
      <div className="collection">
        <div className="item" style={style}>
          <a target="_blank" href="https://twitter.com/UniverseSimMan">
            <i className="fa fa-twitter" aria-hidden="true" /> Twitter
          </a>
          &nbsp;&nbsp;&nbsp;
          <i className="fa fa-ellipsis-v" aria-hidden="true" />
          &nbsp;&nbsp;&nbsp;
          <a target="_blank" href="https://github.com/azz0r/fed-simulator">
            <i className="fa fa-github" aria-hidden="true" /> Github
          </a>{" "}
          <br />
          <br />
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
            React
          </a>
        </div>
      </div>
    </footer>
  </section>
)

WelcomePage.propTypes = {
  generateFederation: PropTypes.func.isRequired,
  style: PropTypes.object,
}

export default WelcomePage
