import React from "react"
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

  displayName = "ChampionsPage"

  render() {
    return (
      <div>
        <Helmet title="Championship Management" />
        <Championships championships={this.props.championships} />
        <Wrestlers
          wrestlers={this.props.wrestlers}
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
