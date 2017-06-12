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
            <strong>{attacker.name}</strong>
            &nbsp;{move.name} for
            &nbsp;{move.damage} damage on
            <strong> {defender.name}</strong>
          </li>
        )
      })}
    </If>
  </ul>
)

export default Story
