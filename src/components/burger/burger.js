import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router"
import PropTypes from "prop-types"

import links from "./links.json"

const Burger = () => (
  <nav className="burger">
    <ul>
      {links.map(currentLink => {
        return (
          <li key={currentLink.url}>
            <Link to={currentLink.url}>
              {currentLink.title}
            </Link>
          </li>
        )
      })}
    </ul>
  </nav>
)

Burger.propTypes = {
  game: PropTypes.object.isRequired,
}

export default connect(state => ({
  game: state.game,
}))(Burger)
