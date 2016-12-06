import React from "react"
import PPVs from "../components/ppvs/ppvs"
import Helmet from "react-helmet"
import { connect } from "react-redux"

class PPVsPage extends React.Component {

  displayName = "PPVsPage"

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    ppvs: React.PropTypes.array.isRequired,
  }

  render() {
    console.log(this.props)
    return (
      <div className="page ppvs">
        <Helmet title="Pay Per Views" />
        <div className="inpage-content">
          <PPVs ppvs={this.props.ppvs} />
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  ppvs: state.ppvs,
}))(PPVsPage)
