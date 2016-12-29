import React from "react"
import classNames from "classnames"
import { Droppable } from "react-drag-and-drop"
import { connect } from "react-redux"
import Story from "../story/story"
import "./stylesheets/match"

class Match extends React.Component {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    matchIndex: React.PropTypes.number,
    moves: React.PropTypes.array.isRequired,
    isTagMatch: React.PropTypes.bool.isRequired,
    chosenWrestlers:  React.PropTypes.array.isRequired,
    allWrestlers: React.PropTypes.array.isRequired,
    brand: React.PropTypes.string,
    story: React.PropTypes.array,
    onRemoveWrestler: React.PropTypes.func,
    onDropWrestler: React.PropTypes.func,
    onSetTagMatch: React.PropTypes.func,
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

  onDrop = (id) => {
    let wrestlerId = id.wrestler,
      isAlreadyInMatch = this.props.chosenWrestlers.map(wrestler => wrestler.id).includes(wrestlerId)

    if (!isAlreadyInMatch) {
      this.props.onDropWrestler(wrestlerId, this.props.matchIndex)
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
    let isValidMatch = this.props.chosenWrestlers.length > 0
    return (
      <div className="match">
        <div className="row">
            <div className={classNames(
              "col-xs-12",
              "match__inner",
              { active :
                isValidMatch,
              },
            )}>
              <p>
                <a onClick={() => this.onSetTagMatch()}>
                  {this.props.isTagMatch ? "Solo?": "Tag?"}
                </a>
              </p>
              <Choose>
                <When condition={isValidMatch}>
                  <div className="match__names">
                    {this.props.chosenWrestlers.map((wrestler, key) => {
                      return (
                        <span key={key}
                          className="match__name">
                          <span>
                            <a onClick={() => this.onSelectWinner(wrestler)}>
                              {wrestler.name}
                              <If condition={wrestler.winner}>
                                <i className="fa fa-star" aria-hidden="true"></i>
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
                  <If condition={this.props.story.length > 0}>
                    <div className="statistic">
                      <Story
                        collection={this.props.story}
                        wrestlers={this.props.chosenWrestlers}
                      />
                    </div>
                  </If>
                </When>
              </Choose>
              <Droppable
                types={[
                  "wrestler",
                ]}
                onDrop={this.onDrop}>
                <div className="droparea inactive">
                  <span className="droparea__title">
                    Drop wrestlers here
                  </span>
                </div>
              </Droppable>
            </div>
          </div>
        </div>
    )
  }
}

export default connect(state => ({
  moves: state.moves,
  allWrestlers: state.wrestlers,
}))(Match)
