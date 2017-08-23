import React from "react"
import PropTypes from "prop-types"

import ColorPicker from "../color-pickers/color-picker"

import "./color-pickers.scss"

const NOOP = () => {}

const ColorPickers = ({
  backgroundColor = "",
  color = "",
  onChangeBackgroundColor = NOOP,
  onChangeColor = NOOP,
}) =>
  <div className="row around-xs cursor-pointer color-pickers">
    <div className="col-xs-6 col" style={{ backgroundColor, }}>
      <ColorPicker onChange={onChangeBackgroundColor} />
    </div>
    <div className="col-xs-6 col" style={{ backgroundColor: color, }}>
      <ColorPicker onChange={onChangeColor} />
    </div>
  </div>

ColorPickers.displayName = "ColorPickers"

ColorPickers.propTypes = {
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  onChangeBackgroundColor: PropTypes.func,
  onChangeColor: PropTypes.func,
}

export default ColorPickers
