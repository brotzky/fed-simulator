import "./stylesheets/champions"
import { connect } from "react-redux"
import { Link } from "react-router"
import * as championshipActions from "../../actions/championship"
import Brand from "../../components/brand/brand"
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
    let largeColumn  = Math.floor(12 / this.props.brands.length)
    return (
      <main className="page-section champions">
        <Helmet title="Championships" />
          <div className="navigation navigation--secondary">
            <ul className="navigation__list">
              <If condition={this.props.brands.length > 0}>
                <li className="navigation__item">
                  <a onKeyPress={this.onClear}
                    onClick={this.onClear}
                    href="#">
                    Vacate all championships
                  </a>
                </li>
              </If>
              <li className="navigation__item">
                <Link to="creationism/championship"
                  className="btn">
                    Create a Championship
                </Link>
              </li>
            </ul>
          </div>
          <div className="inpage-content">
            <div className="row">
              {this.props.brands.map((brand, key) => {
                let wrestlers = this.props.wrestlers
                  .filter(wrestler => wrestler.brand === brand.name),
                  championships = this.props.championships
                    .filter(championship => championship.brand === brand.name)
                    .sort((a, b) => a.rating > b.rating ? 1 : -1)
                  return (
                    <div key={key}
                      className={`col-lg-${largeColumn} col-md-6 col-sm-6 col-xs-12`}>
                      <Championships
                        championships={championships}
                        showBadge={true}
                      />
                      <Brand
                        model={{
                          bgColour: brand.bgColour,
                          textColour: brand.textColour,
                        }}
                        canDragAndDrop={true}
                        wrestlers={brand.wrestlers}
                        showBrandLogo={false}
                        bgColour={brand.bgColour}
                        wrestlers={wrestlers}
                      />
                    </div>
                  )
                })}
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
}))(ChampionsPage)
