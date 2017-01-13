import { connect } from "react-redux"
import Creator from "../../components/creator/creator"
import Helmet from "react-helmet"
import React from "react"
import skeleton from "../buckets/validation"

class CreationismPage extends React.Component {

  displayName = "CreationismPage"

  static propTypes = {
    brands: React.PropTypes.array.isRequired,
    championships: React.PropTypes.array.isRequired,
    wrestlers: React.PropTypes.array.isRequired,
    shows: React.PropTypes.array.isRequired,
    ppvs: React.PropTypes.array.isRequired,
  }

  render() {
    return (
      <main className="page creationism">
        <Helmet title="Creationism" />
        <div className="inpage-content ">
          <div className="row">
            <Creator skeleton={skeleton} />
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
  shows: state.shows,
  ppvs: state.ppvs,
}))(CreationismPage)
