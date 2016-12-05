import React from "react"
import { Droppable } from "react-drag-and-drop"
import { connect } from "react-redux"
import * as championshipActions from "../../actions/championship"
import * as wrestlersActions from "../../actions/wrestlers"
import { SimMatch } from "./sim-match.helper"
import { toSlug } from "../../helpers/slugs"
import "./stylesheets/main"

class Match extends React.Component {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    moves: React.PropTypes.array.isRequired,
    wrestlers: React.PropTypes.array.isRequired,
  }

  state = {
    wrestlers: [
      {
        "id": "-4795789095",
        "name": "Alexander Wolfe",
        "brand": "NXT",
        "rating": 75,
        "male": true,
        "wins": 0,
        "losses": 0,
        "championshipId": false
      },
      {
        "id": "7424670891",
        "name": "Angelo Dawkins",
        "brand": "NXT",
        "rating": 75,
        "male": true,
        "wins": 0,
        "losses": 0,
        "championshipId": false
      }
    ],
    story: [],
  }

  displayName = "Match"

  onStartMatch = () => {
    if (this.state.wrestlers.length > 1) {
      // copy props wrestlers to local var
      let wrestlers = this.state.wrestlers.slice()
      // bind damage to the rating field due to the random weighting system were using
      wrestlers.forEach((wrestler, key) => {
        wrestlers[key].damage = wrestler.rating
      })
      // create the match
      let story = new SimMatch(
        this.state.wrestlers,
        this.props.moves
      // set off the simulation
      ).ringBell()
      // award wins and losses to the wrestlers in the match
      let winnersAction = story.slice(-1).pop()
      this.props.dispatch(
        wrestlersActions.awardMatchPoints(
          {...winnersAction.details}
        )
      )
      // check to see if a championship needs to be moved
      this.props.dispatch(
        championshipActions.checkMove(
          {...winnersAction.details}
        )
      )
    }
  }

  onDrop = (id) => {
    let wrestlers = this.state.wrestlers.slice(),
      wrestlerId = id.wrestler,
      wrestler = this.props.wrestlers.filter((wrestler) => wrestler.id === wrestlerId)[0]
    wrestlers.push(wrestler)
    this.setState({
      wrestlers,
    })
  }

  render() {
    let
      isValidMatch = this.state.wrestlers.length > 0,
      buttonBrand = isValidMatch
        ? toSlug(this.state.wrestlers[0].brand)
        : "default"
    return (
      <div className="match clearfix">
        <div className={`col-xs-12 match__inner ${(isValidMatch ? "active" : "inactive")}`}>
          <Choose>
            <When condition={isValidMatch}>
              <div className="match__names">
                {this.state.wrestlers.map((wrestler, key) => {
                  return (
                    <span key={key} className="match__name">
                      {wrestler.name}
                    </span>
                  )
                })}
              </div>
              <If condition={this.state.story.length > 0}>
                <Story collection={this.state.story} />
              </If>
            </When>
          </Choose>
          <Droppable
            types={[
              "wrestler",
            ]}
            onDrop={this.onDrop}>
            <div className="otherwise match__names">
              <span className="names__name">
                Drag and drop wrestlers here to create a match
              </span>
            </div>
            </Droppable>
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  moves: state.moves,
  wrestlers: state.wrestlers,
}))(Match)
