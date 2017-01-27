import "./stylesheets/championship"
import { connect } from "react-redux"
import ChampionshipBelt from "../../components/championship-belt/championship-belt"
import React from "react"

const shapes = [
  "square",
  "rectangle",
  "circle",
  "pentagon",
  "hexagon",
]

class CreationismChampionshipPage extends React.Component {

  displayName = "CreationismChampionshipPage"

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
  }

  state = {
    currentIndex: 0,
    currentItem: {
      centerStrapShape: "circle",
      centerPlateShape: "circle",
      centerPlateColor: "gold",
      centerBackgroundColor: "black",
      sideplateBackgroundColor: "gold",
      sideplateShape: "rectangle",
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
                <ChampionshipBelt {...this.state.currentItem} />
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
