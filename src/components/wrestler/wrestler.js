import React from "react"
import classNames from "classnames"
import Icon from "../icon/icon"
import { toSlug } from "../../helpers/slugs"
import "./stylesheets/main"

const Wrestler = ({
  id,
  name,
  brand,
  canJiggle = true,
  onWrestlerClick,
  active = false
}) => {
  const slugName = toSlug(name)
  const classes = classNames(
    "wrestler",
    `wrestler--${toSlug(brand)}`,
    { jiggle: canJiggle },
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
