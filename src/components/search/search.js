import React from "react"
import Loading from "../loading/loading"
import * as SearchActions from "../../actions/search"
import _debounce from "lodash.debounce"
import { connect } from "react-redux"
import "./stylesheets/search"

class Search extends React.Component {

  displayName = "Search"

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    search: React.PropTypes.string,
    onSearchUpdated: React.PropTypes.func,
  }

  state = {
    query: "",
    loading: false,
  }

  componentWillMount() {
    this.delayedCallback = _debounce((event) => {
      let query = event.target.value
      this.setState({
        loading: true,
      })
      this.props.dispatch(
        SearchActions.searchMade(query)
      )
      this.setState({
        loading: false,
      })
    })
  }

  onSearch = (event) => {
    event.persist()
    this.delayedCallback(event)
  }

  render() {
    return (
      <div className="search">
        <div className="row">
          <div className="col-xs-11 search__container form-group has-feedback">
            <input
              className="form-control search__field"
              placeholder="Search"
              name="search__field"
              id="search__field"
              type="text"
              onKeyUp={this.onSearch}
              onKeyPress={this.onSearch}
            />
            <i className="glyphicon glyphicon-search search__icon form-control-feedback"></i>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <If condition={this.state.loading}>
              <Loading />
            </If>
          </div>
        </div>
      </div>
    )
  }
}
export default connect(state => ({
  search: state.search,
}))(Search)
