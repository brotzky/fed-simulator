import React from "react"
import Brand from "../../components/brand/brand"
import * as wrestlersActions from "../../actions/wrestlers"
import Helmet from "react-helmet"
import { connect } from "react-redux"

class DraftPage extends React.Component {

  displayName = "DraftPage"

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    brands: React.PropTypes.array.isRequired,
    wrestlers: React.PropTypes.array.isRequired,
  }

  state = {
    showFemalesOnly: false,
  }

  onClear = (event) => {
    event.preventDefault()
    this.props.dispatch(
      wrestlersActions.clear()
    )
  }

  onSendToDraft = (event) => {
    event.preventDefault()
    this.props.dispatch(
      wrestlersActions.moveAllWrestlersToDefault()
    )
  }

  onToggleWomenWrestlers = (event) => {
    event.preventDefault()
    this.setState({
      showFemalesOnly: !this.state.showFemalesOnly,
    })
  }

  render() {
    return (
      <div className="page draft">
        <Helmet title="Draft Management" />
        <div className="navigation navigation--secondary">
          <ul className="navigation__list">
            <li className="navigation__item">
              <a
                onKeyPress={this.onSendToDraft}
                onClick={this.onSendToDraft}>
                Move All To Draft
              </a>
            </li>
            <li className="navigation__item">
              <a
                onKeyPress={this.onClear}
                onClick={this.onClear}>
                Reset Wrestlers
              </a>
            </li>
            <li className="navigation__item">
              <a onKeyPress={this.onToggleWomenWrestlers}
                onClick={this.onToggleWomenWrestlers}
                href="#">
                &#x2640; Toggle
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
                .filter(wrestler => !this.state.showFemalesOnly || (this.state.showFemalesOnly && wrestler.male === false))
                  .sort((a, b) => a.rating < b.rating)
                return (
                  <div
                    key={brand.id}
                    className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                    <Brand
                      id={brand.id}
                      name={brand.name}
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
    )
  }
}

export default connect(state => ({
  brands: state.brands,
  wrestlers: state.wrestlers,
}))(DraftPage)
