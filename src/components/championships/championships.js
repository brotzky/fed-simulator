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

  onDrop = (championship, wrestler) => {
    if (!this.props.canDragAndDrop) {
      return
    }
    this.props.dispatch(
      championshipsActions.awardChampionship(championship, wrestler.wrestler)
    )
  }

  displayName = "Championships"

  render() {
    return (
      <div className="championships text-center">
        {this.props.championships.map((championship, key) => {
          let wrestler = false
          if (championship.wrestlerId) {
            console.log('hit')
            wrestler = this.props.wrestlers.filter((wrestler) => {
              console.log(wrestler.id, championship.wrestlerId, wrestler.id === championship.wrestlerId)
              return wrestler.id === championship.wrestlerId
            })[0]
          }
          return (
            <div
              className="championships__championship"
              key={key}>
              <Droppable
                types={["wrestler"]}
                onDrop={this.onDrop.bind(this, championship)}>
                <Icon name={championship.name} />
                <If condition={wrestler}>
                  <h4>{wrestler.name}</h4>
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
