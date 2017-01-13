import "./stylesheets/show"
import { connect } from "react-redux"
import { hashCode } from "../../helpers/hash"
import * as settingsActions from "../../actions/settings"
import * as showActions from "../../actions/show"
import Brand from "../../components/brand/brand"
import classNames from "classnames"
import DayPicker from "react-day-picker"
import Helmet from "react-helmet"
import Icon from "../../components/icon/icon"
import Match from "../../components/match/match"
import PPVs from "../../components/ppvs/ppvs"
import React from "react"

class ShowPage extends React.Component {

  static propTypes = {
    brands: React.PropTypes.array.isRequired,
    moves: React.PropTypes.array.isRequired,
    ppvs: React.PropTypes.array.isRequired,
    shows: React.PropTypes.array.isRequired,
    wrestlers: React.PropTypes.array.isRequired,
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
        date: "",
        matches: [],
        PPV: {},
      }

      if (this.props.ppvs && this.props.ppvs[0]) {
        this.props.dispatch(
          showActions.createShow(currentShow)
        )
      }
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
      showPPVs: !this.state.showPPVs,
    })
  }

  onDropWrestler = (wrestlerId, matchIndex, showId = false) => {
    let wrestler = this.props.wrestlers.find(wrestler => wrestler.id === wrestlerId)
    this.props.dispatch(
      showActions.addWrestlerToMatch(this.currentShow.id, matchIndex, wrestler, showId)
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

  onSetTagMatch = (isTagMatch, matchIndex) => {
    this.props.dispatch(
      showActions.setTagMatch(this.currentShow.id, isTagMatch, matchIndex)
    )
  }

  onClearMatches = () => {
    this.props.dispatch(
      showActions.resetShow(this.currentShow.id)
    )
  }

  onToggleStoryByDefault = () => {
    this.props.dispatch(
      settingsActions.toggleStoryByDefault()
    )
  }

  onChangePPV = (PPV) => {
    this.props.dispatch(
      showActions.selectPPVForShow(this.currentShow.id, PPV)
    )
    this.setState({
      showPPVs: false,
    })
    if (PPV.defaultBrand) {
      this.onChangeBrand(
        this.props.brands.find(brand => brand.name === PPV.defaultBrand)
      )
    }
  }

  onChangeBrand = (brand) => {
    this.props.dispatch(
      showActions.selectBrandForShow(this.currentShow.id, brand)
    )
  }

  onDayClick = (event, date) => {
    this.props.dispatch(
      showActions.selectDateForShow(this.currentShow.id, date.toLocaleDateString())
    )
  }

  componentWillReceiveProps(nextProps) {
    this.currentShow = this.getShowById(nextProps.shows, this.currentShow.id)
  }

  displayName = "ShowPage"

  render() {
    return (
      <main className="page show">
        <Helmet title="Create a Show" />
        <If condition={this.props.ppvs && this.props.ppvs[0]}>
          <div className="inpage-content">
            <div className={classNames(
              "row",
              "animated fadeIn",
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
                      <Icon name={this.currentShow.PPV.name} />
                      <i className="show--edit fa fa-pencil" aria-hidden="true"></i>
                    </div>
                    <hr />
                    <h4>
                      {this.currentShow.attendance.toLocaleString()} fans in attendance, presented by <br className="visible-xs" />
                      <div className="dropdown">
                        <p>
                          {this.currentShow.brand.default
                            ? "All brands"
                            : this.currentShow.brand.name} <i className="show--edit fa fa-pencil" aria-hidden="true"></i> &nbsp;
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
                      <div className="dropdown">
                        <div>
                          on the {this.currentShow.date} <i className="show--edit fa fa-pencil" aria-hidden="true"></i> &nbsp;
                        </div>
                        <div className="dropdown__content">
                          <DayPicker
                            selectedDays={day => this.currentShow.date === day.toLocaleDateString()}
                            onDayClick={this.onDayClick.bind(this)}
                          />
                        </div>
                      </div>
                    </h4>
                  </div>
                </If>
              </div>
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
                {this.currentShow.matches.map((match, key) => {
                  let wrestlers = this.currentShow.matches && this.currentShow.matches[key] ? this.currentShow.matches[key].wrestlers : [],
                    story = match.story ? match.story : []
                  return (
                    <Match
                      key={key}
                      isTagMatch={match.isTagMatch}
                      matchIndex={key}
                      brand={this.currentShow.brand.name}
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
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <Brand
                  model={this.currentShow.brand}
                  showBrandLogo={false}
                  byPassBrandFilter={true}
                  wrestlers={this.getWrestlersFilteredByBrand(this.currentShow.brand)}
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
