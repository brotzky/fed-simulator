import React from "react"
import PropTypes from "prop-types"

import HeaderOne from "../../components/h1/h1"
import Wrestlers from "../../components/wrestlers/container"
import EditWrestler from "../../components/edit-wrestler/container"
import "./manage-roster.structure.scss"
import "./manage-roster.skin.scss"

const NOOP = () => {}

const UpdateWrestlersPage = ({ showWrestlersFilters = true, currentWrestler = null, onWrestlerClick = NOOP, style = {}, }) => {
  return (
    <div className="page manage-roster">
      <HeaderOne>
        Manage Roster{" "}
        <span className="medium-title">
          <i className="icon fa fa-info-circle" /> Click a wrestler to edit them
        </span>
      </HeaderOne>
      <Wrestlers style={style} onWrestlerClick={onWrestlerClick} showFilter={showWrestlersFilters} />
      <If condition={currentWrestler}>
        <EditWrestler {...currentWrestler} />
      </If>
    </div>
  )
}

UpdateWrestlersPage.propTypes = {
  currentWrestler: PropTypes.object,
  onWrestlerClick: PropTypes.func.isRequired,
  showWrestlersFilters: PropTypes.bool,
  style: PropTypes.object,
}

export default UpdateWrestlersPage
