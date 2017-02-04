import React from "react"
import "./stylesheets/search"

export default class Search extends React.Component {

  displayName = "Search"

  static propTypes = {
    brandName: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    onSearchUpdated: React.PropTypes.func,
  }

  state = {
    search: "",
    placeholder: "Search",
    brandName: "",
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.search !== nextState.search
  }

  componentWillMount() {
    this.searchCallback = (event) => {
      let search = event.target.value
      this.setState({
        search,
      })
      this.props.onSearchUpdated(
        search,
        this.props.brandName,
      )
    }
  }

  onSearch = (event) => {
    if (event.keyCode === 27) {
      event.target.value = ''
      this.refs.input.blur()
    } else {
      this.refs.input.focus()
    }

    event.persist()
    this.searchCallback(event)
  }

  render() {
    return (
      <div className="search">
        <div className="row">
          <div className="col-xs-12 form-group search__container">
            <input
              ref="input"
              className="form-control search__field"
              placeholder={this.props.placeholder}
              name="search__field"
              id="search__field"
              type="text"
              onKeyDown={this.onSearch}
              onKeyPress={this.onSearch}
            />
          </div>
        </div>
      </div>
    )
  }
}
