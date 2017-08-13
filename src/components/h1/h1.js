import React from "react"
import { SlideUp } from "animate-components"

import { SHORT_ANIMATION_SPEED } from "../../constants/animation"

import "./h1.scss"

const HeaderOne = ({ style = {}, className = "", children = undefined, }) =>
  <SlideUp duration={SHORT_ANIMATION_SPEED}>
    <h1 style={style} className={className}>
      {children}
    </h1>
  </SlideUp>

export default HeaderOne
