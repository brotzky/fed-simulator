import React from "react"
import { connect } from "react-redux"
import Sound from "react-sound"
import SelectionScreen from "../selection-screen/selection-screen"
import Story from "../story/story"
import Wrestlers from "../wrestlers/wrestlers"
import * as matchActions from "../../actions/match"
import { SimMatch } from "./sim-match.helper"
import { toSlug } from "../../helpers/slugs"
import "./stylesheets/main"
import bellImage from "./bell.png"
import bellSound from "./bell.mp3"

class Match extends React.Component {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    moves: React.PropTypes.array.isRequired,
    wrestlers: React.PropTypes.array.isRequired,
    match: React.PropTypes.object.isRequired,
  }

  state = {
    soundPlaying: Sound.status.STOPPED,
  }

  displayName = "Match"

  onStartMatch = () => {
    this.setState({
      soundPlaying: Sound.status.PLAYING
    })
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
    let
      isValidMatch = this.props.match.wrestlers.length > 1,
      buttonBrand = isValidMatch
        ? toSlug(this.props.match.wrestlers[0].brand)
        : "default"
    return (
      <div className="match row">
        <div className="col-xs-12 fold">
          <div className="bell ">
            <img
              src={bellImage}
              className={(isValidMatch ? "active" : "hide")}
              onClick={isValidMatch ? this.onStartMatch : () => {}}
            />
            <Sound
              url={bellSound}
              playStatus={this.state.soundPlaying}
              playFromPosition={0}
              volume={100}
              onFinishedPlaying={() => {
                this.setState({
                  soundPlaying: Sound.status.STOPPED,
                  position: 0
                })
              }
            }
            />
          </div>
          <Choose>
            <When condition={isValidMatch}>
              <div className="names text-center">
                {this.props.match.wrestlers.map((wrestler, key) => {
                  return (
                    <span key={key} className="names__name">
                      {wrestler.name}
                    </span>
                  )
                })}
              </div>
            </When>
            <Otherwise>
              <div className="otherwise text-center names">
                <span className="names__name">
                  Click on wrestlers below to put them in a match!
                </span>
              </div>
            </Otherwise>
          </Choose>
          <br />
          <Story collection={this.props.match.story} />
        </div>
        <SelectionScreen showBrandLogo={false} />
      </div>
    )
  }
}

export default connect(state => ({
  moves: state.moves,
  wrestlers: state.wrestlers,
  match: state.match,
}))(Match)
