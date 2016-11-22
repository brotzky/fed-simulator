import React from "react"
import Icon from "../icon/icon"
import { toSlug } from "../../helpers/slugs"

const Wrestler = ({
  id,
  name,
}) => {
  const slugName = toSlug(name)
  return (
    <div
      className="wrestler jiggle"
      data-id={id}>
      <Icon name={name} />
    </div>
  )
}

export default Wrestler
