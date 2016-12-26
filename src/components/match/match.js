import React from "react"
import classNames from "classnames"
import { Droppable } from "react-drag-and-drop"
import { connect } from "react-redux"
import Story from "../story/story"
import { randomiseWrestlers, simulateMatch, logMatch } from "../../helpers/match"
import "./stylesheets/match"

class Match extends React.Component {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    onDropWrestler: React.PropTypes.func,
    matchIndex: React.PropTypes.number,
    moves: React.PropTypes.array.isRequired,
    chosenWrestlers:  React.PropTypes.array.isRequired,
    allWrestlers: React.PropTypes.array.isRequired,
    brand: React.PropTypes.string,
    story: React.PropTypes.array,
  }

  static defaultProps = {
    chosenWrestlers: [],
    brand: "",
    matchIndex: 0,
    story: [],
    onDropWrestler: () => {},
  }

  displayName = "Match"

  onDrop = (id) => {
    let wrestlerId = id.wrestler,
      isAlreadyInMatch = this.props.wrestlers.map(wrestler => wrestler.id).includes(wrestlerId)

    if (!isAlreadyInMatch) {
      this.props.onDropWrestler(wrestlerId, this.props.matchIndex)
    }
  }

  onRemoveWrestler(wrestlerToRemove) {
    console.log("Match on remove wrestlers", wrestlerToRemove, "Dispatch", "remove wrestler")
  }

  render() {
    let isValidMatch = this.props.chosenWrestlers.length > 0
    return (
      <div className="match">
        <div className="row">
          <Droppable
            types={[
              "wrestler",
            ]}
            onDrop={this.onDrop}>
            <div className={classNames(
              "col-xs-12",
              "match__inner",
              { active : isValidMatch },
            )}>
              <Choose>
                <When condition={isValidMatch}>
                  <div className="match__names">
                    {this.props.chosenWrestlers.map((wrestler, key) => {
                      return (
                        <span key={key}
                          className="match__name">
                          <span>
                            {wrestler.name}
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
              <If condition={this.props.chosenWrestlers.length < 2}>
                <div className="droparea inactive">
                  <span className="droparea__title">
                    Drop wrestlers here
                  </span>
                </div>
              </If>
            </div>
          </Droppable>
          </div>
        </div>
    )
  }
}

export default connect(state => ({
  moves: state.moves,
  allWrestlers: state.wrestlers,
}))(Match)
