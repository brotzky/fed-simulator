import React from "react"
import { SlideUp } from "animate-components"

import { SHORT_ANIMATION_SPEED } from "../../constants/animation"

import "./h1.scss"

const HeaderOne = ({ style = {}, className = "", children = undefined, }) =>
  <h1 style={style} className={className}>
		<SlideUp duration={SHORT_ANIMATION_SPEED}>
    	{children}
		</SlideUp>
  </h1>


export default HeaderOne
