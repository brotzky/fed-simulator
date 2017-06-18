import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import classNames from "classNames"

import { updateGame } from "../actions/game"
import defaultOptions from "../constants/size.options.json"
import HeaderOne from "../components/h1/h1"
import acronymLongName from "../helpers/acronym-long-name"

import "./stylesheets/size.scss"

class SizePage extends Component {
  state = {
    size: "xs",
    cash: 0,
  }

  componentDidMount() {
    if (this.props.game.size !== "") {
      this.setState({ ...this.props.game, })
    }
  }

  handleChange = (size, cash) => {
    this.setState({ size, cash, })
  }

  handleSubmit = event => {
    event.preventDefault()

    const { game, dispatch, router, } = this.props
    const gameState = Object.assign({}, game, { ...this.state, })

    dispatch(updateGame(gameState))

    router.push("/branding")
  }

  render() {
    return (
      <section className="page size">
        <HeaderOne>
          How big are you `<span className="uppercase orange">
            {acronymLongName(this.props.game.name)}`
          </span>
          ?!
        </HeaderOne>
        <div className="row sizes">
          {defaultOptions.map(option => {
            const classes = classNames(
              "col-xs-12 col-sm-6 col-md-3 col-lg-3",
              "size",
              "grow",
              "cursor-pointer",
              { active: option.size === this.state.size, }
            )
            return (
              <div
                className={classes}
                key={option.id}
                onClick={() => this.handleChange(option.size, option.cash)}
              >
                <h3>{option.name}</h3>
                <p>{option.size}</p>
              </div>
            )
          })}
        </div>
        <br />
        <form onSubmit={this.handleSubmit}>
          <button type="submit">
            Save and brand your federation!
          </button>
        </form>
      </section>
    )
  }
}

SizePage.contextTypes = {
  router: PropTypes.object.isRequired,
}

SizePage.displayName = "Size"

export default connect(state => ({
  game: state.game,
}))(SizePage)
