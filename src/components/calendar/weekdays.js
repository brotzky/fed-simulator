import React from "react"

const collection = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]

const Weekdays = () => (
  <div className="row">
    {collection.map(day => {
      return (
        <div key={`calendar-weekday-${day}`} className="header">
          {day}
        </div>
      )
    })}
  </div>
)

export default Weekdays
