import "./stylesheets/brand.scss"
import { connect } from "react-redux"
import { Droppable } from "react-drag-and-drop"
import { filterFemales } from "../../helpers/filters"
import * as wrestlersActions from "../../actions/wrestlers"
import Icon from "../icon/icon"
import React from "react"
import PropTypes from "prop-types"
import Search from "../search/search"
import Wrestlers from "../wrestlers/wrestlers"

class Brand extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    wrestlers: PropTypes.array.isRequired,
    canDragAndDrop: PropTypes.bool,
    onWrestlerClick: PropTypes.func,
    byPassBrandFilter: PropTypes.bool,
    showBrandLogo: PropTypes.bool,
    model: PropTypes.shape({
      id: PropTypes.string.required,
      name: PropTypes.string.required,
      bgColour: PropTypes.string.required,
      textColour: PropTypes.string.isRequired,
    }),
  }

  static defaultProps = {
    wrestlers: [],
  }

  static contextTypes = {
    toSlug: PropTypes.func,
  }

  state = {
    search: "",
    brandName: "",
    showFemalesOnly: false,
    byPassBrandFilter: false,
    showBrandLogo: true,
  }

  onDrop(brand, wrestler) {
    if (!this.props.canDragAndDrop) {
      return
    }
    this.props.dispatch(
      wrestlersActions.moveWrestler(
        brand.model,
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

  onToggleWomenWrestlers = (event) => {
    event.preventDefault()
    this.setState({
      showFemalesOnly: !this.state.showFemalesOnly,
    })
  }

  displayName = "Brand"

  render() {
    const style = {
      backgroundColor: this.props.model.bgColour,
      color: this.props.model.textColour,
    }
    let searchIsActive = false,
      wrestlers = this.props.wrestlers.filter(wrestler => filterFemales(wrestler, this.state.showFemalesOnly))

    if (this.state.search !== "") {
      searchIsActive = true
      wrestlers = wrestlers.filter((wrestler) => {
        return wrestler.name.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1
      })
    }
    let malewrestlers = wrestlers.filter(wrestler => wrestler.male === true),
      femalewrestlers = wrestlers.filter(wrestler => wrestler.male === false)
    return (
      <Droppable
        className="brand"
        types={[
          "wrestler",
        ]}
        onDrop={this.onDrop.bind(this, this.props)}>
        <If condition={this.props.model.image && this.props.showBrandLogo}>
          <div className="brand__icon">
            <Icon
              name={this.props.model.name}
              image={this.props.model.image}
            />
          </div>
        </If>
        <div className="Droppable col-xs-12 wrestlers"
          style={style}>
          <If condition={(!this.props.model.image || this.props.model.default) && this.props.showBrandLogo}>
            <h3 className="brand__name">
              {this.props.model.name}
            </h3>
          </If>
          <div className={`wrestlers__search ${(searchIsActive ? "active" : "")}`}>
            <Search
              placeholder="Filter choices"
              onSearchUpdated={this.onSearchUpdated}
              brandName={this.props.model.name}
            />
          </div>
          <div className="brand__toggles">
            <a onKeyPress={this.onToggleWomenWrestlers}
              onClick={this.onToggleWomenWrestlers}
              href="#">
              &#x2640; Toggle
            </a>
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
        <h4 className={`wrestlers__header`}>
          {wrestlers.length} wrestler{wrestlers.length !== 1 ? "s" : ""}
        </h4>
      </Droppable>
    )
  }
}

export default connect(() => ({}))(Brand)
