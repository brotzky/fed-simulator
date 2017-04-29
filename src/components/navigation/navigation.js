import React from 'react'
import {Link} from 'react-router'
import defaultState from './default.json'
import './navigation.scss'

const Navigation = ({navigation = defaultState,}) => {
  return (
    <nav className="navigation">
      <ul className="navigation__list">
        {navigation.map((item, key) => {
          return (
            <li key={key} className={`navigation__item pulse ${item.url}`}>
              <Link to={item.url}>
                {item.title}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Navigation
