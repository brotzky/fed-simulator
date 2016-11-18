import React from "react"
import { connect } from "react-redux"
import Moves from "./moves"
import * as matchActions from "../../actions/match"
import { toSlug } from "../../helpers/slugs"

class Selection extends React.Component {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    buckets: React.PropTypes.array.isRequired,
    drops: React.PropTypes.array.isRequired,
    match: React.PropTypes.object.isRequired,
  }

  displayName = "Selection"

  onClickHandler = (id) => {
    let wrestler = this.props.drops.filter((drop) => drop.id === id)[0]

    this.props.dispatch(
      matchActions.toggleWrestlerToMatch(wrestler)
    )
  }

  render() {
    const SelectionItem = ({ id, name, onClickHandler}) => {
      const slugName = toSlug(name)
      const ids = Object.keys(this.props.match.wrestlers).map(f=>this.props.match.wrestlers[f].id)
      const isActive = ids.includes(id)
      return (
        <span className="selection__item"
          onClick={() => onClickHandler(id)}>
          <span className={`selection__icon icon-${slugName} ${(isActive ? "active" : "")}`}></span>
        </span>
      )
    }
    return (
      <div className="selection">
        {this.props.drops.map((drop, key) => {
          return (
            <SelectionItem
              key={key}
              {...drop}
              onClickHandler={this.onClickHandler}
            />
          )
        })}
      </div>
    )
  }
}

export default connect(state => ({
  buckets: state.buckets,
  drops: state.drops,
  match: state.match,
}))(Selection)
