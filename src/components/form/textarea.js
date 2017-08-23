import React from "react"

import "./textarea.scss"

const noop = () => {}

const Textarea = ({
  value = "",
  label = "",
  name = "",
  onChange = noop,
  placeholder = "",
  rows = 3,
}) => {
  return (
    <div className="box">
      <label htmlFor={name}>
        {label}
      </label>
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

export default Textarea
