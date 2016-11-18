import React from "react"
import { Draggable, Droppable } from "react-drag-and-drop"
import Icon from "../icon/icon"
import Search from "../search/search"
import * as wrestlersActions from "../../actions/wrestlers"
import { connect } from "react-redux"
import _filter from "lodash/filter"
import { toSlug } from "../../helpers/slugs"
import "./stylesheets/main"

class Roster extends React.Component {

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

  displayName = "BucketDrops"

  render() {
    const Drop = ({
      id,
      name,
    }) => {
      const slugName = toSlug(name)
      return (
        <div
          className="drop jiggle"
          data-id={id}>
          <Icon name={name} />
        </div>
      )
    }
    const Drops = ({
      title,
      drops,
    }) => {
      return (
        <div className="clearfix">
          <If condition={drops.length > 0}>
            <h3 className="drops__seperator">
              {title}
            </h3>
            <div className="drops__container">
              {drops.map((drop, key) => {
                return (
                  <Draggable
                    key={key}
                    type="wrestler"
                    data={drop.id}>
                    <Drop
                      key={key}
                      name={drop.name}
                    />
                  </Draggable>
                )
              })}
            </div>
          </If>
        </div>
      )
    }
    return (
      <div className="bucket-drops no-select">
        <div className="row">
          {this.props.brands.map((bucket, key) => {
            let searchIsActive = false,
              maleDrops = [],
              femaleDrops = [],
              drops = this.props.wrestlers
                .filter((drop) => drop.bucket === bucket.name)
                .sort((a, b) => a.rating < b.rating)

            if (this.state.search !== "" && this.state.bucketName === bucket.name) {
              searchIsActive = true
              drops = drops.filter((drop) => {
                return drop.name.toLowerCase().indexOf(this.state.search) > -1
              })
            }
            maleDrops = drops.filter((drop) => drop.bucket === bucket.name && drop.male === true),
            femaleDrops = drops.filter((drop) => drop.bucket === bucket.name && drop.male === false)
            return (
              <Droppable
                key={key}
                className="bucket col-lg-3 col-md-3 col-sm-12 col-xs-12"
                types={[
                  "wrestler",
                ]}
                onDrop={this.onDrop.bind(this, bucket)}>
                <p className="text-center hidden-sm hidden-xs">
                  <img
                    src={`static/media/${toSlug(bucket.name)}.png`}
                    title={bucket.name}
                    alt={bucket.name}
                    className="bucket__logo"
                  />
                </p>
                <div className={`droppable col-xs-4 drops drops--${toSlug(bucket.name)}`}>
                  <div className={`drops__search ${(searchIsActive ? "active" : "")}`}>
                    <Search
                      placeholder={`Filter choices`}
                      onSearchUpdated={this.onSearchUpdated}
                      bucketName={bucket.name}
                    />
                  </div>
                  <If condition={maleDrops.length > 0}>
                    <Drops
                      title="Male Wrestlers"
                      drops={maleDrops}
                    />
                  </If>
                  <If condition={femaleDrops.length > 0}>
                    <Drops
                      title="Female Wrestlers"
                      drops={femaleDrops}
                    />
                  </If>
                </div>
                <h4 className={`drops__header drops__header--${toSlug(bucket.name)}`}>
                  <span className="hidden-lg hidden-md">
                    {bucket.name}: &nbsp;
                  </span>
                  <span>
                    {drops.length} wrestler{drops.length !== 1 ? "s" : ""}
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
}))(Roster)
