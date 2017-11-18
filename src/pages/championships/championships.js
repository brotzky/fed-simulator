import React from "react"
import PropTypes from "prop-types"

import HeaderOne from "../../components/h1/h1"
import Create from "../../components/create/championship.container.js"
import Collection from "../../components/collection/championships.container"
import { Generate, Reset } from "../../components/icons"

import "./championships.scss"

const NOOP = () => {}

const Championships = ({ onGenerate = NOOP, onClear = NOOP, }) => (
  <section className="page manage-championships">
    <HeaderOne>
      Manage Championships
      <span className="tools">
        <Generate onClick={onGenerate} title="Generate championships" />
        <Reset onClick={onClear} />
      </span>
    </HeaderOne>
    <Collection />
    <Create />
  </section>
)

Championships.propTypes = {
  onClear: PropTypes.func,
  onGenerate: PropTypes.func,
}

export default Championships
