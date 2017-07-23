import React from "react"
import { SlideUp } from "animate-components"
import ReactFitText from "react-fittext"

import { SHORT_ANIMATION_SPEED } from "../../constants/animation"

import "./h1.scss"

const HeaderOne = ({ className = "", children = undefined, }) =>
  <SlideUp duration={SHORT_ANIMATION_SPEED}>
    <ReactFitText compressor={2}>
      <h1 className={className}>
        {children}
      </h1>
    </ReactFitText>
  </SlideUp>

export default HeaderOne
