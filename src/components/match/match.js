import React from "react"
import weighted from "weighted"
import classNames from "classnames"
import { Droppable } from "react-drag-and-drop"
import { connect } from "react-redux"
import Story from "../story/story"
import * as championshipActions from "../../actions/championship"
import * as wrestlersActions from "../../actions/wrestlers"
import { randomiseWrestlers, simulateMatch, logMatch } from "../../helpers/match"
import FontAwesome from "react-fontawesome"
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
    allWrestlers: React.PropTypes.array.isRequired,
    randomise: React.PropTypes.any,
    simulate: React.PropTypes.any,
    clear: React.PropTypes.any,
    brand: React.PropTypes.string,
  }

  static defaultProps = {
    randomise: false,
    simulate: false,
    clear: false,
    brand: "Default",
  }

  state = defaultState

  displayName = "Match"

  componentWillReceiveProps(nextProps) {

    if (nextProps.clear && nextProps.clear !== this.props.clear) {
      this.onClear()
    }

    if (nextProps.randomise && nextProps.randomise !== this.props.randomise) {
      this.onRandomise()
    }

    if (nextProps.simulate !== false && nextProps.simulate !== this.props.simulate) {
      this.onStartMatch()
    }
  }

  onClear() {
    this.setState({
      ...defaultState
    })
  }

  onRandomise() {
    let wrestlers = this.props.allWrestlers
    if (this.props.brand !== "Default") {
      wrestlers = wrestlers.filter(wrestler => wrestler.brand === this.props.brand)
    }
    this.setState({
      wrestlers: randomiseWrestlers(wrestlers)
    })
  }

  shouldResim() {
    if (this.state.story.length > 0) {
      this.setState({
        story: [],
      })
    }
  }

  onStartMatch() {
    if (this.state.wrestlers.length  > 1) {
      let story = this.onSimulate()
      this.setState({
        story,
      })
    }
  }

  onSimulate() {
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

      this.shouldResim()
    }
  }

  onRemoveWrestler(wrestlerToRemove) {
    let wrestlerId = wrestlerToRemove.id,
      wrestlers = this.state.wrestlers
        .filter((wrestler) => wrestler.id !== wrestlerId)

    this.setState({
      wrestlers,
    })

    this.shouldResim()
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
              { inactive : !isValidMatch }
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
                            &nbsp; <FontAwesome name="remove" />
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
              <If condition={this.state.story.length === 0}>
                <div className="droparea">
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
