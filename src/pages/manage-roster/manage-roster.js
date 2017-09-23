import React from "react"
import PropTypes from "prop-types"

import HeaderOne from "../../components/h1/h1"
import Wrestlers from "../../components/wrestlers/container"
import AddWrestler from "../../components/edit-wrestler/create.container"
import EditWrestler from "../../components/edit-wrestler/container"
import "./manage-roster.structure.scss"
import "./manage-roster.skin.scss"

const NOOP = () => {}

const UpdateWrestlersPage = ({ showWrestlersFilters, openAddWrestler, addingWrestler, currentWrestler, onClick, style, }) => {
  return (
    <div className="page manage-roster">
      <HeaderOne>
        Manage Roster <i className="icon fa fa-plus-circle green" onClick={openAddWrestler} />{" "}
        <span className="medium-title">
          <i className="icon fa fa-info-circle" /> Click a wrestler to edit them
        </span>
      </HeaderOne>
      <Wrestlers style={style} onClick={onClick} showFilter={showWrestlersFilters} />
      <If condition={addingWrestler}>
        <AddWrestler />
      </If>
      <If condition={currentWrestler}>
        <EditWrestler {...currentWrestler} />
      </If>
    </div>
  )
}

UpdateWrestlersPage.propTypes = {
  addingWrestler: PropTypes.bool,
  currentWrestler: PropTypes.object,
  onClick: PropTypes.func,
  openAddWrestler: PropTypes.func,
  showWrestlersFilters: PropTypes.bool,
  style: PropTypes.object,
}

UpdateWrestlersPage.defaultProps = {
  addingWrestler: false,
  currentWrestler: null,
  onClick: NOOP,
  openAddWrestler: NOOP,
  showWrestlersFilters: true,
  style: {},
}

export default UpdateWrestlersPage
