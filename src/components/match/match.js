import React from "react"
import { connect } from "react-redux"
import SelectionScreen from "../selection-screen/selection-screen"
import Story from "./story"
import * as matchActions from "../../actions/match"
import { SimMatch } from "./sim-match.helper"
import { toSlug } from "../../helpers/slugs"
import "./stylesheets/main"

class Match extends React.Component {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    moves: React.PropTypes.array.isRequired,
    wrestlers: React.PropTypes.array.isRequired,
    match: React.PropTypes.object.isRequired,
  }

  displayName = "Match"

  onStartMatch = () => {
    let wrestlers = this.props.match.wrestlers.slice()
    wrestlers.forEach((wrestler, key) => {
      wrestlers[key].damage = wrestler.rating
    })
    let story = new SimMatch(
      this.props.match.wrestlers,
      this.props.moves
    ).ringBell()
    this.props.dispatch(
      matchActions.simulate(
        story,
      )
    )
  }

  render() {
    let buttonBrand = this.props.match.wrestlers.length > 0
       ? toSlug(this.props.match.wrestlers[0].brand)
       : "default"
    return (
      <div className="match">
        <div className="row">
          <div className="col-xs-3">
            <div className="bell">
              <button
                className={`btn bell__button bell__button--${buttonBrand}`}
                onClick={this.onStartMatch}>
                Ring the bell
              </button>
            </div>
            <br />
            <Story collection={this.props.match.story} />
          </div>
          <div className="col-xs-9">
            <SelectionScreen />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  moves: state.moves,
  wrestlers: state.wrestlers,
  match: state.match,
}))(Match)
