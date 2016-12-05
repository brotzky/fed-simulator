import React from "react"
import Bell from "../components/bell/bell"
import Match from "../components/match/match"
import Brand from "../components/brand/brand"
import Helmet from "react-helmet"
import { connect } from "react-redux"
import eventEmitter from "../helpers/event-emitter"
import { toSlug } from "../helpers/slugs"
import "./stylesheets/show"

class ShowPage extends React.Component {

  static propTypes = {
    wrestlers: React.PropTypes.array.isRequired,
    brands: React.PropTypes.array.isRequired,
  }

  state = {
    brand: "Raw",
  }

  onBellRung = () => {
    eventEmitter.emit("bellRung")
  }

  onChangeBrand = (brand) => {
    this.setState({
      brand,
    })
  }

  displayName = "ShowPage"

  render() {
    return (
      <div className="page show">
        <Helmet title="Create Show" />
        <div className="navigation navigation--secondary">
          {this.props.brands
            .filter((brand) => brand.name !== "default")
            .map((brand) => {
              return (
                <div className="navigation__item">
                  <a onKeyPress={this.onChangeBrand.bind(this, brand.name)}
                    onClick={this.onChangeBrand.bind(this, brand.name)}>
                    Select {brand.name}
                  </a>
                </div>
              )
            })
          }
          <div className="navigation__item">
            <a onKeyPress={this.onBellRung}
              onClick={this.onBellRung}>
              Simulate matches
            </a>
          </div>
        </div>
        <br />
        <div className="content-area">
          <div className="row">
            <div className="col-xs-6">
              <Bell onBellRung={this.onBellRung} />
              <br />
              <h3 className="show__header">
                Main Event
              </h3>
              <Match showWrestlers={false} />
              <h3 className="show__header">
                Midcard Matches
              </h3>
              <Match showWrestlers={false} />
              <Match showWrestlers={false} />
              <h3 className="show__header">
                Lowercard Matches
              </h3>
              <Match showWrestlers={false} />
              <Match showWrestlers={false} />
              <h3 className="show__header">
                Pre-show Match
              </h3>
              <Match showWrestlers={false} />
            </div>
            <div className="col-xs-6">
              <Brand
                name={this.state.brand}
                showBrandLogo={false}
                wrestlers={this.props.wrestlers}
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
}))(ShowPage)
