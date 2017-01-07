import "./stylesheets/landing"
import { connect } from "react-redux"
import { Link } from "react-router"
import Championships from "../../components/championships/championships"
import Helmet from "react-helmet"
import React from "react"

class LandingPage extends React.Component {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    championships: React.PropTypes.array.isRequired,
  }

  displayName = "LandingPage"

  render() {
    return (
      <div className="page landing">
        <Helmet title="Wrestling SIM" />
        <div className="inpage-content">
          <div className="row introduction">
            <div className="col-xs-12 introduction__container introduction__container--primary">
              <h2>
                Welcome to the WWE Universe Simulation
              </h2>
            </div>
          </div>
          <div className="row introduction">
            <div className="col-xs-12 introduction__container introduction__container--secondary">
              <div className="row introduction__boxes">
                <Link to="draft">
                  <div className="col-lg-3 col-xs-12 introduction__box draft zoom">
                    <h2>Draft wrestlers</h2>
                    <br />
                    <br />
                    <span className="icon icon-raw"></span>, <span className="icon icon-smackdown-live"></span> and <span className="icon icon-nxt"></span>
                  </div>
                </Link>
                <Link to="champions">
                  <div className="col-lg-3 col-xs-12 introduction__box authority zoom">
                    <h2>Be the authority</h2>
                    <br />
                    Award and strip championships!
                    <br />
                    <Championships
                      championships={this.props.championships.slice(0, 5).sort(() => 0.5 - Math.random())}
                      canDragAndDrop={false}
                    />
                  </div>
                </Link>
                <Link to="show">
                  <div className="col-lg-3 col-xs-12 introduction__box shows zoom">
                    <h2>Put on Shows!</h2>
                    <br />
                    <br />With match simulations and a win and loss count that matters
                  </div>
                </Link>
                <Link to="ranking">
                  <div className="col-lg-3 col-xs-12 introduction__box ranking zoom">
                    <h2>WWE Power ranking</h2>
                    <br />
                    <br />
                    View rankings across brands to see whos winning
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default connect(state => ({
  championships: state.championships,
}))(LandingPage)
