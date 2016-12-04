import React from "react"
import Brand from "../components/brand/brand"
import * as wrestlersActions from "../actions/wrestlers"
import Helmet from "react-helmet"
import { connect } from "react-redux"
import "./stylesheets/draft"

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

  onReset = (event) => {
    event.preventDefault()
    this.props.dispatch({
      type: "RESET",
    })
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
      showFemalesOnly: !this.state.showFemalesOnly
    })
  }

  render() {
    return (
      <div className="page draft">
        <Helmet title="Draft Management" />
        <div className="navigation navigation--secondary">
          <div className="navigation__item">
            <a
              onKeyPress={this.onSendToDraft}
              onClick={this.onSendToDraft}>
              Move All wrestlers to Draft
            </a>
          </div>
          <div className="navigation__item">
            <a
              onKeyPress={this.onReset}
              onClick={this.onReset}>
              Move All wrestlers to their current brand
            </a>
          </div>
          <div className="navigation__item">
            <a onKeyPress={this.onToggleWomenWrestlers}
              onClick={this.onToggleWomenWrestlers}
              href="#">
              Toggle Women Wrestlers
            </a>
          </div>
        </div>
        <div className="draft no-select">
          <div className="row">
            {this.props.brands.map((brand, key) => {
              let wrestlers = this.props.wrestlers
                .filter((wrestler) => wrestler.brand === brand.name && (!this.state.showFemalesOnly || (this.state.showFemalesOnly && wrestler.male === false)))
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
                    showBrandLogo={true}
                  />
                </div>
              )
            })}
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
