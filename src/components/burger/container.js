import { connect } from "react-redux"
import { compose, withState, withHandlers } from "recompose"

import currency from "../../constants/currency"
import Burger from "./burger"
import links from "./links.json"

import "./burger.scss"

const currencySymbol = currency.symbol

const mapStateToProps = connect(state => ({
  name: state.game.name,
  cash: state.game.cash,
  currencySymbol,
  links,
}))

export default compose(
  mapStateToProps,
  withState("isVisible", "toggleVis", false),
  withHandlers({
    onEscape: ({ toggleVis, }) => {
      return () => {
        return toggleVis(false)
      }
    },
    toggleVisibility: ({ toggleVis, isVisible, }) => {
      return () => {
        return toggleVis(!isVisible)
      }
    },
  })
)(Burger)
