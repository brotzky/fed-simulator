import React from "react"
import { Link } from "react-router"
import PropTypes from "prop-types"
import classnames from "classnames"
import CloseOnEscape from "react-close-on-escape"

import { formatCurrency } from "../../helpers/currency"

const noop = () => {}

const Burger = ({
  links = [],
  cash = 0,
  currencySymbol = "$",
  isVisible = false,
  name = "",
  onClick = noop,
  onEscape = noop,
  toggleVisibility = noop,
}) =>
  <nav className="burger">
    <span className="cursor-pointer" onClick={toggleVisibility}>
      <i className="icon fa fa-bars" aria-hidden="true" /> {name}
    </span>
    <CloseOnEscape onEscape={onEscape}>
      <div className={classnames("burger__container", { active: isVisible, })}>
        <h3>
          {formatCurrency(currencySymbol, cash)}
        </h3>
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

Burger.propTypes = {
  cash: PropTypes.number,
  isVisible: PropTypes.bool,
  currencySymbol: PropTypes.string,
  links: PropTypes.array,
  name: PropTypes.string,
  onClick: PropTypes.func,
  onEscape: PropTypes.func,
  toggleVisibility: PropTypes.func,
}

export default Burger
