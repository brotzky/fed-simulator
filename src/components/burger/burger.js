import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router"
import PropTypes from "prop-types"
import { compose, withState, withHandlers } from "recompose"
import classnames from "classnames"
import CloseOnEscape from "react-close-on-escape"

import { formatCurrency } from "../../helpers/currency"
import currency from "../../constants/currency"

import links from "./links.json"

import "./burger.scss"

const currencySymbol = currency.symbol

const noop = () => {}

const Burger = ({
  toggleVisibility = noop,
  isVisible = false,
  onClick = noop,
  name = "",
  cash = 0,
  onEscape = noop,
}) => (
  <nav className="burger">
    <i
      className="icon fa fa-bars"
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
                <Link onClick={onClick} to={currentLink.url}>
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
  cash: PropTypes.number.isRequired,
  isVisible: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onEscape: PropTypes.func.isRequired,
  toggleVisibility: PropTypes.func.isRequired,
}

const mapStateToProps = connect(state => ({
  name: state.game.name,
  cash: state.game.cash,
}))

export default compose(
  mapStateToProps,
  withState("isVisible", "toggleVis", false),
  withHandlers({
    onClick: ({ toggleVis, }) => {
      return () => {
        return toggleVis(false)
      }
    },
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
