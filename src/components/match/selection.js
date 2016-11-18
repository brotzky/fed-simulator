import React from "react"
import { connect } from "react-redux"
import Moves from "./moves"
import Search from "../search/search"
import Icon from "../icon/icon"
import * as matchActions from "../../actions/match"
import { toSlug } from "../../helpers/slugs"

class Selection extends React.Component {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    buckets: React.PropTypes.array.isRequired,
    wrestlers: React.PropTypes.array.isRequired,
    match: React.PropTypes.object.isRequired,
  }

  displayName = "Selection"

  state = {
    search: "",
  }

  onSearchUpdated = (search) => {
    this.setState({
      search,
    })
  }

  onClickHandler = (id) => {
    let wrestler = this.props.wrestlers.filter((drop) => drop.id === id)[0]

    this.props.dispatch(
      matchActions.toggleWrestlerToMatch(wrestler)
    )
  }

  render() {
    const SelectionItem = ({ id, name, bucket, onClickHandler}) => {
      const slugName = toSlug(name)
      const ids = Object.keys(this.props.match.wrestlers).map(f=>this.props.match.wrestlers[f].id)
      return (
        <span className={`selection__item selection__item--${toSlug(bucket)}`}>
          <Icon name={name} onClick={() => onClickHandler(id)} active={ids.includes(id)} />
        </span>
      )
    }
    let wrestlers = this.props.wrestlers.slice()
    if (this.state.search !== "") {
      wrestlers = wrestlers.filter((drop) => {
        return drop.name.toLowerCase().indexOf(this.state.search) > -1
      })
    }
    return (
      <div className="selection">
        <div className="selection__search">
          <Search
            placeholder={`Filter choices`}
            onSearchUpdated={this.onSearchUpdated}
          />
        </div>
        <div className="selection__drops">
          {wrestlers.map((drop, key) => {
            return (
              <SelectionItem
                key={key}
                {...drop}
                onClickHandler={this.onClickHandler}
              />
            )
          })}
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  buckets: state.buckets,
  wrestlers: state.wrestlers,
  match: state.match,
}))(Selection)
