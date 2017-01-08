import { connect } from "react-redux"
import * as wrestlersActions from "../../actions/wrestlers"
import Brand from "../../components/brand/brand"
import Helmet from "react-helmet"
import React from "react"

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
    return (
      <main className="page draft">
        <Helmet title="Draft Management" />
        <div className="navigation navigation--secondary">
          <ul className="navigation__list">
            <li className="navigation__item">
              <a onKeyPress={this.onSendToDraft}
                onClick={this.onSendToDraft}>
                Move All To Draft
              </a>
            </li>
          </ul>
        </div>
        <div className="inpage-content">
          <div className="draft no-select">
            <div className="row">
              {this.props.brands.sort((prev, next) => prev.sequence > next.sequence ? 1 : -1).map((brand, key) => {
                let wrestlers = this.props.wrestlers
                  .filter(wrestler => (brand.default === true && wrestler.brand === "") || wrestler.brand === brand.name)
                  .sort((a, b) => a.rating < b.rating ? 1 : -1)
                return (
                  <div
                    key={brand.id}
                    className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
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
      </main>
    )
  }
}

export default connect(state => ({
  brands: state.brands,
  wrestlers: state.wrestlers,
}))(DraftPage)
