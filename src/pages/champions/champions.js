import "./stylesheets/champions"
import { connect } from "react-redux"
import * as championshipActions from "../../actions/championship"
import Brand from "../../components/brand/brand"
import Championships from "../../components/championships/championships"
import Helmet from "react-helmet"
import React from "react"
import Secondary from "../../components/page/secondary"

class ChampionsPage extends React.Component {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    brands: React.PropTypes.array.isRequired,
    wrestlers: React.PropTypes.array.isRequired,
    championships: React.PropTypes.array.isRequired,
  }

  displayName = "ChampionsPage"

  onClear = (event) => {
    event.preventDefault()
    this.props.dispatch(
      championshipActions.clear()
    )
  }

  render() {
    return (
      <main className="page-section champions">
        <Helmet title="Championships" />
        <If condition={this.props.brands.length > 0}>
          <div className="navigation navigation--secondary">
            <ul className="navigation__list">
              <li className="navigation__item">
                <a onKeyPress={this.onClear}
                  onClick={this.onClear}
                  href="#">
                  Vacate all championships
                </a>
              </li>
            </ul>
          </div>
          <div className="inpage-content">
            <div className="row">
              {this.props.brands.filter(brand => brand.default === false).map((brand) => {
                let wrestlers = this.props.wrestlers
                  .filter(wrestler => wrestler.brand === brand.name),
                  championships = this.props.championships
                    .filter(championship => championship.brand === brand.name)
                    .sort((a, b) => a.rating > b.rating ? 1 : -1)
                return (
                  <div key={brand.id}
                    className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                      <div className="row clearfix">
                        <div className="col-xs-12">
                          <Championships
                            championships={championships}
                            showBadge={true}
                          />
                        </div>
                      </div>
                      <Brand
                        model={brand}
                        canDragAndDrop={true}
                        wrestlers={wrestlers}
                        showBrandLogo={false}
                      />
                  </div>
                )
              })}
            </div>
          </div>
        </If>
      </main>
    )
  }
}

export default connect(state => ({
  brands: state.brands,
  championships: state.championships,
  wrestlers: state.wrestlers,
}))(ChampionsPage)
