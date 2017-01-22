import "./stylesheets/champions"
import { connect } from "react-redux"
import * as championshipActions from "../../actions/championship"
import Brand from "../../components/brand/brand"
import CreateChampionship from "../../components/championships/create"
import Championships from "../../components/championships/championships"
import Helmet from "react-helmet"
import React from "react"

class ChampionsPage extends React.Component {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    brands: React.PropTypes.array.isRequired,
    wrestlers: React.PropTypes.array.isRequired,
    championships: React.PropTypes.array.isRequired,
  }

  displayName = "ChampionsPage"

  onClear = (event) => {
    event.preventDefault()
    this.props.dispatch(
      championshipActions.clear()
    )
  }

  render() {
    let largeColumn  = Math.round(12 / this.props.brands.filter(brand => brand.default === false).length),
      brands = this.props.brands.filter(brand => brand.default === false)
    return (
      <main className="page-section champions">
        <Helmet title="Championships" />
        <CreateChampionship championsName={"default"} />
        <CreateChampionship plateShape={"rectangle"} championsName={"rectangle"} />
        <CreateChampionship plateShape={"circle"} championsName={"circle"} />
      </main>
    )
  }
}

export default connect(state => ({
  brands: state.brands,
  championships: state.championships,
  wrestlers: state.wrestlers,
}))(ChampionsPage)
