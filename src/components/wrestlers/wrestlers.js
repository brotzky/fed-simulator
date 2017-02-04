import React from "react"
import Wrestler from "../wrestler/wrestler"
import { Draggable } from "react-drag-and-drop"
import "./stylesheets/wrestlers"

export default class Wrestlers extends React.PureComponent {

  static defaultProps = {
    wrestlers: [],
    canDragAndDrop: true,
    onWrestlerClick: () => {},
    selected: [],
  }

  shouldComponentUpdate(nextProps) {
    return this.props.wrestlers.length !== nextProps.wrestlers.length
      || this.props.canDragAndDrop !== nextProps.canDragAndDrop
      || this.props.selected !== nextProps.selected
  }

  render() {
    return (
      <div className="wrestlers__inner">
        <If condition={this.props.wrestlers.length > 0}>
          <div className="wrestlers__container">
            {this.props.wrestlers
              .sort((a, b) => a.rating > b.rating ? -1 : 1)
              .map((wrestler) => {
              return (
                <Draggable
                  key={wrestler.id}
                  type="wrestler"
                  enabled={this.props.canDragAndDrop}
                  data={wrestler.id}>
                  <Wrestler
                    {...wrestler}
                    active={this.props.selected.includes(wrestler.id)}
                    onWrestlerClick={this.props.onWrestlerClick}
                    canJiggle={this.props.canDragAndDrop}
                  />
                </Draggable>
              )
            })}
          </div>
        </If>
      </div>
    )
  }
}
