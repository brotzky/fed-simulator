import React from "react"
import { Draggable, Droppable } from "react-drag-and-drop"
import Icon from "../icon/icon"
import Search from "../search/search"
import * as wrestlersActions from "../../actions/wrestlers"
import { connect } from "react-redux"
import Wrestlers from "../wrestlers/wrestlers"
import "./stylesheets/main"

class Brand extends React.Component {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    wrestlers: React.PropTypes.array.isRequired,
    canDragAndDrop: React.PropTypes.bool,
    onWrestlerClick: React.PropTypes.func,
    byPassBrandFilter: React.PropTypes.bool,
    showBrandLogo: React.PropTypes.bool,
  }

  static defaultProps = {
    wrestlers: [],
  }

  static contextTypes = {
    toSlug: React.PropTypes.func,
  }

  state = {
    search: "",
    brandName: "",
    byPassBrandFilter: false,
    showBrandLogo: true,
  }

  onDrop(brand, wrestler) {
    if (!this.props.canDragAndDrop) {
      return
    }
    this.props.dispatch(
      wrestlersActions.moveWrestler(
        brand,
        wrestler.wrestler,
      )
    )
  }

  onSearchUpdated = (search, brandName) => {
    this.setState({
      search,
      brandName,
    })
  }

  displayName = "Brand"

  render() {
    let searchIsActive = false,
      malewrestlers = [],
      femalewrestlers = [],
      wrestlers = this.props.wrestlers

    if (this.state.search !== "" && this.state.brandName === this.props.name) {
      searchIsActive = true
      wrestlers = wrestlers.filter((wrestler) => {
        return wrestler.name.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1
      })
    }
    malewrestlers = wrestlers.filter((wrestler) => (this.props.byPassBrandFilter || wrestler.brand === this.props.name) && wrestler.male === true),
    femalewrestlers = wrestlers.filter((wrestler) => (this.props.byPassBrandFilter || wrestler.brand === this.props.name) && wrestler.male === false)
    return (
      <Droppable
        key={this.props.id}
        className="brand"
        types={[
          "wrestler",
        ]}
        onDrop={this.onDrop.bind(this, this.props)}>
        <If condition={this.props.showBrandLogo}>
          <div className={`brand__icon text-center hidden-sm hidden-xs`}>
            <span className={`icon icon-${this.context.toSlug(this.props.name)}`}></span>
          </div>
        </If>
        <div className={`Droppable col-xs-4 wrestlers wrestlers--${this.context.toSlug(this.props.name)}`}>
          <div className={`wrestlers__search ${(searchIsActive ? "active" : "")}`}>
            <Search
              placeholder={`Filter choices`}
              onSearchUpdated={this.onSearchUpdated}
              brandName={this.props.name}
            />
          </div>
          <If condition={malewrestlers.length > 0}>
            <Wrestlers
              title="Male Wrestlers"
              canDragAndDrop={this.props.canDragAndDrop}
              wrestlers={malewrestlers}
              onWrestlerClick={this.props.onWrestlerClick}
            />
          </If>
          <If condition={femalewrestlers.length > 0}>
            <Wrestlers
              title="Female Wrestlers"
              canDragAndDrop={this.props.canDragAndDrop}
              wrestlers={femalewrestlers}
              onWrestlerClick={this.props.onWrestlerClick}
            />
          </If>
        </div>
        <h4 className={`wrestlers__header wrestlers__header--${this.context.toSlug(this.props.name)}`}>
          <span className="hidden-lg hidden-md">
            {this.props.name}: &nbsp;
          </span>
          <span>
            {wrestlers.length} wrestler{wrestlers.length !== 1 ? "s" : ""}
          </span>
        </h4>
      </Droppable>
    )
  }
}

export default connect(state => ({
  match: state.match,
}))(Brand)
