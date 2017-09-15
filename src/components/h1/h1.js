import React from "react"
import { SlideUp } from "animate-components"

import { SHORT_ANIMATION_SPEED } from "../../constants/animation"

import "./h1.scss"

const HeaderOne = ({ style = {}, value="", className = "", children = undefined, }) => {
  value = children ? children : value
  return (
    <SlideUp duration={SHORT_ANIMATION_SPEED}>
      <h1 style={style} className={className}>
        {value}
      </h1>
    </SlideUp>
  )
}


export default HeaderOne
