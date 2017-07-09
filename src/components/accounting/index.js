import React from "react"

import Liveshow from "../liveshow/liveshow"
import { formatCurrency } from "../../helpers/currency"

const noop = () => {}

const Heading = ({ first = "", second = "", third = "", }) => (
  <div className="row Heading text-left">
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
  onClearLiveShows = noop,
  onClickDelete = noop,
  totalCost = 0,
  totalGross = 0,
  wages = 0,
  style,
}) => {
  cash = formatCurrency(currency, cash)
  return (
    <div className="accounting">
      <Heading first="Cash Available" second="" third={cash} />
      <hr />
      <If condition={calendarEvents.length > 0}>
        <button onClick={onClearLiveShows}>
          Clear shows
        </button>
      </If>
      <br /><br />
      <If condition={calendarEvents.length > 0}>
        <Heading second="Cost" third="Gross" />
      </If>
      {calendarEvents.map(show => {
        return (
          <div
            className="accounting__collection"
            key={`accounting-collection-${show.date}`}
          >
            <Heading
              first={
                <Liveshow
                  onClickDelete={onClickDelete}
                  {...show}
                  style={style}
                  showDate={true}
                  canBeDeleted={showDelete}
                />
              }
              second={formatCurrency(currency, show.cost)}
              third={show.gross > 0 ? formatCurrency(currency, show.gross) : ""}
            />
          </div>
        )
      })}
      <Heading
        first="Wages per month"
        second={formatCurrency(currency, wages)}
      />
      <hr />
      <If condition={calendarEvents.length > 0}>
        <Heading
          first="Totals"
          second={formatCurrency(currency, totalCost)}
          third={formatCurrency(currency, totalGross)}
        />
      </If>
      <If condition={isComplete}>
        <Heading
          first="Profit"
          third={formatCurrency(currency, totalGross - totalCost)}
        />
      </If>
    </div>
  )
}

export default AccountingCollection
