import React from "react"
import weighted from "weighted"
import { Droppable } from "react-drag-and-drop"
import { connect } from "react-redux"
import Story from "../story/story"
import * as championshipActions from "../../actions/championship"
import * as wrestlersActions from "../../actions/wrestlers"
import { randomiseWrestlers, simulateMatch, logMatch } from "../../helpers/match"
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
    byPassBrandFilter: React.PropTypes.bool,
    wrestlers: React.PropTypes.array.isRequired,
  }

  static contextTypes = {
    eventEmitter: React.PropTypes.object.isRequired,
  }

  static defaultProps = {
    byPassBrandFilter: false,
  }

  constructor(props, context) {
    super(props)
    let onStartMatch = this.onStartMatch.bind(this),
      onRandomiseWrestlers = this.onRandomiseWrestlers.bind(this),
      onClearMatch = this.onClearMatch.bind(this),
      eventEmitter = context.eventEmitter

    this.eventList = []
    this.eventList.push(
      eventEmitter.addListener("bellRung", () => {
        onStartMatch()
      }),
      eventEmitter.addListener("randomiseMatch", (brandName) => {
        onRandomiseWrestlers(brandName)
      }),
      eventEmitter.addListener("clearMatch", (brandName) => {
        onClearMatch()
      }),
    )
  }

  state = defaultState

  displayName = "Match"

  onClearMatch = () => {
    this.setState({
      ...defaultState
    })
  }

  onRandomiseWrestlers = (brandName) => {
    let wrestlers = this.props.wrestlers.filter(wrestler => (!this.props.byPassBrandFilter && brandName === "Default") || wrestler.brand === brandName)
    this.setState({
      wrestlers: randomiseWrestlers({wrestlers})
    })
  }

  onStartMatch = () => {
    if (this.state.wrestlers.length  > 1) {
      let story = simulateMatch(this.state.wrestlers, this.props.moves)
      logMatch(this.props.dispatch, story)
      this.setState({
        story,
      })
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

  onRemoveWrestler = (wrestlerToRemove) => {
    let wrestlerId = wrestlerToRemove.id,
      wrestlers = this.state.wrestlers
        .filter((wrestler) => wrestler.id !== wrestlerId)

    this.setState({
      wrestlers,
    })
  }

  componentWillUnmount() {
    this.eventList.forEach((eventItem) => {
      eventItem.remove()
    })
  }

  render() {
    let isValidMatch = this.state.wrestlers.length > 0
    return (
      <div className="match row">
        <Droppable
          types={[
            "wrestler",
          ]}
          onDrop={this.onDrop}>
          <div className={`col-xs-12 match__inner ${(isValidMatch ? "active" : "inactive")}`}>
            <Choose>
              <When condition={isValidMatch}>
                <div className="match__names">
                  {this.state.wrestlers.map((wrestler, key) => {
                    return (
                      <span key={key}
                        className="match__name">
                        <span>{wrestler.name}</span>
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
                    <Story collection={this.state.story} wrestlers={this.state.wrestlers} />
                  </div>
                </If>
              </When>
            </Choose>
            <div className={`droparea ${(this.state.story.length > 0 ? "inactive" : "active")} match__names`}>
              <span className="match__name">
                Drag and drop wrestlers here to create a match
              </span>
            </div>
          </div>
        </Droppable>
      </div>
    )
  }
}

export default connect(state => ({
  moves: state.moves,
  wrestlers: state.wrestlers,
}))(Match)
