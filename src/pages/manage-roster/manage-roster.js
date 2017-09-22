import React from "react"
import PropTypes from "prop-types"

import HeaderOne from "../../components/h1/h1"
import Brands from "../../components/brands/brands"
import Wrestlers from "../../components/wrestlers/container"
import Input from "../../components/form/input"
import Button from "../../components/button/button"
import Image from "../../components/form/image"

import "./manage-roster.structure.scss"
import "./manage-roster.skin.scss"

const NOOP = () => {}

const UpdateWrestlersPage = ({
  brands = [],
  showWrestlersFilters = true,
  currentWrestler = null,
  onBrandClick = NOOP,
  onWrestlerPointsUpdated = NOOP,
  onWrestlersNameUpdated = NOOP,
  onImageUpdated = NOOP,
  onWrestlerDelete = NOOP,
  onWrestlerClick = NOOP,
  style = {},
}) => {
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
        <h3>
          {currentWrestler.name}
        </h3>
        <div className="row bottom-xs">
          <Brands onBrandClick={onBrandClick} highlighted={currentWrestler.brandId} brands={brands} />
        </div>
        <div className="row bottom-xs">
          <div className="col-xs-6 col-lg-8">
            <div className="box">
              <label htmlFor="name">Name</label>
              <Input id="name" onChange={onWrestlersNameUpdated} value={currentWrestler.name} />
            </div>
          </div>
          <div className="col-xs-6 col-lg-4">
            <div className="box">
              <Image id="image" name="image" label={currentWrestler.image ? "" : "Drop image here"} value={currentWrestler.image} onChange={onImageUpdated} />
            </div>
          </div>
        </div>
        <div className="row bottom-xs">
          <div className="col-xs-6 col-lg-8">
            <div className="box">
              <label htmlFor="points">Points</label>
              <Input id="points" onChange={onWrestlerPointsUpdated} value={currentWrestler.points} />
            </div>
          </div>
          <div className="col-xs-6 col-lg-4">
            <div className="box">
              <br />
              <Button classes="btn-delete" onClick={onWrestlerDelete}>
                <i className="icon fa fa-trash" /> Delete wrestler
              </Button>
            </div>
          </div>
        </div>
      </If>
    </div>
  )
}

UpdateWrestlersPage.propTypes = {
  brands: PropTypes.array.isRequired,
  currentWrestler: PropTypes.object,
  onBrandClick: PropTypes.func.isRequired,
  onImageUpdated: PropTypes.func.isRequired,
  onWrestlerClick: PropTypes.func.isRequired,
  onWrestlerDelete: PropTypes.func.isRequired,
  onWrestlerPointsUpdated: PropTypes.func.isRequired,
  onWrestlersNameUpdated: PropTypes.func.isRequired,
  showWrestlersFilters: PropTypes.bool,
  style: PropTypes.object,
}

export default UpdateWrestlersPage
