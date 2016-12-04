import React from "react"
import { connect } from "react-redux"
import Sound from "react-sound"
import SelectionScreen from "../selection-screen/selection-screen"
import Story from "../story/story"
import Wrestlers from "../wrestlers/wrestlers"
import * as matchActions from "../../actions/match"
import * as wrestlersActions from "../../actions/wrestlers"
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
      soundPlaying: Sound.status.PLAYING,
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
    let winnersAction = story.slice(-1).pop()
    this.props.dispatch(
      wrestlersActions.awardMatchPoints(
        {...winnersAction.details}
      )
    )
  }

  onWrestlerClick = () => {
    this.props.dispatch(
      matchActions.clearStory()
    )
  }


  render() {
    let
      isValidMatch = this.props.match.wrestlers.length > 1,
      buttonBrand = isValidMatch
        ? toSlug(this.props.match.wrestlers[0].brand)
        : "default"
    return (
      <div className="match">
        <div className={`col-xs-12 match__inner ${(isValidMatch ? "active" : "inactive")}`}>
          <div className="match__bell">
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
                  position: 0,
                })
              }
            }
            />
          </div>
          <Choose>
            <When condition={isValidMatch}>
              <div className="match__names">
                {this.props.match.wrestlers.map((wrestler, key) => {
                  return (
                    <span key={key} className="match__names__name">
                      {wrestler.name}
                    </span>
                  )
                })}
              </div>
              <If condition={this.props.match.story.length > 0}>
                <Story collection={this.props.match.story} />
              </If>
            </When>
            <Otherwise>
              <div className="otherwise match__names">
                <span className="names__name">
                  Click on wrestlers below to put them in into the match!
                </span>
              </div>
            </Otherwise>
          </Choose>
        </div>
        <SelectionScreen
          onWrestlerClick={this.onWrestlerClick.bind(this)}
          showBrandLogo={false}
        />
      </div>
    )
  }
}

export default connect(state => ({
  moves: state.moves,
  wrestlers: state.wrestlers,
  match: state.match,
}))(Match)
