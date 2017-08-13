import React from "react"
import { Link } from "react-router"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import Cash from "../cash/container"
import ColorPickers from "../color-pickers/color-pickers"

const NOOP = () => {}

import "./nav.scss"

const Nav = ({
  backgroundColor = "black",
  color = "white",
  links = [],
  name = "",
  onClickBurger = NOOP,
}) => {
  const style = { backgroundColor, color, }
  return (
    <nav style={style} className="nav">
      <ul className="nav__list">
        {links.map((item, key) => {
          const title = { __html: item.title, }
          return (
            <li key={key} className={`nav__item nav--${item.url}`}>
              <Choose>
                <When condition={item.title === "Burger"}>
                  <span className="cursor-pointer" onClick={onClickBurger}>
                    <i className="icon fa fa-bars" aria-hidden="true" /> {name}
                  </span>
                </When>
                <When condition={!item.url && item.title === "Branding"}>
                  <ColorPickers />
                </When>
                <When condition={item.title === "Cash"}>
                  <Cash />
                </When>
                <When condition={item.title === "Settings"}>
                  <Link to={item.url}>
                    <i className="icon fa fa-cog" style={style} />
                  </Link>
                </When>
                <Otherwise>
                  <Link className="pulse" style={{ color, }} to={item.url}>
                    <div dangerouslySetInnerHTML={title} />
                  </Link>
                </Otherwise>
              </Choose>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

Nav.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  links: PropTypes.array,
  name: PropTypes.string.isRequired,
  onClickBurger: PropTypes.func,
}

Nav.defaultProps = {
  onClickBurger: NOOP,
}

export default connect(state => ({
  backgroundColor: state.style.backgroundColor,
  color: state.style.color,
  game: state.game,
  name: state.game.name,
}))(Nav)
