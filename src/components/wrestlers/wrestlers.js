import React from "react"
import Wrestler from "../wrestler/wrestler"
import { Draggable } from "react-drag-and-drop"
import "./stylesheets/wrestlers"

const Wrestlers = ({
  wrestlers = [],
  canDragAndDrop = true,
  onWrestlerClick = () => {},
  selected = [],
}) => {
  return (
    <div className="wrestlers__inner">
      <If condition={wrestlers.length > 0}>
        <div className="wrestlers__container">
          {wrestlers
            .sort((a, b) => a.rating > b.rating ? -1 : 1)
            .map((wrestler) => {
            return (
              <Draggable
                key={wrestler.id}
                type="wrestler"
                enabled={canDragAndDrop}
                data={wrestler.id}>
                <Wrestler
                  {...wrestler}
                  active={selected.includes(wrestler.id)}
                  onWrestlerClick={onWrestlerClick}
                  canJiggle={canDragAndDrop}
                />
              </Draggable>
            )
          })}
        </div>
      </If>
    </div>
  )
}

export default Wrestlers
