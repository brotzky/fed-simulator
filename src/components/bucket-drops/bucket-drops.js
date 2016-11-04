import React from "react"
import { Draggable, Droppable } from "react-drag-and-drop"
import * as dropsActions from "../../actions/drops"
import { connect } from "react-redux"
import { toSlug } from "./helpers"
import "./stylesheets/bucket-drops"

class BucketDrops extends React.Component {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    buckets:  React.PropTypes.array.isRequired,
    drops:  React.PropTypes.array.isRequired,
  }

  onDrop(bucket, drop) {
    this.props.dispatch(
      dropsActions.moveDrop(bucket, drop.wrestler)
    )
  }

  displayName = "BucketDrops"

  render() {
    const Drop = ({
      id,
      name,
    }) => {
      return (
        <div
          className="drop"
          data-id={id}>
          <span>
            <img
              className="drop__image"
              src={`static/media/wrestlers/${toSlug(name)}.png`}
              alt={name}
              title={name}
            />
          </span>
          <h5 className="drop__name">
            {name}
          </h5>
        </div>
      )
    }
    const Drops = ({
      title,
      drops,
    }) => {
      return (
        <div className="clearfix">
          <h3 className="drops__seperator">
            {title}
          </h3>
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
      )
    }
    return (
      <div className="bucket-drops no-select">
        <div className="row">
          {this.props.buckets.map((bucket, key) => {
            let
              drops = this.props.drops.filter((drop) => drop.bucket === bucket.name),
              maleDrops = this.props.drops.filter((drop) => drop.bucket === bucket.name && drop.male === true),
              femaleDrops = this.props.drops.filter((drop) => drop.bucket === bucket.name && drop.male === false)
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
  buckets: state.buckets,
  drops: state.drops,
}))(BucketDrops)
