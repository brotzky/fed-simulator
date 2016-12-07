import React from "react"
import Bell from "../../components/bell/bell"
import Match from "../../components/match/match"
import Brand from "../../components/brand/brand"
import Icon from "../../components/icon/icon"
import PPVs from "../../components/ppvs/ppvs"
import Helmet from "react-helmet"
import { connect } from "react-redux"
import "./stylesheets/show"

class ShowPage extends React.Component {

  static propTypes = {
    wrestlers: React.PropTypes.array.isRequired,
    ppvs: React.PropTypes.array.isRequired,
    brands: React.PropTypes.array.isRequired,
  }

  static contextTypes = {
    eventEmitter: React.PropTypes.object.isRequired,
    toSlug: React.PropTypes.func.isRequired,
  }

  state = {
    brand: "Raw",
    PPV: "Roadblock",
    showFemalesOnly: false,
  }

  onBellRung = () => {
    this.context.eventEmitter.emit("bellRung")
  }

  onRandomiseMatches = (brandName) => {
    this.context.eventEmitter.emit("randomiseMatch", brandName)
  }

  onRandomiseCardTriggerMatches = (brandName) => {
    this.context.eventEmitter.emit("randomiseMatch", brandName)
    this.context.eventEmitter.emit("bellRung")
  }

  onClearMatches = () => {
    this.context.eventEmitter.emit("clearMatch")
  }

  onchangePPV = (PPV) => {
    this.setState({
      PPV,
    })
  }

  onChangeBrand = (brand) => {
    this.setState({
      brand,
    })
  }

  onToggleWomenWrestlers = (event) => {
    event.preventDefault()
    this.setState({
      showFemalesOnly: !this.state.showFemalesOnly,
    })
  }

  displayName = "ShowPage"

  render() {
    const filterByBrand = (wrestler, brandName) => wrestler.brand === brandName
    const filterByFemales = (wrestler, showFemalesOnly) => !showFemalesOnly || (showFemalesOnly && wrestler.male === false)
    let numberOfMatches = 6,
      wrestlers = this.props.wrestlers
        .filter(wrestler => filterByFemales(wrestler, this.state.showFemalesOnly))
        if (this.state.brand !== "Default") {
          wrestlers = wrestlers.filter(wrestler => filterByBrand(wrestler, this.state.brand))
        }
    return (
      <div className={`page show ${this.context.toSlug(this.state.brand)}`}>
        <Helmet title="Create Show" />
        <div className="navigation navigation--secondary">
          {this.props.brands.map((brand, key) => {
            return (
              <div key={key}
                className="navigation__item">
                <a onKeyPress={this.onChangeBrand.bind(this, brand.name)}
                  onClick={this.onChangeBrand.bind(this, brand.name)}>
                  {(brand.name !== "Default") ? <Icon name={brand.name} /> : "All Brands"}
                </a>
              </div>
            )
          })}
          <div className="navigation__item">
            <a onKeyPress={this.onToggleWomenWrestlers}
              onClick={this.onToggleWomenWrestlers}
              href="#">
              &#x2640; Toggle Women Wrestlers
            </a>
          </div>
          <div className="navigation__item padding-left">
            <a onKeyPress={this.onRandomiseMatches.bind(this, this.state.brand)}
              onClick={this.onRandomiseMatches.bind(this, this.state.brand)}>
              Randomise
            </a>
            &nbsp; | &nbsp;
            <a onKeyPress={this.onBellRung}
              onClick={this.onBellRung}>
              Simulate
            </a>
            &nbsp; | &nbsp;
            <a onKeyPress={this.onClearMatches}
              onClick={this.onClearMatches}>
              Clear
            </a>
          </div>
          <div className="navigation__item">
            <a onKeyPress={this.onRandomiseCardTriggerMatches.bind(this, this.state.brand)}
              onClick={this.onRandomiseCardTriggerMatches.bind(this, this.state.brand)}>
              &#10227; Randomise & Simulate
            </a>
          </div>
        </div>
        <div className="inpage-content">
          <h2>
            {this.state.PPV} presented by {this.state.brand}
          </h2>
          <div className="current-ppv ppvs__item hidden-sm hidden-xs">
            <Icon name={this.state.PPV} />
          </div>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
              <Bell onBellRung={this.onBellRung} />
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
              <div className="dropdown">
                <span>
                  <h3 className="dropdown__title">
                    Select a PPV &#8681;
                  </h3>
                </span>
                <div className="dropdown__content">
                  <PPVs ppvs={this.props.ppvs} onPPVClick={this.onchangePPV} />
                </div>
              </div>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
              {new Array(numberOfMatches).fill("").map((index, key) => {
                return (
                  <Match
                    key={key}
                    showWrestlers={false}
                  />
                )
              })}
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
              <Brand
                name={this.state.brand}
                showBrandLogo={false}
                byPassBrandFilter={true}
                wrestlers={wrestlers}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  brands: state.brands,
  ppvs: state.ppvs,
  wrestlers: state.wrestlers,
}))(ShowPage)
