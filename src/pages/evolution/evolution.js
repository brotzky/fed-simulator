import "./stylesheets/evolution.scss"
import { connect } from "react-redux"
import * as brandsAction from "../../actions/brands"
import * as championshipAction from "../../actions/championship"
import * as wrestlersAction from "../../actions/wrestlers"
import Bucket from "../../components/bucket/bucket"
import Helmet from "react-helmet"
import React from "react"
import PropTypes from "prop-types"
import Resets from "../../components/navigation/resets"
import Skeleton from "./skeleton"

class EvolutionPage extends React.Component {

  displayName = "EvolutionPage"

  static propTypes = {
    brands: PropTypes.array.isRequired,
    championships: PropTypes.array.isRequired,
    wrestlers: PropTypes.array.isRequired,
  }

  onSaveWrestler = (wrestler) => {
    this.props.dispatch(
      wrestlersAction.update(wrestler)
    )
  }

  onSaveBrand = (updatedBrand) => {
    const original = this.props.brands.find((brand) => brand.id === updatedBrand.id)
    console.log(original.name)
    this.props.dispatch(
      brandsAction.update(updatedBrand, original)
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
