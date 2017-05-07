import React from 'react'

const noop = () => {}

const SimulateMonthButton = ({
  value = 'Simulate Live Shows for the Month',
  onClick = noop,
}) => {
  return (
    <div className="row">
      <div className="col-xs-12">
        <div className="box">
          <button type="submit" onClick={onClick}>
            {value}
          </button>
        </div>
      </div>
    </div>
  )
}

export default SimulateMonthButton
