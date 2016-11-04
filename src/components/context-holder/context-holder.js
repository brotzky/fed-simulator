import React from "react"
import emptyFunction from "emptyfunction"

class ContextHolder extends React.Component {

  static propTypes = {
    context: React.PropTypes.shape({
      constants: React.PropTypes.object.required,
      onSetTitle: React.PropTypes.func.required,
      onSetMeta: React.PropTypes.func.required,
    }),
    children: React.PropTypes.element.isRequired,
  }

  static childContextTypes = {
    constants: React.PropTypes.object,
    onSetTitle: React.PropTypes.func,
    onSetMeta: React.PropTypes.func,
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
