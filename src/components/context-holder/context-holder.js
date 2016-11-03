import React, { PropTypes } from "react"
import emptyFunction from "emptyfunction"

class ContextHolder extends React.Component {

  static propTypes = {
    context: PropTypes.shape({
      constants: PropTypes.object.required,
      onSetTitle: PropTypes.func.required,
      onSetMeta: PropTypes.func.required,
    }),
    children: PropTypes.element.isRequired,
  }

  static childContextTypes = {
    constants: PropTypes.object,
    onSetTitle: PropTypes.func,
    onSetMeta: PropTypes.func,
  }

  getChildContext() {
    const context = this.props.context
    return {
      constants: context.constants,
      onSetTitle: context.onSetTitle || emptyFunction,
      onSetMeta: context.onSetMeta || emptyFunction,
    }
  }

  render() {
    return React.Children.only(this.props.children)
  }
}

export default ContextHolder
