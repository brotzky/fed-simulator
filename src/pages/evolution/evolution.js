import "./stylesheets/evolution"
import { connect } from "react-redux"
import * as brandsAction from "../../actions/brands"
import * as championshipAction from "../../actions/championship"
import * as settingsAction from "../../actions/settings"
import * as wrestlersAction from "../../actions/wrestlers"
import Bucket from "../../components/bucket/bucket"
import Helmet from "react-helmet"
import React from "react"
import Resets from "../../components/navigation/resets"
import Skeleton from "./skeleton"

class EvolutionPage extends React.Component {

  displayName = "EvolutionPage"

  static propTypes = {
    brands: React.PropTypes.array.isRequired,
    championships: React.PropTypes.array.isRequired,
    wrestlers: React.PropTypes.array.isRequired,
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

  render() {
    return (
      <main className="page-section buckets">
        <Helmet title="Modifications" />
        <Resets />
        <div className="inpage-content">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 brand">
              <Bucket
                options={this.props.brands}
                key="brand"
                name="brand"
                onSave={this.onSaveBrand}
                skeleton={Skeleton.brand}
              />
            </div>
            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 wrestler">
              <Bucket
                options={this.props.wrestlers}
                key="wrestler"
                name="wrestler"
                onSave={this.onSaveWrestler}
                skeleton={Skeleton.wrestler}
              />
            </div>
            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 championship">
              <Bucket
                options={this.props.championships}
                key={"championships"}
                name="championships"
                onSave={this.onSaveChampionship}
                skeleton={Skeleton.championship}
              />
            </div>
          </div>
        </div>
      </main>
    )
  }
}

export default connect(state => ({
  brands: state.brands,
  championships: state.championships,
  wrestlers: state.wrestlers,
}))(EvolutionPage)
