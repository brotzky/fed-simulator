import "./stylesheets/championship"
import { connect } from "react-redux"
import ChampionshipBelt from "../../components/championship-belt/championship-belt"
import React from "react"

class CreationismChampionshipPage extends React.Component {

  displayName = "CreationismChampionshipPage"

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
  }

  state = {
    stage: 0,
    plate: {
      shape: "circle",
      color: "black",
      backgroundColor: "gold",
    },
    strap: {
      color: "black",
      shape: "circle",
      plate: {
        shape: "rectangle",
        backgroundColor: "gold",
      },
    },
  }

  changeHandler = () => {

  }

  onSave = () => {

  }

  render() {
    const style = {
      width: "50rem",
      height: "15rem",
    }
    return (
      <main className="page-section creationism-championship">
      <div className="row around-xs">
          <div className="col-xs-2">
              <div className="box">
                  around
              </div>
          </div>
          <div className="col-xs-2">
              <div className="box">
                  around
              </div>
          </div>
          <div className="col-xs-2">
              <div className="box">
                  around
              </div>
          </div>
      </div>
      </main>
    )
  }
}

export default connect()(CreationismChampionshipPage)
