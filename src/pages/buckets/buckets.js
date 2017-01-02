import { connect } from "react-redux"
import Bucket from "../../components/bucket/bucket"
import * as wrestlersAction from "../../actions/wrestlers"
import * as brandsAction from "../../actions/brands"
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
  }
}

class BucketsPage extends React.Component {

  displayName = "BucketsPage"

  static propTypes = {
    brands: React.PropTypes.array.isRequired,
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

  render() {
    return (
      <div className="page buckets">
        <Helmet title="Buckets" />
        <div className="inpage-content">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
              <Bucket
                collection={this.props.brands}
                key={1}
                name="brand"
                onSaveBucket={this.onSaveBrand}
                validation={validation.brand}
              />
            </div>
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
              <Bucket
                collection={this.props.wrestlers}
                key={2}
                name="wrestler"
                onSaveBucket={this.onSaveWrestler}
                validation={validation.wrestler}
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
  wrestlers: state.wrestlers,
}))(BucketsPage)
