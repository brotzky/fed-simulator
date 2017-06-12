import React from "react"
import { SlideUp } from "animate-components"

import { SHORT_ANIMATION_SPEED } from "../constants/animation"

const HeaderOne = ({ className = "", children = undefined, }) => (
  <SlideUp duration={SHORT_ANIMATION_SPEED}>
    <h1 className={className}>{children}</h1>
  </SlideUp>
)

export default HeaderOne
