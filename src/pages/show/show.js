import React from "react"
import Match from "../../components/match/match"
import Brand from "../../components/brand/brand"
import Icon from "../../components/icon/icon"
import PPVs from "../../components/ppvs/ppvs"
import Helmet from "react-helmet"
import { connect } from "react-redux"
import { Sticky } from "react-sticky"
import "./stylesheets/show"

const numberOfMatches = 6
const filterByBrand = (wrestler, brandName) => wrestler.brand === brandName
const filterByFemales = (wrestler, showFemalesOnly) => !showFemalesOnly || (showFemalesOnly && wrestler.male === false)

class ShowPage extends React.Component {

  static propTypes = {
    wrestlers: React.PropTypes.array.isRequired,
    ppvs: React.PropTypes.array.isRequired,
    brands: React.PropTypes.array.isRequired,
  }

  static contextTypes = {
    toSlug: React.PropTypes.func.isRequired,
  }

  state = {
    brand: "Default",
    PPV: "Roadblock",
    showFemalesOnly: false,
    clear: true,
    randomise: false,
    simulate: false,
  }

  onRandomiseMatches = () => {
    this.setState({
      randomise: true,
    })
  }

  onSimulateMatches = () => {
    this.setState({
      simulate: Date.now(),
    })
  }

  onClearMatches = () => {
    this.setState({
      clear: Date.now(),
    })
  }

  onChangePPV = (PPV) => {
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

  onRandomiseCardTriggerMatches = () => {
    this.onRandomiseMatches()
    this.onSimulateMatches()
  }

  displayName = "ShowPage"

  render() {
    let title = this.state.PPV
    title += this.state.brand !== "Default" ? ` presented by ${this.state.brand}` : ""
    let wrestlers = this.props.wrestlers
      .filter(wrestler => filterByFemales(wrestler, this.state.showFemalesOnly))
      if (this.state.brand !== "Default") {
        wrestlers = wrestlers.filter(wrestler => filterByBrand(wrestler, this.state.brand))
      }
    return (
      <div className={`page show ${this.context.toSlug(this.state.brand)}`}>
        <Helmet title="Create Show" />
        <Sticky>
          <div className="navigation navigation--secondary">
            <ul className="navigation__list">
              {this.props.brands.map((brand, key) => {
                return (
                  <li className="navigation__item" key={key}>
                    <a>
                      <Icon
                        name={brand.name}
                        onClick={this.onChangeBrand}
                      />
                    </a>
                  </li>
                )
              })}
              <li className="navigation__item">
                <a onKeyPress={this.onToggleWomenWrestlers}
                  onClick={this.onToggleWomenWrestlers}
                  href="#">
                  &#x2640; Toggle
                </a>
                </li>
                <li className="navigation__item">
                <a onKeyPress={this.onRandomiseMatches.bind(this, this.state.brand)}
                  onClick={this.onRandomiseMatches.bind(this, this.state.brand)}>
                  Randomise
                </a>
                &nbsp; | &nbsp;
                <a onKeyPress={this.onSimulateMatches}
                  title={title}
                  onClick={this.onSimulateMatches}>
                  Simulate
                </a>
                &nbsp; | &nbsp;
                <a onKeyPress={this.onClearMatches}
                  onClick={this.onClearMatches}>
                  Clear
                </a>
                </li>
                <li className="navigation__item">
                <a onKeyPress={this.onRandomiseCardTriggerMatches.bind(this, this.state.brand)}
                  onClick={this.onRandomiseCardTriggerMatches.bind(this, this.state.brand)}>
                  &#10227; Randomise & Simulate
                </a>
              </li>
            </ul>
          </div>
        </Sticky>
        <div className="inpage-content">
          <div className="current-ppv ppvs__item hidden-sm hidden-xs">
            <Icon name={this.state.PPV} />
          </div>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
              <h3 className="spaced">
                {title}
              </h3>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
              <div className="dropdown">
                <span>
                  <h3 className="spaced dropdown__title">
                    Select a Show &#8681;
                  </h3>
                </span>
                <div className="dropdown__content">
                  <PPVs ppvs={this.props.ppvs} onPPVClick={this.onChangePPV} />
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
                    brandName={this.state.brand}
                    clear={this.state.clear}
                    randomise={this.state.randomise}
                    simulate={this.state.simulate}
                  />
                )
              })}
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
              <Brand
                name={this.state.brand}
                showBrandLogo={false}
                byPassBrandFilter={true}
                wrestlers={this.props.wrestlers}
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
