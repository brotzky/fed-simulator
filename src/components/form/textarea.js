import React from "react"
import PropTypes from "prop-types"

import "./textarea.scss"

const NOOP = () => {}

const Textarea = ({ value = "", label = "", name = "", onChange = NOOP, placeholder = "", rows = 3, }) => {
  return (
    <div className="box">
      <label htmlFor={name}>{label}</label>
      <textarea
        value={value}
        id={name}
        name={name}
        onChange={onChange}
        onMouseOver={onChange}
        onKeyPress={onChange}
        onCut={onChange}
        onCopy={onChange}
        onPaste={onChange}
        onFocus={onChange}
        onBlur={onChange}
        onDoubleClick={onChange}
        onTouchStart={onChange}
        onTouchMove={onChange}
        onTouchEnd={onChange}
        placeholder={placeholder}
        rows={rows}
        type="text"
      />
    </div>
  )
}

Textarea.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
}

export default Textarea
