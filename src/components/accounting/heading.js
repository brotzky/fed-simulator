import React from "react"
import PropTypes from "prop-types"

export const Heading = ({ first, second, third, }) =>
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

Heading.defaultProps = {
  first: "",
  second: "",
  third: "",
}
Heading.propTypes = {
  first: PropTypes.oneOfType([PropTypes.string, PropTypes.object,]),
  second: PropTypes.string,
  third: PropTypes.string,
}

export default Heading
