import { connect } from "react-redux"
import * as wrestlersActions from "../../actions/wrestlers"
import Brand from "../../components/brand/brand"
import Helmet from "react-helmet"
import React from "react"
import "./stylesheets/draft"

class DraftPage extends React.Component {

  displayName = "DraftPage"

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    brands: React.PropTypes.array.isRequired,
    wrestlers: React.PropTypes.array.isRequired,
  }

  onSendToDraft = (event) => {
    event.preventDefault()
    this.props.dispatch(
      wrestlersActions.moveAllWrestlersToDefault()
    )
  }

  render() {
    const defaultBrand = this.props.brands.filter(brand => brand.default)[0]
    const nonDefaultBrands = this.props.brands
        .filter(brand => !brand.default)
        .sort((prev, current) => prev.sequence > current.sequence ? 1 : -1)
    const largeColumn = Math.round(12 / nonDefaultBrands.length)
    return (
      <main className="page-section draft">
        <Helmet title="Draft" />
        <If condition={this.props.brands.length > 0}>
          <div className="navigation navigation--secondary">
            <ul className="navigation__list">
              <li className="navigation__item">
                <a onKeyPress={this.onSendToDraft}
                  onClick={this.onSendToDraft}>
                  Start a draft
                </a>
              </li>
            </ul>
          </div>
          <div className="inpage-content">
            <div className="draft no-select">
              <div className="row">
                <div className="col-xs-12 col-lg-2 default">
                  <Brand
                    model={defaultBrand}
                    canDragAndDrop={true}
                    wrestlers={this.props.wrestlers.filter(wrestler => wrestler.brand === "Default")}
                    byPassBrandFilter={defaultBrand.default}
                    showBrandLogo={false}
                  />
                </div>
                <div className="col-xs-12 col-lg-10">
                  <div className="row">
                    {nonDefaultBrands.sort((prev, next) => prev.sequence > next.sequence ? 1 : -1).map((brand, key) => {
                      let wrestlers = this.props.wrestlers
                        .filter(wrestler => (brand.default === true && wrestler.brand === "") || wrestler.brand === brand.name)
                        .sort((a, b) => a.rating < b.rating ? 1 : -1)
                      return (
                        <div key={brand.id}
                          className={`col-lg-${largeColumn} col-md-3 col-sm-6 col-xs-12`}>
                          <Brand
                            model={brand}
                            canDragAndDrop={true}
                            wrestlers={wrestlers}
                            byPassBrandFilter={brand.default}
                            showBrandLogo={true}
                          />
                        </div>
                      )
                    })}
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </If>
      </main>
    )
  }
}

export default connect(state => ({
  brands: state.brands,
  wrestlers: state.wrestlers,
}))(DraftPage)
