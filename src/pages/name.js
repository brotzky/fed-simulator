import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import Helmet from "react-helmet"

import { updateGame } from "../actions/game"
import { startGame } from "../actions/game"
import Input from "../components/form/input"
import HeaderOne from "../components/h1/h1"

import "./stylesheets/name.scss"

class NamePage extends Component {
  state = {
    game: {
      name: "",
    },
  }

  componentDidMount() {
    const { game: { name, }, } = this.props

    if (name !== "") {
      this.setState({
        game: {
          name: name,
        },
      })
    }
  }

  render() {
    return (
      <section className="page name">
        <Helmet title="Name your federation!" />
        <HeaderOne>Name your Federation 🎈</HeaderOne>
        <form onSubmit={this.handleSubmit}>
          <div>
            <Input
              value={this.state.game.name}
              name="name"
              onChange={this.handleChange}
              label=""
              placeholder="WWE, NXT, ROH, GFW, TNA"
            />
          </div>
          <button type="submit">
            Print the merch, we got a name
          </button>
        </form>
      </section>
    )
  }

  handleChange = event => {
    this.setState({
      game: {
        name: String(event.target.value),
      },
    })
  }

  handleSubmit = event => {
    event.preventDefault()

    const game = Object.assign({}, this.props.game, this.state.game)
    const { dispatch, router, } = this.props

    dispatch(updateGame(game))
    dispatch(startGame())

    router.push("/default")
  }
}

NamePage.displayName = "NamePage"

NamePage.contextTypes = {
  router: PropTypes.object.isRequired,
}

export default connect(state => ({
  game: state.game,
}))(NamePage)
