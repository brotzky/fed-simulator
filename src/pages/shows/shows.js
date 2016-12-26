import React from "react"
import { Link } from "react-router"
import Helmet from "react-helmet"
import { connect } from "react-redux"
import * as showActions from "../../actions/show"
import "./stylesheets/shows"

class ShowsPage extends React.Component {

  static propTypes = {
    shows: React.PropTypes.array.isRequired,
  }

  static contextTypes = {
    toSlug: React.PropTypes.func.isRequired,
  }

  onDeleteShow = (id) => {
    this.props.dispatch(
      showActions.deleteShow(id)
    )
  }

  displayName = "ShowsPage"

  render() {
    return (
      <div className="page shows">
        <Helmet title="Previous Shows" />
        <div className="inpage-content">
          <table className="table table-striped">
            <thead>
              <tr>
                <td>Show</td>
                <td># Matches</td>
                <td>Attendance</td>
                <td>Presented by</td>
              </tr>
            </thead>
            <tbody>
              {this.props.shows.map((show, key) => {
                return (
                  <tr key={key}>
                    <td>
                      <a className="show-on-parent-hover"
                        onClick={() => this.onDeleteShow(show.id)}>
                        <i className="fa fa-remove" aria-hidden="true"></i>&nbsp;
                      </a>
                      <Link to={{pathname: 'show/', query: {id: show.id}}}>
                        {show.PPV.name}
                      </Link>
                    </td>
                    <td>{show.matches.length}</td>
                    <td>{show.attendance.toLocaleString()}</td>
                    <td>{show.brand.name}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  shows: state.shows,
}))(ShowsPage)
