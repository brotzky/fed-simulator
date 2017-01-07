import React from "react"
import Championships from "../../components/championships/championships"
import Secondary from "../../components/page/secondary"
import * as championshipActions from "../../actions/championship"
import Brand from "../../components/brand/brand"
import Helmet from "react-helmet"
import { connect } from "react-redux"
import "./stylesheets/champions"

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

  onReset = (event) => {
    event.preventDefault()
    this.props.dispatch(
      championshipActions.reset()
    )
  }

  render() {
    const awardedChampionships = this.props.championships.filter(championship => championship.wrestlerId !== "" || championship.wrestlerIds.length > 0).length
    return (
      <div className="page champions">
        <Helmet title="Championships" />
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
          </ul>
        </div>
        <div className="inpage-content">
          <If condition={awardedChampionships < 3}>
            <div className="alert alert-info" role="alert">
              Drag and drop wrestlers onto a championship to award it to them!
            </div>
          </If>
          <div className="row">
            {this.props.brands.filter(brand => brand.default === false).map((brand, key) => {
              let wrestlers = this.props.wrestlers
                .filter(wrestler => wrestler.brand === brand.name),
                championships = this.props.championships
                  .filter(championship => championship.brand === brand.name)
                  .sort((a, b) => a.rating > b.rating ? 1 : -1)
              return (
                <div
                  key={brand.id}
                  className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                    <div className="row clearfix">
                      <div className="col-xs-12">
                        <Championships
                          championships={championships}
                          showBadge={true}
                        />
                      </div>
                    </div>
                    <Brand
                      model={brand}
                      canDragAndDrop={true}
                      wrestlers={wrestlers}
                      showBrandLogo={false}
                    />
                </div>
              )
            })}
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
}))(ChampionsPage)
