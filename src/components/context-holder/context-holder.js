import React from "react"
import PropTypes from "prop-types"

class ContextHolder extends React.Component {
  static propTypes = {
    context: PropTypes.shape({
      constants: PropTypes.object.required,
      onSetTitle: PropTypes.func.required,
      onSetMeta: PropTypes.func.required,
    }),
    children: PropTypes.element.isRequired,
  }
  render() {
    return React.Children.only(this.props.children)
  }
}

export default ContextHolder
