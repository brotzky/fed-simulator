import "./stylesheets/size.scss"
import { connect } from "react-redux"
import classNames from "classNames"
import { updateFederation } from "../actions/federation"
import { updateGame } from "../actions/game"
import defaultOptions from "../constants/size.options.json"
import PropTypes from "prop-types"
import React, { Component } from "react"
import acronymLongName from "../helpers/acronym-long-name"

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
        <h1>
          How big are you `<span className="orange">
            {acronymLongName(this.props.federation.name)}`
          </span>
          ?!
        </h1>
        <div className="row sizes">
          {defaultOptions.map(option => {
            const classes = classNames(
              "col-xs-3",
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

// Bingohall by Creative Stall from the Noun Project; https://thenounproject.com/search/?i=145426
// Garden by Star and Anchor Design; https://thenounproject.com/search/?i=566413
// Gymnasium by Ismael Ruiz; https://thenounproject.com/search/?i=684754
