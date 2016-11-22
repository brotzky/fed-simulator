import React from "react"
import { Draggable, Droppable } from "react-drag-and-drop"
import Icon from "../icon/icon"
import Search from "../search/search"
import * as wrestlersActions from "../../actions/wrestlers"
import { connect } from "react-redux"
import _filter from "lodash/filter"
import { toSlug } from "../../helpers/slugs"
import Wrestlers from "../wrestlers/wrestlers"
import "./stylesheets/main"

class Draft extends React.Component {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    brands: React.PropTypes.array.isRequired,
    wrestlers: React.PropTypes.array.isRequired,
  }

  state = {
    search: "",
    bucketName: "",
  }

  onDrop(bucket, wrestler) {
    this.props.dispatch(
      wrestlersActions.moveWrestler(bucket, wrestler.wrestler)
    )
  }

  onSearchUpdated = (search, bucketName) => {
    this.setState({
      search,
      bucketName,
    })
  }

  displayName = "Draft"

  render() {
    return (
      <div className="brands-wrestlers no-select">
        <div className="row">
          {this.props.brands.map((bucket, key) => {
            let searchIsActive = false,
              malewrestlers = [],
              femalewrestlers = [],
              wrestlers = this.props.wrestlers
                .filter((wrestler) => wrestler.bucket === bucket.name)
                .sort((a, b) => a.rating < b.rating)

            if (this.state.search !== "" && this.state.bucketName === bucket.name) {
              searchIsActive = true
              wrestlers = wrestlers.filter((wrestler) => {
                return wrestler.name.toLowerCase().indexOf(this.state.search) > -1
              })
            }
            malewrestlers = wrestlers.filter((wrestler) => wrestler.bucket === bucket.name && wrestler.male === true),
            femalewrestlers = wrestlers.filter((wrestler) => wrestler.bucket === bucket.name && wrestler.male === false)
            return (
              <Droppable
                key={key}
                className="brand col-lg-3 col-md-3 col-sm-12 col-xs-12"
                types={[
                  "wrestler",
                ]}
                onDrop={this.onDrop.bind(this, bucket)}>
                <p className="text-center hidden-sm hidden-xs">
                  <img
                    src={`static/media/${toSlug(bucket.name)}.png`}
                    title={bucket.name}
                    alt={bucket.name}
                    className="brand__logo"
                  />
                </p>
                <div className={`Droppable col-xs-4 wrestlers wrestlers--${toSlug(bucket.name)}`}>
                  <div className={`wrestlers__search ${(searchIsActive ? "active" : "")}`}>
                    <Search
                      placeholder={`Filter choices`}
                      onSearchUpdated={this.onSearchUpdated}
                      bucketName={bucket.name}
                    />
                  </div>
                  <If condition={malewrestlers.length > 0}>
                    <Wrestlers
                      title="Male Wrestlers"
                      wrestlers={malewrestlers}
                    />
                  </If>
                  <If condition={femalewrestlers.length > 0}>
                    <Wrestlers
                      title="Female Wrestlers"
                      wrestlers={femalewrestlers}
                    />
                  </If>
                </div>
                <h4 className={`wrestlers__header wrestlers__header--${toSlug(bucket.name)}`}>
                  <span className="hidden-lg hidden-md">
                    {bucket.name}: &nbsp;
                  </span>
                  <span>
                    {wrestlers.length} wrestler{wrestlers.length !== 1 ? "s" : ""}
                  </span>
                </h4>
              </Droppable>
            )
          })}
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  brands: state.brands,
  wrestlers: state.wrestlers,
}))(Draft)
