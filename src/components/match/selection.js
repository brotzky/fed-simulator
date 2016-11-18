import React from "react"
import { connect } from "react-redux"
import { toSlug } from "../../helpers/slugs"

class Selection extends React.Component {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    buckets: React.PropTypes.array.isRequired,
    drops: React.PropTypes.array.isRequired,

  }

  displayName = "Selection"

  state = {
    chosen: [],
  }

  onClickHandler = (id) => {
    let chosen = this.state.chosen.slice()
    chosen.push(id)

    this.setState({
      chosen: chosen
    })
  }

  render() {
    const Selection = ({ onClickHandler }) => {
      return (
        <div className="selection">
          {this.props.drops.map((drop, key) => {
            return (
              <SelectionItem
                key={key}
                {...drop}
                onClickHandler={onClickHandler}
              />
            )
          })}
        </div>
      )
    }
    const SelectionItem = ({ id, name, onClickHandler}) => {
      const slugName = toSlug(name)
      return (
        <span className="selection__item"
          onClick={() => onClickHandler(id)}>
          <span className={`icon-${slugName}`}></span>
          {this.state.chosen.includes(id)}
        </span>
      )
    }
    return (
      <div>
        <div className="row">
          <div className="col-xs-12">
            <Selection onClickHandler={this.onClickHandler} />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  buckets: state.buckets,
  drops: state.drops,
}))(Selection)
