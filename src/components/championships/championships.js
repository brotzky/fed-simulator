import React from "react"
import Icon from "../icon/icon"
import * as championshipsActions from "../../actions/championship"
import { connect } from "react-redux"
import { toSlug } from "../../helpers/slugs"
import { Draggable, Droppable } from "react-drag-and-drop"
import "./stylesheets/main"

class Championships extends React.Component {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    championships: React.PropTypes.array.isRequired,
    canDragAndDrop: React.PropTypes.bool,
  }

  static defaultProps = {
    canDragAndDrop: true,
  }

  onDrop = (championship, selection) => {
    if (!this.props.canDragAndDrop) {
      return
    }

    // re assign for clarity
    let wrestlerId = selection.wrestler,
      wrestler = this.props.wrestlers.filter((loopWrestler) => {
        return loopWrestler.id === wrestlerId
      })[0]

    // if the championship sex is the same as the wrestler
    if (wrestler.male === championship.male) {
      this.props.dispatch(
        championshipsActions.awardChampionship(championship, wrestlerId)
      )
    } else {
      alert("Gender conflict")
    }
  }

  displayName = "Championships"

  render() {
    return (
      <div className="championships row text-center">
        {this.props.championships.map((championship, key) => {
          let wrestler = false
          if (championship.wrestlerId) {
            wrestler = this.props.wrestlers.filter((wrestler) => {
              return wrestler.id === championship.wrestlerId
            })[0]
          }
          return (
            <div
              className="championships__championship"
              key={key}>
              <Droppable
                types={[
                  "wrestler",
                ]}
                onDrop={this.onDrop.bind(this, championship)}>
                <Icon name={championship.name} />
                <If condition={wrestler}>
                  <h4>
                    {wrestler.name}
                  </h4>
                </If>
              </Droppable>
            </div>
          )
        })}
      </div>
    )
  }
}

export default connect(state => ({
  wrestlers: state.wrestlers,
  championships: state.championships,
}))(Championships)
