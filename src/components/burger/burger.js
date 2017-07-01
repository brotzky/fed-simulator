import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router"
import PropTypes from "prop-types"
import { compose, withState, withHandlers } from "recompose"
import classnames from "classnames"
import CloseOnEscape from "react-close-on-escape"

import { formatCurrency } from "../../helpers/currency"
import acronymLongName from "../../helpers/acronym-long-name"
import currency from "../../constants/currency"

import links from "./links.json"

import "./burger.scss"

const currencySymbol = currency.symbol

const Burger = ({ toggleVisibility, isVisible, name, cash, onEscape, }) => (
  <nav className="burger">
    <i
      className="icon fa fa-5 fa-bars"
      aria-hidden="true"
      onClick={toggleVisibility}
    />
    {" "}
    {name}
    <CloseOnEscape onEscape={onEscape}>
      <div className={classnames("burger__container", { active: isVisible, })}>
        <h3>{formatCurrency(currencySymbol, cash)}</h3>
        <ul className="burger__list">
          {links.map(currentLink => {
            return (
              <li className="burger__item" key={currentLink.url}>
                <Link to={currentLink.url}>
                  {currentLink.title}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </CloseOnEscape>
  </nav>
)

Burger.propTypes = {
  name: PropTypes.string.isRequired,
  cash: PropTypes.number.isRequired,
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
    onEscape: ({ toggleVis, }) => {
      return () => {
        return toggleVis(false)
      }
    },
    toggleVisibility: ({ toggleVis, isVisible, }) => {
      return () => {
        return toggleVis(!isVisible)
      }
    },
  })
)(Burger)
