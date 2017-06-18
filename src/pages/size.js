import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import classNames from "classNames"

import { updateFederation } from "../actions/federation"
import { updateGame } from "../actions/game"
import defaultOptions from "../constants/size.options.json"
import HeaderOne from "../components/h1/h1"
import acronymLongName from "../helpers/acronym-long-name"

import "./stylesheets/size.scss"

class SizePage extends Component {
  state = {
    size: "",
    cash: "",
  }

  componentDidMount() {
    if (this.props.federation.size !== "") {
      this.setState({
        size: this.props.federation.size,
        cash: this.props.game.cash,
      })
    }
  }

  handleChange = (size, cash) => {
    this.setState({
      size,
      cash,
    })
  }

  handleSubmit = event => {
    event.preventDefault()

    const { cash, size, } = this.state
    const { federation, game, } = this.props
    const fedState = Object.assign(federation, { size, })
    const gameState = Object.assign(game, { cash, })

    this.props.dispatch(updateFederation(fedState))
    this.props.dispatch(updateGame(gameState))
    this.props.router.push("/branding")
  }

  render() {
    return (
      <section className="page size">
        <HeaderOne>
          How big are you `<span className="uppercase orange">
            {acronymLongName(this.props.federation.name)}`
          </span>
          ?!
        </HeaderOne>
        <div className="row sizes">
          {defaultOptions.map(option => {
            const classes = classNames(
              "col-xs-12 col-sm-12 col-md-6 col-lg-3",
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
  federation: state.federation,
  game: state.game,
}))(SizePage)
