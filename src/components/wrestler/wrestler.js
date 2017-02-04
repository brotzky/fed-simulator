import "./stylesheets/wrestler"
import classNames from "classnames"
import React from "react"

const Wrestler = ({
  id,
  name,
  animate = true,
  onWrestlerClick,
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
