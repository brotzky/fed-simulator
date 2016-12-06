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
                <div className="col-lg-3 col-xs-12 introduction__box draft">
                  Draft wrestlers
                  <br />
                  <br />
                  <span className="icon icon-raw"></span>, <span className="icon icon-smackdown-live"></span> and <span className="icon icon-nxt"></span>
                </div>
                <div className="col-lg-3 col-xs-12 introduction__box championship">
                  Be the authority and award championship
                  <Championships
                    championships={this.props.championships.sort(function() { return 0.5 - Math.random() })}
                    canDragAndDrop={false}
                  />
                </div>
                <div className="col-lg-3 col-xs-12 introduction__box shows">
                  Put on Shows! With match simulations and a win and loss count that matters
                </div>
                <div className="col-lg-3 col-xs-12 introduction__box ranking">
                  View rankings across brands to see whos winning
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="legal">
          All WWE imagery is taken from <a href="http://www.wwe.com/main-help/generalfaq/copyright">WWE.com</a> and owned by <a href="https://wwe.com">World Wrestling Entertainment, Inc.</a>
        </p>
      </div>
    )
  }
}


export default connect(state => ({
  championships: state.championships,
}))(LandingPage)
