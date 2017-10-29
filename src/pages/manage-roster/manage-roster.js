import React from "react"
import PropTypes from "prop-types"

import HeaderOne from "../../components/h1/h1"
import Wrestlers from "../../components/wrestlers/container"
import Collection from "../../components/collection/wrestlers.container"
import AddWrestler from "../../components/manage-wrestler/create.container"
import EditWrestler from "../../components/manage-wrestler/update.container"
import "./manage-roster.structure.scss"
import "./manage-roster.skin.scss"

const NOOP = () => {}

const UpdateWrestlersPage = ({ onToggleListView, listView, showWrestlersFilters, onToggleCreating, creating, currentWrestler, onClick, style, }) => {
  const hasPane = creating || currentWrestler
  const col = hasPane ? "col-lg-6 col-md-6 col-sm-12 col-xs-12" : "col-lg-12 col-md-12 col-sm-12 col-xs-12"
  return (
    <div className="page manage-roster">
      <HeaderOne>
        Manage Roster <i className="icon fa fa-plus-circle green" onClick={onToggleCreating} onKeyPress={onToggleCreating} tabIndex="0" />{" "}
        <i className="icon fa fa-list" onClick={onToggleListView} onKeyPress={onToggleListView} tabIndex="0" />{" "}
        <span className="medium-title">
          <i className="icon fa fa-info-circle" /> Click a wrestler to edit them
        </span>
      </HeaderOne>
      <div className="row">
        <If condition={hasPane}>
          <div className={col}>
            <div className="box">
              <If condition={creating}>
                <AddWrestler />
              </If>
              <If condition={currentWrestler}>
                <EditWrestler {...currentWrestler} />
              </If>
              <br />
            </div>
          </div>
        </If>
        <div className={col}>
          <Choose>
            <When condition={!listView}>
              <Wrestlers style={style} onClick={onClick} showFilter={showWrestlersFilters} />
            </When>
            <Otherwise>
              <Collection />
            </Otherwise>
          </Choose>
        </div>
      </div>
    </div>
  )
}

UpdateWrestlersPage.propTypes = {
  creating: PropTypes.bool,
  currentWrestler: PropTypes.object,
  onClick: PropTypes.func,
  listView: PropTypes.bool,
  onToggleCreating: PropTypes.func,
  onToggleListView: PropTypes.func,
  showWrestlersFilters: PropTypes.bool,
  style: PropTypes.object,
}

UpdateWrestlersPage.defaultProps = {
  creating: false,
  currentWrestler: null,
  listView: false,
  onClick: NOOP,
  onToggleCreating: NOOP,
  showWrestlersFilters: true,
  style: {},
}

export default UpdateWrestlersPage
