import React from "react"
import { Link } from "react-router"
import Helmet from "react-helmet"
import Icon from "../../components/icon/icon"
import Moment from "moment"
import { connect } from "react-redux"
import * as showActions from "../../actions/show"
import "./stylesheets/shows"

const sortByDate = (previous, next) => {
  let dateFormat = "D/M/YYYY"
  return Moment(previous.date, dateFormat).unix() < Moment(next.date, dateFormat).unix()
}

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

  onClear = () => {
    this.props.dispatch(
      showActions.resetShows()
    )
  }

  displayName = "ShowsPage"

  render() {
    return (
      <div className="page shows">
        <Helmet title="Previous Shows" />
        <div className="navigation navigation--secondary">
          <ul className="navigation__list">
            <li className="navigation__item">
              <a onKeyPress={this.onClear}
                onClick={this.onClear}>
                Reset Shows
              </a>
            </li>
            <li className="navigation__item">
              <Link to="show">
                Create a show
              </Link>
            </li>
            <li className="navigation__item">
              <a download="shows.json"
                href={`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(this.props.shows))}`}>
                Download an export
              </a>
            </li>
          </ul>
        </div>
        <div className="inpage-content">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Show</th>
                <th>Presented by</th>
                <th>Date</th>
                <th># Matches</th>
                <th>Attendance</th>
              </tr>
            </thead>
            <tbody>
              {this.props.shows
                .sort((previous, next) => sortByDate(previous, next))
                .map((show, key) => {
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
                    <td><Icon name={show.brand.name} /></td>
                    <td>{show.date}</td>
                    <td>{show.matches.filter(match => match.wrestlers && match.wrestlers.length > 0).length}</td>
                    <td>{show.attendance.toLocaleString()}</td>
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
