import React from "react"
import PPVs from "../../components/ppvs/ppvs"
import Helmet from "react-helmet"
import { connect } from "react-redux"
import "./stylesheets/ppvs"

class PPVsPage extends React.Component {

  displayName = "PPVsPage"

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    ppvs: React.PropTypes.array.isRequired,
  }

  render() {
    return (
      <div className="page ppvs">
        <Helmet title="Pay Per Views" />
        <div className="inpage-content">
          <div className="row">
            <div className="col-xs-12">
              <PPVs ppvs={this.props.ppvs} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  ppvs: state.ppvs,
}))(PPVsPage)
