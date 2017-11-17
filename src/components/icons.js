import React from "react"
import PropTypes from "prop-types"

const NOOP = () => {}

const Icon = ({ icon = false, onClick = NOOP, className = "", tabIndex = 0, ariaHidden = "true", title = "", }) => (
  <i className={`icon fa fa-${icon} ${className}`} aria-hidden={ariaHidden} tabIndex={tabIndex} title={title} onKeyPress={onClick} onClick={onClick} />
)

const Create = ({ onClick, }) => new Icon({ icon: "plus-circle green", onClick, })
const Generate = ({ onClick, }) => new Icon({ icon: "rocket", onClick, })
const ListToggle = ({ onClick, }) => new Icon({ icon: "list", onClick, })
const Reset = ({ onClick, }) => new Icon({ icon: "trash", onClick, })

const Gender = ({ gender = false, onClick = NOOP, }) => {
  let icon = "genderless"

  if (gender !== null) {
    icon = gender ? "male" : "female"
  }

  return new Icon({ icon, title: icon, onClick, })
}

const SortBy = ({ sortBy = false, onClick = NOOP, }) => {
  const icon = sortBy === "name" ? "font" : "shield"

  return new Icon({ icon, onClick, })
}
const Visible = ({ visible = false, onClick = NOOP, }) => {
  const icon = !visible ? "eye-slash" : "eye"

  return new Icon({ icon, onClick, })
}

const Direction = ({ asc = false, onClick = NOOP, }) => {
  const icon = asc ? "sort-asc" : "sort-desc"

  return new Icon({ icon, onClick, })
}

Icon.propTypes = {
  icon: PropTypes.string,
  onClick: PropTypes.func,
}
Gender.propTypes = Object.assign({}, Icon.propTypes, { gender: PropTypes.bool, })

export { Icon, Create, Gender, Generate, ListToggle, SortBy, Visible, Direction, Reset }
