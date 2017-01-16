import "./stylesheets/wrestler"
import classNames from "classnames"
import Icon from "../icon/icon"
import React from "react"

const Wrestler = ({
  id,
  name,
  animate = true,
  onWrestlerClick,
  active = false
}) => {
  const classes = classNames(
    "wrestler shadow-2",
    {
      "hvr-buzz": animate,
    },
  )
  return (
    <div className={classes}
      onClick={() => onWrestlerClick(id)}
      data-id={id}>
      {name}
    </div>
  )
}

export default Wrestler
