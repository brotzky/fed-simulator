import React from "react"
import Bell from "../components/bell/bell"
import Match from "../components/match/match"
import Brand from "../components/brand/brand"
import Icon from "../components/icon/icon"
import PPVs from "../components/ppvs/ppvs"
import Helmet from "react-helmet"
import { connect } from "react-redux"
import eventEmitter from "../helpers/event-emitter"
import { toSlug } from "../helpers/slugs"
import "./stylesheets/show"

class ShowPage extends React.Component {

  static propTypes = {
    wrestlers: React.PropTypes.array.isRequired,
    ppvs: React.PropTypes.array.isRequired,
    brands: React.PropTypes.array.isRequired,
  }

  state = {
    brand: "Raw",
    PPV: "Roadblock",
    showFemalesOnly: false,
  }

  onBellRung = () => {
    eventEmitter.emit("bellRung")
  }

  onRandomiseMatches = (brandName) => {
    eventEmitter.emit("randomiseMatch", brandName)
  }

  onClearMatches = () => {
    eventEmitter.emit("clearMatch")
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
    let wrestlers = this.props.wrestlers
      .filter((wrestler) => wrestler.brand === this.state.brand && (!this.state.showFemalesOnly || (this.state.showFemalesOnly && wrestler.male === false))),
      numberOfMatches = 6
    return (
      <div className={`page show ${toSlug(this.state.brand)}`}>
        <Helmet title="Create Show" />
        <div className="navigation navigation--secondary">
          {this.props.brands
            .filter((brand) => brand.name !== "default")
            .map((brand, key) => {
              return (
                <div key={key}
                  className="navigation__item">
                  <a onKeyPress={this.onChangeBrand.bind(this, brand.name)}
                    onClick={this.onChangeBrand.bind(this, brand.name)}>
                    {brand.name} Event
                  </a>
                </div>
              )
            })
          }
          <div className="navigation__item">
            <a onKeyPress={this.onToggleWomenWrestlers}
              onClick={this.onToggleWomenWrestlers}
              href="#">
              &#x2640; Toggle Women Wrestlers
            </a>
          </div>
          <div className="navigation__item">
            <a onKeyPress={this.onRandomiseMatches.bind(this, this.state.brand)}
              onClick={this.onRandomiseMatches.bind(this, this.state.brand)}>
              Randomise Matches
            </a>
          </div>
          <div className="navigation__item">
            <a onKeyPress={this.onBellRung}
              onClick={this.onBellRung}>
              &#10227; Simulate matches
            </a>
          </div>
          <div className="navigation__item">
            <a onKeyPress={this.onClearMatches}
              onClick={this.onClearMatches}>
              Clear show
            </a>
          </div>
        </div>
        <div className="inpage-content">
          <h2>
            {this.state.PPV} presented by {this.state.brand}
          </h2>
          <div className="current-ppv ppvs_item hidden-sm hidden-xs">
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
