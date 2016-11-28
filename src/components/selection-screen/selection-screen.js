import React from "react"
import { connect } from "react-redux"
import Search from "../search/search"
import Icon from "../icon/icon"
import Brand from "../brand/brand"
import * as matchActions from "../../actions/match"
import { toSlug } from "../../helpers/slugs"
import "./stylesheets/main"

class SelectionScreen extends React.Component {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    brands: React.PropTypes.array.isRequired,
    wrestlers: React.PropTypes.array.isRequired,
    match: React.PropTypes.object.isRequired,
    onWrestlerClick: React.PropTypes.func,
  }

  static defaultProps = {
    onWrestlerClick: () => {},
  }

  displayName = "SelectionScreen"

  onWrestlerClick = (id) => {
    let wrestler = this.props.wrestlers.filter((wrestler) => wrestler.id === id)[0]
    if (this.props.onWrestlerClick) {
      this.props.onWrestlerClick(wrestler)
    }
    this.props.dispatch(
      matchActions.toggleWrestlerToMatch(
        wrestler
      )
    )
  }

  render() {
    return (
      <div className="selection">
        <div className="selection__wrestlers">
          {this.props.brands.filter((brand) => brand.name.toLowerCase() !== "default").map((brand, key) => {
            let wrestlers = this.props.wrestlers
              .filter((wrestler) => wrestler.brand === brand.name)
              .sort((a, b) => a.rating < b.rating)
            return (
              <div
                key={brand.id}
                className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                <Brand
                  id={brand.id}
                  name={brand.name}
                  canDragAndDrop={false}
                  onWrestlerClick={this.onWrestlerClick}
                  wrestlers={wrestlers}
                />
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  brands: state.brands,
  wrestlers: state.wrestlers,
  match: state.match,
}))(SelectionScreen)
