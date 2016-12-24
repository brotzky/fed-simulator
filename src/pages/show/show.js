import React from "react"
import classNames from "classnames"
import Match from "../../components/match/match"
import Brand from "../../components/brand/brand"
import Icon from "../../components/icon/icon"
import PPVs from "../../components/ppvs/ppvs"
import Helmet from "react-helmet"
import { connect } from "react-redux"
import { Sticky } from "react-sticky"
import * as showActions from "../../actions/show"
import { hashCode } from "../../helpers/hash"

import "./stylesheets/show"

const numberOfMatches = 12

class ShowPage extends React.Component {

  static propTypes = {
    wrestlers: React.PropTypes.array.isRequired,
    ppvs: React.PropTypes.array.isRequired,
    brands: React.PropTypes.array.isRequired,
    shows: React.PropTypes.array.isRequired,
  }

  static contextTypes = {
    toSlug: React.PropTypes.func.isRequired,
  }

  state = {
    showPPVs: false,
  }

  componentWillMount() {
    let currentShowId
    if (this.props.location.query && this.props.location.query.id) {
      currentShowId = this.props.location.query.id
    }

    let currentShow = this.props.shows.filter(show => show.id === currentShowId)

    if (currentShow.length === 0) {
      currentShow = {
        id: hashCode(Date()),
        brand: this.props.brands[0],
        PPV: this.props.ppvs[0],
        matches: [],
      }
    }

    this.setState({
      ...currentShow
    })
  }

  onRandomiseMatches = () => {
  }

  onSimulateMatches = () => {
  }

  onTogglePPVsSelection = () => {
    this.setState({
      showPPVs: !this.state.showPPVs
    })
  }

  onClearMatches = () => {
  }

  onChangePPV = (PPV) => {
    this.setState({
      PPV,
      showPPVs: false,
    })
  }

  onChangeBrand = (brandName) => {
    let selectedBrand = this.props.brands.find(brand => brand.name === brandName)
    this.setState({
      brand: selectedBrand,
    })
  }

  displayName = "ShowPage"

  render() {
    let wrestlers = this.props.wrestlers

    // we're filtering by a brand
    if (this.state.brand.name !== "") {
      wrestlers = wrestlers.filter(wrestler => wrestler.brand === this.state.brand.name)
    }
    console.log()
    return (
      <div className={`page show ${this.context.toSlug(this.state.brand.name)}`}>
        <Helmet title="Create a Show" />
        <div className="inpage-content">
          <div className={classNames(
            "row",
            { hide: !this.state.showPPVs }
          )}>
            <div className="col-xs-12">
              <PPVs
                ppvs={this.props.ppvs}
                onPPVClick={this.onChangePPV}
              />
            </div>
          </div>
          <div className="row text-center">
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
              <If condition={!this.state.showPPVs}>
                <div className="ppvs__current">
                  <div onClick={this.onTogglePPVsSelection}>
                    <Icon
                      name={this.state.PPV.name}
                    />
                    <i className="show--edit fa fa-pencil" aria-hidden="true"></i>
                  </div>
                  <hr />
                  <h4>
                    <div className="dropdown">
                      {this.state.brand.name !== "" ? this.state.brand.name : "all brands"} <i className="show--edit fa fa-pencil" aria-hidden="true"></i>
                      <ul className="dropdown__content">
                        {this.props.brands.map((brand, key) => {
                          return (
                            <li key={key}>
                              <a onClick={() => this.onChangeBrand(brand.name)}>
                                {brand.default ? "All" : brand.name}
                              </a>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  </h4>
                </div>
              </If>
              <div className="show__matches">
                <ul className="show__controls">
                  <li className="show__control">
                    <a onKeyPress={() => this.onRandomiseMatches(this.state.brandName)}
                      onClick={() => this.onRandomiseMatches(this.state.brandName)}>
                      Randomise
                    </a>
                    &nbsp; | &nbsp;
                    <a onKeyPress={this.onSimulateMatches}
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
                {new Array(numberOfMatches).fill("").map((index, key) => {
                  return (
                    <Match
                      key={key}
                      brand={this.state.brandName}
                      clear={this.state.clear}
                      randomise={this.state.randomise}
                      simulate={this.state.simulate}
                    />
                  )
                })}
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
              <Brand
                name={this.state.brand.name}
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
  shows: state.shows,
}))(ShowPage)
