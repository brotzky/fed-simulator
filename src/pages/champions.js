import React from "react"
import Championships from "../components/championships/championships"
import Brand from "../components/brand/brand"
import Helmet from "react-helmet"
import { connect } from "react-redux"
import "./stylesheets/champions"

class ChampionsPage extends React.Component {

  static propTypes = {
    brands: React.PropTypes.array.isRequired,
    wrestlers: React.PropTypes.array.isRequired,
    championships: React.PropTypes.array.isRequired,
  }

  displayName = "ChampionsPage"

  render() {
    return (
      <div className="page champions">
        <Helmet title="Championship Management" />
        <Championships championships={this.props.championships} />
        {this.props.brands.filter((brand) => brand.name.toLowerCase() !== "default").map((brand, key) => {
          let wrestlers = this.props.wrestlers
            .filter((wrestler) => wrestler.brand === brand.name)
            .sort((a, b) => a.rating < b.rating)
          return (
            <div
              key={brand.id}
              className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <Brand
                id={brand.id}
                name={brand.name}
                canDragAndDrop={true}
                wrestlers={wrestlers}
                showBrandLogo={false}
              />
            </div>
          )
        })}
      </div>
    )
  }
}

export default connect(state => ({
  brands: state.brands,
  championships: state.championships,
  wrestlers: state.wrestlers,
}))(ChampionsPage)
