import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import { updateName } from "../../actions/game"
import { toggleStarted } from "../../actions/game"
import Input from "../../components/form/input"
import Button from "../../components/button/button"
import HeaderOne from "../../components/h1/h1"

import "./name.scss"

class NamePage extends Component {
  constructor(props) {
    super(props)

    const { name, } = props

    this.state = {
      name,
    }
  }

  render() {
    return (
      <section className="page name">
        <HeaderOne>Name your Federation 🎈</HeaderOne>
        <form onSubmit={this.handleSubmit}>
          <div>
            <Input value={this.state.name} name="name" onChange={this.handleChange} label="" placeholder="WWE, NXT, ROH, GFW, TNA" />
          </div>
          <Button value="Print the merch, we got a name" onClick={this.handleSubmit} type="submit" />
        </form>
      </section>
    )
  }

  handleChange = event => {
    this.setState({
      name: String(event.target.value),
    })
  }

  handleSubmit = event => {
    event.preventDefault()

    const { dispatch, router, started, } = this.props

    dispatch(updateName(this.state.name))

    if (!started) {
      dispatch(toggleStarted())
    }

    router.push("/default")
  }
}

NamePage.displayName = "NamePage"

NamePage.contextTypes = {
  router: PropTypes.object.isRequired,
}

NamePage.propTypes = {
  dispatch: PropTypes.func,
  router: PropTypes.object,
  started: PropTypes.bool,
}

export default connect(state => ({
  game: state.game,
  name: state.game.name,
  started: state.game.started,
}))(NamePage)
