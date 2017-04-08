import { connect } from "react-redux"
import Helmet from "react-helmet"
import PPVs from "../../components/ppvs/ppvs"
import React from "react"
import PropTypes from "prop-types"

class PPVsPage extends React.Component {

  displayName = "PPVsPage"

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    ppvs: PropTypes.array.isRequired,
  }

  render() {
    return (
      <main className="page-section ppvs">
        <Helmet title="Pay Per Views" />
        <div className="inpage-content">
          <div className="row">
            <div className="col-xs-12">
              <PPVs ppvs={this.props.ppvs} />
            </div>
          </div>
        </div>
      </main>
    )
  }
}

export default connect(state => ({
  ppvs: state.ppvs,
}))(PPVsPage)
