import React from "react"
import PropTypes from "prop-types"

import HeaderOne from "../../components/header/header"
import Wrestlers from "../../components/wrestlers/container"
import Collection from "../../components/collection/wrestlers.container"
import AddWrestler from "../../components/manage-wrestler/create.container"
import EditWrestler from "../../components/manage-wrestler/update.container"
import { Generate, Reset, ListToggle, Create } from "../../components/icons"

import "./roster.structure.scss"
import "./roster.skin.scss"

const NOOP = () => {}

const RosterPage = ({ onToggleListView, onClose, onClick, onClear, onGenerate, listView, onToggleCreating, creating, currentWrestler, style }) => {
  const hasPane = creating || currentWrestler
  const col = hasPane ? "col-lg-6 col-md-6 col-sm-12 col-xs-12" : "col-lg-12 col-md-12 col-sm-12 col-xs-12"
  return (
    <div className="page roster">
      <HeaderOne>
        Manage Roster
        <span className="tools">
          <Create onClick={onToggleCreating} ritle="Create wrestler" />
          <ListToggle onClick={onToggleListView} title="Toggle list view" />
          <Generate onClick={onGenerate} title="Generate roster" />
          <Reset onClick={onClear} title="Clear roster" />
        </span>
      </HeaderOne>
      <div className="row">
        <If condition={hasPane}>
          <div className={col}>
            <div className="box">
              <If condition={creating}>
                <AddWrestler onClose={onClose} />
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
              <Wrestlers byPassGender={true} style={style} highlightNewest={true} onClick={onClick} />
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

RosterPage.propTypes = {
  creating: PropTypes.bool,
  currentWrestler: PropTypes.object,
  onClick: PropTypes.func,
  onClear: PropTypes.func,
  onClose: PropTypes.func,
  onGenerate: PropTypes.func,
  listView: PropTypes.bool,
  onToggleCreating: PropTypes.func,
  onToggleListView: PropTypes.func,
  style: PropTypes.object,
}

RosterPage.defaultProps = {
  creating: false,
  currentWrestler: null,
  listView: false,
  onClick: NOOP,
  onClose: NOOP,
  onClear: NOOP,
  onGenerate: NOOP,
  onToggleCreating: NOOP,
  style: {},
}

export default RosterPage
