import React from "react"
import { SlideUp } from "animate-components"

import "./story.scss"

const Story = ({ story = [], }) => (
  <ul className="story">
    <If condition={story.length > 0}>
      {story.map(storyItem => {
        const { id, attacker, move, defender, } = storyItem

        return (
          <li className="story__action" key={id}>
            &nbsp;<span className="attacker">{attacker.name}</span>
            &nbsp;{move.name} for
            &nbsp;{move.damage} damage on
            <span className="defender"> {defender.name}</span>
          </li>
        )
      })}
    </If>
  </ul>
)

export default Story
