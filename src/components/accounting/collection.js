import React from "react"

import Liveshow from "../liveshow/liveshow"
import { formatCurrency } from "../../helpers/currency"

const noop = () => {}

const heading = ({ first = "", second = "", third = "", }) => (
  <div className="row heading text-left">
    <div className="col-xs-8">
      <div className="box">
        {first}
      </div>
    </div>
    <div className="col-xs-2 text-right">
      <div className="box cost">
        {second}
      </div>
    </div>
    <div className="col-xs-2 text-right">
      <div className="box gross">
        {third}
      </div>
    </div>
  </div>
)

const AccountingCollection = ({
  cash,
  currency = "$",
  isComplete = false,
  showDelete = true,
  calendarEvents = [],
  onClickDelete = noop,
  totalCost = 0,
  totalGross = 0,
  style,
}) => {
  cash = formatCurrency(currency, cash)
  return (
    <div className="accounting">
      {heading({
        first: "Cash Available",
        second: "",
        third: cash,
      })}
      <hr />
      {calendarEvents.map(show => {
        return (
          <div
            className="accounting__collection"
            key={`accounting-collection-${show.date}`}
          >
            {heading({
              first: (
                <Liveshow
                  onClickDelete={onClickDelete}
                  {...show}
                  style={style}
                  showDate={true}
                  canBeDeleted={showDelete}
                />
              ),
              second: formatCurrency(currency, show.cost),
              third: show.gross > 0 ? formatCurrency(currency, show.gross) : "",
            })}
          </div>
        )
      })}
      <If condition={calendarEvents.length > 0}>
        {heading({
          first: "Totals",
          second: formatCurrency(currency, totalCost),
          third: formatCurrency(currency, totalGross),
        })}
      </If>
      <If condition={isComplete}>
        {heading({
          first: "Profit",
          third: formatCurrency(currency, totalGross - totalCost),
        })}
      </If>
    </div>
  )
}

export default AccountingCollection
