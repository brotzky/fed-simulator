import React from "react"
import weighted from "weighted"
import { Droppable } from "react-drag-and-drop"
import { connect } from "react-redux"
import Story from "../story/story"
import * as championshipActions from "../../actions/championship"
import * as wrestlersActions from "../../actions/wrestlers"
import { SimMatch } from "./sim-match.helper"
import { toSlug } from "../../helpers/slugs"
import eventEmitter from "../../helpers/event-emitter"
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
const getWeightedArrayOfLength = (length) => new Array(length).fill((1 / length))
const getWrestler = (wrestlers) => weighted.select(wrestlers, getWeightedArrayOfLength(wrestlers.length))

class Match extends React.Component {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    moves: React.PropTypes.array.isRequired,
    byPassBrandFilter: React.PropTypes.bool,
    wrestlers: React.PropTypes.array.isRequired,
  }

  static defaultProps = {
    byPassBrandFilter: false,
  }

  constructor() {
    super()
    let onStartMatch = this.onStartMatch.bind(this),
      onRandomiseMatch = this.onRandomiseMatch.bind(this),
      onClearMatch = this.onClearMatch.bind(this)

    this.eventList = []
    this.eventList.push(
      eventEmitter.addListener("bellRung", () => {
        onStartMatch()
      }),
      eventEmitter.addListener("randomiseMatch", (brandName) => {
        onRandomiseMatch(brandName)
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

  onRandomiseMatch = (brandName) => {
    let wrestlers = [],
      randomBool = weighted.select(settings.male.options, settings.male.weights),
      amountOfWrestlers = weighted.select(settings.amount.options, settings.amount.weights),
      filteredWrestlers = this.props.wrestlers.filter((wrestler) =>
        (!this.props.byPassBrandFilter && brandName === "Default" || wrestler.brand === brandName)
          && wrestler.male === randomBool)

    while (amountOfWrestlers > 0) {
      let chosenWrestler = getWrestler(filteredWrestlers)
      // update filteredWrestlers to lose this wrestler so they dont vs themself
      filteredWrestlers = filteredWrestlers.filter((wrestler) => wrestler.id !== chosenWrestler.id)
      wrestlers.push(
        chosenWrestler
      )
      amountOfWrestlers--
    }

    this.setState({
      wrestlers,
    })
  }

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
      ).ringBell()

      let winnersAction = story.slice(-1).pop().details
      this.props.dispatch([
        wrestlersActions.awardMatchPoints({...winnersAction}),
        championshipActions.checkMove({...winnersAction}),
      ])

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
                <Story collection={this.state.story} />
              </If>
            </When>
          </Choose>
          <Droppable
            types={[
              "wrestler",
            ]}
            onDrop={this.onDrop}>
            <div className={`droparea ${(this.state.story.length > 0 ? "inactive" : "active")} match__names`}>
              <span className="match__name">
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
