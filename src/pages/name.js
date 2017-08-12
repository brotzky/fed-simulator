import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import { updateGame } from "../actions/game"
import { startGame } from "../actions/game"
import Input from "../components/form/input"
import Button from "../components/button/button"
import HeaderOne from "../components/h1/h1"

import "./stylesheets/name.scss"

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
            <Input
              value={this.state.name}
              name="name"
              onChange={this.handleChange}
              label=""
              placeholder="WWE, NXT, ROH, GFW, TNA"
            />
          </div>
          <Button
            value="Print the merch, we got a name"
            onClick={this.handleSubmit}
            type="submit"
          />
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

    const { dispatch, router, } = this.props

    let game = Object.assign({}, this.props.game, { name: this.state.name, })

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
  name: state.game.name,
}))(NamePage)
