import React from 'react'
import groupBy from 'lodash.groupby'
import {nFormatter} from '../../helpers/nFormatter'

const noop = () => {}

const AccountingCollection = ({
  liveShows = [],
  totalCost = 0,
  totalGross = 0,
  isComplete = false,
  onClickDelete = noop,
  federationCash,
}) => {
  liveShows = groupBy(liveShows, 'size')
	const heading = (
		<div className="row around-xs heading">
			<div className="col-xs-2">
					<div className="box">
							Live Show
					</div>
			</div>
			<div className="col-xs-2">
					<div className="box">
							Cost
					</div>
			</div>
			<div className="col-xs-2">
					<div className="box">
							Gross
					</div>
			</div>
		</div>
	)
  return (
    <div className="accounting">
      <div className="total">
        <span className="total__title">Cash available</span>
        <span className="total__cost">{nFormatter(federationCash)}</span>
      </div>
      <hr />
      {Object.keys(liveShows).map(index => {
        return (
          <div className="accounting__collection" key={index}>
            <h4 className="accounting__header">Size: {index}</h4>
            {heading}
            {liveShows[index].map((show, key) => {
              return (
								<div key={key} className="row around-xs">
									<div className="col-xs-2">
										<div className="box">
											<If condition={!isComplete}>
												<span
													className="item__delete fa fa-trash red"
													data-date={show.date}
													onClick={onClickDelete}
												/>
												&nbsp;
											</If>
											{show.name}
										</div>
									</div>
									<div className="col-xs-2">
										<div className="box cost">
											{nFormatter(show.cost)}
										</div>
									</div>
									<div className="col-xs-2">
										<div className="box gross">
											<If condition={show.gross > 0}>
												{nFormatter(show.gross)}
											</If>
										</div>
									</div>
								</div>
              )
            })}
          </div>
        )
      })}
      <hr />
      <div className="total">
        <span className="total__title">Total Cost</span>
        <span className="total__cost total">{nFormatter(totalCost)}</span>
      </div>
      <If condition={isComplete}>
        <div className="total">
          <span className="total__title">Total Gross</span>
          <span className="total__cost gross">{nFormatter(totalGross)}</span>
        </div>
        <div className="total">
          <span className="total__title">Total Profit</span>
          <span className="total__cost profit">
            {nFormatter(totalGross - totalCost)}
          </span>
        </div>
      </If>
    </div>
  )
}

export default AccountingCollection
