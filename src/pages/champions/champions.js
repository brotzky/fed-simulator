import React from "react"
import Championships from "../../components/championships/championships"
import Secondary from "../../components/page/secondary"
import * as championshipActions from "../../actions/championship"
import Brand from "../../components/brand/brand"
import Helmet from "react-helmet"
import { connect } from "react-redux"
import { getById } from "../../helpers/championships"
import "./stylesheets/champions"

class ChampionsPage extends React.Component {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    brands: React.PropTypes.array.isRequired,
    wrestlers: React.PropTypes.array.isRequired,
    championships: React.PropTypes.array.isRequired,
  }

  state = {
    showFemalesOnly: false,
  }

  displayName = "ChampionsPage"

  onClear = (event) => {
    event.preventDefault()
    this.props.dispatch(
      championshipActions.clear()
    )
  }

  onReset = (event) => {
    event.preventDefault()
    this.props.dispatch(
      championshipActions.reset()
    )
  }

  onToggleWomenWrestlers = (event) => {
    event.preventDefault()
    this.setState({
      showFemalesOnly: !this.state.showFemalesOnly,
    })
  }

  render() {
    let awardedChampionships = this.props.championships.filter(championship => championship.wrestlerId !== "" || championship.wrestlerIds.length > 0).length
    console.log(
      getById(this.props.championships)
    )
    return (
      <div className="page champions">
        <Helmet title="Championship Management" />
        <Secondary />
        <div className="navigation navigation--secondary">
          <ul className="navigation__list">
            <li className="navigation__item">
              <a onKeyPress={this.onClear}
                onClick={this.onClear}
                href="#">
                Clear All Championships
              </a>
            </li>
            <li className="navigation__item">
              <a onKeyPress={this.onReset}
                onClick={this.onReset}>
                Reset Championships
              </a>
            </li>
            <li className="navigation__item">
              <a onKeyPress={this.onToggleWomenWrestlers}
                onClick={this.onToggleWomenWrestlers}
                href="#">
                &#x2640; Toggle
              </a>
            </li>
          </ul>
        </div>
        <div className="inpage-content">
          <If condition={awardedChampionships < 3}>
            <div className="alert alert-info" role="alert">
              Drag and drop wrestlers onto a championship to award it to them!
            </div>
          </If>
          <div className="row">
            {this.props.brands.filter((brand) => brand.name !== "Default").map((brand, key) => {
              let wrestlers = this.props.wrestlers
                .filter((wrestler) => wrestler.brand === brand.name && (!this.state.showFemalesOnly || (this.state.showFemalesOnly && wrestler.male === false)))
                .sort((a, b) => a.rating < b.rating),
                championships = this.props.championships.filter((championship) => championship.brand === brand.name && ((this.state.showFemalesOnly && championship.male === false) || !this.state.showFemalesOnly))
              return (
                <div
                  key={brand.id}
                  className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                  <Championships championships={championships} />
                  <Brand
                    id={brand.id}
                    name={brand.name}
                    canDragAndDrop={true}
                    wrestlers={wrestlers}
                    showBrandLogo={false}
                  />
                </div>
              )
            })}
          </div>100
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  brands: state.brands,
  championships: state.championships,
  wrestlers: state.wrestlers,
}))(ChampionsPage)
