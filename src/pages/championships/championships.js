import React from "react"
import PropTypes from "prop-types"

import HeaderOne from "../../components/h1/h1"
import Collection from "../../components/collection/championships.container"

import "./championships.scss"

const NOOP = () => {}

const Championships = ({ onClear = NOOP }) => {
  return (
    <section className="page manage-championships">
      <HeaderOne>
        Manage Championships{" "}
        <a onClick={onClear}>
          <i className="icon fa fa-trash fa-sm" />
        </a>{" "}
        <span className="medium-title">
          <i className="icon fa fa-info-circle" /> Type inline to update a brand
        </span>
      </HeaderOne>
			<Collection />
    </section>
  )
}

Championships.propTypes = {
  onClear: PropTypes.func,
}

export default Championships
