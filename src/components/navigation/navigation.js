import React from 'react'
import {Link} from 'react-router'
import defaultState from './default.json'

const Navigation = ({navigation = defaultState,}) => {
  return (
    <nav className="navigation">
      <ul className="navigation__list">
        {navigation.map((navigationItem, key) => {
          return (
            <li key={key} className="navigation__item">
              <Link to={navigationItem.url}>
                {navigationItem.title}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Navigation
