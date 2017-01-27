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
    return (
      <main className="page-section creationism-championship">
        <div className="inpage-content">
          <div className="row between-xs middle-xs arrows__container">
            <div className="col-xs-1 start-xs arrow__left">
              <div className="box">
                <i className="fa fa-arrow-left" aria-hidden="true"></i>
              </div>
            </div>
            <div className="col-xs-10 championship-belt">
              <div className="box">
                <ChampionshipBelt />
              </div>
            </div>
            <div className="col-xs-1 end-xs arrow__right">
              <div className="box">
                <i className="fa fa-arrow-right" aria-hidden="true"></i>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }
}

export default connect()(CreationismChampionshipPage)
