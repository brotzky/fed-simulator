import "./stylesheets/buckets"
import { connect } from "react-redux"
import * as brandsAction from "../../actions/brands"
import * as championshipAction from "../../actions/championship"
import * as settingsAction from "../../actions/settings"
import * as wrestlersAction from "../../actions/wrestlers"
import Bucket from "../../components/bucket/bucket"
import Helmet from "react-helmet"
import React from "react"
import Resets from "../../components/navigation/resets"
import validation from "./validation"

class BucketsPage extends React.Component {

  displayName = "BucketsPage"

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
      </main>
    )
  }
}

export default connect(state => ({
  brands: state.brands,
  championships: state.championships,
  wrestlers: state.wrestlers,
}))(BucketsPage)
