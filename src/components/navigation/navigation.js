import React from "react"
import { Link } from "react-router"
import { connect } from "react-redux"

import ColorPickers from "../quick/color-pickers"
import defaultState from "./default.json"

import "./navigation.scss"

const Navigation = ({
  backgroundColor = "black",
  color = "white",
  navigation = defaultState,
}) => {
  const style = { backgroundColor, color, }
  return (
    <nav style={style} className="navigation">
      <ul className="navigation__list">
        {navigation.map((item, key) => {
          return (
            <li key={key} className={`navigation__item ${item.url}`}>
              <Choose>
                <When condition={item.title === "Branding"}>
                  <ColorPickers />
                </When>
                <Otherwise>
                  <Link className="pulse" style={{ color, }} to={item.url}>
                    {item.title}
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

export default connect(state => ({
  color: state.federation.color,
  backgroundColor: state.federation.backgroundColor,
}))(Navigation)
// export default Navigation
