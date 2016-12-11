import React from "react"
import weighted from "weighted"
import classNames from "classnames"
import { Droppable } from "react-drag-and-drop"
import { connect } from "react-redux"
import Story from "../story/story"
import * as championshipActions from "../../actions/championship"
import * as wrestlersActions from "../../actions/wrestlers"
import { simulateMatch, logMatch } from "../../helpers/match"
import "./stylesheets/main"

const defaultState = {
  wrestlers: [],
  story: [],
}
const settings = {
  male: {
    options: [true, false],
    weights: [0.8, 0.2],
  },
  amount: {
    options: [2, 3, 4, 5, 6],
    weights: [0.5, 0.2, 0.2, 0.05, 0.05]
  }
}

class Match extends React.Component {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    moves: React.PropTypes.array.isRequired,
    wrestlers: React.PropTypes.array.isRequired,
    allWrestlers: React.PropTypes.array.isRequired,
  }

  state = defaultState

  displayName = "Match"

  componentWillReceiveProps(nextProps) {
    this.setState({
      wrestlers: nextProps.wrestlers,
    })

    if (nextProps.simulate) {
      this.onStartMatch()
    }
  }

  onStartMatch = () => {
    if (this.state.wrestlers.length  > 1) {
      let story = this.onSimulate()
      this.setState({
        story,
      })
    }
  }

  onSimulate = () => {
    console.log(onSimulate)
    let story = simulateMatch(this.state.wrestlers, this.props.moves)
    logMatch(this.props.dispatch, story)
    return story
  }

  onDrop = (id) => {
    let wrestlerId = id.wrestler,
      isAlreadyInMatch = this.state.wrestlers.map(wrestler => wrestler.id).includes(wrestlerId)

    if (!isAlreadyInMatch) {
      let wrestlers = this.state.wrestlers.slice(),
        wrestler = this.props.allWrestlers.filter((wrestler) => wrestler.id === wrestlerId)[0]

      wrestlers.push(wrestler)

      this.setState({
        wrestlers,
      })
    }
  }

  onRemoveWrestler = (wrestlerToRemove) => {
    let wrestlerId = wrestlerToRemove.id,
      wrestlers = this.state.wrestlers
        .filter((wrestler) => wrestler.id !== wrestlerId)

    this.setState({
      wrestlers,
    })
  }

  render() {
    console.log(this.props.allWrestlers)
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
              { inactive : !isValidMatch })}>
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
                          <span className="match__rating">
                            &nbsp; ({wrestler.rating})
                          </span>
                          <span onClick={this.onRemoveWrestler.bind(this, wrestler)}
                            className="remove">
                            &nbsp; (remove)
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
              <div className={`droparea ${(this.state.story.length > 0 ? "inactive" : "active")} match__names`}>
                <span className="match__name">
                  Drop wrestlers here
                </span>
              </div>
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
