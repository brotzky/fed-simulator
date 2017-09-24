import React from "react"
import classNames from "classnames"
import { Link } from "react-router"
import PropTypes from "prop-types"

const NOOP = () => {}

import "./nav.skin.scss"
import "./nav.structure.scss"

const Nav = ({ backgroundColor = "black", activeUrl = "", color = "white", modifier = "", links = [], }) => {
  const style = { backgroundColor, color, }
  return (
    <nav style={style} className={`nav ${modifier}`}>
      {links.map((item, key) => {
        const { url, icon, title, } = item
        const isActive = activeUrl === url
        return (
          <Link className={classNames("nav__item", { active: isActive, })} key={key} style={{ color, }} to={url}>
            <div className={classNames("icon", "fa", `fa-${icon}`, "fa-1x")} style={style} />
            <div>
              {title}
            </div>
          </Link>
        )
      })}
    </nav>
  )
}

Nav.propTypes = {
  activeUrl: PropTypes.any.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  links: PropTypes.array,
  modifier: PropTypes.string,
}

Nav.defaultProps = {
  onClickBurger: NOOP,
}

export default Nav
