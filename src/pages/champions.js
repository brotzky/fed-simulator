import React from "react"
import Championships from "../components/championships/championships"
import * as championshipActions from "../actions/championship"
import Brand from "../components/brand/brand"
import Helmet from "react-helmet"
import { connect } from "react-redux"
import "./stylesheets/champions"

class ChampionsPage extends React.Component {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    brands: React.PropTypes.array.isRequired,
    wrestlers: React.PropTypes.array.isRequired,
    championships: React.PropTypes.array.isRequired,
  }

  displayName = "ChampionsPage"

  onReset = (event) => {
    event.preventDefault()
    this.props.dispatch(
      championshipActions.clearChampionships()
    )
  }

  render() {
    return (
      <div className="page champions">
        <Helmet title="Championship Management" />
        <div className="navigation navigation--secondary">
          <div className="navigation__item">
            <a onKeyPress={this.onReset}
              onClick={this.onReset}
              href="#">
              Clear all set Champions
            </a>
          </div>
        </div>
        <Championships championships={this.props.championships} />
        <div className="row">
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
      </div>
    )
  }
}

export default connect(state => ({
  brands: state.brands,
  championships: state.championships,
  wrestlers: state.wrestlers,
}))(ChampionsPage)
