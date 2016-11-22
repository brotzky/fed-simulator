import React from "react"
import classNames from "classnames"
import Icon from "../icon/icon"
import { toSlug } from "../../helpers/slugs"
import "./stylesheets/main"

const Wrestler = ({
  id,
  name,
  canJiggle = true,
}) => {
  const classes = classNames(
    "wrestler",
    { jiggle: canJiggle },
  )
  const slugName = toSlug(name)
  return (
    <div
      className={classes}
      data-id={id}>
      <Icon name={name} />
    </div>
  )
}

export default Wrestler
