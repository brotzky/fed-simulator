import React from "react"
import Match from "../../components/match/match"
import Brand from "../../components/brand/brand"
import Icon from "../../components/icon/icon"
import PPVs from "../../components/ppvs/ppvs"
import Helmet from "react-helmet"
import { connect } from "react-redux"
import { Sticky } from "react-sticky"
import { getRandomInt } from "../../helpers/math"
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
    brand: "",
    showPPVs: false,
    PPV: "Roadblock",
    showFemalesOnly: false,
    clear: true,
    randomise: false,
    simulate: false,
  }

  onRandomiseMatches = () => {
    this.setState({
      randomise: Date.now(),
    })
  }

  onSimulateMatches = () => {
    this.setState({
      simulate: Date.now(),
    })
  }

  onTogglePPVsSelection = () => {
    this.setState({
      showPPVs: !this.state.showPPVs
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

  displayName = "ShowPage"

  render() {
    let title = this.state.PPV
    title += this.state.brand !== "" ? ` presented by ${this.state.brand}` : ""
    let wrestlers = this.props.wrestlers
      .filter(wrestler => filterByFemales(wrestler, this.state.showFemalesOnly))

    if (this.state.brand !== "") {
      wrestlers = wrestlers.filter(wrestler => wrestler.brand === this.state.brand)
    }
    return (
      <div className={`page show ${this.context.toSlug(this.state.brand)}`}>
        <Helmet title="Create a Show" />
        <Sticky>
          <div className="navigation navigation--secondary">
            <ul className="navigation__list">
              {this.props.brands.map((brand, key) => {
                return (
                  <li key={key}
                    className="navigation__item">
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
                <a onKeyPress={() => this.onRandomiseMatches(this.state.brand)}
                  onClick={() => this.onRandomiseMatches(this.state.brand)}>
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
            </ul>
          </div>
          <div className="row visible-xs">
            <div className="col-xs-12">
              <Brand
                name={this.state.brand}
                showBrandLogo={false}
                byPassBrandFilter={true}
                wrestlers={wrestlers}
              />
            </div>
          </div>
        </Sticky>
        <div className="inpage-content">
          <div className="current-ppv ppvs__item hidden-sm hidden-xs">
            <Icon name={this.state.PPV} />
          </div>
          <div className="row">
            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-12">
              <h3 className="spaced">
                {title}
              </h3>
              <br />
              <h5>
                {getRandomInt(10000, 60000).toLocaleString()} fans in attendance
              </h5>
            </div>
            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-12">
              <span>
                <h3 onClick={this.onTogglePPVsSelection}
                  className="spaced">
                  <a>
                    Select a Show &#8681;
                  </a>
                </h3>
              </span>
            </div>
          </div>
          <br />
          <Choose>
            <When condition={this.state.showPPVs}>
              <div className="row">
                <div className="col-xs-12">
                  <PPVs
                    ppvs={this.props.ppvs}
                    onPPVClick={this.onChangePPV}
                  />
                </div>
              </div>
            </When>
            <Otherwise>
              <div className="row">
                <div className="col-lg-7 col-md-6 col-sm-6 col-xs-12">
                  {new Array(numberOfMatches).fill("").map((index, key) => {
                    return (
                      <Match
                        key={key}
                        brand={this.state.brand}
                        clear={this.state.clear}
                        randomise={this.state.randomise}
                        simulate={this.state.simulate}
                      />
                    )
                  })}
                </div>
                <div className="col-lg-5 col-md-6 col-sm-6 col-xs-12">
                  <Brand
                    name={this.state.brand}
                    showBrandLogo={false}
                    byPassBrandFilter={true}
                    wrestlers={wrestlers}
                  />
                </div>
              </div>
            </Otherwise>
          </Choose>
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
