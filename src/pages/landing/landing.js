import React from "react"
import { Link } from "react-router"
import Helmet from "react-helmet"
import { connect } from "react-redux"
import Championships from "../../components/championships/championships"
import "./stylesheets/landing"

class LandingPage extends React.Component {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    championships: React.PropTypes.array.isRequired,
  }

  displayName = "LandingPage"

  render() {
    return (
      <div className="page landing">
        <Helmet title="Welcome to WWE Universe SIM" />
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
                    <h4>Draft wrestlers</h4>
                    <br />
                    <br />
                    <span className="icon icon-raw"></span>, <span className="icon icon-smackdown-live"></span> and <span className="icon icon-nxt"></span>
                  </div>
                </Link>
                <Link to="champions">
                  <div className="col-lg-3 col-xs-12 introduction__box championship zoom">
                    <h4>Be the authority</h4>
                    <br />
                    Award and strip championships!
                    <br />
                    <Championships
                      championships={this.props.championships.sort(function() { return 0.5 - Math.random() })}
                      canDragAndDrop={false}
                    />
                  </div>
                </Link>
                <Link to="show">
                  <div className="col-lg-3 col-xs-12 introduction__box shows zoom">
                    <h4>Put on Shows!</h4>
                    <br />
                    <br />With match simulations and a win and loss count that matters
                  </div>
                </Link>
                <Link to="ranking">
                  <div className="col-lg-3 col-xs-12 introduction__box ranking zoom">
                    <h4>WWE Power ranking</h4>
                    <br />
                    <br />
                    View rankings across brands to see whos winning
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="row legal">
          <div className="col-lg-9">
            All WWE imagery is taken from <a href="http://www.wwe.com/main-help/generalfaq/copyright">WWE.com</a> and owned by <a href="https://wwe.com">World Wrestling Entertainment, Inc.</a>
          </div>
        </div>
      </div>
    )
  }
}


export default connect(state => ({
  championships: state.championships,
}))(LandingPage)
