import React from "react"
import PropTypes from "prop-types"
import emptyFunction from "emptyfunction"

class ContextHolder extends React.Component {

  static propTypes = {
    context: PropTypes.shape({
      constants: PropTypes.object.required,
      onSetTitle: PropTypes.func.required,
      onSetMeta: PropTypes.func.required,
      toSlug: PropTypes.func.isRequired,
    }),
    children: PropTypes.element.isRequired,
  }

  static childContextTypes = {
    constants: PropTypes.object,
    onSetTitle: PropTypes.func,
    onSetMeta: PropTypes.func,
    toSlug: PropTypes.func,
  }

  getChildContext() {
    const context = this.props.context
    return {
      constants: context.constants,
      onSetTitle: context.onSetTitle || emptyFunction,
      onSetMeta: context.onSetMeta || emptyFunction,
      toSlug: context.toSlug || emptyFunction,
    }
  }

  render() {

    return React.Children.only(this.props.children)
  }
}

export default ContextHolder
