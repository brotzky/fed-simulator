import React from "react"
import classNames from "classnames"
import Icon from "../icon/icon"
import { toSlug } from "../../helpers/slugs"
import "./stylesheets/main"

const Wrestler = ({
  id,
  name,
  brand,
  animate = true,
  onWrestlerClick,
  active = false
}) => {
  const slugName = toSlug(name)
  const classes = classNames(
    "wrestler",
    `wrestler--${toSlug(brand)}`,
    { "hvr-buzz": animate },
  )
  return (
    <div
      className={classes}
      onClick={() => onWrestlerClick(id)}
      data-id={id}>
      <Icon name={name} active={active} />
    </div>
  )
}

export default Wrestler
