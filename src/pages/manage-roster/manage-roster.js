import React from "react"
import PropTypes from "prop-types"

import HeaderOne from "../../components/h1/h1"
import Wrestlers from "../../components/wrestlers/container"
import AddWrestler from "../../components/manage-wrestler/create.container"
import EditWrestler from "../../components/manage-wrestler/update.container"
import "./manage-roster.structure.scss"
import "./manage-roster.skin.scss"

const NOOP = () => {}

const UpdateWrestlersPage = ({ showWrestlersFilters, openAddWrestler, addingWrestler, currentWrestler, onClick, style, }) => {
  const hasPane = addingWrestler || currentWrestler
  const col = hasPane ? "col-lg-6 col-md-6 col-sm-12 col-xs-12" : "col-lg-12 col-md-12 col-sm-12 col-xs-12"

  return (
    <div className="page manage-roster">
      <HeaderOne>
        Manage Roster <i className="icon fa fa-plus-circle green" onClick={openAddWrestler} />{" "}
        <span className="medium-title">
          <i className="icon fa fa-info-circle" /> Click a wrestler to edit them
        </span>
      </HeaderOne>
      <div className="row">
        <div className={col}>
          <div className="box">
            <Wrestlers style={style} onClick={onClick} showFilter={showWrestlersFilters} />
          </div>
        </div>
        <If condition={hasPane}>
          <div className={col}>
            <div className="box">
              <If condition={addingWrestler}>
                <AddWrestler />
              </If>
              <If condition={currentWrestler}>
                <EditWrestler {...currentWrestler} />
              </If>
            </div>
          </div>
        </If>
      </div>
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
