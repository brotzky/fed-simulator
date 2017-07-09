import React from "react"

export const makeTogglable = Component =>
  class Togglable extends React.Component {
    state = {
      opened: false,
    }
    close = () => this.setState({ opened: false, })
    open = () => this.setState({ opened: true, })
    toggle = () => this.setState(prevState => ({ opened: !prevState.opened, }))
    render() {
      return (
        <Component
          open={this.open}
          close={this.close}
          toggle={this.toggle}
          opened={this.state.opened}
          {...this.props}
        />
      )
    }
  }
