import "./stylesheets/buckets"
import { connect } from "react-redux"
import * as brandsAction from "../../actions/brands"
import * as championshipAction from "../../actions/championship"
import * as settingsAction from "../../actions/settings"
import * as wrestlersAction from "../../actions/wrestlers"
import Bucket from "../../components/bucket/bucket"
import Helmet from "react-helmet"
import React from "react"
import validation from "./validation"

class BucketsPage extends React.Component {

  displayName = "BucketsPage"

  static propTypes = {
    brands: React.PropTypes.array.isRequired,
    championships: React.PropTypes.array.isRequired,
    wrestlers: React.PropTypes.array.isRequired,
    shows: React.PropTypes.array.isRequired,
    ppvs: React.PropTypes.array.isRequired,
  }

  onSaveWrestler = (wrestler) => {
    this.props.dispatch(
      wrestlersAction.update(wrestler)
    )
  }

  onSaveBrand = (brand) => {
    this.props.dispatch(
      brandsAction.update(brand)
    )
  }

  onSaveChampionship = (championship) => {
    this.props.dispatch(
      championshipAction.update(championship)
    )
  }

  onReset = () => {
    if (confirm("Are you really sure you want to reset everything?")) {
      this.props.dispatch(
        settingsAction.reset()
      )
    }
  }

  render() {
    const allowed = [
      "shows",
      "ppvs",
      "wrestlers",
      "brands",
      "championships",
    ]
    const filtered = Object.keys(this.props)
      .filter(key => allowed.includes(key))
      .reduce((newProps, key) => {
        newProps[key] = this.props[key]
        return newProps
      }, {})
    return (
      <div className="page buckets">
        <Helmet title="Buckets" />
        <div className="navigation navigation--secondary">
          <ul className="navigation__list">
            <li className="navigation__item">
              <a onKeyPress={this.onReset}
                onClick={this.onReset}>
                Reset <strong>EVERYTHING</strong>
              </a>
            </li>
            <li className="navigation__item">
              <a download="universe-sim.json"
                href={`data:text/jsoncharset=utf-8,${encodeURIComponent(JSON.stringify(filtered))}`}>
                Download an export
              </a>
            </li>
          </ul>
        </div>
        <div className="inpage-content statistic">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 brand">
              <Bucket
                collection={this.props.brands}
                key="brand"
                name="brand"
                onSaveBucket={this.onSaveBrand}
                validation={validation.brand}
              />
            </div>
            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 wrestler">
              <Bucket
                collection={this.props.wrestlers}
                key="wrestler"
                name="wrestler"
                onSaveBucket={this.onSaveWrestler}
                validation={validation.wrestler}
              />
            </div>
            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 championship">
              <Bucket
                collection={this.props.championships}
                key={"championships"}
                name="championships"
                onSaveBucket={this.onSaveChampionship}
                validation={validation.championship}
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
  championships: state.championships,
  wrestlers: state.wrestlers,
  shows: state.shows,
  ppvs: state.ppvs,
}))(BucketsPage)
