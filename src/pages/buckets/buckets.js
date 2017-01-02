import { connect } from "react-redux"
import Bucket from "../../components/bucket/bucket"
import * as wrestlersAction from "../../actions/wrestlers"
import * as brandsAction from "../../actions/brands"
import * as championshipAction from "../../actions/championship"
import Helmet from "react-helmet"
import React from "react"

const validation = {
  "brand": {
    "id": "readonly",
    "name": "input",
  },
  "wrestler": {
    "id": "readonly",
    "brand": "input",
    "male": "bool",
    "name": "input",
    "rating": "input",
  },
  "championship": {
    "id": "readonly",
    "name": "input",
    "brand": "input",
    "male": "bool",
    "sequence": "input",
    "changes": "input",
    "canMoveBrands": "bool",
    "wrestlers": "ignore",
  },
}

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
      <div className="page buckets">
        <Helmet title="Buckets" />
        <div className="inpage-content statistic">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
              <Bucket
                collection={this.props.brands}
                key={1}
                name="brand"
                onSaveBucket={this.onSaveBrand}
                validation={validation.brand}
              />
            </div>
            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
              <Bucket
                collection={this.props.wrestlers}
                key={2}
                name="wrestler"
                onSaveBucket={this.onSaveWrestler}
                validation={validation.wrestler}
              />
            </div>
            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
              <Bucket
                collection={this.props.championships}
                key={3}
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
}))(BucketsPage)
