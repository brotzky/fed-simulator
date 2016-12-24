import React from "react"
import classNames from "classnames"
import { Droppable } from "react-drag-and-drop"
import { connect } from "react-redux"
import Story from "../story/story"
import { randomiseWrestlers, simulateMatch, logMatch } from "../../helpers/match"
import "./stylesheets/match"

const defaultState = {
  wrestlers: [],
  story: [],
}

class Match extends React.Component {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    moves: React.PropTypes.array.isRequired,
    allWrestlers: React.PropTypes.array.isRequired,
    brand: React.PropTypes.string,
  }

  static defaultProps = {
    brand: "",
  }

  state = defaultState

  displayName = "Match"

  onDrop = (id) => {
    let wrestlerId = id.wrestler,
      isAlreadyInMatch = this.state.wrestlers.map(wrestler => wrestler.id).includes(wrestlerId)

    if (!isAlreadyInMatch) {
      console.log("Match drop", "Dispatch", "resim")

      this.shouldResim()
    }
  }

  onRemoveWrestler(wrestlerToRemove) {
    console.log("Match on remove wrestlers", "Dispatch", "remove wrestler")
  }

  render() {
    let isValidMatch = this.state.wrestlers.length > 0
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
                    {this.state.wrestlers.map((wrestler, key) => {
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
                  <If condition={this.state.story.length > 0}>
                    <div className="statistic">
                      <Story
                        collection={this.state.story}
                        wrestlers={this.state.wrestlers}
                      />
                    </div>
                  </If>
                </When>
              </Choose>
              <If condition={this.state.wrestlers.length < 2}>
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
