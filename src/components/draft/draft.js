import React from "react"
import Brand from "../brand/brand"
import * as wrestlersActions from "../../actions/wrestlers"
import { connect } from "react-redux"
import { toSlug } from "../../helpers/slugs"
import "./stylesheets/main"

class Draft extends React.Component {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    brands: React.PropTypes.array.isRequired,
    wrestlers: React.PropTypes.array.isRequired,
  }

  displayName = "Draft"

  render() {
    return (
      <div className="brands-wrestlers no-select">
        <div className="row">
          {this.props.brands.map((brand, key) => {
              let wrestlers = this.props.wrestlers
                .filter((wrestler) => wrestler.brand === brand.name)
                .sort((a, b) => a.rating < b.rating)
            return (
              <Brand
                id={brand.id}
                key={brand.id}
                name={brand.name}
                canDragAndDrop={true}
                wrestlers={wrestlers}
              />
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
}))(Draft)
