import React from "react"
import PropTypes from "prop-types"

import HeaderOne from "../../components/h1/h1"
import Wrestlers from "../../components/wrestlers/container"
import EditWrestler from "../../components/edit-wrestler/container"
import "./manage-roster.structure.scss"
import "./manage-roster.skin.scss"

const NOOP = () => {}

const UpdateWrestlersPage = ({ showWrestlersFilters, currentWrestler, onClick, style, }) => {
  return (
    <div className="page manage-roster">
      <HeaderOne>
        Manage Roster{" "}
        <span className="medium-title">
          <i className="icon fa fa-info-circle" /> Click a wrestler to edit them
        </span>
      </HeaderOne>
      <Wrestlers style={style} onClick={onClick} showFilter={showWrestlersFilters} />
      <If condition={currentWrestler}>
        <EditWrestler {...currentWrestler} />
      </If>
    </div>
  )
}

UpdateWrestlersPage.propTypes = {
  currentWrestler: PropTypes.object,
  onClickWrestler: PropTypes.func,
  showWrestlersFilters: PropTypes.bool,
  style: PropTypes.object,
}

UpdateWrestlersPage.defaultProps = {
  currentWrestler: null,
  onClickWrestler: NOOP,
  showWrestlersFilters: true,
  style: {},
}

export default UpdateWrestlersPage
