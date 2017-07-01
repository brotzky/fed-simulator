import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router"
import PropTypes from "prop-types"
import { compose, withState, withHandlers } from "recompose"

import { formatCurrency } from "../../helpers/currency"
import acronymLongName from "../../helpers/acronym-long-name"
import currency from "../../constants/currency"

import links from "./links.json"

import "./burger.scss"

const currencySymbol = currency.symbol

const Burger = ({ toggleVisibility, isVisible, name, cash, }) => (
  <nav className="burger">
    <i
      className="icon fa fa-5 fa-bars"
      aria-hidden="true"
      onClick={toggleVisibility}
    />
    <If condition={isVisible}>
      <h3>{name}</h3>
      <h4>{formatCurrency(currencySymbol, cash)}</h4>
      <ul className="burger__list">
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
    </If>
  </nav>
)

Burger.propTypes = {
  name: PropTypes.string.isRequired,
  toggleVisibility: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
}

const mapStateToProps = connect(state => ({
  name: state.game.name,
  cash: state.game.cash,
}))

export default compose(
  mapStateToProps,
  withState("isVisible", "toggleVis", false),
  withHandlers({
    toggleVisibility: ({ toggleVis, isVisible, }) => {
      return () => {
        return toggleVis(!isVisible)
      }
    },
  })
)(Burger)
