import React from "react"
import moment from "moment"
import groupBy from "lodash.groupby"

import { nFormatter } from "../../helpers/nFormatter"

const noop = () => {}

const calendarEvent = (
  isComplete = false,
  name = "",
  date = Date(),
  onClickDelete = noop
) => (
  <span>
    <If condition={!isComplete}>
      <span
        className="item__delete fa fa-trash red"
        data-date={date}
        onClick={onClickDelete}
      />
      &nbsp;
    </If>
    {name} ({moment(date).format("Do")})
  </span>
)

const heading = ({ first = "", second = "", third = "", }) => (
  <div className="row around-xs heading">
    <div className="col-xs-6">
      <div className="box">
        {first}
      </div>
    </div>
    <div className="col-xs-3">
      <div className="box cost">
        {second}
      </div>
    </div>
    <div className="col-xs-3">
      <div className="box gross">
        {third}
      </div>
    </div>
  </div>
)

const AccountingCollection = ({
  cash,
  isComplete = false,
  calendarEvents = [],
  onClickDelete = noop,
  totalCost = 0,
  totalGross = 0,
}) => {
  const groupedCalendarEvents = groupBy(calendarEvents, "size")
  cash = nFormatter(cash)
  return (
    <div className="accounting">
      {heading({
        first: "Cash Available",
        second: "",
        third: cash,
      })}
      <hr />
      <If condition={calendarEvents.length > 0}>
        {Object.keys(groupedCalendarEvents).map(size => {
          return (
            <div className="accounting__collection" key={size}>
              {heading({
                first: `Size: ${size}`,
                second: "Cost",
                third: "Gross",
              })}
              {groupedCalendarEvents[size].map(show => {
                const { name, date, } = show
                return heading({
                  key: date,
                  first: calendarEvent(isComplete, name, date, onClickDelete),
                  second: nFormatter(show.cost),
                  third: show.gross > 0 ? nFormatter(show.gross) : "",
                })
              })}
            </div>
          )
        })}
        {heading({
          first: "Totals",
          second: nFormatter(totalCost),
          third: nFormatter(totalGross),
        })}
        <If condition={isComplete}>
          {heading({
            first: "Profit",
            second: "",
            third: nFormatter(totalGross - totalCost),
          })}
        </If>
      </If>
    </div>
  )
}

export default AccountingCollection
