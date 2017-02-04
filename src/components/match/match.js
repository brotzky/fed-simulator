import React from "react"
import classNames from "classnames"
import { Droppable } from "react-drag-and-drop"
import { connect } from "react-redux"
import Story from "../story/story"
import "./stylesheets/match"
import soloIMG from "./solo.png"
import teamsIMG from "./teams.png"

class Match extends React.Component {

  static propTypes = {
    allWrestlers: React.PropTypes.array.isRequired,
    brand: React.PropTypes.string,
    chosenWrestlers:  React.PropTypes.array.isRequired,
    dispatch: React.PropTypes.func.isRequired,
    isTagMatch: React.PropTypes.bool.isRequired,
    matchIndex: React.PropTypes.number,
    moves: React.PropTypes.array.isRequired,
    onDropWrestler: React.PropTypes.func,
    onRemoveWrestler: React.PropTypes.func,
    onSetTagMatch: React.PropTypes.func,
    settings: React.PropTypes.object.isRequired,
    story: React.PropTypes.array,
  }

  static defaultProps = {
    chosenWrestlers: [],
    brand: "",
    matchIndex: 0,
    story: [],
    isTagMatch: false,
    onDropWrestler: () => {},
    onSelectWinner: () => {},
    onRemoveWrestler: () => {},
    onSetTagMatch: () => {},
  }

  displayName = "Match"

  onDrop = (data, event) => {
    let wrestlerId = data.wrestler,
      teamId = Number(event.currentTarget.getAttribute("data")),
      isAlreadyInMatch = this.props.chosenWrestlers.map(wrestler => wrestler.id).includes(wrestlerId)

    if (!isAlreadyInMatch) {
      this.props.onDropWrestler(wrestlerId, this.props.matchIndex, teamId)
    }
  }

  onRemoveWrestler(wrestler) {
    this.props.onRemoveWrestler(wrestler, this.props.matchIndex)
  }

  onSelectWinner(wrestler) {
    this.props.onSelectWinner(wrestler, this.props.matchIndex)
  }

  onSetTagMatch() {
    this.props.onSetTagMatch(!this.props.isTagMatch, this.props.matchIndex)
  }

  render() {
    let
      hasBeenSimulated = this.props.story && this.props.story.length > 0,
      teams = this.props.isTagMatch ? [{}, {}, {}, {},] : [{}, ],
      winnerId = hasBeenSimulated
        ? this.props.story[this.props.story.length - 1].details.winner.id
        : false
    return (
      <div className="match">
        <div className="row">
          <div className={classNames(
            "col-xs-12",
            "match__inner",
            { "is-tag-match": this.props.isTagMatch, }
          )}>
            <div className="match__section statistic">
              Match {this.props.matchIndex + 1}
            </div>
            <If condition={!hasBeenSimulated}>
              <div className="match__teamtoggle">
                <a onClick={() => this.onSetTagMatch()}>
                  <img src={this.props.isTagMatch ? teamsIMG : soloIMG} />
                  <If condition={this.props.matchIndex === 0}>
                     &nbsp;<i className="show--edit fa fa-pencil" aria-hidden="true"></i>
                  </If>
                </a>
              </div>
            </If>
            <div className="row">
              {teams.map((emptyObject, teamId) => {
                let teamWrestlers = this.props.chosenWrestlers
                  .filter(wrestler => wrestler.teamId === teamId || !this.props.isTagMatch)
                return (
                  <Droppable
                    key={teamId}
                    types={[
                      "wrestler",
                    ]}
                    className={classNames({
                      "col-xs-6": this.props.isTagMatch,
                      "col-xs-12": !this.props.isTagMatch,
                      "hide": teamWrestlers.length === 0 && hasBeenSimulated,
                    })}
                    data={this.props.isTagMatch ? teamId : false}
                    onDrop={this.onDrop}>
                    <div className={classNames(
                      "droparea",
                      { "droparea--team": this.props.isTagMatch, },
                      { active : hasBeenSimulated, },
                      { inactive : !hasBeenSimulated, },
                    )}>
                      <If condition={teamWrestlers.length === 0}>
                        <span className="droparea__title"></span>
                      </If>
                      <div className="match__names">
                        {teamWrestlers.map((wrestler, key) => {
                          return (
                            <span key={key}
                              className="match__name">
                              <span>
                                <a onClick={() => this.onSelectWinner(wrestler)}>
                                  {wrestler.name}
                                  <If condition={wrestler.winner || wrestler.id === winnerId}>
                                    &nbsp;<i className="fa fa-star" aria-hidden="true"></i>
                                  </If>
                                </a>
                              </span>
                              <sup>
                                {wrestler.rating}
                              </sup>
                              <span onClick={() => this.onRemoveWrestler(wrestler)}
                                className="remove">
                                &nbsp; <i className="fa fa-remove" aria-hidden="true"></i>
                              </span>
                            </span>
                          )
                        })}
                      </div>
                    </div>
                    <br />
                  </Droppable>
                )
              })}
            </div>
          </div>
        </div>
        <If condition={hasBeenSimulated && this.props.settings.SHOW_STORY_BY_DEFAULT}>
          <div className="statistic animated fadeIn">
            <Story
              collection={this.props.story}
              wrestlers={this.props.chosenWrestlers}
            />
          </div>
        </If>
      </div>
    )
  }
}

export default connect(state => ({
  moves: state.moves,
  settings: state.settings,
  allWrestlers: state.wrestlers,
}))(Match)
