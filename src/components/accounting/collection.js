import React from "react"
import groupBy from "lodash.groupby"
import { nFormatter } from "../../helpers/nFormatter"

const noop = () => {}

const liveShowName = (
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
    {name}
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
  liveShows = [],
  totalCost = 0,
  totalGross = 0,
  isComplete = false,
  onClickDelete = noop,
  federationCash,
}) => {
  liveShows = groupBy(liveShows, "size")
  federationCash = nFormatter(federationCash)
  return (
    <div className="accounting">
      {heading({
        first: "Cash Available",
        second: "",
        third: federationCash,
      })}
      <hr />
      {Object.keys(liveShows).map(index => {
        return (
          <div className="accounting__collection" key={index}>
            {heading({
              first: `Size: ${index}`,
              second: "Cost",
              third: "Gross",
            })}
            {liveShows[index].map(show => {
              const { name, date, } = show
              return heading({
                first: liveShowName(isComplete, name, date, onClickDelete),
                second: nFormatter(show.cost),
                third: show.gross > 0 ? nFormatter(show.gross) : "",
              })
            })}
          </div>
        )
      })}
      <br />
      {heading({
        first: "Totals",
        second: nFormatter(totalCost),
        third: nFormatter(totalGross),
      })}
      <If condition={isComplete}>
        <br />
        {heading({
          first: "Profit",
          second: "",
          third: nFormatter(totalGross - totalCost),
        })}
      </If>
    </div>
  )
}

export default AccountingCollection
