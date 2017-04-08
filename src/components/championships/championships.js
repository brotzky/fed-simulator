import React from "react"
import PropTypes from "prop-types"
import ChampionshipBelt from "../championship-belt/championship-belt"
import * as championshipsActions from "../../actions/championship"
import { connect } from "react-redux"
import { Droppable } from "react-drag-and-drop"
import "./stylesheets/championships.scss"

class Championships extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    championships: PropTypes.array.isRequired,
    canDragAndDrop: PropTypes.bool,
    showBadge: PropTypes.bool,
  }

  static contextTypes = {
    toSlug: PropTypes.func.isRequired,
  }

  static defaultProps = {
    canDragAndDrop: true,
    showBadge: false,
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
        championshipsActions.awardChampionship(championship, wrestler)
      )
    } else {
      alert("Gender conflict")
    }
  }

  displayName = "Championships"

  render() {
    return (
      <div className="championships">
        {this.props.championships
          .sort((prev, current) => prev.sequence > current.sequence ? 1 : -1)
          .map((championship) => {
          let active = championship.wrestlers && championship.wrestlers.length > 0
              ? "active"
              : "inactive",
            fullName = championship.wrestlers && championship.wrestlers.length > 0
              ? championship.wrestlers.reduce((prev, current) => {
                prev = prev + ` & ${current.name}`
                return prev
              }, "").substring(2)
              : ""
          return (
            <div key={championship.id}
              className={`championship ${active}`}>
              <Droppable
                types={[
                  "wrestler",
                ]}
                onDrop={this.onDrop.bind(this, championship)}>
                <If condition={this.props.showBadge}>
                  <span className="badge">
                    {championship.changes}
                  </span>
                </If>
                <span className="championship__name">
                  <ChampionshipBelt
                    {...championship}
                    name={fullName}
                  />
                  {championship.name}
                </span>
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
}))(Championships)
