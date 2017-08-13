import React from "react"
import PropTypes from "prop-types"

import Heading from "./heading"
import Liveshow from "../liveshow/liveshow"
import { formatCurrency } from "../../helpers/currency"

const NOOP = () => {}

const AccountingCollection = ({
  cash,
  currency,
  isComplete,
  showDelete,
  calendarEvents,
  onClearLiveShows,
  onClickDelete,
  totalCost,
  totalGross,
  wages,
  style,
}) => {
  cash = formatCurrency(currency, cash)
  return (
    <div className="accounting">
      <Heading first="Cash Available" second="" third={cash} />
      <hr />
      <If condition={calendarEvents.length > 0}>
        <button onClick={onClearLiveShows}>Clear shows</button>
      </If>
      <br />
      <br />
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

AccountingCollection.defaultProps = {
  cash: 0,
  currency: "$",
  isComplete: false,
  showDelete: true,
  calendarEvents: [],
  onClearLiveShows: NOOP,
  onClickDelete: NOOP,
  totalCost: 0,
  totalGross: 0,
  wages: 0,
}

AccountingCollection.propTypes = {
  cash: PropTypes.number,
  currency: PropTypes.string,
  isComplete: PropTypes.bool,
  showDelete: PropTypes.bool,
  calendarEvents: PropTypes.array,
  onClearLiveShows: PropTypes.func,
  onClickDelete: PropTypes.func,
  totalCost: PropTypes.number,
  totalGross: PropTypes.number,
  wages: PropTypes.number,
  style: PropTypes.object.isRequired,
}

export default AccountingCollection
