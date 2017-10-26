import React from "react"
import PropTypes from "prop-types"

import HeaderOne from "../../components/h1/h1"
import Create from "../../components/create/championship.container.js"
import Collection from "../../components/collection/championships.container"

import "./championships.scss"

const NOOP = () => {}

const Championships = ({ onClear = NOOP, }) => {
  return (
    <section className="page manage-championships">
      <HeaderOne>
        Manage Championships{" "}
        <a onClick={onClear}>
          <i className="icon fa fa-trash fa-sm" />
        </a>{" "}
        <span className="medium-title">
          <i className="icon fa fa-info-circle" /> Type inline to update a championship
        </span>
      </HeaderOne>
      <Collection />
      <Create />
    </section>
  )
}

Championships.propTypes = {
  onClear: PropTypes.func,
}

export default Championships
