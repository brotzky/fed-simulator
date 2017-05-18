import React, { Component } from "react"
import { connect } from "react-redux"
import { updateFederation } from "../actions/federation"
import PropTypes from "prop-types"
import Input from "../components/form/input"

import "./stylesheets/name.scss"

class Name extends Component {
  state = {
    federation: {
      name: "",
    },
  }

  componentDidMount() {
    if (this.props.federation.name !== "") {
      this.setState({
        federation: {
          name: this.props.federation.name,
        },
      })
    }
  }

  handleChange = event => {
    this.setState({
      federation: {
        name: event.target.value,
      },
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    const federation = Object.assign(
      this.props.federation,
      this.state.federation
    )

    this.props.dispatch(updateFederation(federation))
    this.props.router.push("/size")
  }

  displayName = "Name"

  render() {
    return (
      <section className="page name">
        <h1>Name your federation!</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <Input
              value={this.state.federation.name}
              name="name"
              onChange={this.handleChange}
              label=""
            />
          </div>
          <button type="submit">
            Save and decide the size of your federation
          </button>
        </form>
      </section>
    )
  }
}

Name.contextTypes = {
  router: PropTypes.object.isRequired,
}

export default connect(state => ({
  federation: state.federation,
}))(Name)
