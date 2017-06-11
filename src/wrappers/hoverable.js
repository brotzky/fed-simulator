import React, { Component } from "react"

export default function hoverable(WrappedComponent, propName = "hover") {
  return class HoverableComponent extends Component {
    constructor(props) {
      super(props)

      this.state = { hovered: false, }
    }

    turnHoverOn() {
      this.setState({ hovered: true, })
    }

    turnHoverOff() {
      this.setState({ hovered: false, })
    }

    render() {
      const props = { [propName]: this.state.hovered, ...this.props, }
      return (
        <div
          onMouseEnter={() => this.turnHoverOn()}
          onMouseLeave={() => this.turnHoverOff()}
        >
          <WrappedComponent {...props} />
        </div>
      )
    }
  }
}
