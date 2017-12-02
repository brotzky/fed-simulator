import React from "react"
import PropTypes from "prop-types"

function ContextHolder(props) {
  return React.Children.only(props.children);
}

ContextHolder.propTypes = {
  context: PropTypes.shape({
    constants: PropTypes.object.required,
    onSetTitle: PropTypes.func.required,
    onSetMeta: PropTypes.func.required,
  }),
  children: PropTypes.element.isRequired,
};

export default ContextHolder
