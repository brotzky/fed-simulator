import "./stylesheets/show.scss"
import { connect } from "react-redux"
import * as settingsActions from "../../actions/settings"
import * as showActions from "../../actions/show"
import Brand from "../../components/brand/brand"
import classNames from "classnames"
import DayPicker from "react-day-picker"
import Helmet from "react-helmet"
import Match from "../../components/match/match"
import PPVs from "../../components/ppvs/ppvs"
import React from "react"
import PropTypes from "prop-types"
import Model from "../../reducers/show.model"

class ShowPage extends React.Component {

  static propTypes = {
    brands: PropTypes.array.isRequired,
    moves: PropTypes.array.isRequired,
    ppvs: PropTypes.array.isRequired,
    shows: PropTypes.array.isRequired,
    wrestlers: PropTypes.array.isRequired,
  }

  static contextTypes = {
    toSlug: PropTypes.func.isRequired,
  }

  state = {
    showPPVs: false,
    currentShowId: "",
    currentShow: {},
  }

  componentWillMount() {
    let currentShowId

    if (this.props.location.query && this.props.location.query.id) {
      currentShowId = this.props.location.query.id
    }

    let currentShow = this.getShowById(this.props.shows, currentShowId)

    if (!currentShow || currentShow.length === 0) {
      currentShow = new Model({
        id: Math.random().toString(36).substr(2, 10),
        brand: this.props.brands[0],
        PPV: this.props.ppvs[0],
      })
      currentShow = currentShow.toJSON()

      if (this.props.ppvs && this.props.ppvs[0]) {
        this.props.dispatch(
          showActions.createShow(currentShow)
        )
      }
    }

    this.setState({
      currentShow,
      currentShowId,
    })
  }

  getShowById(collection, id) {
    return collection.find(item => item.id === id)
  }

  getWrestlersFilteredByBrand(brand) {
    let wrestlers = this.props.wrestlers

    if (!brand.default) {
      wrestlers = wrestlers.filter(wrestler => wrestler.brand.name === brand.name)
    }

    return wrestlers
  }

  onRandomiseMatches = () => {
    this.props.dispatch(
      showActions.randomiseShow(
        this.state.currentShow.id,
        this.getWrestlersFilteredByBrand(this.state.currentShow.brand),
      )
    )
  }

  onSimulateMatches = () => {
    this.props.dispatch(
      showActions.simulateShow(this.state.currentShow.id, this.props.moves)
    )
  }

  onTogglePPVsSelection = () => {
    this.setState({
      showPPVs: !this.state.showPPVs,
    })
  }

  onDropWrestler = (wrestlerId, matchIndex, showId = false) => {
    let wrestler = this.props.wrestlers.find(wrestler => wrestler.id === wrestlerId)
    this.props.dispatch(
      showActions.addWrestlerToMatch(this.state.currentShow.id, matchIndex, wrestler, showId)
    )
  }

  onSelectWinner = (wrestler, matchIndex) => {
    this.props.dispatch(
      showActions.selectWinnerOfMatch(this.state.currentShow.id, matchIndex, wrestler)
    )
  }

  onRemoveWrestler = (wrestler, matchIndex) => {
    this.props.dispatch(
      showActions.removeWrestlerFromMatch(this.state.currentShow.id, matchIndex, wrestler)
    )
  }

  onSetTagMatch = (isTagMatch, matchIndex) => {
    this.props.dispatch(
      showActions.setTagMatch(this.state.currentShow.id, isTagMatch, matchIndex)
    )
  }

  onClearMatches = () => {
    this.props.dispatch(
      showActions.resetShow(this.state.currentShow.id)
    )
  }

  onToggleStoryByDefault = () => {
    this.props.dispatch(
      settingsActions.toggleStoryByDefault()
    )
  }

  onChangePPV = (PPV) => {
    this.props.dispatch(
      showActions.selectPPVForShow(this.state.currentShow.id, PPV)
    )
    this.setState({
      showPPVs: false,
    })
    if (PPV.brand) {
      this.onChangeBrand(
        this.props.brands.find(brand => brand.name === PPV.brand.name)
      )
    }
  }

  onChangeBrand = (brand) => {
    this.props.dispatch(
      showActions.selectBrandForShow(this.state.currentShow.id, brand)
    )
  }

  onDayClick = (event, date) => {
    this.props.dispatch(
      showActions.selectDateForShow(this.state.currentShow.id, date.toLocaleDateString())
    )
  }

  componentWillReceiveProps(nextProps) {
    this.state.currentShow = this.getShowById(nextProps.shows, this.state.currentShow.id)
  }

  displayName = "ShowPage"

  render() {
    return (
      <main className="page-section show">
        <Helmet title="Create a Show" />
        <If condition={this.props.ppvs && this.props.ppvs[0]}>
          <div className="inpage-content">
            <div className={classNames("row animated fadeIn", {
                hide: !this.state.showPPVs,
              }
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
                      <h4 className="ppvs__name">
                        {this.state.currentShow.PPV.name} <i className="show--edit fa fa-pencil" aria-hidden="true"></i>
                      </h4>
                    </div>
                    <hr />
                    <div>
                      {this.state.currentShow.attendance.toLocaleString()} fans in attendance, presented by&nbsp;
                      <div className="dropdown">
                        <p>
                          {this.state.currentShow.brand.default
                            ? "All brands"
                            : this.state.currentShow.brand.name} <i className="show--edit fa fa-pencil" aria-hidden="true"></i> &nbsp;
                        </p>
                        <ul className="dropdown__content">
                          {this.props.brands.map((brand) => {
                            return (
                              <li key={brand.id}>
                                <a onClick={() => this.onChangeBrand(brand)}>
                                  {brand.default ? "All" : brand.name}
                                </a>
                              </li>
                            )
                          })}
                        </ul>
                      </div>
                      <div className="dropdown">
                        <div>
                          on the {this.state.currentShow.date} <i className="show--edit fa fa-pencil" aria-hidden="true"></i> &nbsp;
                        </div>
                        <div className="dropdown__content">
                          <DayPicker
                            selectedDays={day => this.state.currentShow.date === day.toLocaleDateString()}
                            onDayClick={this.onDayClick.bind(this)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </If>
                <br />
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
                      &nbsp; | &nbsp;
                      <a onKeyPress={this.onToggleStoryByDefault}
                        onClick={this.onToggleStoryByDefault}>
                        Toggle Story
                      </a>
                    </li>
                  </ul>
                  {this.state.currentShow.matches.map((match, key) => {
                    let wrestlers = this.state.currentShow.matches && this.state.currentShow.matches[key] ? this.state.currentShow.matches[key].wrestlers : [],
                      story = match.story ? match.story : []
                    return (
                      <Match
                        key={key}
                        isTagMatch={match.isTagMatch}
                        matchIndex={key}
                        brand={this.state.currentShow.brand.name}
                        chosenWrestlers={wrestlers}
                        story={story}
                        onSetTagMatch={this.onSetTagMatch}
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
                  model={this.state.currentShow.brand}
                  showBrandLogo={false}
                  byPassBrandFilter={true}
                  wrestlers={this.getWrestlersFilteredByBrand(this.state.currentShow.brand)}
                />
              </div>
            </div>
          </div>
        </If>
      </main>
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
