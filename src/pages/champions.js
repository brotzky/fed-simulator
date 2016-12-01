import React from "react"
import Search from "../components/search/search"
import Championships from "../components/championships/championships"
import Wrestlers from "../components/wrestlers/wrestlers"
import Helmet from "react-helmet"
import { connect } from "react-redux"
import "./stylesheets/champions"

class ChampionsPage extends React.Component {

  static propTypes = {
    wrestlers: React.PropTypes.array.isRequired,
    championships: React.PropTypes.array.isRequired,
  }

  state = {
    search: "",
  }

  onSearchUpdated = (search, brandName) => {
    this.setState({
      search,
    })
  }

  displayName = "ChampionsPage"

  render() {
    let searchIsActive = false,
      wrestlers = this.props.wrestlers

    if (this.state.search !== "") {
      searchIsActive = true
      wrestlers = wrestlers.filter((wrestler) => {
        return wrestler.name.toLowerCase().indexOf(this.state.search) > -1
      })
    }
    return (
      <div>
        <Helmet title="Championship Management" />
        <Championships championships={this.props.championships} />
        <div className={`wrestlers__search clearfix ${(searchIsActive ? "active" : "")}`}>
          <Search
            placeholder={`Filter choices`}
            onSearchUpdated={this.onSearchUpdated}
            brandName={"default"}
          />
        </div>
        <Wrestlers
          wrestlers={wrestlers}
          canDragAndDrop={true}
        />
      </div>
    )
  }
}

export default connect(state => ({
  championships: state.championships,
  wrestlers: state.wrestlers,
}))(ChampionsPage)
