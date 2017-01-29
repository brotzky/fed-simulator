import React from "react"
import { Link } from "react-router"
import navigation from "./navigation"

export default class Header extends React.Component {

  render() {
    return (
      <header className="header">
        <nav className="navigation navigation--primary">
          <ul className="navigation__list">
            {navigation.map((navigationItem, key) => {
              return (
                <li key={key} className="navigation__item">
                  <Link
                    to={navigationItem.url}>
                    {navigationItem.title}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </header>
    )
  }
}
