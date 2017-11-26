import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"

import "./labels.scss"

const NOOP = () => {}

export const Label = ({ style = {}, id = "", active = false, onClick = NOOP, name = "", }) => (
  <span tabIndex="0" onKeyPress={() => onClick(id)} onClick={() => onClick(id)} className={classnames({ active: active, }, "label", "title")} style={style}>
    {name}
  </span>
)

export const Labels = ({ style = {}, highlighted, onClick = NOOP, labels = [], }) => (
  <div className="labels" tabIndex="0" style={style}>
    {labels.map(label => <Label onKeyPress={onClick} onClick={onClick} active={label.id === highlighted} key={label.id} {...label} />)}
  </div>
)

Labels.propTypes = {
  labels: PropTypes.array,
  highlighted: PropTypes.any,
  onClick: PropTypes.func,
  style: PropTypes.object,
}

Label.propTypes = {
  active: PropTypes.bool,
  id: PropTypes.any,
  name: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object,
}

export default Labels
