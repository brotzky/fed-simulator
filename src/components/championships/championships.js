import React from "react"
import Icon from "../icon/icon"
import * as championshipsActions from "../../actions/championship"
import { connect } from "react-redux"
import classNames from "classnames"
import { Draggable, Droppable } from "react-drag-and-drop"
import "./stylesheets/championships"

class Championships extends React.Component {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    championships: React.PropTypes.array.isRequired,
    canDragAndDrop: React.PropTypes.bool,
    showBadge: React.PropTypes.bool,
  }

  static contextTypes = {
    toSlug: React.PropTypes.func.isRequired,
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
    const Vacant = () => {
      return <span>Vacant</span>
    }
    return (
      <div className="championships">
        {this.props.championships
          .sort((prev, current) => prev.sequence > current.sequence)
          .map((championship, key) => {
          let active = championship.wrestlers.length > 0
              ? "active"
              : "vacant"
          return (
            <div key={key}
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
                <span className="hvr-push">
                  <Icon name={championship.name} />
                </span>
                <div className={classNames([
                  "championship__holdername",
                  `championship__holdername--${this.context.toSlug(championship.name)}`])}>
                  <Choose>
                    <When condition={championship.wrestlers.length > 0}>
                      {championship.wrestlers.map((wrestler, key) => {
                        return (
                          <span key={key}
                            className="truncate">
                            {wrestler.name}
                          </span>
                        )
                      })}
                    </When>
                    <Otherwise>
                      <Vacant />
                    </Otherwise>
                  </Choose>
                  <If condition={championship.tag && championship.wrestlers.length === 0 || championship.tag && championship.wrestlers.length === 1}>
                    <Vacant />
                  </If>
                </div>
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
