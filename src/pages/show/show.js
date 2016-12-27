import React from "react"
import { browserHistory } from 'react-router'
import classNames from "classnames"
import Match from "../../components/match/match"
import Brand from "../../components/brand/brand"
import Icon from "../../components/icon/icon"
import PPVs from "../../components/ppvs/ppvs"
import Helmet from "react-helmet"
import DayPicker, { DateUtils } from "react-day-picker"
import { connect } from "react-redux"
import * as showActions from "../../actions/show"
import { hashCode } from "../../helpers/hash"
import "./stylesheets/show"

class ShowPage extends React.Component {

  static propTypes = {
    wrestlers: React.PropTypes.array.isRequired,
    ppvs: React.PropTypes.array.isRequired,
    brands: React.PropTypes.array.isRequired,
    shows: React.PropTypes.array.isRequired,
    moves: React.PropTypes.array.isRequired,
  }

  static contextTypes = {
    toSlug: React.PropTypes.func.isRequired,
  }

  state = {
    showPPVs: false,
  }

  componentWillMount() {
    let currentShowId

    if (this.props.location.query && this.props.location.query.id) {
      currentShowId = this.props.location.query.id
    }

    let currentShow = this.getShowById(this.props.shows, currentShowId)

    if (!currentShow || currentShow.length === 0) {
      currentShow = {
        id: hashCode(Date()),
        brand: this.props.brands[0],
        PPV: this.props.ppvs[0],
        matches: [],
        date: "",
      }
      this.props.dispatch(
        showActions.createShow(currentShow)
      )
    }

    this.currentShow = currentShow
  }

  getShowById(collection, id) {
    return collection.find(item => item.id === id)
  }

  getWrestlersFilteredByBrand(brand) {
    let wrestlers = this.props.wrestlers

    if (!brand.default) {
      wrestlers = wrestlers.filter(wrestler => wrestler.brand === brand.name)
    }

    return wrestlers
  }

  onRandomiseMatches = () => {
    this.props.dispatch(
      showActions.randomiseShow(
        this.currentShow.id,
        this.getWrestlersFilteredByBrand(this.currentShow.brand),
      )
    )
  }

  onSimulateMatches = () => {
    this.props.dispatch(
      showActions.simulateShow(this.currentShow.id, this.props.moves)
    )
  }

  onTogglePPVsSelection = () => {
    this.setState({
      showPPVs: !this.state.showPPVs
    })
  }

  onDropWrestler = (wrestlerId, matchIndex) => {
    let wrestler = this.props.wrestlers.find(wrestler => wrestler.id === wrestlerId)
    this.props.dispatch(
      showActions.addWrestlerToMatch(this.currentShow.id, matchIndex, wrestler)
    )
  }

  onSelectWinner = (wrestler, matchIndex) => {
    this.props.dispatch(
      showActions.selectWinnerOfMatch(this.currentShow.id, matchIndex, wrestler)
    )
  }

  onRemoveWrestler = (wrestler, matchIndex) => {
    this.props.dispatch(
      showActions.removeWrestlerFromMatch(this.currentShow.id, matchIndex, wrestler)
    )
  }

  onClearMatches = () => {
    this.props.dispatch(
      showActions.resetShow(this.currentShow.id)
    )
  }

  onChangePPV = (PPV) => {
    this.props.dispatch(
      showActions.selectPPVForShow(this.currentShow.id, PPV)
    )
    this.setState({
      showPPVs: false,
    })
  }

  onChangeBrand = (brand) => {
    this.props.dispatch(
      showActions.selectBrandForShow(this.currentShow.id, brand)
    )
  }

  onDayClick = (event, date) => {
    this.props.dispatch(
      showActions.selectDateForShow(this.currentShow.id, date.toLocaleString())
    )
  }

  componentWillReceiveProps(nextProps) {
    this.currentShow = this.getShowById(nextProps.shows, this.currentShow.id)
  }

  displayName = "ShowPage"

  render() {
    return (
      <div className={`page show ${this.context.toSlug(this.currentShow.brand.name)}`}>
        <Helmet title="Create a Show" />
        <div className="inpage-content">
          <div className={classNames(
            "row",
            { hide: !this.state.showPPVs }
          )}>
            <div className="col-xs-12">
              <PPVs
                ppvs={this.props.ppvs}
                onPPVClick={this.onChangePPV}
              />
            </div>
          </div>
          <div className="row text-center">
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
              <If condition={!this.state.showPPVs}>
                <div className="ppvs__current">
                  <div onClick={this.onTogglePPVsSelection}>
                    <Icon
                      name={this.currentShow.PPV.name}
                    />
                    <i className="show--edit fa fa-pencil" aria-hidden="true"></i>
                  </div>
                  <hr />
                  <div>
                  <DayPicker
                    selectedDays={day => this.currentShow.date.toLocaleString() === day.toLocaleString()}
                    onDayClick={this.onDayClick.bind(this)}
                  />
                  </div>
                  <h4>
                    {this.currentShow.attendance.toLocaleString()} fans in attendance, presented by <br className="visible-xs" />
                    <div className="dropdown">
                      <p>
                        {this.currentShow.brand.default
                          ? "All brands"
                          : this.currentShow.brand.name} <i className="show--edit fa fa-pencil" aria-hidden="true"></i>
                      </p>
                      <ul className="dropdown__content">
                        {this.props.brands.map((brand, key) => {
                          return (
                            <li key={key}>
                              <a onClick={() => this.onChangeBrand(brand)}>
                                {brand.default ? "All" : brand.name}
                              </a>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  </h4>
                </div>
              </If>
              <div className="show__matches">
                <ul className="show__controls">
                  <li className="show__control">
                    <a onKeyPress={() => this.onRandomiseMatches()}
                      onClick={() => this.onRandomiseMatches()}>
                      Randomise
                    </a>
                    &nbsp; | &nbsp;
                    <a onKeyPress={this.onSimulateMatches}
                      onClick={this.onSimulateMatches}>
                      Simulate
                    </a>
                    &nbsp; | &nbsp;
                    <a onKeyPress={this.onClearMatches}
                      onClick={this.onClearMatches}>
                      Clear
                    </a>
                  </li>
                </ul>
                {this.currentShow.matches.map((match, key) => {
                  let wrestlers = this.currentShow.matches && this.currentShow.matches[key] ? this.currentShow.matches[key].wrestlers : [],
                    story = match.story ? match.story : []
                  return (
                    <Match
                      key={key}
                      matchIndex={key}
                      brand={this.currentShow.brand.name}
                      chosenWrestlers={wrestlers}
                      story={story}
                      onDropWrestler={this.onDropWrestler}
                      onRemoveWrestler={this.onRemoveWrestler}
                      onSelectWinner={this.onSelectWinner}
                    />
                  )
                })}
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
              <Brand
                name={this.currentShow.brand.name}
                showBrandLogo={false}
                byPassBrandFilter={true}
                wrestlers={this.getWrestlersFilteredByBrand(this.currentShow.brand)}
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
  ppvs: state.ppvs,
  wrestlers: state.wrestlers,
  shows: state.shows,
  moves: state.moves,
}))(ShowPage)
